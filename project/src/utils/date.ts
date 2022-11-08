import { MONTHS } from './../const';

export function formatDate(date: string): string {
  const d = new Date(date);
  const month = MONTHS[d.getMonth()];
  const output = month.concat(' ', String(d.getFullYear()));
  return output;
}
