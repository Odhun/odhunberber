import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  setDoc,
  query,
  orderBy,
} from 'firebase/firestore';
import { db } from '@/firebase/config';
import type { Service } from '@/types';
import { DEFAULT_SERVICES } from '@/lib/constants';

const COLLECTION = 'services';

export async function getServices(): Promise<Service[]> {
  // Simple query without composite index — filter+sort client-side
  const snapshot = await getDocs(collection(db, COLLECTION));
  if (snapshot.empty) return DEFAULT_SERVICES;
  return snapshot.docs
    .map((d) => ({ id: d.id, ...d.data() } as Service))
    .filter((s) => s.isActive)
    .sort((a, b) => a.order - b.order);
}

export async function getAllServicesAdmin(): Promise<Service[]> {
  const snapshot = await getDocs(collection(db, COLLECTION));
  if (snapshot.empty) return DEFAULT_SERVICES;
  return snapshot.docs
    .map((d) => ({ id: d.id, ...d.data() } as Service))
    .sort((a, b) => a.order - b.order);
}

export async function addService(data: Omit<Service, 'id'>): Promise<string> {
  const docRef = await addDoc(collection(db, COLLECTION), data);
  return docRef.id;
}

export async function updateService(id: string, data: Partial<Service>): Promise<void> {
  await updateDoc(doc(db, COLLECTION, id), data);
}

export async function deleteService(id: string): Promise<void> {
  await deleteDoc(doc(db, COLLECTION, id));
}

export async function seedDefaultServices(): Promise<void> {
  for (const service of DEFAULT_SERVICES) {
    await setDoc(doc(db, COLLECTION, service.id), service);
  }
}
