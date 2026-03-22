'use client'

import { useState, useEffect, useRef } from 'react'
import { Trash2, Plus, Minus, Check, Send, Receipt, ScanBarcode, X, Camera } from 'lucide-react'
import { Card, CardContent } from '../components/card'
import { Button } from '../components/button'
import { db, addOrUpdateItem, getOrCreateCustomer, addBill, getItemByBarcode, type BillItem } from '../lib/db'

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

function BarcodeScanner({ onScan, onClose }: { onScan: (barcode: string) => void; onClose: () => void }) {
  const [debug, setDebug] = useState('Initializing...')
  const scannerContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let mounted = true

    const initScanner = async () => {
      await new Promise(resolve => setTimeout(resolve, 100))
      
      if (!scannerContainerRef.current || !mounted) {
        setDebug('Container not ready, retrying...')
        await new Promise(resolve => setTimeout(resolve, 200))
      }

      if (!mounted) return

      try {
        setDebug('Loading library...')
        const { Html5QrcodeScanner } = await import('html5-qrcode')
        
        setDebug('Creating scanner...')
        const scanner = new Html5QrcodeScanner(
          'barcode-reader',
          { fps: 10, qrbox: { width: 250, height: 150 } },
          false
        )

        setDebug('Rendering...')
        scanner.render(
          (decodedText: string) => {
            onScan(decodedText)
            onClose()
          },
          () => {}
        )

        setDebug('Ready! Point camera at barcode')
      } catch (err: any) {
        setDebug('Error: ' + err.message)
      }
    }

    initScanner()

    return () => {
      mounted = false
    }
  }, [onScan, onClose])

  return (
    <div className="fixed inset-0 z-[9999] bg-black flex flex-col">
      <div className="p-4 flex justify-between items-center text-white bg-gray-900">
        <span className="font-semibold">Scan Barcode</span>
        <button onClick={onClose} className="p-2 hover:bg-gray-700 rounded-full">
          <X className="w-6 h-6" />
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center bg-gray-900 p-4">
        <div id="barcode-reader" ref={scannerContainerRef} className="w-full max-w-md"></div>
        <p className="text-gray-400 text-sm mt-4">{debug}</p>
      </div>

      <div className="p-4 text-center text-white text-sm bg-gray-900">
        Point camera at barcode
      </div>
    </div>
  )
}

export default function NewBillPage({ shopName, translations }: { shopName: string; translations: Record<string, string> }) {
  const [customerName, setCustomerName] = useState('')
  const [customerPhone, setCustomerPhone] = useState('')
  const [items, setItems] = useState<BillItemInput[]>([
    { id: '1', name: '', barcode: '', hsnCode: '', gstRate: 0, qty: 1, price: 0, total: 0 }
  ])
  const [discount, setDiscount] = useState(0)
  const [gstRate, setGstRate] = useState(18)
  const [showSuccess, setShowSuccess] = useState(false)
  const [savedCustomers, setSavedCustomers] = useState<{ id: number; name: string; phone?: string }[]>([])
  const [savedItems, setSavedItems] = useState<{ id: number; name: string; barcode?: string; hsnCode?: string; gstRate: number; lastPrice: number }[]>([])
  const [showCustomerDropdown, setShowCustomerDropdown] = useState(false)
  const [showAddItem, setShowAddItem] = useState(false)
  const [newItemName, setNewItemName] = useState('')
  const [newItemPrice, setNewItemPrice] = useState(0)
  const [newItemBarcode, setNewItemBarcode] = useState('')
  const [showScanner, setShowScanner] = useState(false)

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
  const gstAmount = (taxableAmount * gstRate) / 100
  const grandTotal = taxableAmount + gstAmount

  const addItemToBill = (item: BillItemInput) => {
    setItems(prev => [...prev, item])
  }

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

  const handleBarcodeScan = async (barcode: string) => {
    setShowScanner(false)
    if (barcode.length > 3) {
      const item = await getItemByBarcode(barcode)
      if (item) {
        addItemToBill({
          id: Date.now().toString(),
          name: item.name,
          barcode: item.barcode || barcode,
          hsnCode: item.hsnCode || '',
          gstRate: item.gstRate || 0,
          qty: 1,
          price: item.lastPrice,
          total: item.lastPrice
        })
      } else {
        // New item - add with barcode
        addItemToBill({
          id: Date.now().toString(),
          name: '',
          barcode: barcode,
          hsnCode: '',
          gstRate: 0,
          qty: 1,
          price: 0,
          total: 0
        })
      }
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
      cgst: gstAmount / 2,
      sgst: gstAmount / 2,
      igst: 0,
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

    let text = `📋 *${shopName} - Bill*\n`
    text += `Date: ${new Date().toLocaleDateString('en-IN')}\n`
    text += `─────────────────────\n`
    
    validItems.forEach(item => {
      text += `${item.name} x${item.qty} = ₹${item.total}\n`
    })
    
    text += `─────────────────────\n`
    text += `Subtotal: ₹${subtotal}\n`
    if (discount > 0) text += `Discount: -₹${discount}\n`
    if (gstAmount > 0) text += `GST (${gstRate}%): ₹${gstAmount.toFixed(2)}\n`
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
  }

  const handleCustomerSelect = (name: string) => {
    setCustomerName(name)
    setShowCustomerDropdown(false)
    const customer = savedCustomers.find(c => c.name === name)
    if (customer?.phone) setCustomerPhone(customer.phone)
  }

  const handleQuickAdd = (item: typeof savedItems[0]) => {
    addItemToBill({
      id: Date.now().toString(),
      name: item.name,
      barcode: item.barcode || '',
      hsnCode: item.hsnCode || '',
      gstRate: item.gstRate || 0,
      qty: 1,
      price: item.lastPrice,
      total: item.lastPrice
    })
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
    <>
      {showScanner && <BarcodeScanner onScan={handleBarcodeScan} onClose={() => setShowScanner(false)} />}
      
      <div className="min-h-screen bg-gray-50 pb-56">
        {/* Header */}
        <div className="bg-blue-600 text-white px-4 py-3 sticky top-0 z-40">
          <h1 className="text-lg font-semibold">{translations.newBill}</h1>
        </div>

        <div className="p-3 space-y-3">
          {/* Customer Info */}
          <Card>
            <CardContent className="p-3 space-y-2">
              <input
                type="text"
                placeholder={translations.customerName}
                value={customerName}
                onChange={(e) => { setCustomerName(e.target.value); setShowCustomerDropdown(true) }}
                onFocus={() => setShowCustomerDropdown(true)}
                onBlur={() => setTimeout(() => setShowCustomerDropdown(false), 200)}
                className="w-full h-10 px-3 border border-gray-300 rounded-lg text-base"
              />
              {showCustomerDropdown && savedCustomers.length > 0 && customerName && (
                <div className="absolute z-50 w-[90%] bg-white border rounded-lg shadow-lg max-h-32 overflow-auto">
                  {savedCustomers.filter(c => c.name.toLowerCase().includes(customerName.toLowerCase())).map(c => (
                    <button key={c.id} className="w-full text-left px-3 py-2 hover:bg-gray-50 text-sm" onClick={() => handleCustomerSelect(c.name)}>
                      {c.name}
                    </button>
                  ))}
                </div>
              )}
              <input
                type="tel"
                placeholder={translations.customerPhone}
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                className="w-full h-10 px-3 border border-gray-300 rounded-lg text-base"
              />
            </CardContent>
          </Card>

          {/* Scan Button */}
          <button 
            onClick={() => {
              console.log('Button clicked, setting showScanner to true')
              setShowScanner(true)
            }} 
            className="w-full h-12 bg-gray-800 hover:bg-gray-900 text-white text-base rounded-lg flex items-center justify-center gap-2"
          >
            <Camera className="w-5 h-5" />
            Scan Barcode (Camera)
          </button>

          {/* Manual Barcode Entry */}
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Enter barcode manually"
              id="manual-barcode"
              className="flex-1 h-10 px-3 border border-gray-300 rounded-lg text-base"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  const value = (e.target as HTMLInputElement).value
                  if (value) handleBarcodeScan(value)
                }
              }}
            />
            <Button 
              onClick={() => {
                const input = document.getElementById('manual-barcode') as HTMLInputElement
                if (input?.value) handleBarcodeScan(input.value)
              }}
              className="h-10 px-4 bg-blue-600"
            >
              Add
            </Button>
          </div>

          {/* Items List */}
          <div className="space-y-2">
            {items.map((item, idx) => (
              <Card key={item.id}>
                <CardContent className="p-3">
                  <div className="flex justify-between items-start mb-2">
                    <input
                      type="text"
                      placeholder="Item name"
                      value={item.name}
                      onChange={(e) => updateItem(item.id, 'name', e.target.value)}
                      className="flex-1 h-8 px-2 border border-gray-300 rounded text-sm"
                    />
                    <button onClick={() => removeItem(item.id)} className="text-red-500 p-1 ml-2">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <button onClick={() => updateItem(item.id, 'qty', Math.max(1, item.qty - 1))} className="w-8 h-8 rounded bg-gray-200 flex items-center justify-center text-lg font-bold">-</button>
                      <span className="w-8 text-center text-sm font-medium">{item.qty}</span>
                      <button onClick={() => updateItem(item.id, 'qty', item.qty + 1)} className="w-8 h-8 rounded bg-gray-200 flex items-center justify-center text-lg font-bold">+</button>
                    </div>
                    <input
                      type="number"
                      placeholder="₹"
                      value={item.price || ''}
                      onChange={(e) => updateItem(item.id, 'price', parseInt(e.target.value) || 0)}
                      className="w-20 h-8 px-2 border border-gray-300 rounded text-sm"
                    />
                    <span className="flex-1 text-right font-medium text-sm">₹{item.total}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Add Item Button */}
          <Button variant="outline" onClick={addNewItem} className="w-full h-10 text-base">
            <Plus className="w-4 h-4 mr-2" />
            {translations.addItem}
          </Button>

          {/* Quick Add from Saved */}
          {savedItems.length > 0 && (
            <Card>
              <CardContent className="p-3">
                <p className="text-xs text-gray-500 mb-2">Tap to add</p>
                <div className="flex flex-wrap gap-2">
                  {savedItems.slice(0, 8).map(i => (
                    <button key={i.id} onClick={() => handleQuickAdd(i)} className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-xs">
                      {i.name} - ₹{i.lastPrice}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Discount & GST */}
          <Card>
            <CardContent className="p-3 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-gray-600 text-sm">{translations.subtotal}</span>
                <span className="font-medium">₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600 text-sm">{translations.discount}</span>
                <input
                  type="number"
                  value={discount || ''}
                  onChange={(e) => setDiscount(parseInt(e.target.value) || 0)}
                  className="w-20 h-8 px-2 border border-gray-300 rounded text-sm text-right"
                  placeholder="0"
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600 text-sm">GST %</span>
                <input
                  type="number"
                  value={gstRate}
                  onChange={(e) => setGstRate(parseInt(e.target.value) || 0)}
                  className="w-20 h-8 px-2 border border-gray-300 rounded text-sm text-right"
                />
              </div>
              {gstAmount > 0 && (
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>GST ({gstRate}%)</span>
                  <span>₹{gstAmount.toFixed(2)}</span>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sticky Footer */}
        <div className="fixed bottom-14 left-0 right-0 bg-white border-t border-gray-200 shadow-lg p-3">
          <div className="max-w-md mx-auto">
            <div className="flex justify-between items-center mb-3">
              <span className="text-lg font-bold">{translations.grandTotal}</span>
              <span className="text-xl font-bold text-blue-600">₹{grandTotal.toFixed(2)}</span>
            </div>
            <div className="flex gap-2">
              <Button onClick={() => handleSave('paid')} className="flex-1 h-12 bg-green-600 hover:bg-green-700 text-base">
                <Check className="w-5 h-5 mr-1" />
                {translations.cashReceived}
              </Button>
              <Button onClick={() => handleSave('udhar')} className="flex-1 h-12 bg-orange-500 hover:bg-orange-600 text-base">
                <Receipt className="w-5 h-5 mr-1" />
                {translations.udharBtn}
              </Button>
              <Button onClick={handleShareWhatsApp} className="h-12 px-4 bg-[#25D366] hover:bg-[#1da851]">
                <Send className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
