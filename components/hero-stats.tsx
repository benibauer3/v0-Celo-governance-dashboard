'use client'

import { useEffect, useState } from 'react'
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts'

interface BalanceData {
  totalBalance: number
  allocatedFunds: number
  availableFunds: number
  percentageAllocated: number
  percentageAvailable: number
  address: string
}

export function HeroStats() {
  const [balanceData, setBalanceData] = useState<BalanceData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        setLoading(true)
        const response = await fetch('/api/celo-balance')
        if (!response.ok) throw new Error('Falha ao buscar saldo')
        const data = await response.json()
        setBalanceData(data)
        setError(null)
      } catch (err) {
        console.error('[v0] Erro ao buscar saldo:', err)
        setError(err instanceof Error ? err.message : 'Erro desconhecido')
        // Dados de fallback para demo
        setBalanceData({
          totalBalance: 100000000,
          allocatedFunds: 42500000,
          availableFunds: 57500000,
          percentageAllocated: 42.5,
          percentageAvailable: 57.5,
          address: '0xD533Ca0630fc6e7F9B172E9b04B3047aBeb2d235',
        })
      } finally {
        setLoading(false)
      }
    }

    fetchBalance()
  }, [])

  if (!balanceData) {
    return (
      <div className="w-full bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl border border-slate-200 p-8">
        <div className="h-96 flex items-center justify-center text-slate-500">
          {loading ? 'Carregando dados da blockchain...' : 'Erro ao carregar dados'}
        </div>
      </div>
    )
  }

  const chartData = [
    { name: 'Allocated Funds', value: balanceData.allocatedFunds, fill: '#35d07f' },
    { name: 'Available Balance', value: balanceData.availableFunds, fill: '#fcff52' },
  ]

  return (
    <div className="w-full bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl border border-slate-200 p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Chart Section */}
        <div className="flex flex-col justify-center">
          <h3 className="text-2xl font-bold text-slate-900 mb-2">Celo Community Fund</h3>
          <p className="text-slate-600 mb-6 text-sm font-mono">
            {balanceData.address.slice(0, 6)}...{balanceData.address.slice(-4)}
          </p>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={80}
                outerRadius={120}
                paddingAngle={2}
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) => {
                  const millions = (value as number) / 1000000
                  return `${millions.toFixed(1)}M CELO`
                }}
                contentStyle={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #cbd5e1',
                  borderRadius: '0.5rem',
                }}
              />
              <Legend
                wrapperStyle={{
                  paddingTop: '1rem',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Stats Section */}
        <div className="flex flex-col justify-center space-y-6">
          <div className="bg-white rounded-lg p-6 border border-slate-200 shadow-sm">
            <p className="text-slate-600 text-sm font-medium mb-2">Total Balance</p>
            <p className="text-4xl font-bold text-slate-900">
              {(balanceData.totalBalance / 1000000).toFixed(1)}M
            </p>
            <p className="text-slate-500 text-xs mt-1">CELO</p>
          </div>

          <div>
            <div className="flex justify-between items-center mb-3">
              <p className="text-slate-700 font-semibold">Fund Allocation</p>
              <p className="text-sm text-slate-600">{balanceData.percentageAllocated.toFixed(1)}%</p>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
              <div
                className="bg-gradient-to-r from-celo-green to-celo-green-dark h-full rounded-full transition-all duration-500"
                style={{ width: `${balanceData.percentageAllocated}%` }}
              />
            </div>
            <div className="flex justify-between items-center mt-3 text-xs text-slate-600">
              <span>Allocated: {(balanceData.allocatedFunds / 1000000).toFixed(1)}M CELO</span>
              <span>Available: {(balanceData.availableFunds / 1000000).toFixed(1)}M CELO</span>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 border border-slate-200 shadow-sm">
            <p className="text-slate-600 text-xs font-medium uppercase tracking-wide mb-2">Network Status</p>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-status-success rounded-full" />
              <p className="text-slate-900 font-medium">
                {error ? 'Demo Mode' : 'Connected & Syncing'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
