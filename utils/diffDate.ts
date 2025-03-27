export default function diffDate(
  date1: string | null,
  date2: string | null
): number {
  if (!date1 || !date2) {
    return 0;
  }
  const date1Turn = new Date(date1).getTime();
  const date2Turn = new Date(date2).getTime();

  const diffTime = Math.abs(date1Turn - date2Turn);
  const diffDays = diffTime / (1000 * 60 * 60 * 24);

  return diffDays;
}
