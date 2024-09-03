import { format, parseISO } from 'date-fns';
import { ru } from 'date-fns/locale';

export function formatDate(date: string): string {
  const parsedDate = parseISO(date);
  return format(parsedDate, 'd MMMM yyyy', { locale: ru });
}