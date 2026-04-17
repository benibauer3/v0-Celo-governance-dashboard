"use client"

import { useState, useEffect } from "react"
import { createPublicClient, http, formatEther } from "viem"
import { celo } from "viem/chains"

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
    // Trocando para um RPC mais robusto
    const client = createPublicClient({
      chain: celo,
      transport: http("https://rpc.ankr.com/celo"),
    })

    async function getCeloData() {
      try {
        const data = await client.readContract({
          address: "0x471EcE3750Da237f93B8E339c536989b8978a438",
          abi: erc20Abi,
          functionName: "balanceOf",
          args: ["0xD533Ca0630fc6e7F9B172E9b04B3047aBeb2d235"],
        })
        
        const formatted = new Intl.NumberFormat('en-US', { 
          maximumFractionDigits: 0 
        }).format(Number(formatEther(data as bigint)))
        
        setBalance(formatted)
      } catch (error) {
        console.error(error)
        setBalance("Indisponível")
      }
    }
    getCeloData()
  }, [])

  return (
    <div style={{ backgroundColor: '#123C13', minHeight: '100vh', color: 'white', padding: '20px', fontFamily: 'sans-serif' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
        <div>
          <h1 style={{ color: '#FCFF52', margin: 0, fontSize: '24px' }}>Celo Governance</h1>
          <p style={{ opacity: 0.7, margin: '5px 0 0 0' }}>Monitoramento em tempo real</p>
        </div>
        <button style={{ backgroundColor: '#FCFF52', color: '#123C13', border: 'none', padding: '10px 20px', borderRadius: '20px', fontWeight: 'bold', cursor: 'pointer' }}>
          Conectar MiniPay
        </button>
      </header>

      <div style={{ display: 'grid', gap: '20px' }}>
        {/* Card Principal */}
        <div style={{ backgroundColor: '#FCFF52', color: '#123C13', padding: '30px', borderRadius: '16px' }}>
          <h2 style={{ margin: 0, fontSize: '18px', opacity: 0.8 }}>Celo Community Fund</h2>
          <div style={{ fontSize: '48px', fontWeight: 'bold', margin: '10px 0' }}>
            {balance} <span style={{ fontSize: '20px' }}>CELO</span>
          </div>
          <p style={{ margin: 0, fontWeight: '500' }}>Saldo atual do tesouro de governança</p>
        </div>

        {/* Links */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
          <a href="https://mondo.celo.org/governance" target="_blank" rel="noopener noreferrer" 
             style={{ display: 'block', padding: '20px', border: '1px solid #FCFF52', borderRadius: '12px', color: '#FCFF52', textDecoration: 'none', textAlign: 'center', fontWeight: 'bold' }}>
            Propostas Ativas ↗
          </a>
          <a href="https://explorer.celo.org/mainnet/validators" target="_blank" rel="noopener noreferrer"
             style={{ display: 'block', padding: '20px', border: '1px solid #FCFF52', borderRadius: '12px', color: '#FCFF52', textDecoration: 'none', textAlign: 'center', fontWeight: 'bold' }}>
            Validadores ↗
          </a>
        </div>
      </div>

      <footer style={{ marginTop: '60px', textAlign: 'center', opacity: 0.5, fontSize: '12px', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '20px' }}>
        Desenvolvido para o Ipê City • Built with MiniPay
      </footer>
    </div>
  )
}
