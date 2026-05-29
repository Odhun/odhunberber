import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  getDoc,
  query,
  where,
  orderBy,
  Timestamp,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '@/firebase/config';
import type { Appointment, AppointmentStatus } from '@/types';

const COLLECTION = 'appointments';

export async function createAppointment(
  data: Omit<Appointment, 'id' | 'createdAt' | 'updatedAt' | 'status'>
): Promise<string> {
  const docRef = await addDoc(collection(db, COLLECTION), {
    ...data,
    status: 'pending',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });
  return docRef.id;
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

export async function getPendingAppointments(): Promise<Appointment[]> {
  const q = query(
    collection(db, COLLECTION),
    where('status', '==', 'pending'),
    orderBy('date', 'asc')
  );
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

export async function getBookedSlots(date: string): Promise<string[]> {
  const appointments = await getAppointmentsByDate(date);
  return appointments.map((a) => a.time);
}
