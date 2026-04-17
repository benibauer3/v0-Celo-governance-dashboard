'use client';

import { Card } from '@/components/ui/card';
import { BookOpen, Zap, Heart } from 'lucide-react';

interface FundCategory {
  icon: React.ReactNode;
  title: string;
  description: string;
  allocated: number;
  percentage: number;
  color: string;
}

const fundCategories: FundCategory[] = [
  {
    icon: <BookOpen className="w-8 h-8" />,
    title: 'Education',
    description: 'Blockchain literacy and developer education programs',
    allocated: 15000000,
    percentage: 35.3,
    color: 'bg-blue-50 border-blue-200',
  },
  {
    icon: <Zap className="w-8 h-8" />,
    title: 'Infrastructure',
    description: 'Network development and technical improvements',
    allocated: 18000000,
    percentage: 42.4,
    color: 'bg-amber-50 border-amber-200',
  },
  {
    icon: <Heart className="w-8 h-8" />,
    title: 'Social Impact',
    description: 'Community initiatives and sustainable development',
    allocated: 9500000,
    percentage: 22.4,
    color: 'bg-green-50 border-green-200',
  },
];

export function TransparencyHub() {
  return (
    <div className="w-full">
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-slate-900 mb-2">Transparency Hub</h3>
        <p className="text-slate-600">Where your community funds are being allocated</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {fundCategories.map((category, index) => (
          <Card
            key={index}
            className={`p-6 border-2 transition-all duration-300 hover:shadow-lg ${category.color}`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="text-slate-900">{category.icon}</div>
              <div className="text-right">
                <p className="text-2xl font-bold text-slate-900">{category.percentage}%</p>
                <p className="text-xs text-slate-600 font-medium">of allocation</p>
              </div>
            </div>

            <h4 className="text-lg font-bold text-slate-900 mb-2">{category.title}</h4>
            <p className="text-sm text-slate-600 mb-6">{category.description}</p>

            <div className="pt-4 border-t border-slate-200">
              <p className="text-xs text-slate-600 font-medium mb-2">ALLOCATED</p>
              <p className="text-2xl font-bold text-celo-green">
                {(category.allocated / 1000000).toFixed(1)}M
              </p>
              <p className="text-xs text-slate-500 mt-1">CELO</p>
            </div>

            <div className="w-full bg-slate-200 rounded-full h-2 mt-4 overflow-hidden">
              <div
                className="bg-gradient-to-r from-celo-green to-celo-gold h-full rounded-full"
                style={{ width: `${category.percentage}%` }}
              />
            </div>
          </Card>
        ))}
      </div>

      {/* Summary Section */}
      <div className="mt-8 bg-gradient-to-r from-celo-green/5 to-celo-gold/10 rounded-xl border border-celo-green/20 p-6">
        <h4 className="text-lg font-bold text-slate-900 mb-4">Fund Distribution Summary</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <p className="text-sm text-slate-600 mb-1">Total Allocated</p>
            <p className="text-3xl font-bold text-celo-green">42.5M</p>
            <p className="text-xs text-slate-600 mt-1">of 100M total</p>
          </div>
          <div>
            <p className="text-sm text-slate-600 mb-1">Remaining Available</p>
            <p className="text-3xl font-bold text-celo-gold-dark">57.5M</p>
            <p className="text-xs text-slate-600 mt-1">for future initiatives</p>
          </div>
          <div>
            <p className="text-sm text-slate-600 mb-1">Active Projects</p>
            <p className="text-3xl font-bold text-slate-900">24</p>
            <p className="text-xs text-slate-600 mt-1">currently funded</p>
          </div>
        </div>
      </div>
    </div>
  );
}
