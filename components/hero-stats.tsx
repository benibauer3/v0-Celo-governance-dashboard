'use client'

import { useEffect, useState } from 'react'
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts'
import { Loader2, ExternalLink, TrendingUp, Wallet } from 'lucide-react'

interface BalanceData {
  totalBalance: number
  allocatedFunds: number
  availableFunds: number
  percentageAllocated: number
  percentageAvailable: number
  address: string
  demo?: boolean
}

// Cores oficiais Celo
const CELO_GREEN = '#35D07F'
const CELO_GOLD = '#FBCC5C'
const CELO_DARK = '#1E2336'

function formatCelo(value: number): string {
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(2)}M`
  }
  if (value >= 1000) {
    return `${(value / 1000).toFixed(0)}K`
  }
  return value.toLocaleString('pt-BR', { maximumFractionDigits: 2 })
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
        setError(err instanceof Error ? err.message : 'Erro desconhecido')
        // Dados de fallback baseados no CeloScan (~9.67M CELO)
        setBalanceData({
          totalBalance: 9669179,
          allocatedFunds: 6768425,
          availableFunds: 2900754,
          percentageAllocated: 70,
          percentageAvailable: 30,
          address: '0xD533Ca259b330c7A88f74E000a3FaEa2d63B7972',
          demo: true,
        })
      } finally {
        setLoading(false)
      }
    }

    fetchBalance()
  }, [])

  if (loading || !balanceData) {
    return (
      <div className="w-full bg-gradient-to-br from-white to-slate-50 rounded-2xl border border-slate-200 p-8 shadow-sm">
        <div className="h-80 flex flex-col items-center justify-center text-slate-500">
          <Loader2 className="w-10 h-10 text-[#35D07F] animate-spin mb-4" />
          <span className="text-sm">Conectando à blockchain Celo...</span>
        </div>
      </div>
    )
  }

  const chartData = [
    { name: 'Alocado', value: balanceData.allocatedFunds, fill: CELO_GREEN },
    { name: 'Disponível', value: balanceData.availableFunds, fill: CELO_GOLD },
  ]

  const celoPrice = 0.08 // Preço aproximado do CELO em USD
  const totalValueUSD = balanceData.totalBalance * celoPrice

  return (
    <div className="w-full bg-gradient-to-br from-white via-white to-[#35D07F]/5 rounded-2xl border border-slate-200 p-8 shadow-sm">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#35D07F] to-[#1D8E54] flex items-center justify-center">
              <Wallet className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-[#1E2336]">Celo Community Fund</h3>
          </div>
          <a
            href={`https://celoscan.io/address/${balanceData.address}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-[#35D07F] font-mono transition-colors"
          >
            {balanceData.address.slice(0, 10)}...{balanceData.address.slice(-8)}
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {balanceData.demo && (
          <div className="px-3 py-1.5 bg-[#FBCC5C]/20 border border-[#FBCC5C]/30 rounded-full">
            <span className="text-xs font-medium text-[#E5A229]">Modo Demo</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Chart Section */}
        <div className="flex flex-col justify-center">
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={110}
                paddingAngle={3}
                dataKey="value"
                strokeWidth={0}
              >
                {chartData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.fill}
                    style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }}
                  />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) => [`${formatCelo(value as number)} CELO`, '']}
                contentStyle={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '0.75rem',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                  padding: '12px 16px',
                }}
                labelStyle={{ fontWeight: 600, color: CELO_DARK }}
              />
              <Legend
                verticalAlign="bottom"
                height={36}
                formatter={(value) => (
                  <span className="text-sm font-medium text-slate-700">{value}</span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Stats Section */}
        <div className="flex flex-col justify-center space-y-5">
          {/* Total Balance Card */}
          <div className="bg-gradient-to-br from-[#1E2336] to-[#2D3348] rounded-xl p-6 text-white">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="w-4 h-4 text-[#35D07F]" />
              <p className="text-slate-300 text-sm font-medium">Saldo Total</p>
            </div>
            <p className="text-4xl font-bold mb-1">
              {formatCelo(balanceData.totalBalance)}
            </p>
            <p className="text-slate-400 text-sm">
              CELO (~${(totalValueUSD / 1000).toFixed(0)}K USD)
            </p>
          </div>

          {/* Allocation Bar */}
          <div className="bg-white rounded-xl p-5 border border-slate-200">
            <div className="flex justify-between items-center mb-3">
              <p className="text-[#1E2336] font-semibold">Alocação do Fundo</p>
              <p className="text-sm font-bold text-[#35D07F]">{balanceData.percentageAllocated}%</p>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-3.5 overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-700 ease-out"
                style={{ 
                  width: `${balanceData.percentageAllocated}%`,
                  background: `linear-gradient(90deg, ${CELO_GREEN} 0%, #1D8E54 100%)`
                }}
              />
            </div>
            <div className="flex justify-between items-center mt-3 text-xs text-slate-500">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#35D07F]" />
                Alocado: {formatCelo(balanceData.allocatedFunds)} CELO
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FBCC5C]" />
                Disponível: {formatCelo(balanceData.availableFunds)} CELO
              </span>
            </div>
          </div>

          {/* Network Status */}
          <div className="bg-white rounded-xl p-4 border border-slate-200 flex items-center justify-between">
            <div>
              <p className="text-slate-500 text-xs font-medium uppercase tracking-wide mb-1">Status da Rede</p>
              <p className="text-[#1E2336] font-semibold">
                {error || balanceData.demo ? 'Demo Mode' : 'Conectado'}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#35D07F] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-[#35D07F]"></span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
