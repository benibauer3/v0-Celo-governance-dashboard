import { NextResponse } from 'next/server'
import { createPublicClient, http, formatEther } from 'viem'
import { celo } from 'viem/chains'

// Celo Community Fund address
const CELO_COMMUNITY_FUND = '0xD533Ca0630fc6e7F9B172E9b04B3047aBeb2d235'

export async function GET() {
  try {
    const client = createPublicClient({
      chain: celo,
      transport: http(),
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
    return NextResponse.json(
      {
        error: 'Erro ao buscar saldo',
        totalBalance: 0,
        allocatedFunds: 0,
        availableFunds: 0,
        percentageAllocated: 0,
        percentageAvailable: 0,
      },
      { status: 500 }
    )
  }
}
