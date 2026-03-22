import { useState } from 'react'
import { Save, Download, Share2, Info, Check } from 'lucide-react'
import { Card, CardContent } from '../components/card'
import { Button } from '../components/button'
import { Input } from '../components/input'
import { Label } from '../components/label'
import { exportDataAsCSV, type Settings } from '../lib/db'

interface SettingsPageProps {
  settings: Settings | null
  language: 'en' | 'hi'
  onUpdateSettings: (updates: Partial<Settings>) => Promise<void>
  onLanguageChange: (lang: 'en' | 'hi') => void
  translations: Record<string, string>
}

export function SettingsPage({ 
  settings, 
  language, 
  onUpdateSettings,
  onLanguageChange,
  translations 
}: SettingsPageProps) {
  const [shopName, setShopName] = useState(settings?.shopName || '')
  const [ownerName, setOwnerName] = useState(settings?.ownerName || '')
  const [phone, setPhone] = useState(settings?.phone || '')
  const [isSaving, setIsSaving] = useState(false)
  const [showSaved, setShowSaved] = useState(false)

  const handleSave = async () => {
    setIsSaving(true)
    await onUpdateSettings({
      shopName: shopName || 'My Shop',
      ownerName,
      phone
    })
    setIsSaving(false)
    setShowSaved(true)
    setTimeout(() => setShowSaved(false), 2000)
  }

  const handleExport = async () => {
    const csv = await exportDataAsCSV()
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `hisaabkaro-export-${new Date().toISOString().split('T')[0]}.csv`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleShareApp = () => {
    const url = 'https://kraftai.in/hisaabkaro/'
    if (navigator.share) {
      navigator.share({
        title: 'HisaabKaro - Digital Hisaab',
        text: 'Simple billing and udhar tracker for Indian shopkeepers',
        url
      })
    } else {
      navigator.clipboard.writeText(url)
      alert('Link copied to clipboard!')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-blue-600 text-white px-4 py-4">
        <h1 className="text-xl font-semibold">{translations.settings}</h1>
      </div>

      <div className="p-4 space-y-4">
        {/* Shop Settings */}
        <Card>
          <CardContent className="p-4 space-y-4">
            <h3 className="font-semibold text-gray-800">{translations.shopSettings}</h3>
            
            <div>
              <Label className="text-gray-600 mb-1 block">{translations.customerName}</Label>
              <Input
                value={shopName}
                onChange={(e) => setShopName(e.target.value)}
                placeholder="My Shop"
                className="h-12"
              />
            </div>
            
            <div>
              <Label className="text-gray-600 mb-1 block">{translations.ownerName}</Label>
              <Input
                value={ownerName}
                onChange={(e) => setOwnerName(e.target.value)}
                placeholder={translations.ownerName}
                className="h-12"
              />
            </div>
            
            <div>
              <Label className="text-gray-600 mb-1 block">{translations.phoneNumber}</Label>
              <Input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 9876543210"
                className="h-12"
              />
            </div>

            <Button
              onClick={handleSave}
              disabled={isSaving}
              className="w-full"
            >
              {isSaving ? (
                'Saving...'
              ) : showSaved ? (
                <>
                  <Check className="w-5 h-5" />
                  Saved!
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  {translations.save}
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Language Toggle */}
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold text-gray-800 mb-4">{translations.languageToggle}</h3>
            <div className="flex gap-2">
              <Button
                variant={language === 'en' ? 'default' : 'outline'}
                onClick={() => onLanguageChange('en')}
                className="flex-1"
              >
                English
              </Button>
              <Button
                variant={language === 'hi' ? 'default' : 'outline'}
                onClick={() => onLanguageChange('hi')}
                className="flex-1"
              >
                हिंदी
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Data Management */}
        <Card>
          <CardContent className="p-4 space-y-3">
            <h3 className="font-semibold text-gray-800">Data</h3>
            
            <Button
              variant="outline"
              onClick={handleExport}
              className="w-full"
            >
              <Download className="w-5 h-5" />
              {translations.exportData}
            </Button>
            
            <Button
              variant="outline"
              onClick={handleShareApp}
              className="w-full"
            >
              <Share2 className="w-5 h-5" />
              {translations.shareApp}
            </Button>
          </CardContent>
        </Card>

        {/* App Info */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3 text-gray-600">
              <Info className="w-5 h-5" />
              <div>
                <p className="font-medium">HisaabKaro</p>
                <p className="text-sm">{translations.version} 1.0.0</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
