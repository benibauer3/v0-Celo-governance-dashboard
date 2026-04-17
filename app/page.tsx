"use client"

import { useState, useEffect } from "react"
import { createPublicClient, http, formatEther } from "viem"
import { celo } from "viem/chains"
// Importe os componentes do seu Shadcn UI aqui (conforme o v0 gerou)
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

// 1. ABI Necessária para ler o saldo
const erc20Abi = [
  {
    name: "balanceOf",
    type: "function",
    stateMutability: "view",
    inputs: [{ name: "account", type: "address" }],
    outputs: [{ name: "balance", type: "uint256" }],
  },
]

export default function Dashboard() {
  const [balance, setBalance] = useState("0")
  const [isLoading, setIsLoading] = useState(true)

  // 2. Configuração do Client Celo
  const client = createPublicClient({
    chain: celo,
    transport: http("https://forno.celo.org"), // RPC Oficial
  })

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true)
        // Busca o saldo real do Community Fund
        const data = await client.readContract({
          address: "0x471EcE3750Da237f93B8E339c536989b8978a438", // CELO Token
          abi: erc20Abi,
          functionName: "balanceOf",
          args: ["0xD533Ca0630fc6e7F9B172E9b04B3047aBeb2d235"], // Community Fund
        })
        
        // Formata e simplifica o número para o Dashboard
        const formatted = parseFloat(formatEther(data as bigint)).toLocaleString('en-US', {
            maximumFractionDigits: 0
        })
        setBalance(formatted)
      } catch (error) {
        console.error("Erro ao buscar dados da Celo:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <div className="p-8 bg-[#123C13] min-h-screen text-white">
      {/* Exemplo de exibição do saldo no seu Card */}
      <Card className="bg-[#FCFF52] text-[#123C13]">
        <CardHeader>
          <CardTitle>Celo Community Fund</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-bold">
            {isLoading ? "Carregando..." : `${balance} CELO`}
          </div>
          <p className="text-sm opacity-80 mt-2">Dados reais da Mainnet</p>
        </CardContent>
      </Card>

      {/* Botão MiniPay Hook Ready */}
      <Button 
        onClick={() => window.ethereum?.request({ method: 'eth_requestAccounts' })}
        className="mt-4 bg-[#FCFF52] text-[#123C13] hover:bg-yellow-400"
      >
        Conectar MiniPay
      </Button>

      {/* Continue com o restante do layout gerado pelo v0 abaixo... */}
    </div>
  )
}
