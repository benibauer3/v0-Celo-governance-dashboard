"use client"

import { useState } from "react"
import { Wallet, Users, BarChart3, ArrowUpRight } from "lucide-react"

export default function Dashboard() {
  const [balance] = useState<string>("125.432.120") // Valor estático para testar o visual

  return (
    <div className="min-h-screen bg-[#123C13] text-white p-4 md:p-8 font-sans">
      <header className="flex justify-between items-center mb-8 border-b border-white/10 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-[#FCFF52]">Celo Governance Tracker</h1>
          <p className="text-sm opacity-70">built for Ipê City</p>
        </div>
        <button 
          onClick={() => window.ethereum?.request({ method: 'eth_requestAccounts' })}
          className="bg-[#FCFF52] text-[#123C13] hover:bg-yellow-400 font-bold px-4 py-2 rounded-md flex items-center text-sm"
        >
          <Wallet className="mr-2 h-4 w-4" /> Conectar MiniPay
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Card de Saldo - HTML PURO */}
        <div className="bg-[#FCFF52] rounded-lg p-6 text-[#123C13] lg:col-span-2 shadow-lg">
          <div className="flex flex-row items-center justify-between pb-2">
            <h3 className="text-lg font-medium">Celo Community Fund Balance</h3>
            <BarChart3 className="h-5 w-5 opacity-70" />
          </div>
          <div className="text-5xl font-bold tracking-tighter mt-4">
            {balance} <span className="text-2xl">CELO</span>
          </div>
          <p className="text-sm mt-4 font-semibold">Total disponível para propostas da comunidade</p>
        </div>

        {/* Links Rápidos - HTML PURO */}
        <div className="bg-[#1a4d1b] rounded-lg p-6 border border-[#2a5d2b] shadow-lg">
          <div className="pb-4">
            <h3 className="text-lg font-medium text-white">Recursos e Links</h3>
          </div>
          <div className="flex flex-col gap-3">
            <a 
              href="https://mondo.celo.org/governance" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full justify-start border border-[#FCFF52] text-[#FCFF52] hover:bg-[#FCFF52] hover:text-[#123C13] font-bold px-4 py-2 rounded-md flex items-center"
            >
              Propostas Ativas <ArrowUpRight className="ml-2 h-4 w-4" />
            </a>
            <a 
              href="https://explorer.celo.org/mainnet/validators" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full justify-start border border-[#FCFF52] text-[#FCFF52] hover:bg-[#FCFF52] hover:text-[#123C13] font-bold px-4 py-2 rounded-md flex items-center"
            >
              Validadores <ArrowUpRight className="ml-2 h-4 w-4" />
            </a>
          </div>
        </div>
      </div>

      <footer className="mt-12 pt-8 border-t border-white/10 text-center opacity-50 text-sm">
        <p>Built with MiniPay for the Celo Ecosystem • Ipê City</p>
      </footer>
    </div>
  )
}
