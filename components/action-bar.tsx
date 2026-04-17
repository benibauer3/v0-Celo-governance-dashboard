'use client';

import { Button } from '@/components/ui/button';
import { Users, Badge as BadgeIcon } from 'lucide-react';

export function ActionBar() {
  return (
    <div className="w-full">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-slate-900">Quick Actions</h3>
        <p className="text-slate-600 text-sm">No login required</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button
          onClick={() => window.open('https://explorer.celo.org/mainnet/validators', '_blank')}
          className="group relative overflow-hidden rounded-lg bg-gradient-to-r from-celo-green to-celo-green-dark p-1"
        >
          <div className="relative bg-white rounded-[5px] px-6 py-4 text-left transition-all duration-300 group-hover:bg-slate-50">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-lg font-bold text-slate-900 mb-1">Explore Validators</h4>
                <p className="text-sm text-slate-600">View active validators and their performance metrics</p>
              </div>
              <div className="ml-4 flex-shrink-0">
                <Users className="w-6 h-6 text-celo-green transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </div>
        </button>

        <button
          onClick={() => window.open('https://explorer.celo.org/mainnet/delegates', '_blank')}
          className="group relative overflow-hidden rounded-lg bg-gradient-to-r from-celo-gold-dark to-celo-gold p-1"
        >
          <div className="relative bg-white rounded-[5px] px-6 py-4 text-left transition-all duration-300 group-hover:bg-slate-50">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-lg font-bold text-slate-900 mb-1">Top Delegates</h4>
                <p className="text-sm text-slate-600">Discover top governance delegates and voting power</p>
              </div>
              <div className="ml-4 flex-shrink-0">
                <BadgeIcon className="w-6 h-6 text-celo-gold-dark transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}
