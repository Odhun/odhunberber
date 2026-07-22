'use client';

import { motion } from 'framer-motion';
import { CheckCircle, XCircle, Trash2, MessageSquare } from 'lucide-react';
import Button from '@/components/ui/Button';
import { StatusBadge } from '@/components/ui/Badge';
import { formatDateTR } from '@/lib/utils';
import type { Appointment } from '@/types';

interface AppointmentCardProps {
  appointment: Appointment;
  onConfirm?: () => void;
  onCancel?: () => void;
  onNote?: () => void;
  onDelete?: () => void;
  delay?: number;
}

export default function AppointmentCard({
  appointment: a,
  onConfirm,
  onCancel,
  onNote,
  onDelete,
  delay = 0,
}: AppointmentCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="rounded-xl border border-dark-700 bg-dark-800 p-4"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-semibold text-white">{a.customerName}</span>
            <StatusBadge status={a.status} />
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-dark-400">
            <span>{a.serviceName}</span>
            <span>{formatDateTR(a.date)} — {a.time}</span>
            <span>{a.customerPhone}</span>
          </div>
          {a.adminNote && <p className="text-sm text-dark-500 italic">Not: {a.adminNote}</p>}
        </div>
        <div className="flex flex-wrap gap-2 shrink-0">
          {a.status === 'pending' && onConfirm && (
            <Button size="sm" onClick={onConfirm} icon={<CheckCircle size={14} />}>
              Onayla
            </Button>
          )}
          {a.status === 'pending' && onCancel && (
            <Button size="sm" variant="danger" onClick={onCancel} icon={<XCircle size={14} />}>
              İptal
            </Button>
          )}
          {onNote && (
            <Button size="sm" variant="ghost" onClick={onNote} icon={<MessageSquare size={14} />}>
              Not
            </Button>
          )}
          {onDelete && (
            <Button
              size="sm"
              variant="ghost"
              onClick={onDelete}
              icon={<Trash2 size={14} />}
              className="text-red-400 hover:text-red-300"
            />
          )}
        </div>
      </div>
    </motion.div>
  );
}
