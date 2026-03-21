import { Home, PlusCircle, Wallet, Settings } from 'lucide-react'
import { cn } from '@/lib/utils'

interface BottomNavProps {
  activeTab: string
  onTabChange: (tab: string) => void
  translations: Record<string, string>
}

export function BottomNav({ activeTab, onTabChange, translations }: BottomNavProps) {
  const tabs = [
    { id: 'home', icon: Home, label: translations.home },
    { id: 'newbill', icon: PlusCircle, label: translations.newBill },
    { id: 'udhar', icon: Wallet, label: translations.udhar },
    { id: 'settings', icon: Settings, label: translations.settings },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-2 py-2 z-50 safe-area-bottom">
      <div className="flex items-center justify-around max-w-lg mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                "flex flex-col items-center justify-center flex-1 py-2 px-3 rounded-lg transition-all duration-200 min-h-[56px]",
                isActive 
                  ? "text-blue-600 bg-blue-50" 
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
              )}
              aria-label={tab.label}
              aria-current={isActive ? 'page' : undefined}
            >
              <Icon 
                className={cn(
                  "w-6 h-6 mb-1 transition-transform duration-200",
                  isActive && "scale-110"
                )} 
              />
              <span className="text-xs font-medium">{tab.label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
