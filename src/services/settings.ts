import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '@/firebase/config';
import type { WorkingSchedule, BlockedDate, SiteSettings } from '@/types';
import { DEFAULT_WORKING_HOURS, CONTACT, SITE_NAME } from '@/lib/constants';
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  query,
  where,
  orderBy,
} from 'firebase/firestore';

export async function getWorkingSchedule(): Promise<WorkingSchedule> {
  const ref = doc(db, 'settings', 'workingHours');
  const snap = await getDoc(ref);
  if (!snap.exists()) return DEFAULT_WORKING_HOURS as WorkingSchedule;
  return snap.data() as WorkingSchedule;
}

export async function updateWorkingSchedule(schedule: WorkingSchedule): Promise<void> {
  await setDoc(doc(db, 'settings', 'workingHours'), schedule);
}

export async function getBlockedDates(): Promise<BlockedDate[]> {
  const q = query(collection(db, 'blockedDates'), orderBy('date', 'asc'));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as BlockedDate));
}

export async function addBlockedDate(data: Omit<BlockedDate, 'id'>): Promise<string> {
  const ref = await addDoc(collection(db, 'blockedDates'), data);
  return ref.id;
}

export async function removeBlockedDate(id: string): Promise<void> {
  await deleteDoc(doc(db, 'blockedDates', id));
}

export async function getSiteSettings(): Promise<SiteSettings> {
  const ref = doc(db, 'settings', 'siteConfig');
  const snap = await getDoc(ref);
  if (!snap.exists()) {
    return {
      shopName: SITE_NAME,
      phone: CONTACT.phone,
      email: CONTACT.email,
      address: CONTACT.address,
      mapUrl: CONTACT.mapUrl,
      instagram: CONTACT.instagram,
      facebook: CONTACT.facebook,
      workingSchedule: DEFAULT_WORKING_HOURS as WorkingSchedule,
    };
  }
  return snap.data() as SiteSettings;
}

export async function updateSiteSettings(settings: Partial<SiteSettings>): Promise<void> {
  await setDoc(doc(db, 'settings', 'siteConfig'), settings, { merge: true });
}
