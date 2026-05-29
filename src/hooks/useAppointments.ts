'use client';

import { useState, useEffect } from 'react';
import { getAppointmentsByDate, getBookedSlots } from '@/services/appointments';
import type { Appointment } from '@/types';

export function useBookedSlots(date: string | null) {
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!date) return;
    setLoading(true);
    getBookedSlots(date)
      .then(setBookedSlots)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [date]);

  return { bookedSlots, loading };
}

export function useDayAppointments(date: string | null) {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!date) return;
    setLoading(true);
    getAppointmentsByDate(date)
      .then(setAppointments)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [date]);

  return { appointments, loading, setAppointments };
}
