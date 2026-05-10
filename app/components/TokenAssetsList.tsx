'use client';

import { motion } from 'framer-motion';
import TokenAssetCard from './TokenAssetCard';

const mockTokens = [
  { name: 'ARC Token', symbol: 'ARC', balance: '1,234.56' },
  { name: 'Ethereum', symbol: 'ETH', balance: '0.5' },
  { name: 'USD Coin', symbol: 'USDC', balance: '500.00' },
];

export default function TokenAssetsList() {
  return (
    <div className="mb-8">
      <h3 className="text-xl font-bold text-purple-400 mb-4">Token Assets</h3>
      <div className="space-y-4">
        {mockTokens.map((token, index) => (
          <motion.div
            key={token.symbol}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <TokenAssetCard token={token} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}