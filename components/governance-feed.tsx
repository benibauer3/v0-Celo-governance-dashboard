'use client'

import { useEffect, useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { ThumbsUp, ThumbsDown, Clock, ExternalLink, Loader2 } from 'lucide-react'

interface Proposal {
  id: string
  cgpNumber: number
  title: string
  description: string
  status: 'Executed' | 'Voting' | 'Queued' | 'Expired'
  stage: string
  category?: 'Education' | 'Infrastructure' | 'Social Impact'
  votesYes: number
  votesNo: number
  votesAbstain: number
  totalVotes: number
  approvalPercentage: number
  proposer: string
  createdAt: string
  expiresAt?: string
  executedAt?: string
  link: string
}

const statusColors: Record<string, string> = {
  Executed: 'bg-[#35D07F]/10 text-[#35D07F] border-[#35D07F]/30',
  Voting: 'bg-[#0EA5E9]/10 text-[#0EA5E9] border-[#0EA5E9]/30',
  Queued: 'bg-[#FBCC5C]/10 text-[#E5A229] border-[#FBCC5C]/30',
  Expired: 'bg-[#EF4444]/10 text-[#EF4444] border-[#EF4444]/30',
}

const statusLabels: Record<string, string> = {
  Executed: 'Executed',
  Voting: 'Active',
  Queued: 'Queued',
  Expired: 'Expired',
}

const categoryColors: Record<string, string> = {
  Education: 'bg-blue-100 text-blue-700 border-blue-200',
  Infrastructure: 'bg-purple-100 text-purple-700 border-purple-200',
  'Social Impact': 'bg-emerald-100 text-emerald-700 border-emerald-200',
}

function formatVotes(votes: number): string {
  if (votes >= 1000000) {
    return `${(votes / 1000000).toFixed(1)}M`
  }
  if (votes >= 1000) {
    return `${(votes / 1000).toFixed(0)}K`
  }
  return votes.toString()
}

function getTimeRemaining(expiresAt?: string): string | null {
  if (!expiresAt) return null
  const now = new Date()
  const expires = new Date(expiresAt)
  const diff = expires.getTime() - now.getTime()
  if (diff <= 0) return null
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  if (days > 0) return `${days} day${days > 1 ? 's' : ''} remaining`
  const hours = Math.floor(diff / (1000 * 60 * 60))
  return `${hours} hour${hours > 1 ? 's' : ''} remaining`
}

export function GovernanceFeed() {
  const [proposals, setProposals] = useState<Proposal[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProposals = async () => {
      try {
        setLoading(true)
        const response = await fetch('/api/proposals')
        if (!response.ok) throw new Error('Failed to fetch proposals')
        const data = await response.json()
        setProposals(data.proposals || [])
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    fetchProposals()
  }, [])

  if (loading) {
    return (
      <div className="w-full">
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-[#1E2336] mb-2">Governance Feed</h3>
          <p className="text-slate-600">Real-time governance proposals from Mondo</p>
        </div>
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 text-[#35D07F] animate-spin" />
          <span className="ml-3 text-slate-600">Loading proposals...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold text-[#1E2336] mb-2">Governance Feed</h3>
          <p className="text-slate-600">Real-time governance proposals from Mondo</p>
        </div>
        <a
          href="https://mondo.celo.org/governance"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-sm text-[#35D07F] hover:text-[#1D8E54] font-medium transition-colors"
        >
          View on Mondo
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}

      <div className="space-y-4">
        {proposals.map((proposal) => {
          const timeRemaining = getTimeRemaining(proposal.expiresAt)

          return (
            <Card
              key={proposal.id}
              className="p-6 border border-slate-200 hover:border-[#35D07F]/40 transition-all duration-300 hover:shadow-lg bg-white"
            >
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                {/* Content */}
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <Badge
                      className={`${statusColors[proposal.status]} border font-semibold`}
                      variant="outline"
                    >
                      {statusLabels[proposal.status]}
                    </Badge>
                    <span className="text-xs text-slate-500 font-mono bg-slate-100 px-2 py-1 rounded">
                      CGP-{proposal.cgpNumber}
                    </span>
                    {proposal.category && (
                      <Badge
                        className={`${categoryColors[proposal.category]} border font-medium text-xs`}
                        variant="outline"
                      >
                        {proposal.category}
                      </Badge>
                    )}
                  </div>

                  <a
                    href={proposal.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group"
                  >
                    <h4 className="text-lg font-bold text-[#1E2336] mb-2 text-balance group-hover:text-[#35D07F] transition-colors">
                      {proposal.title}
                    </h4>
                  </a>
                  <p className="text-slate-600 text-sm mb-4 line-clamp-2">
                    {proposal.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
                    <div className="flex items-center gap-1.5">
                      <span className="font-medium text-slate-600">Proposer:</span>
                      <span className="font-mono">{proposal.proposer}</span>
                    </div>

                    {timeRemaining && (
                      <div className="flex items-center gap-1.5 text-[#0EA5E9]">
                        <Clock className="w-3.5 h-3.5" />
                        <span className="font-medium">{timeRemaining}</span>
                      </div>
                    )}

                    {proposal.executedAt && (
                      <div className="flex items-center gap-1.5 text-[#35D07F]">
                        <span>Executed on {new Date(proposal.executedAt).toLocaleDateString('en-US')}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Voting Stats */}
                {proposal.totalVotes > 0 && (
                  <div className="lg:text-right lg:min-w-[180px] bg-slate-50 rounded-lg p-4">
                    <div className="flex items-center gap-3 justify-between lg:justify-end mb-3">
                      <div className="flex items-center gap-1.5">
                        <ThumbsUp className="w-4 h-4 text-[#35D07F]" />
                        <span className="font-bold text-[#35D07F]">
                          {proposal.approvalPercentage}%
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <ThumbsDown className="w-4 h-4 text-[#EF4444]" />
                        <span className="font-bold text-[#EF4444]">
                          {(100 - proposal.approvalPercentage - (proposal.votesAbstain / proposal.totalVotes * 100)).toFixed(1)}%
                        </span>
                      </div>
                    </div>

                    <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden mb-2">
                      <div className="flex h-full">
                        <div
                          className="bg-[#35D07F] h-full transition-all"
                          style={{ width: `${proposal.approvalPercentage}%` }}
                        />
                        <div
                          className="bg-[#FBCC5C] h-full transition-all"
                          style={{ width: `${(proposal.votesAbstain / proposal.totalVotes) * 100}%` }}
                        />
                        <div
                          className="bg-[#EF4444] h-full transition-all"
                          style={{ width: `${(proposal.votesNo / proposal.totalVotes) * 100}%` }}
                        />
                      </div>
                    </div>

                    <div className="flex justify-between text-xs text-slate-500">
                      <span>Yes: {formatVotes(proposal.votesYes)}</span>
                      <span>No: {formatVotes(proposal.votesNo)}</span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">
                      Total: {formatVotes(proposal.totalVotes)} votes
                    </p>
                  </div>
                )}
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
