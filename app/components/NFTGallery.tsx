'use client';

import { motion } from 'framer-motion';
import { useAccount } from 'wagmi';
import NFTCard from './NFTCard';

const mockNFTs = [
  { id: 1, name: 'Cyber Punk #001', image: '/placeholder.png' },
  { id: 2, name: 'Neon Warrior #042', image: '/placeholder.png' },
  { id: 3, name: 'Digital Artifact #133', image: '/placeholder.png' },
  { id: 4, name: 'Future Vision #256', image: '/placeholder.png' },
];

export default function NFTGallery() {
  const { isConnected } = useAccount();

  if (!isConnected) {
    return (
      <div>
        <h3 className="text-xl font-bold text-purple-400 mb-4">NFT Gallery</h3>
        <div className="bg-white/5 backdrop-blur-lg border border-purple-400/30 rounded-lg p-12 text-center">
          <p className="text-slate-300">Connect your wallet to view your NFTs</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h3 className="text-xl font-bold text-purple-400 mb-4">NFT Gallery</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockNFTs.map((nft, index) => (
          <motion.div
            key={nft.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <NFTCard nft={nft} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}