import { HeroStats } from '@/components/hero-stats'
import { GovernanceFeed } from '@/components/governance-feed'
import { TransparencyHub } from '@/components/transparency-hub'
import { ActionBar } from '@/components/action-bar'
import { ExternalLink } from 'lucide-react'

export const metadata = {
  title: 'Celo Governance Tracker',
  description: 'Dashboard de governança Web3 em tempo real para o Celo Community Fund. Acompanhe propostas, alocação de fundos e métricas de governança.',
}

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-slate-50/50 to-slate-100">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Celo Logo */}
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#35D07F] to-[#1D8E54] flex items-center justify-center shadow-lg shadow-[#35D07F]/20">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="2"/>
                  <circle cx="12" cy="12" r="4" fill="white"/>
                </svg>
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-[#1E2336]">Celo Governance</h1>
                <p className="text-xs text-slate-500">Community Fund Tracker</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <a
                href="https://mondo.celo.org"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:flex items-center gap-1.5 text-sm text-slate-600 hover:text-[#35D07F] font-medium transition-colors"
              >
                Mondo
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://docs.celo.org"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:flex items-center gap-1.5 text-sm text-slate-600 hover:text-[#35D07F] font-medium transition-colors"
              >
                Docs
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-[#35D07F]/10 rounded-full">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#35D07F] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#35D07F]"></span>
                </span>
                <span className="text-sm font-medium text-[#1D8E54]">Live</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <section className="mb-10">
          <HeroStats />
        </section>

        {/* Action Bar */}
        <section className="mb-10">
          <ActionBar />
        </section>

        {/* Governance Feed */}
        <section className="mb-10">
          <GovernanceFeed />
        </section>

        {/* Transparency Hub */}
        <section className="mb-10">
          <TransparencyHub />
        </section>

        {/* Footer */}
        <footer className="border-t border-slate-200 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#35D07F] to-[#1D8E54] flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="2"/>
                  <circle cx="12" cy="12" r="4" fill="white"/>
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-[#1E2336]">Celo Governance Tracker</p>
                <p className="text-xs text-slate-500">Prosperidade para todos</p>
              </div>
            </div>
            <div className="flex items-center gap-6 text-sm text-slate-500">
              <a href="https://celo.org" target="_blank" rel="noopener noreferrer" className="hover:text-[#35D07F] transition-colors">
                Celo.org
              </a>
              <a href="https://forum.celo.org" target="_blank" rel="noopener noreferrer" className="hover:text-[#35D07F] transition-colors">
                Forum
              </a>
              <a href="https://discord.com/invite/celo" target="_blank" rel="noopener noreferrer" className="hover:text-[#35D07F] transition-colors">
                Discord
              </a>
              <a href="https://github.com/celo-org" target="_blank" rel="noopener noreferrer" className="hover:text-[#35D07F] transition-colors">
                GitHub
              </a>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-slate-100 text-center">
            <p className="text-xs text-slate-400">
              Dados obtidos diretamente da blockchain Celo. Atualizações em tempo real.
            </p>
          </div>
        </footer>
      </div>
    </main>
  )
}
