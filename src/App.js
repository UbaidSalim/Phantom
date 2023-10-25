// App.js
import React from 'react';
import "./App.css"
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-phantom";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import WalletConnection from './component/WalletConnection';

const App = () => {  
  const rpc = 'https://api.testnet.solana.com';
  const providers = [
    new PhantomWalletAdapter()
  ];
  // const connection = new Connection(clusterApiUrl('devnet'), 'confirmed'); 
  
  console.log(rpc);
  return (
    <div className="App">
      <h1>Phantom Wallet Integration</h1>
      <ConnectionProvider endpoint={rpc}>
        <WalletProvider wallets={providers} autoConnect>
          <WalletModalProvider>
            <WalletConnection/>
            {/* <WalletConnection /> */}
            {/* Your app content */}
            {/* Display wallet information and interact with Solana blockchain */}
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </div>
  );
};

export default App;