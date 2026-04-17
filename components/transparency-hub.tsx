'use client'

import { Card } from '@/components/ui/card'
import { BookOpen, Zap, Heart, Globe, ExternalLink } from 'lucide-react'

interface FundCategory {
  icon: React.ReactNode
  title: string
  description: string
  allocated: number
  percentage: number
  bgColor: string
  iconColor: string
}

const fundCategories: FundCategory[] = [
  {
    icon: <BookOpen className="w-7 h-7" />,
    title: 'Education',
    description: 'Blockchain education programs and developer training initiatives',
    allocated: 2900000,
    percentage: 30,
    bgColor: 'bg-blue-50 hover:bg-blue-100/80',
    iconColor: 'text-blue-600 bg-blue-100',
  },
  {
    icon: <Zap className="w-7 h-7" />,
    title: 'Infrastructure',
    description: 'Network development and protocol technical improvements',
    allocated: 3867000,
    percentage: 40,
    bgColor: 'bg-[#FBCC5C]/10 hover:bg-[#FBCC5C]/20',
    iconColor: 'text-[#E5A229] bg-[#FBCC5C]/20',
  },
  {
    icon: <Heart className="w-7 h-7" />,
    title: 'Social Impact',
    description: 'Community initiatives and sustainable development projects',
    allocated: 1934000,
    percentage: 20,
    bgColor: 'bg-[#35D07F]/10 hover:bg-[#35D07F]/20',
    iconColor: 'text-[#1D8E54] bg-[#35D07F]/20',
  },
  {
    icon: <Globe className="w-7 h-7" />,
    title: 'Ecosystem',
    description: 'Grants and funding for ecosystem projects and startups',
    allocated: 967000,
    percentage: 10,
    bgColor: 'bg-purple-50 hover:bg-purple-100/80',
    iconColor: 'text-purple-600 bg-purple-100',
  },
]

function formatCelo(value: number): string {
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(2)}M`
  }
  if (value >= 1000) {
    return `${(value / 1000).toFixed(0)}K`
  }
  return value.toLocaleString('en-US')
}

export function TransparencyHub() {
  const totalAllocated = fundCategories.reduce((sum, cat) => sum + cat.allocated, 0)

  return (
    <div className="w-full">
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h3 className="text-2xl font-bold text-[#1E2336] mb-2">Transparency Hub</h3>
          <p className="text-slate-600">Where community funds go</p>
        </div>
        <a
          href="https://www.celocommunityfund.xyz/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm text-[#35D07F] hover:text-[#1D8E54] font-medium transition-colors"
        >
          View full details
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {fundCategories.map((category, index) => (
          <Card
            key={index}
            className={`p-6 border border-slate-200 transition-all duration-300 hover:shadow-lg hover:border-[#35D07F]/30 ${category.bgColor}`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`p-2.5 rounded-xl ${category.iconColor}`}>
                {category.icon}
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-[#1E2336]">{category.percentage}%</p>
              </div>
            </div>

            <h4 className="text-lg font-bold text-[#1E2336] mb-2">{category.title}</h4>
            <p className="text-sm text-slate-600 mb-5 line-clamp-2">{category.description}</p>

            <div className="pt-4 border-t border-slate-200/60">
              <p className="text-xs text-slate-500 font-medium mb-1 uppercase tracking-wide">Allocated</p>
              <p className="text-xl font-bold text-[#35D07F]">
                {formatCelo(category.allocated)}
              </p>
              <p className="text-xs text-slate-500 mt-0.5">CELO</p>
            </div>
          </Card>
        ))}
      </div>

      {/* Summary Section */}
      <div className="mt-8 bg-gradient-to-r from-[#1E2336] to-[#2D3348] rounded-2xl p-8 text-white">
        <h4 className="text-lg font-bold mb-6 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#35D07F]" />
          Distribution Summary
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="p-4 bg-white/5 rounded-xl border border-white/10">
            <p className="text-sm text-slate-400 mb-2">Total Fund</p>
            <p className="text-3xl font-bold text-[#35D07F]">9.67M</p>
            <p className="text-xs text-slate-500 mt-1">CELO</p>
          </div>
          <div className="p-4 bg-white/5 rounded-xl border border-white/10">
            <p className="text-sm text-slate-400 mb-2">Total Allocated</p>
            <p className="text-3xl font-bold text-[#FBCC5C]">{formatCelo(totalAllocated)}</p>
            <p className="text-xs text-slate-500 mt-1">70% of total</p>
          </div>
          <div className="p-4 bg-white/5 rounded-xl border border-white/10">
            <p className="text-sm text-slate-400 mb-2">Available</p>
            <p className="text-3xl font-bold text-white">2.90M</p>
            <p className="text-xs text-slate-500 mt-1">for new initiatives</p>
          </div>
          <div className="p-4 bg-white/5 rounded-xl border border-white/10">
            <p className="text-sm text-slate-400 mb-2">Active Projects</p>
            <p className="text-3xl font-bold text-white">24</p>
            <p className="text-xs text-slate-500 mt-1">in progress</p>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href="https://dune.com/superchain_eco/celo-community-treasury"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-medium transition-colors"
          >
            Dune Analytics
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
          <a
            href="https://celoscan.io/address/0xD533Ca0630fc6e7F9B172E9b04B3047aBeb2d235"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-medium transition-colors"
          >
            View on CeloScan
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  )
}
