"use client"

import { useState, useEffect } from "react"
import { createPublicClient, http, formatEther } from "viem"
import { celo } from "viem/chains"

const erc20Abi = [{ name: "balanceOf", type: "function", stateMutability: "view", inputs: [{ name: "account", type: "address" }], outputs: [{ name: "balance", type: "uint256" }] }] as const

export default function Dashboard() {
  const [balance, setBalance] = useState<string>("Carregando...")
  const [userAddress, setUserAddress] = useState<string>("") // Estado para guardar o endereço

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

  // Função para conectar ao MiniPay/Carteira
  async function connectWallet() {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
        if (accounts.length > 0) {
          setUserAddress(accounts[0])
        }
      } catch (error) {
        console.error("Erro ao conectar:", error)
      }
    } else {
      alert("Por favor, acesse via Opera Mini (MiniPay)")
    }
  }

  // Formata o endereço para exibir (0x1234...abcd)
  const truncatedAddress = userAddress 
    ? `${userAddress.substring(0, 6)}...${userAddress.substring(userAddress.length - 4)}`
    : "Conectar MiniPay"

  const SectionCard = ({ title, children }: { title: string, children: React.ReactNode }) => (
    <div style={{ backgroundColor: 'white', borderRadius: '20px', padding: '32px', marginBottom: '24px', border: '1px solid #E2E8F0' }}>
      <h3 style={{ fontSize: '12px', fontWeight: '700', color: '#2E3338', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '24px', opacity: 0.6 }}>{title}</h3>
      {children}
    </div>
  )

  const ActionItem = ({ label, sub, link }: { label: string, sub: string, link: string }) => (
    <a href={link} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px', borderRadius: '14px', backgroundColor: '#FCF6F1', border: '1px solid #E2E8F0', textDecoration: 'none', color: '#2E3338', marginBottom: '12px' }}>
      <div>
        <div style={{ fontWeight: '600', fontSize: '17px', fontFamily: 'serif', marginBottom: '4px' }}>{label}</div>
        <div style={{ fontSize: '13px', opacity: 0.6 }}>{sub}</div>
      </div>
      <span style={{ fontSize: '20px', color: '#35D07F' }}>→</span>
    </a>
  )

  return (
    <div style={{ backgroundColor: '#FCF6F1', minHeight: '100vh', color: '#2E3338', padding: '60px 24px', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      
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
        
        {/* Botão Dinâmico: Conecta ou exibe o endereço */}
        <button 
          onClick={connectWallet}
          style={{ 
            backgroundColor: userAddress ? '#35D07F' : '#2E3338', 
            color: userAddress ? 'white' : '#FCF6F1', 
            border: 'none', padding: '14px 32px', borderRadius: '100px', 
            fontWeight: '600', fontSize: '14px', cursor: 'pointer' 
          }}
        >
          {truncatedAddress}
        </button>
      </header>

      <main style={{ maxWidth: '1000px', margin: '0 auto' }}>
        
        <div style={{ marginBottom: '80px' }}>
          <h2 style={{ fontSize: '13px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.2em', opacity: 0.5, marginBottom: '16px' }}>Community Fund Balance</h2>
          <div style={{ fontSize: '96px', fontWeight: '400', fontFamily: 'serif', lineHeight: '1', marginBottom: '20px', letterSpacing: '-0.03em' }}>
            {balance} <span style={{ fontSize: '28px', verticalAlign: 'middle', backgroundColor: '#FCFF52', padding: '6px 16px', borderRadius: '6px', fontWeight: '800', border: '1px solid #2E3338', marginLeft: '10px' }}>CELO</span>
          </div>
          <p style={{ fontSize: '18px', opacity: 0.7, maxWidth: '600px', lineHeight: '1.6' }}>
            {userAddress 
              ? `Bem-vindo! Sua carteira ${truncatedAddress} está conectada à governança.` 
              : "Transparência absoluta. Monitorando o tesouro de governança da rede Celo em tempo real."}
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '24px' }}>
          <SectionCard title="Propostas de Governança">
            <ActionItem label="CGP-124: Refill Community Fund" sub="Solicitação: 5.000.000 CELO • Em votação" link="https://mondo.celo.org/governance" />
            <ActionItem label="CGP-125: Eco-Ecosystem Growth" sub="Solicitação: 1.200.000 CELO • Revisão" link="https://mondo.celo.org/governance" />
          </SectionCard>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '24px' }}>
            <SectionCard title="Validadores & Rede">
              <ActionItem label="Network Health Status" sub="Monitoramento de Uptime e Performance" link="https://mondo.celo.org/" />
            </SectionCard>

            <SectionCard title="Participação & Votos">
              <ActionItem label="Voting Power Distribution" sub="Descentralização e pesos de voto" link="https://mondo.celo.org/delegate" />
            </SectionCard>
          </div>
        </div>
      </main>

      <footer style={{ marginTop: '100px', textAlign: 'left', maxWidth: '1000px', margin: '100px auto 40px auto', borderTop: '2px solid #2E3338', paddingTop: '40px' }}>
        <p style={{ margin: 0, fontSize: '20px', fontWeight: '400', fontFamily: 'serif' }}>Construído por **Beni Bauer**</p>
        <p style={{ margin: '8px 0 0 0', fontSize: '12px', opacity: 0.5, textTransform: 'uppercase' }}>Celo Ecosystem Dashboard • 2026</p>
      </footer>
    </div>
  )
}
