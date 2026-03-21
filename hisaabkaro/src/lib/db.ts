import Dexie, { type Table } from 'dexie'

export interface Customer {
  id?: number
  name: string
  phone?: string
  totalUdhar: number
  createdAt: Date
  updatedAt: Date
}

export interface Item {
  id?: number
  name: string
  lastPrice: number
  usageCount: number
}

export interface BillItem {
  name: string
  qty: number
  price: number
  total: number
}

export interface Bill {
  id?: number
  customerId?: number
  customerName: string
  customerPhone?: string
  items: BillItem[]
  subtotal: number
  discount: number
  grandTotal: number
  status: 'paid' | 'udhar' | 'partial'
  amountPaid: number
  amountPending: number
  createdAt: Date
}

export interface Payment {
  id?: number
  billId: number
  customerId: number
  amount: number
  createdAt: Date
}

export interface Settings {
  id?: number
  shopName: string
  ownerName: string
  phone: string
  language: 'en' | 'hi'
}

class HisaabKaroDB extends Dexie {
  customers!: Table<Customer>
  items!: Table<Item>
  bills!: Table<Bill>
  payments!: Table<Payment>
  settings!: Table<Settings>

  constructor() {
    super('HisaabKaroDB')
    this.version(1).stores({
      customers: '++id, name, phone, totalUdhar, createdAt',
      items: '++id, name, usageCount',
      bills: '++id, customerId, customerName, status, createdAt',
      payments: '++id, billId, customerId, createdAt',
      settings: '++id'
    })
  }
}

export const db = new HisaabKaroDB()

export async function initializeSettings(): Promise<Settings> {
  const existing = await db.settings.toArray()
  if (existing.length > 0) {
    return existing[0]
  }
  
  const defaultSettings: Settings = {
    shopName: 'My Shop',
    ownerName: '',
    phone: '',
    language: 'en'
  }
  
  const id = await db.settings.add(defaultSettings)
  return { ...defaultSettings, id }
}

export async function updateSettings(updates: Partial<Settings>): Promise<void> {
  const settings = await db.settings.toArray()
  if (settings.length > 0) {
    await db.settings.update(settings[0].id!, updates)
  }
}

export async function getOrCreateCustomer(name: string, phone?: string): Promise<Customer> {
  let customer = await db.customers.where('name').equals(name).first()
  
  if (!customer) {
    const id = await db.customers.add({
      name,
      phone,
      totalUdhar: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    })
    customer = { id, name, phone, totalUdhar: 0, createdAt: new Date(), updatedAt: new Date() }
  } else if (phone && !customer.phone) {
    await db.customers.update(customer.id!, { phone, updatedAt: new Date() })
    customer.phone = phone
  }
  
  return customer
}

export async function addBill(bill: Omit<Bill, 'id'>): Promise<number> {
  const id = await db.bills.add(bill as Bill)
  
  if (bill.customerId && (bill.status === 'udhar' || bill.status === 'partial')) {
    const customer = await db.customers.get(bill.customerId)
    if (customer) {
      await db.customers.update(customer.id!, {
        totalUdhar: customer.totalUdhar + bill.amountPending,
        updatedAt: new Date()
      })
    }
  }
  
  return id
}

export async function collectPayment(
  billId: number,
  customerId: number,
  amount: number
): Promise<void> {
  const bill = await db.bills.get(billId)
  if (!bill) return
  
  await db.payments.add({
    billId,
    customerId,
    amount,
    createdAt: new Date()
  })
  
  const newAmountPaid = bill.amountPaid + amount
  const newAmountPending = bill.grandTotal - newAmountPaid
  
  let status: Bill['status'] = bill.status
  if (newAmountPending <= 0) {
    status = 'paid'
  } else if (newAmountPaid > 0) {
    status = 'partial'
  }
  
  await db.bills.update(billId, {
    amountPaid: newAmountPaid,
    amountPending: newAmountPending,
    status
  })
  
  const customer = await db.customers.get(customerId)
  if (customer) {
    const newTotalUdhar = Math.max(0, customer.totalUdhar - amount)
    await db.customers.update(customerId, {
      totalUdhar: newTotalUdhar,
      updatedAt: new Date()
    })
  }
}

export async function addOrUpdateItem(name: string, price: number): Promise<void> {
  const existing = await db.items.where('name').equals(name).first()
  
  if (existing) {
    await db.items.update(existing.id!, {
      lastPrice: price,
      usageCount: existing.usageCount + 1
    })
  } else {
    await db.items.add({
      name,
      lastPrice: price,
      usageCount: 1
    })
  }
}

export async function getCustomersWithUdhar(): Promise<Customer[]> {
  return db.customers.where('totalUdhar').above(0).toArray()
}

export async function getCustomerBills(customerId: number): Promise<Bill[]> {
  return db.bills.where('customerId').equals(customerId).reverse().sortBy('createdAt')
}

export async function getTodayStats(): Promise<{
  totalSale: number
  totalCollection: number
  newUdhar: number
  billsCount: number
}> {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)
  
  const todayBills = await db.bills
    .where('createdAt')
    .between(today, tomorrow)
    .toArray()
  
  const todayPayments = await db.payments
    .where('createdAt')
    .between(today, tomorrow)
    .toArray()
  
  let totalSale = 0
  let newUdhar = 0
  
  todayBills.forEach(bill => {
    totalSale += bill.grandTotal
    if (bill.status === 'udhar' || bill.status === 'partial') {
      newUdhar += bill.amountPending
    }
  })
  
  const totalCollection = todayPayments.reduce((sum, p) => sum + p.amount, 0)
  
  return {
    totalSale,
    totalCollection,
    newUdhar,
    billsCount: todayBills.length
  }
}

function getLast7Days(): { date: Date; label: string }[] {
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

export async function getWeeklySales(): Promise<{ date: Date; total: number }[]> {
  const days = getLast7Days()
  const result: { date: Date; total: number }[] = []
  
  for (const day of days) {
    const start = new Date(day.date)
    start.setHours(0, 0, 0, 0)
    
    const end = new Date(day.date)
    end.setHours(23, 59, 59, 999)
    
    const bills = await db.bills
      .where('createdAt')
      .between(start, end)
      .toArray()
    
    const total = bills.reduce((sum, bill) => sum + bill.grandTotal, 0)
    result.push({ date: day.date, total })
  }
  
  return result
}

export async function getRecentTransactions(limit: number = 5): Promise<
  { type: 'bill' | 'payment'; amount: number; name: string; createdAt: Date }[]
> {
  const bills = await db.bills.orderBy('createdAt').reverse().limit(limit).toArray()
  const payments = await db.payments.orderBy('createdAt').reverse().limit(limit).toArray()
  
  const transactions: { type: 'bill' | 'payment'; amount: number; name: string; createdAt: Date }[] = []
  
  bills.forEach(bill => {
    transactions.push({
      type: 'bill',
      amount: bill.grandTotal,
      name: bill.customerName || 'Unknown',
      createdAt: bill.createdAt
    })
  })
  
  payments.forEach(payment => {
    transactions.push({
      type: 'payment',
      amount: payment.amount,
      name: 'Payment Received',
      createdAt: payment.createdAt
    })
  })
  
  return transactions
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .slice(0, limit)
}

export async function exportDataAsCSV(): Promise<string> {
  const bills = await db.bills.toArray()
  const customers = await db.customers.toArray()
  const payments = await db.payments.toArray()
  
  let csv = '=== BILLS ===\n'
  csv += 'ID,Customer,Items,Subtotal,Discount,Total,Status,Paid,Pending,Date\n'
  
  bills.forEach(bill => {
    const items = bill.items.map(i => `${i.name} x${i.qty}`).join('; ')
    csv += `${bill.id},"${bill.customerName}","${items}",${bill.subtotal},${bill.discount},${bill.grandTotal},${bill.status},${bill.amountPaid},${bill.amountPending},${bill.createdAt.toISOString()}\n`
  })
  
  csv += '\n=== CUSTOMERS ===\n'
  csv += 'ID,Name,Phone,Total Udhar,Created At\n'
  
  customers.forEach(customer => {
    csv += `${customer.id},"${customer.name}","${customer.phone || ''}",${customer.totalUdhar},${customer.createdAt.toISOString()}\n`
  })
  
  csv += '\n=== PAYMENTS ===\n'
  csv += 'ID,Bill ID,Customer ID,Amount,Date\n'
  
  payments.forEach(payment => {
    csv += `${payment.id},${payment.billId},${payment.customerId},${payment.amount},${payment.createdAt.toISOString()}\n`
  })
  
  return csv
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
