import { useState, useEffect, useCallback } from 'react'
import { Search, Bell, DollarSign, Send, ChevronRight } from 'lucide-react'
import { Card, CardContent } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../components/ui/dialog'
import { formatCurrency, formatDate, generateUdharReminderText, getCustomerBills, collectPayment, type Customer, type Bill } from '../lib/db'
import { cn } from '../lib/utils'

interface UdharPageProps {
  shopName: string
  translations: Record<string, string>
}

export function UdharPage({ shopName, translations }: UdharPageProps) {
  const [customers, setCustomers] = useState<Customer[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState<'amount' | 'date'>('amount')
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null)
  const [customerBills, setCustomerBills] = useState<Bill[]>([])
  const [showHistory, setShowHistory] = useState(false)
  const [showCollectModal, setShowCollectModal] = useState(false)
  const [collectAmount, setCollectAmount] = useState(0)

  const loadCustomers = useCallback(async () => {
    const allCustomers = await Promise.all([
      import('@/lib/db').then(m => m.getCustomersWithUdhar())
    ])
    let data = allCustomers[0]
    
    if (searchQuery) {
      data = data.filter(c => 
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.phone?.includes(searchQuery)
      )
    }
    
    if (sortBy === 'amount') {
      data = data.sort((a, b) => b.totalUdhar - a.totalUdhar)
    } else {
      data = data.sort((a, b) => a.updatedAt.getTime() - b.updatedAt.getTime())
    }
    
    setCustomers(data)
  }, [searchQuery, sortBy])

  useEffect(() => {
    loadCustomers()
  }, [loadCustomers])

  const totalPending = customers.reduce((sum, c) => sum + c.totalUdhar, 0)

  const handleRemind = (customer: Customer) => {
    const text = generateUdharReminderText(
      customer.name,
      customer.totalUdhar,
      shopName,
      customer.updatedAt
    )
    const url = customer.phone
      ? `https://wa.me/${customer.phone}?text=${text}`
      : `https://wa.me/?text=${text}`
    window.open(url, '_blank')
  }

  const handleViewHistory = async (customer: Customer) => {
    setSelectedCustomer(customer)
    const bills = await getCustomerBills(customer.id!)
    setCustomerBills(bills)
    setShowHistory(true)
  }

  const handleCollect = (customer: Customer) => {
    setSelectedCustomer(customer)
    setCollectAmount(customer.totalUdhar)
    setShowCollectModal(true)
  }

  const handleSaveCollect = async () => {
    if (!selectedCustomer || collectAmount <= 0) return

    const pendingBills = customerBills.filter(b => b.status !== 'paid')
    let remaining = collectAmount

    for (const bill of pendingBills) {
      if (remaining <= 0) break
      const payAmount = Math.min(bill.amountPending, remaining)
      if (payAmount > 0) {
        await collectPayment(bill.id!, selectedCustomer.id!, payAmount)
        remaining -= payAmount
      }
    }

    setShowCollectModal(false)
    setSelectedCustomer(null)
    setCollectAmount(0)
    loadCustomers()
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-red-600 text-white px-4 py-4">
        <h1 className="text-xl font-semibold">{translations.udhar}</h1>
      </div>

      {/* Total Pending */}
      <div className="p-4">
        <Card className="bg-red-50 border-red-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-600 text-sm">{translations.totalPending}</p>
                <p className="text-3xl font-bold text-red-700">{formatCurrency(totalPending)}</p>
              </div>
              <DollarSign className="w-12 h-12 text-red-300" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search & Sort */}
      <div className="px-4 pb-4">
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              placeholder={translations.search}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12"
            />
          </div>
          <Button
            variant={sortBy === 'amount' ? 'default' : 'outline'}
            onClick={() => setSortBy('amount')}
            className="h-12"
          >
            ₹
          </Button>
          <Button
            variant={sortBy === 'date' ? 'default' : 'outline'}
            onClick={() => setSortBy('date')}
            className="h-12"
          >
            📅
          </Button>
        </div>
      </div>

      {/* Customer List */}
      <div className="px-4 pb-4">
        {customers.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <Bell className="w-16 h-16 text-green-400 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-800 mb-2">{translations.noUdhar}</h3>
              <p className="text-gray-500 text-sm">{translations.noUdharDesc}</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {customers.map((customer, idx) => (
              <Card 
                key={customer.id} 
                className={cn("animate-slide-up", `stagger-${Math.min(idx + 1, 5)}`)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-gray-800">{customer.name}</h3>
                      {customer.phone && (
                        <p className="text-sm text-gray-500">{customer.phone}</p>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-red-600">
                        {formatCurrency(customer.totalUdhar)}
                      </p>
                      <p className="text-xs text-gray-400">
                        {translations.lastTransaction}: {formatDate(customer.updatedAt)}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={() => handleRemind(customer)}
                      className="flex-1 bg-[#25D366] hover:bg-[#1da851]"
                    >
                      <Send className="w-4 h-4" />
                      {translations.remind}
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => handleCollect(customer)}
                      className="flex-1 bg-green-600 hover:bg-green-700"
                    >
                      <DollarSign className="w-4 h-4" />
                      {translations.collect}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleViewHistory(customer)}
                    >
                      {translations.history}
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* History Modal */}
      <Dialog open={showHistory} onOpenChange={setShowHistory}>
        <DialogContent className="max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedCustomer?.name} - {translations.history}</DialogTitle>
          </DialogHeader>
          <div className="space-y-2 py-4">
            {customerBills.map((bill) => (
              <div 
                key={bill.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div>
                  <p className="font-medium">{formatDate(bill.createdAt)}</p>
                  <p className="text-sm text-gray-500">
                    {bill.items.length} {translations.item}(s)
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">{formatCurrency(bill.grandTotal)}</p>
                  <p className={cn(
                    "text-sm",
                    bill.status === 'paid' ? 'text-green-600' : 
                    bill.status === 'partial' ? 'text-orange-600' : 'text-red-600'
                  )}>
                    {bill.status === 'paid' ? translations.paid : 
                     bill.status === 'partial' ? translations.partial : translations.pending}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Collect Payment Modal */}
      <Dialog open={showCollectModal} onOpenChange={setShowCollectModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{translations.collect} - {selectedCustomer?.name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-gray-600 text-sm">{translations.totalPending}</p>
              <p className="text-2xl font-bold text-red-600">
                {formatCurrency(selectedCustomer?.totalUdhar || 0)}
              </p>
            </div>
            
            <div>
              <Label>{translations.amountToCollect}</Label>
              <Input
                type="number"
                value={collectAmount}
                onChange={(e) => setCollectAmount(parseInt(e.target.value) || 0)}
                className="h-12 text-lg"
              />
            </div>
            
            {collectAmount < (selectedCustomer?.totalUdhar || 0) && (
              <div className="text-center p-3 bg-orange-50 rounded-lg">
                <p className="text-orange-600 text-sm">
                  {translations.remaining}: {formatCurrency((selectedCustomer?.totalUdhar || 0) - collectAmount)}
                </p>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCollectModal(false)}>
              {translations.cancel}
            </Button>
            <Button className="bg-green-600 hover:bg-green-700" onClick={handleSaveCollect}>
              {translations.save}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
