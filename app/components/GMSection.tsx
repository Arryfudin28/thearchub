"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useAccount, useSendTransaction } from "wagmi";
import { parseEther } from "viem";

export default function GMSection() {
  const { isConnected, address } = useAccount();
  const { sendTransaction, isPending } = useSendTransaction();
  const [message, setMessage] = useState("");
  const [transactionHash, setTransactionHash] = useState<string | null>(null);

  const handleSendGM = async () => {
    if (!isConnected || !message.trim() || !address) return;

    try {
      // Send a minimal transaction (0 value) with GM message in data
      const messageHex = `0x${Buffer.from(message).toString("hex")}` as `0x${string}`;
      
      sendTransaction(
        {
          to: address as `0x${string}`, // Send to self
          value: parseEther("0"),
          data: messageHex.length > 66 ? (messageHex.slice(0, 66) as `0x${string}`) : messageHex,
        },
        {
          onSuccess: (hash) => {
            setTransactionHash(hash);
            setMessage("");
            setTimeout(() => setTransactionHash(null), 5000);
          },
          onError: (error) => {
            console.error("Transaction failed:", error);
          },
        }
      );
    } catch (error) {
      console.error("Error sending GM:", error);
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.6 }}
      className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/70 p-6 shadow-[0_16px_60px_-30px_rgba(59,130,246,0.45)] backdrop-blur-md"
    >
      {/* Scanning light effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-1000 animate-pulse" />

      <div className="relative z-10">
        <div className="mb-6">
          <p className="text-sm uppercase tracking-[0.3em] text-fuchsia-300/80">GM Terminal</p>
          <h2 className="mt-2 text-2xl font-semibold text-white">Send On-Chain GM</h2>
        </div>

        <div className="space-y-4">
          {!isConnected ? (
            <div className="rounded-lg border border-cyan-400/30 bg-cyan-950/20 p-4 text-center">
              <p className="text-cyan-300 mb-2">Connect your wallet to send GM</p>
              <div className="inline-block animate-pulse rounded-lg bg-cyan-500/20 px-4 py-2 text-cyan-300">
                Connect Wallet
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="rounded-lg bg-slate-900/50 p-4 font-mono text-sm">
                <div className="text-green-400">$ Connected: {address?.slice(0, 6)}...{address?.slice(-4)}</div>
                <div className="text-cyan-400">$ Ready to GM on ARC Testnet</div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm text-slate-400">Message:</label>
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value.slice(0, 20))} // Max 20 chars for TX data
                  placeholder="GM ☀️"
                  className="w-full rounded-lg border border-white/10 bg-slate-900/50 p-3 font-mono text-white placeholder-slate-500 focus:border-cyan-400/50 focus:outline-none"
                />
                <p className="text-xs text-slate-500">{message.length}/20 characters</p>
              </div>

              {transactionHash && (
                <div className="rounded-lg bg-green-950/30 border border-green-500/50 p-3">
                  <p className="text-green-400 text-sm font-mono">✓ GM sent!</p>
                  <p className="text-xs text-green-400/70 truncate">{transactionHash}</p>
                </div>
              )}

              <button
                onClick={handleSendGM}
                disabled={!message.trim() || isPending}
                className="w-full rounded-lg bg-gradient-to-r from-cyan-500 to-purple-500 px-4 py-3 font-semibold text-white disabled:opacity-50 hover:shadow-lg transition-all"
              >
                {isPending ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="inline-block animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                    Sending...
                  </span>
                ) : (
                  "Send GM"
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </motion.section>
  );
}
