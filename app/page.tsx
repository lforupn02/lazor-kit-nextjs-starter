'use client';

import { Login } from '@/components/login';
import { Transfer } from '@/components/transfer';

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-black text-white selection:bg-purple-500/30">
      <div className="absolute inset-0 -z-10 h-full w-full bg-black [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)] opacity-20 pointer-events-none" />

      <main className="flex flex-col gap-8 row-start-2 items-center text-center w-full max-w-2xl">
        <div className="space-y-4">
          <h1 className="text-5xl sm:text-7xl font-bold bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent tracking-tighter">
            LazorKit
          </h1>
          <p className="text-xl text-gray-400 max-w-lg mx-auto">
            The Next.js Starter for <span className="text-blue-400">Passkey Authentication</span> and <span className="text-purple-400">Gasless Transactions</span> on Solana.
          </p>
        </div>

        <div className="flex flex-col gap-8 items-center w-full animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <Login />
          <Transfer />
        </div>
      </main>

      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center text-gray-500 text-sm">
        <a
          className="hover:text-white transition-colors flex items-center gap-2"
          href="https://github.com/lazor-kit/lazor-kit"
          target="_blank"
          rel="noopener noreferrer"
        >
          Documentation
        </a>
        <a
          className="hover:text-white transition-colors flex items-center gap-2"
          href="https://examples.lazor.kit"
          target="_blank"
          rel="noopener noreferrer"
        >
          Examples
        </a>
      </footer>
    </div>
  );
}
