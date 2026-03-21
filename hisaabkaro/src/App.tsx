import { useState, useEffect } from 'react'
import { useAppStore, useTranslation } from '@/store/useAppStore'
import { BottomNav } from '@/components/BottomNav'
import { HomePage } from '@/pages/HomePage'
import { NewBillPage } from '@/pages/NewBillPage'
import { UdharPage } from '@/pages/UdharPage'
import { SettingsPage } from '@/pages/SettingsPage'

function App() {
  const [activeTab, setActiveTab] = useState('home')
  const { 
    settings, 
    language, 
    shopName, 
    isLoading, 
    loadSettings, 
    updateSettings,
    setLanguage 
  } = useAppStore()
  const t = useTranslation()

  useEffect(() => {
    loadSettings()
  }, [loadSettings])

  if (isLoading || !settings) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <span className="text-white text-2xl font-bold">₹</span>
          </div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  const translations: Record<string, string> = {
    greeting: t('greeting'),
    home: t('home'),
    newBill: t('newBill'),
    udhar: t('udhar'),
    settings: t('settings'),
    todaySale: t('todaySale'),
    todayCollection: t('todayCollection'),
    newUdharGiven: t('newUdharGiven'),
    billsCreated: t('billsCreated'),
    newBillBtn: t('newBillBtn'),
    collectUdhar: t('collectUdhar'),
    recentTransactions: t('recentTransactions'),
    weeklySales: t('weeklySales'),
    customerName: t('customerName'),
    customerPhone: t('customerPhone'),
    addItem: t('addItem'),
    itemName: t('itemName'),
    quantity: t('quantity'),
    pricePerUnit: t('pricePerUnit'),
    lineTotal: t('lineTotal'),
    subtotal: t('subtotal'),
    discount: t('discount'),
    grandTotal: t('grandTotal'),
    cashReceived: t('cashReceived'),
    udharBtn: t('udharBtn'),
    shareWhatsapp: t('shareWhatsapp'),
    save: t('save'),
    cancel: t('cancel'),
    totalPending: t('totalPending'),
    search: t('search'),
    sortByAmount: t('sortByAmount'),
    sortByDate: t('sortByDate'),
    remind: t('remind'),
    collect: t('collect'),
    history: t('history'),
    amountToCollect: t('amountToCollect'),
    remaining: t('remaining'),
    shopSettings: t('shopSettings'),
    ownerName: t('ownerName'),
    phoneNumber: t('phoneNumber'),
    languageToggle: t('languageToggle'),
    exportData: t('exportData'),
    shareApp: t('shareApp'),
    version: t('version'),
    noUdhar: t('noUdhar'),
    noUdharDesc: t('noUdharDesc'),
    noTransactions: t('noTransactions'),
    noTransactionsDesc: t('noTransactionsDesc'),
    success: t('success'),
    billSaved: t('billSaved'),
    paymentCollected: t('paymentCollected'),
    item: t('item'),
    selectCustomer: t('selectCustomer'),
    orAddNew: t('orAddNew'),
    total: t('total'),
    lastTransaction: t('lastTransaction'),
    paid: t('paid'),
    pending: t('pending'),
    partial: t('partial'),
    delete: t('delete'),
    edit: t('edit'),
    viewAll: t('viewAll'),
    pullToRefresh: t('pullToRefresh'),
  }

  const renderPage = () => {
    switch (activeTab) {
      case 'home':
        return <HomePage shopName={shopName} translations={translations} onNavigate={setActiveTab} />
      case 'newbill':
        return <NewBillPage shopName={shopName} translations={translations} />
      case 'udhar':
        return <UdharPage shopName={shopName} translations={translations} />
      case 'settings':
        return (
          <SettingsPage
            settings={settings}
            language={language}
            onUpdateSettings={updateSettings}
            onLanguageChange={setLanguage}
            translations={translations}
          />
        )
      default:
        return <HomePage shopName={shopName} translations={translations} onNavigate={setActiveTab} />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {renderPage()}
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} translations={translations} />
    </div>
  )
}

export default App
