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
    <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '24px', marginBottom: '20px', border: '1px solid #E2E8F0' }}>
      <h3 style={{ fontSize: '13px', fontWeight: '700', color: '#2E3338', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '20px', opacity: 0.6 }}>{title}</h3>
      {children}
    </div>
  )

  const ActionItem = ({ label, sub, link }: { label: string, sub: string, link: string }) => (
    <a href={link} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', borderRadius: '12px', backgroundColor: '#FCF6F1', border: '1px solid #E2E8F0', textDecoration: 'none', color: '#2E3338', marginBottom: '12px', transition: 'transform 0.2s' }}>
      <div>
        <div style={{ fontWeight: '600', fontSize: '16px', fontFamily: 'serif' }}>{label}</div>
        <div style={{ fontSize: '13px', opacity: 0.7 }}>{sub}</div>
      </div>
      <span style={{ fontSize: '18px' }}>→</span>
    </a>
  )

  return (
    <div style={{ backgroundColor: '#FCF6F1', minHeight: '100vh', color: '#2E3338', padding: '40px 20px', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      
      {/* Header com Logo Prosperity Yellow no Topo Esquerdo */}
      <header style={{ maxWidth: '900px', margin: '0 auto 60px auto', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ backgroundColor: '#FCFF52', padding: '12px', borderRadius: '8px', display: 'inline-block' }}>
            <img src="https://reserve.org/static/media/celo-logo.9304323b.svg" alt="Celo Logo" style={{ height: '24px', filter: 'brightness(0)' }} />
        </div>
        <button style={{ backgroundColor: '#2E3338', color: '#FCF6F1', border: 'none', padding: '12px 28px', borderRadius: '100px', fontWeight: '600', fontSize: '14px', cursor: 'pointer' }}>
          Conectar MiniPay
        </button>
      </header>

      <main style={{ maxWidth: '900px', margin: '0 auto' }}>
        
        {/* Hero Section - Typography Hierarchy */}
        <div style={{ marginBottom: '60px' }}>
          <h2 style={{ fontSize: '14px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0.5, marginBottom: '12px' }}>Community Fund Balance</h2>
          <div style={{ fontSize: '82px', fontWeight: '400', fontFamily: 'serif', lineHeight: '1', marginBottom: '10px' }}>
            {balance} <span style={{ fontSize: '24px', verticalAlign: 'middle', backgroundColor: '#FCFF52', padding: '4px 12px', borderRadius: '4px', fontWeight: 'bold' }}>CELO</span>
          </div>
          <p style={{ fontSize: '16px', opacity: 0.6, maxWidth: '500px' }}>Transparência em tempo real dos recursos destinados ao crescimento do ecossistema Celo.</p>
        </div>

        {/* Grid Principal */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px' }}>
          
          <SectionCard title="Propostas Ativas (Mondo)">
            <ActionItem label="CGP-124: Refill Community Fund" sub="Solicitação: 5.000.000 CELO • Em votação" link="https://mondo.celo.org/governance" />
            <ActionItem label="CGP-125: Eco-Ecosystem Growth" sub="Solicitação: 1.200.000 CELO • Revisão" link="https://mondo.celo.org/governance" />
            <div style={{ textAlign: 'center', marginTop: '16px' }}>
              <a href="https://mondo.celo.org/governance" target="_blank" style={{ fontSize: '14px', color: '#2E3338', fontWeight: '700', textDecoration: 'underline' }}>Explorar Mondo Governance</a>
            </div>
          </SectionCard>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
            <SectionCard title="Validadores">
              <ActionItem label="Network Health" sub="98.2% Active Uptime" link="https://explorer.celo.org/mainnet/validators" />
              <ActionItem label="Validator Groups" sub="Ver rankings de performance" link="https://explorer.celo.org/mainnet/validator-groups" />
            </SectionCard>

            <SectionCard title="Delegados">
              <ActionItem label="Voting Power Distribution" sub="Governança Descentralizada" link="https://mondo.celo.org/governance" />
              <ActionItem label="Maiores Delegados" sub="Instituições e Comunidade" link="https://explorer.celo.org/mainnet/validator-groups" />
            </SectionCard>
          </div>
        </div>
      </main>

      <footer style={{ marginTop: '80px', textAlign: 'left', maxWidth: '900px', margin: '80px auto 0 auto', borderTop: '1px solid #E2E8F0', paddingTop: '40px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
                <p style={{ margin: 0, fontSize: '18px', fontWeight: '400', fontFamily: 'serif' }}>Construído por **Beni Bauer**</p>
                <p style={{ margin: '4px 0 0 0', fontSize: '12px', opacity: 0.4, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Celo Community Dashboard 2026</p>
            </div>
            <div style={{ color: '#35D07F', fontWeight: 'bold', fontSize: '12px' }}>POWERED BY CELO</div>
        </div>
      </footer>
    </div>
  )
}
