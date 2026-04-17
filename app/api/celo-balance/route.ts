import { NextResponse } from 'next/server'
import { createPublicClient, http, formatEther, fallback } from 'viem'
import { celo } from 'viem/chains'

// Celo Community Fund address (correto conforme docs.celo.org)
const CELO_COMMUNITY_FUND = '0xD533Ca259b330c7A88f74E000a3FaEa2d63B7972'

// RPC endpoints para Celo mainnet
const CELO_RPC_URLS = [
  'https://forno.celo.org',
  'https://1rpc.io/celo',
  'https://celo-mainnet.infura.io/v3/84842078b09946638c03157f83405213',
]

export async function GET() {
  try {
    // Criar cliente com múltiplos transports como fallback
    const transports = CELO_RPC_URLS.map((url) => http(url))

    const client = createPublicClient({
      chain: celo,
      transport: fallback(transports),
    })

    // Buscar saldo da carteira
    const balanceWei = await client.getBalance({
      address: CELO_COMMUNITY_FUND as `0x${string}`,
    })

    const balanceFormatted = formatEther(balanceWei)
    const balanceNumber = Number(balanceFormatted)

    // Simulando alocação (70% alocado, 30% disponível)
    const allocatedFunds = balanceNumber * 0.7
    const availableFunds = balanceNumber * 0.3

    return NextResponse.json({
      totalBalance: balanceNumber,
      allocatedFunds: allocatedFunds,
      availableFunds: availableFunds,
      percentageAllocated: 70,
      percentageAvailable: 30,
      address: CELO_COMMUNITY_FUND,
    })
  } catch (error) {
    console.error('[Celo API] Erro ao buscar saldo:', error)

    // Se houver erro, retornar dados demo
    return NextResponse.json({
      totalBalance: 100000000,
      allocatedFunds: 70000000,
      availableFunds: 30000000,
      percentageAllocated: 70,
      percentageAvailable: 30,
      address: CELO_COMMUNITY_FUND,
      demo: true,
      error: error instanceof Error ? error.message : 'Erro desconhecido',
    })
  }
}
