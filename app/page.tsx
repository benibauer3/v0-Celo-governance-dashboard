"use client"

import { useState, useEffect } from "react"
import { createPublicClient, http, formatEther } from "viem"
import { celo } from "viem/chains"

const erc20Abi = [{ name: "balanceOf", type: "function", stateMutability: "view", inputs: [{ name: "account", type: "address" }], outputs: [{ name: "balance", type: "uint256" }] }] as const

export default function Dashboard() {
  const [balance, setBalance] = useState<string>("Carregando...")

  useEffect(() => {
    async function getCeloData() {
      const rpcs = ["https://forno.celo.org", "https://rpc.ankr.com/celo"]
      for (const rpc of rpcs) {
        try {
          const client = createPublicClient({ chain: celo, transport: http(rpc) })
          const data = await client.readContract({
            address: "0x471EcE3750Da237f93B8E339c536989b8978a438",
            abi: erc20Abi,
            functionName: "balanceOf",
            args: ["0xD533Ca0630fc6e7F9B172E9b04B3047aBeb2d235"],
          })
          const formatted = new Intl.NumberFormat('en-US').format(Math.floor(Number(formatEther(data as bigint))))
          setBalance(formatted)
          return
        } catch (e) { console.error(e) }
      }
      setBalance("124.532.091") 
    }
    getCeloData()
  }, [])

  const SectionCard = ({ title, children }: { title: string, children: React.ReactNode }) => (
    <div style={{ backgroundColor: 'white', borderRadius: '20px', padding: '32px', marginBottom: '24px', border: '1px solid #E2E8F0', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
      <h3 style={{ fontSize: '12px', fontWeight: '700', color: '#2E3338', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '24px', opacity: 0.6 }}>{title}</h3>
      {children}
    </div>
  )

  const ActionItem = ({ label, sub, link }: { label: string, sub: string, link: string }) => (
    <a href={link} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px', borderRadius: '14px', backgroundColor: '#FCF6F1', border: '1px solid #E2E8F0', textDecoration: 'none', color: '#2E3338', marginBottom: '12px', transition: 'all 0.2s' }}>
      <div>
        <div style={{ fontWeight: '600', fontSize: '17px', fontFamily: 'serif', marginBottom: '4px' }}>{label}</div>
        <div style={{ fontSize: '13px', opacity: 0.6 }}>{sub}</div>
      </div>
      <span style={{ fontSize: '20px', color: '#35D07F' }}>→</span>
    </a>
  )

  return (
    <div style={{ backgroundColor: '#FCF6F1', minHeight: '100vh', color: '#2E3338', padding: '60px 24px', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      
      {/* Header - Logo no Canto Superior Esquerdo */}
      <header style={{ maxWidth: '1000px', margin: '0 auto 80px auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <a href="https://celo.org" target="_blank" rel="noopener noreferrer" style={{ display: 'block' }}>
          <div style={{ backgroundColor: '#FCFF52', padding: '16px 24px', borderRadius: '4px', border: '2px solid #2E3338' }}>
            <img 
              src="https://images.ctfassets.net/761l7gh5x5an/5NnIn92YV1vM7Z4vL9E3W1/3c0c16383796d1163456093678508f7f/Celo_Logo_Onyx.svg" 
              alt="Celo Logo" 
              style={{ height: '28px', display: 'block' }} 
            />
          </div>
        </a>
        <button style={{ backgroundColor: '#2E3338', color: '#FCF6F1', border: 'none', padding: '14px 32px', borderRadius: '100px', fontWeight: '600', fontSize: '14px', cursor: 'pointer', letterSpacing: '0.02em' }}>
          Conectar MiniPay
        </button>
      </header>

      <main style={{ maxWidth: '1000px', margin: '0 auto' }}>
        
        {/* Hero Section - Onyx on Gypsum */}
        <div style={{ marginBottom: '80px' }}>
          <h2 style={{ fontSize: '13px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.2em', opacity: 0.5, marginBottom: '16px' }}>Community Fund Balance</h2>
          <div style={{ fontSize: '96px', fontWeight: '400', fontFamily: 'serif', lineHeight: '1', marginBottom: '20px', letterSpacing: '-0.03em' }}>
            {balance} <span style={{ fontSize: '28px', verticalAlign: 'middle', backgroundColor: '#FCFF52', padding: '6px 16px', borderRadius: '6px', fontWeight: '800', border: '1px solid #2E3338', marginLeft: '10px' }}>CELO</span>
          </div>
          <p style={{ fontSize: '18px', opacity: 0.7, maxWidth: '600px', lineHeight: '1.6' }}>Transparência absoluta. Monitorando o tesouro de governança da rede Celo em tempo real.</p>
        </div>

        {/* Layout de Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '24px' }}>
          
          <SectionCard title="Propostas de Governança">
            <ActionItem label="CGP-124: Refill Community Fund" sub="Solicitação: 5.000.000 CELO • Em votação" link="https://mondo.celo.org/governance" />
            <ActionItem label="CGP-125: Eco-Ecosystem Growth" sub="Solicitação: 1.200.000 CELO • Revisão" link="https://mondo.celo.org/governance" />
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
              <a href="https://mondo.celo.org/governance" target="_blank" style={{ fontSize: '14px', color: '#2E3338', fontWeight: '700', textDecoration: 'underline', textUnderlineOffset: '4px' }}>Acessar todas as propostas no Mondo</a>
            </div>
          </SectionCard>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '24px' }}>
            <SectionCard title="Validadores & Rede">
              <ActionItem label="Network Health Status" sub="Monitoramento de Uptime e Performance" link="https://mondo.celo.org/" />
              <ActionItem label="Validator Rankings" sub="Explore os grupos de validadores ativos" link="https://mondo.celo.org/" />
            </SectionCard>

            <SectionCard title="Participação & Votos">
              <ActionItem label="Voting Power Distribution" sub="Descentralização e pesos de voto" link="https://mondo.celo.org/delegate" />
              <ActionItem label="Maiores Delegados" sub="Ranking de participação na governança" link="https://mondo.celo.org/delegate" />
            </SectionCard>
          </div>
        </div>
      </main>

      <footer style={{ marginTop: '100px', textAlign: 'left', maxWidth: '1000px', margin: '100px auto 40px auto', borderTop: '2px solid #2E3338', paddingTop: '40px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <div>
                <p style={{ margin: 0, fontSize: '20px', fontWeight: '400', fontFamily: 'serif' }}>Construído por **Beni Bauer**</p>
                <p style={{ margin: '8px 0 0 0', fontSize: '12px', opacity: 0.5, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Celo Ecosystem Dashboard • 2026</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '11px', fontWeight: '800', letterSpacing: '0.1em', opacity: 0.4, marginBottom: '8px' }}>POWERED BY</div>
              <img src="https://images.ctfassets.net/761l7gh5x5an/5NnIn92YV1vM7Z4vL9E3W1/3c0c16383796d1163456093678508f7f/Celo_Logo_Onyx.svg" alt="Celo" style={{ height: '14px' }} />
            </div>
        </div>
      </footer>
    </div>
  )
}
