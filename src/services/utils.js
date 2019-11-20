import { format, parseISO } from 'date-fns';

export const getReadableDateTime = (dateTime) => {
  return format(parseISO(dateTime), 'yyyy-MM-dd HH:mm');
}