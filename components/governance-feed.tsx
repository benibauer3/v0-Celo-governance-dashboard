'use client';

import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { ThumbsUp, MessageCircle, Clock } from 'lucide-react';

interface ProposalCard {
  id: string;
  title: string;
  description: string;
  status: 'Executed' | 'Voting' | 'Queued' | 'Expired';
  votesFor: number;
  votesTotal: number;
  timeRemaining?: string;
  author: string;
}

const proposals: ProposalCard[] = [
  {
    id: '1',
    title: 'Increase Community Fund Allocation to Education',
    description: 'Proposal to allocate 15M CELO to blockchain education initiatives across Africa.',
    status: 'Voting',
    votesFor: 8250,
    votesTotal: 10000,
    timeRemaining: '2 days remaining',
    author: 'Celo Foundation',
  },
  {
    id: '2',
    title: 'Infrastructure Grant Program Phase 2',
    description: 'Establish second phase of infrastructure development grants for developers.',
    status: 'Voting',
    votesFor: 7500,
    votesTotal: 10000,
    timeRemaining: '5 days remaining',
    author: 'Dev Team',
  },
  {
    id: '3',
    title: 'Sustainability Initiative Funding',
    description: 'Fund environmental and social impact projects in emerging markets.',
    status: 'Executed',
    votesFor: 9200,
    votesTotal: 10000,
    author: 'Impact DAO',
  },
  {
    id: '4',
    title: 'Protocol Enhancement v3.2',
    description: 'Deploy performance optimizations and security patches.',
    status: 'Queued',
    votesFor: 0,
    votesTotal: 0,
    author: 'Technical Committee',
  },
  {
    id: '5',
    title: 'Validator Incentive Structure Revision',
    description: 'Adjust validator rewards to improve network security.',
    status: 'Expired',
    votesFor: 5200,
    votesTotal: 10000,
    author: 'Governance Council',
  },
];

const statusColors = {
  Executed: 'bg-status-success/10 text-status-success border-status-success/20',
  Voting: 'bg-status-info/10 text-status-info border-status-info/20',
  Queued: 'bg-status-warning/10 text-status-warning border-status-warning/20',
  Expired: 'bg-status-error/10 text-status-error border-status-error/20',
};

const statusIcons = {
  Executed: '✓',
  Voting: '◉',
  Queued: '⧖',
  Expired: '✕',
};

export function GovernanceFeed() {
  return (
    <div className="w-full">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-slate-900 mb-2">Governance Feed</h3>
        <p className="text-slate-600">Real-time governance proposals and voting status</p>
      </div>

      <div className="space-y-4">
        {proposals.map((proposal) => (
          <Card
            key={proposal.id}
            className="p-6 border border-slate-200 hover:border-celo-green/30 transition-all duration-300 hover:shadow-md"
          >
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              {/* Content */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <Badge
                    className={`${statusColors[proposal.status]} border font-semibold`}
                    variant="outline"
                  >
                    <span className="mr-1">{statusIcons[proposal.status]}</span>
                    {proposal.status}
                  </Badge>
                  <span className="text-xs text-slate-500 font-medium"># {proposal.id}</span>
                </div>

                <h4 className="text-lg font-bold text-slate-900 mb-2 text-balance">{proposal.title}</h4>
                <p className="text-slate-600 text-sm mb-4">{proposal.description}</p>

                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600">
                  <div className="flex items-center gap-1">
                    <span className="font-medium">By:</span>
                    <span>{proposal.author}</span>
                  </div>

                  {proposal.timeRemaining && (
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{proposal.timeRemaining}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Voting Stats */}
              {proposal.votesTotal > 0 && (
                <div className="md:text-right md:min-w-fit">
                  <div className="flex items-center gap-2 justify-start md:justify-end mb-2">
                    <ThumbsUp className="w-4 h-4 text-celo-green" />
                    <span className="font-bold text-slate-900">
                      {(
                        (proposal.votesFor / proposal.votesTotal) *
                        100
                      ).toFixed(1)}%
                    </span>
                  </div>
                  <p className="text-xs text-slate-600">
                    {proposal.votesFor.toLocaleString()} /{' '}
                    {proposal.votesTotal.toLocaleString()} votes
                  </p>
                  <div className="w-32 bg-slate-200 rounded-full h-2 mt-2 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-celo-green to-celo-gold h-full rounded-full transition-all"
                      style={{
                        width: `${(proposal.votesFor / proposal.votesTotal) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
