import { useState, useEffect, useRef } from 'react'
import { Trash2, Plus, Minus, Check, Send, Receipt, ScanBarcode } from 'lucide-react'
import { Card, CardContent } from '../components/card'
import { Button } from '../components/button'
import { Input } from '../components/input'
import { Label } from '../components/label'
import { db, formatCurrency, generateBillText, addOrUpdateItem, getOrCreateCustomer, addBill, getItemByBarcode, type BillItem } from '../lib/db'

interface BillItemInput {
  id: string
  name: string
  barcode: string
  hsnCode: string
  gstRate: number
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
    { id: '1', name: '', barcode: '', hsnCode: '', gstRate: 0, qty: 1, price: 0, total: 0 }
  ])
  const [discount, setDiscount] = useState(0)
  const [cgst, setCgst] = useState(9)
  const [sgst, setSgst] = useState(9)
  const [igst, setIgst] = useState(0)
  const [gstRate, setGstRate] = useState(18)
  const [showSuccess, setShowSuccess] = useState(false)
  const [savedCustomers, setSavedCustomers] = useState<{ id: number; name: string; phone?: string }[]>([])
  const [savedItems, setSavedItems] = useState<{ id: number; name: string; barcode?: string; hsnCode?: string; gstRate: number; lastPrice: number }[]>([])
  const [showCustomerDropdown, setShowCustomerDropdown] = useState(false)
  const [showItemDropdowns, setShowItemDropdowns] = useState<Record<string, boolean>>({})
  const [scanningForItem, setScanningForItem] = useState<string | null>(null)
  const barcodeInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    loadSavedData()
  }, [])

  const loadSavedData = async () => {
    const customers = await db.customers.toArray()
    setSavedCustomers(customers.map(c => ({ id: c.id!, name: c.name, phone: c.phone })))
    
    const items = await db.items.orderBy('usageCount').reverse().limit(20).toArray()
    setSavedItems(items.map(i => ({ id: i.id!, name: i.name, barcode: i.barcode, hsnCode: i.hsnCode, gstRate: i.gstRate, lastPrice: i.lastPrice })))
  }

  const subtotal = items.reduce((sum, item) => sum + item.total, 0)
  const taxableAmount = Math.max(0, subtotal - discount)
  const cgstAmount = (taxableAmount * cgst) / 100
  const sgstAmount = (taxableAmount * sgst) / 100
  const igstAmount = (taxableAmount * igst) / 100
  const grandTotal = taxableAmount + cgstAmount + sgstAmount + igstAmount

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
      barcode: '',
      hsnCode: '',
      gstRate: 0,
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

  const handleBarcodeScan = async (itemId: string, barcode: string) => {
    updateItem(itemId, 'barcode', barcode)
    if (barcode.length > 3) {
      const item = await getItemByBarcode(barcode)
      if (item) {
        updateItem(itemId, 'name', item.name)
        updateItem(itemId, 'price', item.lastPrice)
        updateItem(itemId, 'hsnCode', item.hsnCode || '')
        updateItem(itemId, 'gstRate', item.gstRate || 0)
      }
    }
  }

  const startBarcodeScan = (itemId: string) => {
    setScanningForItem(itemId)
    setTimeout(() => barcodeInputRef.current?.focus(), 100)
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
      await addOrUpdateItem(item.name.trim(), item.price, item.barcode, item.hsnCode, item.gstRate)
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
      cgst: cgstAmount,
      sgst: sgstAmount,
      igst: igstAmount,
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

    let text = `📋 *${shopName} - Bill*\n`
    text += `Date: ${new Date().toLocaleDateString('en-IN')}\n`
    text += `─────────────────────\n`
    
    billItems.forEach(item => {
      text += `${item.name} x${item.qty} = ₹${item.total}\n`
    })
    
    text += `─────────────────────\n`
    text += `Subtotal: ₹${subtotal}\n`
    if (discount > 0) text += `Discount: -₹${discount}\n`
    if (cgstAmount > 0) text += `CGST: ₹${cgstAmount.toFixed(2)}\n`
    if (sgstAmount > 0) text += `SGST: ₹${sgstAmount.toFixed(2)}\n`
    if (igstAmount > 0) text += `IGST: ₹${igstAmount.toFixed(2)}\n`
    text += `─────────────────────\n`
    text += `*Total: ₹${grandTotal.toFixed(2)}*\n\n`
    text += `Thank you! 🙏`
    
    const url = customerPhone 
      ? `https://wa.me/${customerPhone}?text=${encodeURIComponent(text)}`
      : `https://wa.me/?text=${encodeURIComponent(text)}`
    
    window.open(url, '_blank')
  }

  const resetForm = () => {
    setCustomerName('')
    setCustomerPhone('')
    setItems([{ id: '1', name: '', barcode: '', hsnCode: '', gstRate: 0, qty: 1, price: 0, total: 0 }])
    setDiscount(0)
    setCgst(0)
    setSgst(0)
    setIgst(0)
  }

  const handleCustomerSelect = (name: string) => {
    setCustomerName(name)
    setShowCustomerDropdown(false)
    const customer = savedCustomers.find(c => c.name === name)
    if (customer?.phone) {
      setCustomerPhone(customer.phone)
    }
  }

  const handleItemSelect = (itemId: string, itemName: string) => {
    const item = savedItems.find(i => i.id === Number(itemName))
    if (item) {
      updateItem(itemId, 'name', item.name)
      updateItem(itemId, 'price', item.lastPrice)
      updateItem(itemId, 'barcode', item.barcode || '')
      updateItem(itemId, 'hsnCode', item.hsnCode || '')
      updateItem(itemId, 'gstRate', item.gstRate || 0)
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
    <div className="min-h-screen bg-gray-50 pb-48">
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
                  onBlur={() => { setTimeout(() => setShowCustomerDropdown(false), 200) }}
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
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => startBarcodeScan(item.id)}
                      className="h-11 w-11"
                      title="Scan Barcode"
                    >
                      <ScanBarcode className="w-5 h-5" />
                    </Button>
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
                  
                  {scanningForItem === item.id && (
                    <Input
                      ref={barcodeInputRef}
                      placeholder="Scan or enter barcode..."
                      onBlur={() => setScanningForItem(null)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          handleBarcodeScan(item.id, (e.target as HTMLInputElement).value)
                          setScanningForItem(null)
                        }
                      }}
                      className="mb-2 h-10"
                      autoFocus
                    />
                  )}
                  
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
            <span className="font-medium">₹{subtotal.toFixed(2)}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-gray-600 w-20">{translations.discount}</span>
            <Input
              type="number"
              value={discount || ''}
              onChange={(e) => setDiscount(parseInt(e.target.value) || 0)}
              className="h-9 flex-1"
              placeholder="0"
            />
          </div>

          <div className="flex items-center gap-2">
            <span className="text-gray-600 w-20">GST %</span>
            <Input
              type="number"
              value={gstRate || ''}
              onChange={(e) => {
                const rate = parseInt(e.target.value) || 0
                setGstRate(rate)
                setCgst(rate / 2)
                setSgst(rate / 2)
                setIgst(rate)
              }}
              className="h-9 flex-1"
              placeholder="18"
            />
          </div>

          {(cgstAmount > 0 || sgstAmount > 0) && (
            <div className="flex justify-between text-sm text-gray-600">
              <span>CGST @ {cgst}%</span>
              <span>₹{cgstAmount.toFixed(2)}</span>
            </div>
          )}
          {(cgstAmount > 0 || sgstAmount > 0) && (
            <div className="flex justify-between text-sm text-gray-600">
              <span>SGST @ {sgst}%</span>
              <span>₹{sgstAmount.toFixed(2)}</span>
            </div>
          )}
          {igstAmount > 0 && (
            <div className="flex justify-between text-sm text-gray-600">
              <span>IGST @ {igst}%</span>
              <span>₹{igstAmount.toFixed(2)}</span>
            </div>
          )}
          
          <div className="flex justify-between text-xl font-bold text-gray-800 pt-2 border-t">
            <span>{translations.grandTotal}</span>
            <span className="text-blue-600">₹{grandTotal.toFixed(2)}</span>
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
