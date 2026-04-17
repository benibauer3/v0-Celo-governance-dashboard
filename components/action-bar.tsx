'use client'

import { Users, Award, ArrowRight, Vote, BarChart3 } from 'lucide-react'

interface ActionButton {
  title: string
  description: string
  icon: React.ReactNode
  href: string
  gradient: string
  iconBg: string
}

const actions: ActionButton[] = [
  {
    title: 'Explore Validators',
    description: 'View active validators and their performance metrics on the Celo network',
    icon: <Users className="w-6 h-6" />,
    href: 'https://explorer.celo.org/mainnet/validators',
    gradient: 'from-[#35D07F] to-[#1D8E54]',
    iconBg: 'bg-[#35D07F]/20 text-[#1D8E54]',
  },
  {
    title: 'Top Delegates',
    description: 'Discover top governance delegates and their voting power',
    icon: <Award className="w-6 h-6" />,
    href: 'https://celo.tax',
    gradient: 'from-[#FBCC5C] to-[#E5A229]',
    iconBg: 'bg-[#FBCC5C]/20 text-[#E5A229]',
  },
  {
    title: 'Vote on Proposals',
    description: 'Participate in governance by voting on active proposals',
    icon: <Vote className="w-6 h-6" />,
    href: 'https://mondo.celo.org/governance',
    gradient: 'from-blue-500 to-blue-600',
    iconBg: 'bg-blue-100 text-blue-600',
  },
  {
    title: 'Analytics',
    description: 'Analyze detailed Community Treasury data',
    icon: <BarChart3 className="w-6 h-6" />,
    href: 'https://dune.com/superchain_eco/celo-community-treasury',
    gradient: 'from-purple-500 to-purple-600',
    iconBg: 'bg-purple-100 text-purple-600',
  },
]

export function ActionBar() {
  return (
    <div className="w-full">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-[#1E2336]">Quick Actions</h3>
        <p className="text-slate-600 text-sm">No login required</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {actions.map((action, index) => (
          <a
            key={index}
            href={action.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative overflow-hidden rounded-xl bg-white border border-slate-200 hover:border-transparent hover:shadow-xl transition-all duration-300"
          >
            {/* Gradient border effect */}
            <div className={`absolute inset-0 bg-gradient-to-r ${action.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
            
            <div className="relative m-[2px] bg-white rounded-[10px] p-5 h-full">
              <div className="flex items-start justify-between mb-4">
                <div className={`p-2.5 rounded-xl ${action.iconBg}`}>
                  {action.icon}
                </div>
                <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-[#35D07F] group-hover:translate-x-1 transition-all" />
              </div>

              <h4 className="text-base font-bold text-[#1E2336] mb-2 group-hover:text-[#35D07F] transition-colors">
                {action.title}
              </h4>
              <p className="text-sm text-slate-600 line-clamp-2">
                {action.description}
              </p>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}
