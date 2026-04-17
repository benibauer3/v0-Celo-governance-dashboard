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

// Dados mockados de propostas baseados no Mondo
const MOCK_PROPOSALS = [
  {
    id: 'cgp-180',
    cgpNumber: 180,
    title: 'Celo Community Treasury Q2 2026 Budget Allocation',
    description: 'Proposta para alocar fundos do tesouro comunitário para iniciativas de educação, infraestrutura e impacto social no Q2 2026.',
    status: 'Voting',
    stage: 'Referendum',
    votesYes: 45000000,
    votesNo: 5000000,
    votesAbstain: 2000000,
    proposer: '0x1234...5678',
    createdAt: '2026-04-10',
    expiresAt: '2026-04-20',
    link: 'https://mondo.celo.org/governance/cgp-180',
  },
  {
    id: 'cgp-179',
    cgpNumber: 179,
    title: 'Protocol Upgrade: Celo Core v1.9',
    description: 'Atualização do protocolo Celo para a versão 1.9 com melhorias de performance e segurança.',
    status: 'Voting',
    stage: 'Referendum',
    votesYes: 62000000,
    votesNo: 3000000,
    votesAbstain: 1500000,
    proposer: '0xABCD...EF01',
    createdAt: '2026-04-08',
    expiresAt: '2026-04-18',
    link: 'https://mondo.celo.org/governance/cgp-179',
  },
  {
    id: 'cgp-178',
    cgpNumber: 178,
    title: 'Validator Set Expansion Program',
    description: 'Programa para expandir o conjunto de validadores ativos de 100 para 120 para aumentar a descentralização.',
    status: 'Executed',
    stage: 'Executed',
    votesYes: 80000000,
    votesNo: 2000000,
    votesAbstain: 500000,
    proposer: '0x9876...5432',
    createdAt: '2026-03-25',
    executedAt: '2026-04-05',
    link: 'https://mondo.celo.org/governance/cgp-178',
  },
  {
    id: 'cgp-177',
    cgpNumber: 177,
    title: 'Mento Reserve Diversification',
    description: 'Proposta para diversificar a reserva Mento com ativos adicionais para maior estabilidade.',
    status: 'Executed',
    stage: 'Executed',
    votesYes: 75000000,
    votesNo: 5000000,
    votesAbstain: 3000000,
    proposer: '0xDEAD...BEEF',
    createdAt: '2026-03-15',
    executedAt: '2026-03-28',
    link: 'https://mondo.celo.org/governance/cgp-177',
  },
  {
    id: 'cgp-176',
    cgpNumber: 176,
    title: 'Climate Action Fund Allocation',
    description: 'Alocação de 5M CELO para projetos de impacto climático e sustentabilidade.',
    status: 'Queued',
    stage: 'Queued',
    votesYes: 55000000,
    votesNo: 8000000,
    votesAbstain: 2000000,
    proposer: '0xCAFE...BABE',
    createdAt: '2026-04-12',
    queuedAt: '2026-04-14',
    link: 'https://mondo.celo.org/governance/cgp-176',
  },
  {
    id: 'cgp-175',
    cgpNumber: 175,
    title: 'DeFi Liquidity Incentives Program',
    description: 'Programa de incentivos para aumentar liquidez em protocolos DeFi no ecossistema Celo.',
    status: 'Expired',
    stage: 'Expired',
    votesYes: 25000000,
    votesNo: 40000000,
    votesAbstain: 10000000,
    proposer: '0xFACE...BOOK',
    createdAt: '2026-03-01',
    expiredAt: '2026-03-15',
    link: 'https://mondo.celo.org/governance/cgp-175',
  },
]

export async function GET() {
  try {
    // Por enquanto, retornamos dados mockados
    // Em produção, isso buscaria do banco de dados do Mondo ou da blockchain
    const proposals = MOCK_PROPOSALS.map((proposal) => {
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
