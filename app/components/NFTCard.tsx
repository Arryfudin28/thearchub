'use client';

import { motion } from 'framer-motion';

interface NFT {
  id: number;
  name: string;
  image: string;
}

export default function NFTCard({ nft }: { nft: NFT }) {
  return (
    <motion.div
      className="bg-white/5 backdrop-blur-lg border-2 border-cyan-400/30 rounded-lg p-4 shadow-lg shadow-cyan-400/10 hover:shadow-cyan-400/30 transition-shadow"
      whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(34, 211, 238, 0.5)' }}
    >
      <div className="aspect-square bg-gray-800 rounded mb-4 flex items-center justify-center">
        <span className="text-gray-400">Image Placeholder</span>
      </div>
      <div className="font-bold text-white">{nft.name}</div>
    </motion.div>
  );
}