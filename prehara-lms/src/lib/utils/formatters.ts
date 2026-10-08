/**
 * Money stored as integer paise.
 * Converts integer paise to formatted INR string (e.g. 50000000 paise -> ₹5,00,000.00)
 */
export function formatPaiseToRupees(paise: bigint | number): string {
  const paiseNum = typeof paise === 'bigint' ? Number(paise) : paise;
  const rupees = paiseNum / 100;
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
  }).format(rupees);
}

/**
 * Timestamps stored UTC and displayed as IST (Indian Standard Time, UTC+05:30)
 */
export function formatUtcToIst(utcDate: Date | string | null | undefined): string {
  if (!utcDate) return 'N/A';
  const dateObj = typeof utcDate === 'string' ? new Date(utcDate) : utcDate;
  
  return new Intl.DateTimeFormat('en-IN', {
    timeZone: 'Asia/Kolkata',
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  }).format(dateObj) + ' IST';
}
