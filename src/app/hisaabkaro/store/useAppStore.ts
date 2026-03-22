import { create } from 'zustand'
import { initializeSettings, updateSettings, type Settings } from '../lib/db'

interface AppState {
  settings: Settings | null
  language: 'en' | 'hi'
  shopName: string
  isLoading: boolean
  loadSettings: () => Promise<void>
  updateSettings: (updates: Partial<Settings>) => Promise<void>
  setLanguage: (lang: 'en' | 'hi') => void
}

const translations = {
  en: {
    greeting: 'Namaste',
    home: 'Home',
    newBill: 'New Bill',
    udhar: 'Udhar',
    settings: 'Settings',
    todaySale: 'Today Sale',
    todayCollection: 'Collection',
    newUdharGiven: 'New Udhar',
    billsCreated: 'Bills',
    newBillBtn: 'New Bill',
    collectUdhar: 'Collect Udhar',
    recentTransactions: 'Recent Transactions',
    weeklySales: 'Weekly Sales',
    customerName: 'Customer Name',
    customerPhone: 'Phone (Optional)',
    addItem: 'Add Item',
    itemName: 'Item Name',
    quantity: 'Qty',
    pricePerUnit: 'Price (₹)',
    lineTotal: 'Total',
    subtotal: 'Subtotal',
    discount: 'Discount (₹)',
    grandTotal: 'Grand Total',
    cashReceived: 'Cash Received',
    udharBtn: 'Udhar',
    shareWhatsapp: 'Share WhatsApp',
    save: 'Save',
    cancel: 'Cancel',
    totalPending: 'Total Pending',
    search: 'Search',
    sortByAmount: 'Sort by Amount',
    sortByDate: 'Sort by Date',
    remind: 'Remind',
    collect: 'Collect',
    history: 'History',
    amountToCollect: 'Amount to Collect',
    remaining: 'Remaining',
    shopSettings: 'Shop Settings',
    ownerName: 'Owner Name',
    phoneNumber: 'Phone Number',
    languageToggle: 'Language',
    exportData: 'Export Data',
    shareApp: 'Share App',
    version: 'Version',
    noUdhar: 'No pending udhar!',
    noUdharDesc: 'All customers are cleared.',
    noTransactions: 'No transactions yet',
    noTransactionsDesc: 'Create your first bill to get started.',
    success: 'Success!',
    billSaved: 'Bill saved successfully',
    paymentCollected: 'Payment collected',
    item: 'Item',
    selectCustomer: 'Select Customer',
    orAddNew: 'Or add new customer',
    total: 'Total',
    lastTransaction: 'Last transaction',
    paid: 'Paid',
    pending: 'Pending',
    partial: 'Partial',
    delete: 'Delete',
    edit: 'Edit',
    viewAll: 'View All',
    pullToRefresh: 'Pull to refresh',
  },
  hi: {
    greeting: 'नमस्ते',
    home: 'होम',
    newBill: 'नया बिल',
    udhar: 'उधार',
    settings: 'सेटिंग्स',
    todaySale: 'आज की बिक्री',
    todayCollection: 'वसूली',
    newUdharGiven: 'नया उधार',
    billsCreated: 'बिल',
    newBillBtn: 'नया बिल',
    collectUdhar: 'उधार वसूलें',
    recentTransactions: 'हाल के लेनदेन',
    weeklySales: 'साप्ताहिक बिक्री',
    customerName: 'ग्राहक का नाम',
    customerPhone: 'फोन (वैकल्पिक)',
    addItem: 'आइटम जोड़ें',
    itemName: 'आइटम का नाम',
    quantity: 'मात्रा',
    pricePerUnit: 'कीमत (₹)',
    lineTotal: 'कुल',
    subtotal: 'उप-कुल',
    discount: 'छूट (₹)',
    grandTotal: 'कुल योग',
    cashReceived: 'कैश मिला',
    udharBtn: 'उधार',
    shareWhatsapp: 'WhatsApp शेयर करें',
    save: 'सेव करें',
    cancel: 'रद्द करें',
    totalPending: 'कुल बकाया',
    search: 'खोजें',
    sortByAmount: 'राशि के अनुसार',
    sortByDate: 'तारीख के अनुसार',
    remind: 'याद दिलाएं',
    collect: 'वसूलें',
    history: 'इतिहास',
    amountToCollect: 'वसूलने की राशि',
    remaining: 'शेष',
    shopSettings: 'दुकान सेटिंग्स',
    ownerName: 'मालिक का नाम',
    phoneNumber: 'फोन नंबर',
    languageToggle: 'भाषा',
    exportData: 'डेटा निर्यात करें',
    shareApp: 'ऐप शेयर करें',
    version: 'संस्करण',
    noUdhar: 'कोई उधार नहीं!',
    noUdharDesc: 'सभी ग्राहक साफ हैं।',
    noTransactions: 'अभी तक कोई लेनदेन नहीं',
    noTransactionsDesc: 'शुरू करने के लिए अपना पहला बिल बनाएं।',
    success: 'सफल!',
    billSaved: 'बिल सफलतापूर्वक सेव हुआ',
    paymentCollected: 'भुगतान वसूला गया',
    item: 'आइटम',
    selectCustomer: 'ग्राहक चुनें',
    orAddNew: 'या नया ग्राहक जोड़ें',
    total: 'कुल',
    lastTransaction: 'आखिरी लेनदेन',
    paid: 'भुगतान हो गया',
    pending: 'बकाया',
    partial: 'आंशिक',
    delete: 'हटाएं',
    edit: 'संपादित करें',
    viewAll: 'सभी देखें',
    pullToRefresh: 'रिफ्रेश करने के लिए खींचें',
  }
}

export const useAppStore = create<AppState>((set, get) => ({
  settings: null,
  language: 'en',
  shopName: 'My Shop',
  isLoading: true,
  
  loadSettings: async () => {
    try {
      const settings = await initializeSettings()
      set({ 
        settings, 
        language: settings.language || 'en',
        shopName: settings.shopName,
        isLoading: false 
      })
    } catch (error) {
      console.error('Failed to load settings:', error)
      set({ isLoading: false })
    }
  },
  
  updateSettings: async (updates: Partial<Settings>) => {
    await updateSettings(updates)
    const settings = { ...get().settings, ...updates } as Settings
    set({ settings })
    if (updates.language) {
      set({ language: updates.language })
    }
    if (updates.shopName) {
      set({ shopName: updates.shopName })
    }
  },
  
  setLanguage: (lang: 'en' | 'hi') => {
    set({ language: lang })
    get().updateSettings({ language: lang })
  }
}))

export const t = (key: keyof typeof translations.en): string => {
  const lang = useAppStore.getState().language
  return translations[lang][key] || key
}

export const useTranslation = () => {
  const language = useAppStore((state) => state.language)
  return (key: keyof typeof translations.en) => translations[language][key] || key
}
