import { useState, useEffect } from 'react'
import { Trash2, Plus, Minus, Check, Send, Receipt } from 'lucide-react'
import { Card, CardContent } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { db, formatCurrency, generateBillText, addOrUpdateItem, getOrCreateCustomer, addBill, type BillItem } from '../lib/db'

interface BillItemInput {
  id: string
  name: string
  qty: number
  price: number
  total: number
}

interface NewBillPageProps {
  shopName: string
  translations: Record<string, string>
}

export function NewBillPage({ shopName, translations }: NewBillPageProps) {
  const [customerName, setCustomerName] = useState('')
  const [customerPhone, setCustomerPhone] = useState('')
  const [items, setItems] = useState<BillItemInput[]>([
    { id: '1', name: '', qty: 1, price: 0, total: 0 }
  ])
  const [discount, setDiscount] = useState(0)
  const [showSuccess, setShowSuccess] = useState(false)
  const [savedCustomers, setSavedCustomers] = useState<{ id: number; name: string }[]>([])
  const [savedItems, setSavedItems] = useState<{ id: number; name: string; lastPrice: number }[]>([])
  const [showCustomerDropdown, setShowCustomerDropdown] = useState(false)
  const [showItemDropdowns, setShowItemDropdowns] = useState<Record<string, boolean>>({})

  useEffect(() => {
    loadSavedData()
  }, [])

  const loadSavedData = async () => {
    const customers = await db.customers.toArray()
    setSavedCustomers(customers.map(c => ({ id: c.id!, name: c.name })))
    
    const items = await db.items.orderBy('usageCount').reverse().limit(20).toArray()
    setSavedItems(items.map(i => ({ id: i.id!, name: i.name, lastPrice: i.lastPrice })))
  }

  const subtotal = items.reduce((sum, item) => sum + item.total, 0)
  const grandTotal = Math.max(0, subtotal - discount)

  const updateItem = (id: string, field: keyof BillItemInput, value: string | number) => {
    setItems(prev => prev.map(item => {
      if (item.id !== id) return item
      
      const updated = { ...item, [field]: value }
      if (field === 'qty' || field === 'price') {
        updated.total = updated.qty * updated.price
      }
      return updated
    }))
  }

  const addNewItem = () => {
    setItems(prev => [...prev, { 
      id: Date.now().toString(), 
      name: '', 
      qty: 1, 
      price: 0, 
      total: 0 
    }])
  }

  const removeItem = (id: string) => {
    if (items.length > 1) {
      setItems(prev => prev.filter(item => item.id !== id))
    }
  }

  const handleSave = async (status: 'paid' | 'udhar') => {
    const validItems = items.filter(i => i.name.trim() && i.qty > 0)
    if (validItems.length === 0) return

    let customerId: number | undefined
    
    if (customerName.trim()) {
      const customer = await getOrCreateCustomer(customerName.trim(), customerPhone || undefined)
      customerId = customer.id
    }

    for (const item of validItems) {
      await addOrUpdateItem(item.name.trim(), item.price)
    }

    const billItems: BillItem[] = validItems.map(i => ({
      name: i.name.trim(),
      qty: i.qty,
      price: i.price,
      total: i.total
    }))

    await addBill({
      customerId,
      customerName: customerName.trim() || 'Unknown',
      customerPhone: customerPhone || undefined,
      items: billItems,
      subtotal,
      discount,
      grandTotal,
      status,
      amountPaid: status === 'paid' ? grandTotal : 0,
      amountPending: status === 'udhar' ? grandTotal : 0,
      createdAt: new Date()
    })

    setShowSuccess(true)
    setTimeout(() => {
      setShowSuccess(false)
      resetForm()
    }, 2000)
  }

  const handleShareWhatsApp = () => {
    const validItems = items.filter(i => i.name.trim() && i.qty > 0)
    if (validItems.length === 0) return

    const billItems = validItems.map(i => ({
      name: i.name.trim(),
      qty: i.qty,
      total: i.total
    }))

    const text = generateBillText(shopName, billItems, grandTotal, new Date())
    const url = customerPhone 
      ? `https://wa.me/${customerPhone}?text=${text}`
      : `https://wa.me/?text=${text}`
    
    window.open(url, '_blank')
  }

  const resetForm = () => {
    setCustomerName('')
    setCustomerPhone('')
    setItems([{ id: '1', name: '', qty: 1, price: 0, total: 0 }])
    setDiscount(0)
  }

  const handleCustomerSelect = (name: string) => {
    setCustomerName(name)
    setShowCustomerDropdown(false)
    const customer = savedCustomers.find(c => c.name === name)
    if (customer) {
      db.customers.get(customer.id).then(c => {
        if (c?.phone) setCustomerPhone(c.phone)
      })
    }
  }

  const handleItemSelect = (itemId: string, itemName: string) => {
    const item = savedItems.find(i => i.id === Number(itemName))
    if (item) {
      updateItem(itemId, 'name', item.name)
      updateItem(itemId, 'price', item.lastPrice)
    }
    setShowItemDropdowns(prev => ({ ...prev, [itemId]: false }))
  }

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-green-50 flex items-center justify-center p-4">
        <div className="text-center animate-scale-in">
          <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-green-800">{translations.success}</h2>
          <p className="text-green-600 mt-2">{translations.billSaved}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-40">
      {/* Header */}
      <div className="bg-blue-600 text-white px-4 py-4">
        <h1 className="text-xl font-semibold">{translations.newBill}</h1>
      </div>

      <div className="p-4 space-y-4">
        {/* Customer Info */}
        <Card>
          <CardContent className="p-4 space-y-4">
            <div>
              <Label className="text-gray-600 mb-1 block">{translations.customerName}</Label>
              <div className="relative">
                <Input
                  placeholder={translations.customerName}
                  value={customerName}
                  onChange={(e) => {
                    setCustomerName(e.target.value)
                    setShowCustomerDropdown(true)
                  }}
                  onFocus={() => setShowCustomerDropdown(true)}
                  onBlur={() => setTimeout(() => setShowCustomerDropdown(false), 200)}
                  className="h-12"
                />
                {showCustomerDropdown && savedCustomers.length > 0 && customerName && (
                  <div className="absolute z-10 w-full bg-white border rounded-lg shadow-lg max-h-40 overflow-auto">
                    {savedCustomers
                      .filter(c => c.name.toLowerCase().includes(customerName.toLowerCase()))
                      .map(c => (
                        <button
                          key={c.id}
                          className="w-full text-left px-4 py-2 hover:bg-gray-50"
                          onClick={() => handleCustomerSelect(c.name)}
                        >
                          {c.name}
                        </button>
                      ))}
                  </div>
                )}
              </div>
            </div>
            
            <div>
              <Label className="text-gray-600 mb-1 block">{translations.customerPhone}</Label>
              <Input
                placeholder={translations.customerPhone}
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                className="h-12"
              />
            </div>
          </CardContent>
        </Card>

        {/* Items */}
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold text-gray-800 mb-4">{translations.addItem}</h3>
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="animate-fade-in">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex-1 relative">
                      <Input
                        placeholder={translations.itemName}
                        value={item.name}
                        onChange={(e) => {
                          updateItem(item.id, 'name', e.target.value)
                          setShowItemDropdowns(prev => ({ ...prev, [item.id]: true }))
                        }}
                        onFocus={() => setShowItemDropdowns(prev => ({ ...prev, [item.id]: true }))}
                        onBlur={() => setTimeout(() => setShowItemDropdowns(prev => ({ ...prev, [item.id]: false })), 200)}
                        className="h-11"
                      />
                      {showItemDropdowns[item.id] && savedItems.length > 0 && item.name && (
                        <div className="absolute z-10 w-full bg-white border rounded-lg shadow-lg max-h-32 overflow-auto mt-1">
                          {savedItems
                            .filter(i => i.name.toLowerCase().includes(item.name.toLowerCase()))
                            .slice(0, 5)
                            .map(i => (
                              <button
                                key={i.id}
                                className="w-full text-left px-4 py-2 hover:bg-gray-50 flex justify-between"
                                onClick={() => handleItemSelect(item.id, i.id.toString())}
                              >
                                <span>{i.name}</span>
                                <span className="text-gray-400">₹{i.lastPrice}</span>
                              </button>
                            ))}
                        </div>
                      )}
                    </div>
                    {items.length > 1 && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeItem(item.id)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="w-5 h-5" />
                      </Button>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => updateItem(item.id, 'qty', Math.max(1, item.qty - 1))}
                        className="h-9 w-9"
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      <Input
                        type="number"
                        value={item.qty}
                        onChange={(e) => updateItem(item.id, 'qty', parseInt(e.target.value) || 1)}
                        className="w-16 h-9 text-center"
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => updateItem(item.id, 'qty', item.qty + 1)}
                        className="h-9 w-9"
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                    
                    <div className="flex-1">
                      <Input
                        type="number"
                        placeholder={translations.pricePerUnit}
                        value={item.price || ''}
                        onChange={(e) => updateItem(item.id, 'price', parseInt(e.target.value) || 0)}
                        className="h-9"
                      />
                    </div>
                    
                    <div className="w-20 text-right">
                      <span className="font-semibold text-gray-700">
                        ₹{item.total}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <Button
              variant="outline"
              onClick={addNewItem}
              className="w-full mt-4"
            >
              <Plus className="w-4 h-4" />
              {translations.addItem}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Bill Summary - Sticky Footer */}
      <div className="fixed bottom-16 left-0 right-0 bg-white border-t border-gray-200 shadow-lg p-4">
        <div className="max-w-lg mx-auto space-y-3">
          <div className="flex justify-between text-gray-600">
            <span>{translations.subtotal}</span>
            <span className="font-medium">{formatCurrency(subtotal)}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-gray-600">{translations.discount}</span>
            <Input
              type="number"
              value={discount || ''}
              onChange={(e) => setDiscount(parseInt(e.target.value) || 0)}
              className="h-9 flex-1"
              placeholder="0"
            />
          </div>
          
          <div className="flex justify-between text-xl font-bold text-gray-800 pt-2 border-t">
            <span>{translations.grandTotal}</span>
            <span className="text-blue-600">{formatCurrency(grandTotal)}</span>
          </div>
          
          <div className="flex gap-2 pt-2">
            <Button
              size="lg"
              onClick={() => handleSave('paid')}
              className="flex-1 bg-green-600 hover:bg-green-700"
            >
              <Check className="w-5 h-5" />
              {translations.cashReceived}
            </Button>
            <Button
              size="lg"
              onClick={() => handleSave('udhar')}
              className="flex-1 bg-orange-500 hover:bg-orange-600"
            >
              <Receipt className="w-5 h-5" />
              {translations.udharBtn}
            </Button>
            <Button
              size="lg"
              onClick={handleShareWhatsApp}
              className="flex-1 bg-[#25D366] hover:bg-[#1da851]"
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
