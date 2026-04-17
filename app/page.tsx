import { HeroStats } from '@/components/hero-stats';
import { GovernanceFeed } from '@/components/governance-feed';
import { TransparencyHub } from '@/components/transparency-hub';
import { ActionBar } from '@/components/action-bar';

export const metadata = {
  title: 'Celo Governance Tracker',
  description: 'Real-time Web3 governance dashboard for Celo Community Fund. Track proposals, fund allocation, and governance metrics.',
};

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-slate-100">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-lg">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-celo-green to-celo-gold flex items-center justify-center">
                <span className="text-xl font-bold text-slate-900">◉</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">Celo Governance</h1>
                <p className="text-xs text-slate-600">Community Fund Tracker</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-status-success rounded-full" />
              <span className="text-sm font-medium text-slate-600">Live</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <section className="mb-12">
          <HeroStats />
        </section>

        {/* Action Bar */}
        <section className="mb-12">
          <ActionBar />
        </section>

        {/* Governance Feed */}
        <section className="mb-12">
          <GovernanceFeed />
        </section>

        {/* Transparency Hub */}
        <section className="mb-12">
          <TransparencyHub />
        </section>

        {/* Footer */}
        <footer className="border-t border-slate-200 py-8 text-center text-sm text-slate-600">
          <p>
            Celo Governance Tracker • Built with transparency and community in mind
          </p>
          <p className="mt-2 text-xs text-slate-500">
            Data sourced from Celo blockchain • Real-time updates
          </p>
        </footer>
      </div>
    </main>
  );
}
