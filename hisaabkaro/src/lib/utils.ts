import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return new Intl.DateTimeFormat('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(d)
}

export function formatTime(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return new Intl.DateTimeFormat('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(d)
}

export function formatDateTime(date: Date | string): string {
  return `${formatDate(date)}, ${formatTime(date)}`
}

export function isToday(date: Date | string): boolean {
  const d = typeof date === 'string' ? new Date(date) : date
  const today = new Date()
  return (
    d.getDate() === today.getDate() &&
    d.getMonth() === today.getMonth() &&
    d.getFullYear() === today.getFullYear()
  )
}

export function getStartOfDay(date: Date = new Date()): Date {
  const start = new Date(date)
  start.setHours(0, 0, 0, 0)
  return start
}

export function getEndOfDay(date: Date = new Date()): Date {
  const end = new Date(date)
  end.setHours(23, 59, 59, 999)
  return end
}

export function getStartOfWeek(date: Date = new Date()): Date {
  const d = new Date(date)
  const day = d.getDay()
  const diff = d.getDate() - day
  d.setDate(diff)
  d.setHours(0, 0, 0, 0)
  return d
}

export function getLast7Days(): { date: Date; label: string }[] {
  const days = []
  for (let i = 6; i >= 0; i--) {
    const d = new Date()
    d.setDate(d.getDate() - i)
    days.push({
      date: d,
      label: d.toLocaleDateString('en-IN', { weekday: 'short' })
    })
  }
  return days
}

export function generateBillText(
  shopName: string,
  items: { name: string; qty: number; total: number }[],
  total: number,
  date: Date
): string {
  const dateStr = formatDate(date)
  let text = `📋 *${shopName} - Bill*\n`
  text += `Date: ${dateStr}\n`
  text += `─────────────────────\n`
  
  items.forEach(item => {
    text += `${item.name} x${item.qty} = ₹${item.total}\n`
  })
  
  text += `─────────────────────\n`
  text += `*Total: ₹${total}*\n\n`
  text += `Thank you! 🙏`
  
  return encodeURIComponent(text)
}

export function generateUdharReminderText(
  customerName: string,
  amount: number,
  shopName: string,
  lastBillDate: Date
): string {
  const text = `🙏 ${customerName} ji,\n\n`
    + `Aapka ₹${amount} baaki hai ${shopName} pe.\n`
    + `Last bill: ${formatDate(lastBillDate)}\n\n`
    + `Dhanyavaad 🙏`
  
  return encodeURIComponent(text)
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength - 3) + '...'
}
