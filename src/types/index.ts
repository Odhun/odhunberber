export type AppointmentStatus = 'pending' | 'confirmed' | 'cancelled';

export interface Appointment {
  id: string;
  customerName: string;
  customerPhone: string;
  serviceId: string;
  serviceName: string;
  date: string; // ISO date string YYYY-MM-DD
  time: string; // HH:MM
  status: AppointmentStatus;
  adminNote?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  duration: number; // minutes
  price: number; // TRY
  isActive: boolean;
  order: number;
}

export interface TimeSlot {
  time: string; // HH:MM
  status: 'available' | 'booked' | 'pending' | 'blocked';
}

export interface WorkingHours {
  isOpen: boolean;
  openTime: string; // HH:MM
  closeTime: string; // HH:MM
  slotInterval: number; // minutes between slots
}

export interface WorkingSchedule {
  monday: WorkingHours;
  tuesday: WorkingHours;
  wednesday: WorkingHours;
  thursday: WorkingHours;
  friday: WorkingHours;
  saturday: WorkingHours;
  sunday: WorkingHours;
}

export interface BlockedDate {
  id: string;
  date: string; // YYYY-MM-DD
  reason?: string;
  blockedSlots?: string[]; // empty = all day
}

export interface SiteSettings {
  shopName: string;
  phone: string;
  email: string;
  address: string;
  mapUrl: string;
  instagram?: string;
  facebook?: string;
  twitter?: string;
  workingSchedule: WorkingSchedule;
}

export interface AdminUser {
  uid: string;
  email: string;
}

export type DayOfWeek =
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday'
  | 'saturday'
  | 'sunday';

export const DAY_NAMES_TR: Record<DayOfWeek, string> = {
  monday: 'Pazartesi',
  tuesday: 'Salı',
  wednesday: 'Çarşamba',
  thursday: 'Perşembe',
  friday: 'Cuma',
  saturday: 'Cumartesi',
  sunday: 'Pazar',
};
