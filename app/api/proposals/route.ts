import { NextResponse } from 'next/server'
import { createPublicClient, http, fallback, parseAbi } from 'viem'
import { celo } from 'viem/chains'

// Governance Contract Address
const GOVERNANCE_PROXY = '0xD533Ca259b330c7A88f74E000a3FaEa2d63B7972'

// RPC endpoints para Celo mainnet
const CELO_RPC_URLS = [
  'https://forno.celo.org',
  'https://1rpc.io/celo',
]

// Propostas ativas/recentes do Mondo
const MONDO_PROPOSALS = [
  {
    id: 'cgp-salvador',
    cgpNumber: 181,
    title: 'Celo Community Fund: Salvador Ethereum Hub',
    description: 'Proposta para financiar um hub de educação e inovação em Ethereum/Celo em Salvador, Brasil. O hub fornecerá workshops, hackathons e recursos para desenvolvedores locais.',
    status: 'Voting',
    stage: 'Referendum',
    category: 'Education',
    votesYes: 52000000,
    votesNo: 8000000,
    votesAbstain: 3000000,
    proposer: '0x7B2e...9F3a',
    createdAt: '2026-04-12',
    expiresAt: '2026-04-22',
    link: 'https://mondo.celo.org/governance',
  },
  {
    id: 'cgp-l2',
    cgpNumber: 180,
    title: 'Core Dev Support: L2 Migration Strategy',
    description: 'Proposta para apoiar a equipe de desenvolvimento principal na estratégia de migração para L2, incluindo pesquisa, desenvolvimento de ferramentas e documentação técnica.',
    status: 'Queued',
    stage: 'Queued',
    category: 'Infrastructure',
    votesYes: 68000000,
    votesNo: 4000000,
    votesAbstain: 2000000,
    proposer: '0xCELO...DEV1',
    createdAt: '2026-04-08',
    queuedAt: '2026-04-15',
    link: 'https://mondo.celo.org/governance',
  },
  {
    id: 'cgp-latam',
    cgpNumber: 179,
    title: 'Regional DAO Growth: LATAM Expansion',
    description: 'Iniciativa para expandir o ecossistema Celo na América Latina através de DAOs regionais, parcerias locais e programas de grants para projetos de impacto social.',
    status: 'Executed',
    stage: 'Executed',
    category: 'Social Impact',
    votesYes: 85000000,
    votesNo: 3000000,
    votesAbstain: 1500000,
    proposer: '0xLATAM...DAO',
    createdAt: '2026-03-20',
    executedAt: '2026-04-05',
    link: 'https://mondo.celo.org/governance',
  },
]

export async function GET() {
  try {
    // Propostas do Mondo - Em produção, buscar da API oficial do Mondo
    const proposals = MONDO_PROPOSALS.map((proposal) => {
      const totalVotes = proposal.votesYes + proposal.votesNo + proposal.votesAbstain
      const approvalPercentage = totalVotes > 0 ? (proposal.votesYes / totalVotes) * 100 : 0

      return {
        ...proposal,
        totalVotes,
        approvalPercentage: Math.round(approvalPercentage * 10) / 10,
      }
    })

    return NextResponse.json({
      proposals,
      totalCount: proposals.length,
      lastUpdated: new Date().toISOString(),
    })
  } catch (error) {
    console.error('[Proposals API] Erro:', error)
    return NextResponse.json(
      { 
        error: 'Erro ao buscar propostas',
        proposals: [],
        totalCount: 0,
      },
      { status: 500 }
    )
  }
}
