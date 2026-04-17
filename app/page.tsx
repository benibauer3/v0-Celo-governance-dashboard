"use client"

import { useState, useEffect } from "react"
import { createPublicClient, http, formatEther } from "viem"
import { celo } from "viem/chains"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, Wallet, Users, BarChart3 } from "lucide-react"

// ABI Mínima para ler saldo de tokens
const erc20Abi = [
  {
    name: "balanceOf",
    type: "function",
    stateMutability: "view",
    inputs: [{ name: "account", type: "address" }],
    outputs: [{ name: "balance", type: "uint256" }],
  },
] as const

export default function Dashboard() {
  const [balance, setBalance] = useState<string>("Carregando...")

  useEffect(() => {
    const client = createPublicClient({
      chain: celo,
      transport: http("https://forno.celo.org"),
    })

    async function getCeloData() {
      try {
        const data = await client.readContract({
          address: "0x471EcE3750Da237f93B8E339c536989b8978a438", // CELO Mainnet Token
          abi: erc20Abi,
          functionName: "balanceOf",
          args: ["0xD533Ca0630fc6e7F9B172E9b04B3047aBeb2d235"], // Community Fund Address
        })
        
        const formatted = new Intl.NumberFormat('en-US', { 
          maximumFractionDigits: 0 
        }).format(Number(formatEther(data as bigint)))
        
        setBalance(formatted)
      } catch (error) {
        console.error("Erro ao buscar dados:", error)
        setBalance("Erro")
      }
    }

    getCeloData()
  }, [])

  return (
    <div className="min-h-screen bg-[#123C13] text-white p-4 md:p-8 font-sans">
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#FCFF52]">Celo Governance</h1>
          <p className="text-sm opacity-70">Monitoramento em tempo real</p>
        </div>
        <Button 
          onClick={() => window.ethereum?.request({ method: 'eth_requestAccounts' })}
          className="bg-[#FCFF52] text-[#123C13] hover:bg-yellow-400 font-bold"
        >
          <Wallet className="mr-2 h-4 w-4" /> Conectar MiniPay
        </Button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Card de Saldo Principal */}
        <Card className="bg-[#FCFF52] border-none text-[#123C13] lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium">Celo Community Fund</CardTitle>
            <BarChart3 className="h-5 w-5 opacity-70" />
          </CardHeader>
          <CardContent>
            <div className="text-5xl font-bold tracking-tighter">
              {balance} <span className="text-2xl">CELO</span>
            </div>
            <p className="text-sm mt-4 font-semibold">Total disponível para propostas da comunidade</p>
          </CardContent>
        </Card>

        {/* Links Rápidos */}
        <Card className="bg-[#1a4d1b] border-[#2a5d2b] text-white">
          <CardHeader>
            <CardTitle className="text-lg">Recursos</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <Button asChild variant="outline" className="justify-start border-[#FCFF52] text-[#FCFF52] hover:bg-[#FCFF52] hover:text-[#123C13]">
              <a href="https://mondo.celo.org/governance" target="_blank" rel="noopener noreferrer">
                Propostas Ativas <ArrowUpRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button asChild variant="outline" className="justify-start border-[#FCFF52] text-[#FCFF52] hover:bg-[#FCFF52] hover:text-[#123C13]">
              <a href="https://explorer.celo.org/mainnet/validators" target="_blank" rel="noopener noreferrer">
                Validadores <ArrowUpRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </CardContent>
        </Card>
      </div>

      <footer className="mt-12 pt-8 border-t border-white/10 text-center opacity-50 text-sm">
        <p>Desenvolvido para o ecossistema Celo • Built with MiniPay</p>
      </footer>
    </div>
  )
}
