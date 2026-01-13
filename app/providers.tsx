'use client';

import { LazorkitProvider } from '@lazorkit/wallet';
import { ReactNode } from 'react';

export function Providers({ children }: { children: ReactNode }) {
  // Use environment variables for configuration or fallback to public defaults
  const rpcUrl = process.env.NEXT_PUBLIC_RPC_URL || 'https://api.devnet.solana.com';
  const portalUrl = process.env.NEXT_PUBLIC_PORTAL_URL || 'https://portal.lazor.sh';
  const paymasterUrl = process.env.NEXT_PUBLIC_PAYMASTER_URL || 'https://lazorkit-paymaster.onrender.com';

  return (
    <LazorkitProvider
      rpcUrl={rpcUrl}
      portalUrl={portalUrl}
      paymasterConfig={{
        paymasterUrl: paymasterUrl,
      }}
    >
      {children}
    </LazorkitProvider>
  );
}
