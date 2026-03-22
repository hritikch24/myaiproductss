import { useState, useEffect, useCallback } from 'react'
import { TrendingUp, TrendingDown, Receipt, DollarSign, ArrowRight } from 'lucide-react'
import { Card, CardContent } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { formatCurrency, formatTime, getLast7Days } from '../lib/utils'
import { getTodayStats, getWeeklySales, getRecentTransactions } from '../lib/db'

interface HomePageProps {
  shopName: string
  translations: Record<string, string>
  onNavigate: (tab: string) => void
}

export function HomePage({ shopName, translations, onNavigate }: HomePageProps) {
  const [todayStats, setTodayStats] = useState({
    totalSale: 0,
    totalCollection: 0,
    newUdhar: 0,
    billsCount: 0
  })
  const [weeklyData, setWeeklyData] = useState<{ date: Date; total: number }[]>([])
  const [recentTxns, setRecentTxns] = useState<{ type: 'bill' | 'payment'; amount: number; name: string; createdAt: Date }[]>([])
  const [isRefreshing, setIsRefreshing] = useState(false)

  const loadData = useCallback(async () => {
    const [stats, weekly, recent] = await Promise.all([
      getTodayStats(),
      getWeeklySales(),
      getRecentTransactions(5)
    ])
    setTodayStats(stats)
    setWeeklyData(weekly)
    setRecentTxns(recent)
  }, [])

  useEffect(() => {
    loadData()
  }, [loadData])

  const handleRefresh = async () => {
    setIsRefreshing(true)
    await loadData()
    setIsRefreshing(false)
  }

  const maxWeeklySale = Math.max(...weeklyData.map(d => d.total), 1)
  const days = getLast7Days()

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-blue-600 text-white px-4 py-6">
        <h1 className="text-xl font-semibold">
          {translations.greeting}, {shopName}!
        </h1>
      </div>

      {/* Pull to refresh hint */}
      <div 
        className={`bg-blue-50 text-blue-600 text-center py-1 text-sm transition-opacity ${isRefreshing ? 'opacity-100' : 'opacity-0'}`}
      >
        {translations.pullToRefresh}
      </div>

      {/* Today's Summary */}
      <div className="p-4" onTouchEnd={handleRefresh}>
        <div className="grid grid-cols-2 gap-3">
          <Card className="bg-green-50 border-green-100">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5 text-green-600" />
                <span className="text-sm text-green-700">{translations.todaySale}</span>
              </div>
              <p className="text-2xl font-bold text-green-800">{formatCurrency(todayStats.totalSale)}</p>
            </CardContent>
          </Card>

          <Card className="bg-blue-50 border-blue-100">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="w-5 h-5 text-blue-600" />
                <span className="text-sm text-blue-700">{translations.todayCollection}</span>
              </div>
              <p className="text-2xl font-bold text-blue-800">{formatCurrency(todayStats.totalCollection)}</p>
            </CardContent>
          </Card>

          <Card className="bg-orange-50 border-orange-100">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <TrendingDown className="w-5 h-5 text-orange-600" />
                <span className="text-sm text-orange-700">{translations.newUdharGiven}</span>
              </div>
              <p className="text-2xl font-bold text-orange-800">{formatCurrency(todayStats.newUdhar)}</p>
            </CardContent>
          </Card>

          <Card className="bg-purple-50 border-purple-100">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Receipt className="w-5 h-5 text-purple-600" />
                <span className="text-sm text-purple-700">{translations.billsCreated}</span>
              </div>
              <p className="text-2xl font-bold text-purple-800">{todayStats.billsCount}</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-4 mb-4">
        <div className="flex gap-3">
          <Button 
            size="lg" 
            className="flex-1 bg-blue-600 hover:bg-blue-700"
            onClick={() => onNavigate('newbill')}
          >
            <PlusCircle className="w-5 h-5" />
            {translations.newBillBtn}
          </Button>
          <Button 
            size="lg" 
            className="flex-1 bg-orange-500 hover:bg-orange-600"
            onClick={() => onNavigate('udhar')}
          >
            <DollarSign className="w-5 h-5" />
            {translations.collectUdhar}
          </Button>
        </div>
      </div>

      {/* Weekly Chart */}
      <div className="px-4 mb-4">
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold text-gray-800 mb-4">{translations.weeklySales}</h3>
            <div className="flex items-end justify-between h-32 gap-2">
              {weeklyData.map((day, idx) => {
                const height = (day.total / maxWeeklySale) * 100
                const dayLabel = days[idx].label
                return (
                  <div key={idx} className="flex-1 flex flex-col items-center">
                    <div className="w-full flex flex-col items-center justify-end h-24">
                      <span className="text-xs text-gray-500 mb-1">
                        {day.total > 0 ? formatCurrency(day.total) : ''}
                      </span>
                      <div 
                        className="w-full bg-blue-500 rounded-t-md transition-all duration-500 hover:bg-blue-600"
                        style={{ height: `${Math.max(height, 4)}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-500 mt-1">{dayLabel}</span>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Transactions */}
      <div className="px-4 mb-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-800">{translations.recentTransactions}</h3>
              <Button variant="ghost" size="sm" onClick={() => onNavigate('newbill')}>
                {translations.viewAll}
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
            
            {recentTxns.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Receipt className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p className="text-sm">{translations.noTransactions}</p>
                <p className="text-xs text-gray-400">{translations.noTransactionsDesc}</p>
              </div>
            ) : (
              <div className="space-y-3">
                {recentTxns.map((txn, idx) => (
                  <div 
                    key={idx}
                    className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        txn.type === 'bill' ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'
                      }`}>
                        {txn.type === 'bill' ? (
                          <Receipt className="w-5 h-5" />
                        ) : (
                          <DollarSign className="w-5 h-5" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">{txn.name}</p>
                        <p className="text-xs text-gray-500">{formatTime(txn.createdAt)}</p>
                      </div>
                    </div>
                    <span className={`font-semibold ${
                      txn.type === 'bill' ? 'text-blue-600' : 'text-green-600'
                    }`}>
                      {txn.type === 'bill' ? '-' : '+'}{formatCurrency(txn.amount)}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function PlusCircle(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="10" />
      <path d="M8 12h8" />
      <path d="M12 8v8" />
    </svg>
  )
}
