# LazorKit Next.js Starter

A modern, high-quality starter template for building **Passkey-native** Solana applications using [LazorKit](https://github.com/lazor-kit/lazor-kit) and Next.js 14+.

![License](https://img.shields.io/badge/license-MIT-blue.svg) ![Next.js](https://img.shields.io/badge/Next.js-14-black) ![Solana](https://img.shields.io/badge/Solana-Devnet-green)

## Features

- ⚡ **Passkey Authentication**: Onboard users with FaceID/TouchID (no seed phrases).
- ⛽ **Gasless Transactions**: Sponsored transactions via LazorKit Paymaster.
- 🎨 **Modern UI**: Built with Tailwind CSS and Framer Motion aesthetics.
- ⚛️ **Next.js 14**: App Router and Server Components ready.

## Project Structure

```bash
lazor-kit-nextjs-starter/
├── app/
│   ├── layout.tsx       # Root layout including Providers
│   ├── page.tsx         # Main demo page
│   └── providers.tsx    # LazorKit configuration wrapper
├── components/
│   ├── login.tsx        # Passkey authentication component
│   └── transfer.tsx     # Gasless transaction component
├── public/              # Static assets
├── .env.local           # Environment variables (optional)
├── next.config.ts       # Next.js config
└── package.json         # Dependencies
```

## Quick Start

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Configure Environment** (Optional)
   The project comes pre-configured with public endpoints for instant testing. You can copy the defaults below to `.env.local` if you wish to override them:
   ```env
   NEXT_PUBLIC_RPC_URL=https://api.devnet.solana.com
   NEXT_PUBLIC_PORTAL_URL=https://portal.lazor.sh
   NEXT_PUBLIC_PAYMASTER_URL=https://lazorkit-paymaster.onrender.com
   ```

3. **Run Development Server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) with your browser.

## 📚 Step-by-Step Tutorials

### Tutorial 1: Implementing Passkey Login

**Goal**: Allow users to log in using FaceID/TouchID and automatically create a smart wallet.

**How it works**:
Unlike traditional wallets, LazorKit doesn't require users to install a browser extension. Instead, it uses the **WebAuthn standard** (Passkeys) to generate keys securely on the user's device.

1.  **Wrap your app**: We first wrap the application in `LazorkitProvider`. This initializes the connection to the RPC node and the LazorKit Portal (which handles the biometric pop-ups).
    ```tsx
    // app/providers.tsx
    <LazorkitProvider
      rpcUrl={...}
      portalUrl={...}
      paymasterConfig={...}
    >
      {children}
    </LazorkitProvider>
    ```

2.  **Connect**: In `components/login.tsx`, we use the `useWallet()` hook.
    ```tsx
    const { connect, wallet } = useWallet();
    ```
    When `connect()` is called, a secure window opens asking the user to verify their biometrics.
    
    *Behind the scenes*: Once verified, LazorKit deploys (or connects to) a **Smart Wallet (PDA)** on the Solana blockchain that is controlled by this specific Passkey. This is why you see a `smartWallet` address immediately.

### Tutorial 2: Sending Gasless Transactions

**Goal**: proper user experience often means users shouldn't worry about having SOL for gas fees.

**How it works**:
LazorKit creates **Smart Wallets**, which have the unique ability to let a third party (a **Paymaster**) pay for transaction fees.

1.  **Construct the Transaction**: We create a standard Solana instruction (e.g., a SystemProgram transfer).
    ```tsx
    // components/transfer.tsx
    SystemProgram.transfer({
        fromPubkey: new PublicKey(wallet.smartWallet), // SEND FROM THE SMART WALLET
        toPubkey: new PublicKey(recipient),
        lamports: ...
    })
    ```

2.  **Sponsor the Gas**: When signing, we specify a `feeToken`.
    ```tsx
    const sig = await signAndSendTransaction({
        instructions: [...],
        transactionOptions: { 
            feeToken: 'USDC' // magic happens here
        }
    });
    ```
    **Why this matters**: By specifying a fee token (or configuring the Paymaster to sponsor freely), the network fee is paid by the Paymaster service. The user needs **0 SOL** in their wallet to start using your app.

## 🔧 Troubleshooting

**Passkey "Not Allowed" or "Security Error"**
*   **Cause**: WebAuthn (Passkeys) security policies require the site to be served over **HTTPS** or be **localhost**.
*   **Fix**: 
    1.  Ensure you are testing on `http://localhost:3000`.
    2.  If testing on mobile via local network IP (e.g., `192.168.x.x`), it is **NOT** secure context. You must use a tunnelling service (like ngrok) or deploy to Vercel.

**"Connection Refused" on Localhost**
*   **Cause**: The default config might point to local backend ports (4000) if you modified `.env`.
*   **Fix**: Remove your `.env.local` file to fallback to the public LazorKit endpoints configured in `app/providers.tsx`.

**Deployment**
For the best demo experience, deploy to [Vercel](https://vercel.com):
1.  Push code to GitHub.
2.  Import project in Vercel.
3.  Deploy (Passkeys work perfectly on Vercel's HTTPS domains).

## Resources

- [LazorKit Documentation](https://github.com/lazor-kit/lazor-kit)
- [Solana Web3.js](https://solana-labs.github.io/solana-web3.js/)
