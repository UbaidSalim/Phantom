import { createAssociatedTokenAccountInstruction, createInitializeMintInstruction, createMintToInstruction, getAssociatedTokenAddressSync } from "@solana/spl-token";
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { Keypair, Transaction } from '@solana/web3.js';
import React, { useCallback, useEffect, useState } from 'react';
import {AccountLayout, TOKEN_PROGRAM_ID} from "@solana/spl-token";
import {clusterApiUrl, Connection, PublicKey} from "@solana/web3.js";
window.Buffer = window.Buffer || require("buffer").Buffer;
const WalletConnection = () => {

  const fetchTokenAccounts = async () => {
    const connection = new Connection(clusterApiUrl('testnet'), 'confirmed');

  const tokenAccounts = await connection.getTokenAccountsByOwner(
    new PublicKey('GUBR4Tuf3i1j5v99eMWL1L46J9c17RyrrAzkTx8YpnjU'),
    {
      programId: TOKEN_PROGRAM_ID,
    }
  );
  console.log(tokenAccounts,"asdas");
  console.log("Token Balance");
  tokenAccounts.value.forEach((tokenAccount) => {
    const accountData = AccountLayout.decode(tokenAccount.account.data);
    
    console.log(`${new PublicKey(accountData.mint)}   ${accountData.amount}`);
  })

};

  // const { connection } = useConnection();
  // const wallet = useWallet();
  // const [tokenAccounts, setTokenAccounts] = useState([]);

  // const fetchTokenAccounts = useCallback(async () => {
  //   if (wallet.publicKey) {
  //     const temp = await connection.getParsedTokenAccountsByOwner(
  //       wallet.publicKey,
  //     );
  //     setTokenAccounts(temp.value);
  //   }
  // }, [connection, wallet.publicKey]);

  // useEffect(() => {
  //   if (wallet.connected) {
  //     fetchTokenAccounts();
  //   }
  // }, [wallet.connected, fetchTokenAccounts]);

  // const newToken = useCallback(async () => {
    
  //   // if (!wallet.publicKey) {
  //   //   return;
  //   // }
  //   var mint = Keypair.generate();
  //   try {
  //     console.log(mint.publicKey)
  //     if (!mint || !mint.publicKey) {
  //       throw new Error("Failed to generate mint keypair");
  //     }
      
  //     console.log(wallet.publicKey," wallet key")
  //     console.log(wallet.publicKey, "wallet publicKey")
  //     console.log(mint.publicKey, "mint publicKey")

  //     const tokenAccount = getAssociatedTokenAddressSync(mint.publicKey, wallet.publicKey);
  //     console.log(tokenAccount);
  //     const tx = new Transaction().add(
  //       createInitializeMintInstruction(mint.publicKey, 9, wallet.publicKey, wallet.publicKey),
  //       createAssociatedTokenAccountInstruction(wallet.publicKey, tokenAccount, wallet.publicKey, mint.publicKey),
  //       createMintToInstruction(mint.publicKey, wallet.publicKey, tokenAccount, 10)
  //     );
  
  //     const latestBlockhash = await connection.getLatestBlockhash();
  //     tx.feePayer = wallet.publicKey;
  //     tx.recentBlockhash = latestBlockhash.blockhash;
  //     const signedTx = await wallet.signTransaction(tx);
  //     const signature = await connection.sendTransaction(signedTx);
  //     await connection.confirmTransaction({
  //       signature,
  //       blockhash: latestBlockhash.blockhash,
  //       lastValidBlockHeight: latestBlockhash.lastValidBlockHeight
  //     });
  //     fetchTokenAccounts();
  //   } catch (error) {
  //     console.error("Error minting token:", error);
  //   }
  // }, [connection, wallet, fetchTokenAccounts]);
  
  return (
    <div>
      <WalletMultiButton />'

      <button onClick={fetchTokenAccounts}>Fetch</button>
      {/* Display tokenAccounts */}
           {/* Display token accounts as a list */}

    </div>
  );
};

export default WalletConnection;
