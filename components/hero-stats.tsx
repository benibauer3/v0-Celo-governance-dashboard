'use client';

import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Allocated Funds', value: 42500000, fill: '#35d07f' },
  { name: 'Available Balance', value: 57500000, fill: '#fcff52' },
];

const totalBalance = 100000000;

export function HeroStats() {
  return (
    <div className="w-full bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl border border-slate-200 p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Chart Section */}
        <div className="flex flex-col justify-center">
          <h3 className="text-2xl font-bold text-slate-900 mb-2">Celo Community Fund</h3>
          <p className="text-slate-600 mb-6">0xD533Ca0630fc6e7F9B172E9b04B3047aBeb2d235</p>
          
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={80}
                outerRadius={120}
                paddingAngle={2}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) => `${(value / 1000000).toFixed(1)}M CELO`}
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
            <p className="text-4xl font-bold text-slate-900">{(totalBalance / 1000000).toFixed(0)}M</p>
            <p className="text-slate-500 text-xs mt-1">CELO</p>
          </div>

          <div>
            <div className="flex justify-between items-center mb-3">
              <p className="text-slate-700 font-semibold">Fund Allocation</p>
              <p className="text-sm text-slate-600">42.5%</p>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
              <div
                className="bg-gradient-to-r from-celo-green to-celo-green-dark h-full rounded-full transition-all duration-500"
                style={{ width: '42.5%' }}
              />
            </div>
            <div className="flex justify-between items-center mt-3 text-xs text-slate-600">
              <span>Allocated: 42.5M CELO</span>
              <span>Available: 57.5M CELO</span>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 border border-slate-200 shadow-sm">
            <p className="text-slate-600 text-xs font-medium uppercase tracking-wide mb-2">Network Status</p>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-status-success rounded-full" />
              <p className="text-slate-900 font-medium">Active & Healthy</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
