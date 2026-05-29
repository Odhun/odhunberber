import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  getDoc,
  setDoc,
  query,
  where,
  orderBy,
  arrayUnion,
} from 'firebase/firestore';
import { db } from '@/firebase/config';
import type { Appointment, AppointmentStatus } from '@/types';

const COLLECTION = 'appointments';
const PUBLIC_SLOTS = 'publicSlots';

export async function createAppointment(
  data: Omit<Appointment, 'id' | 'createdAt' | 'updatedAt' | 'status'>
): Promise<string> {
  const docRef = await addDoc(collection(db, COLLECTION), {
    ...data,
    status: 'pending',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });

  // Write booked time to public collection (no customer data)
  try {
    await setDoc(
      doc(db, PUBLIC_SLOTS, data.date),
      { date: data.date, bookedTimes: arrayUnion(data.time) },
      { merge: true }
    );
  } catch {
    // Non-critical — appointment still created
  }

  return docRef.id;
}

// Public: reads only booked times, no customer data
export async function getPublicBookedSlots(date: string): Promise<string[]> {
  const snap = await getDoc(doc(db, PUBLIC_SLOTS, date));
  if (!snap.exists()) return [];
  return (snap.data()?.bookedTimes as string[]) || [];
}

export async function getAppointmentsByDate(date: string): Promise<Appointment[]> {
  const q = query(
    collection(db, COLLECTION),
    where('date', '==', date),
    where('status', 'in', ['pending', 'confirmed'])
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as Appointment));
}

export async function getAllAppointments(): Promise<Appointment[]> {
  const q = query(collection(db, COLLECTION), orderBy('date', 'desc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as Appointment));
}

export async function updateAppointmentStatus(
  id: string,
  status: AppointmentStatus,
  adminNote?: string
): Promise<void> {
  const ref = doc(db, COLLECTION, id);
  await updateDoc(ref, {
    status,
    ...(adminNote !== undefined && { adminNote }),
    updatedAt: new Date().toISOString(),
  });
}

export async function deleteAppointment(id: string): Promise<void> {
  await deleteDoc(doc(db, COLLECTION, id));
}

// Admin only — reads full appointment data
export async function getBookedSlots(date: string): Promise<string[]> {
  const appointments = await getAppointmentsByDate(date);
  return appointments.map((a) => a.time);
}
