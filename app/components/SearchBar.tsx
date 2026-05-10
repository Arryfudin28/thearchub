'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';

export default function SearchBar() {
  const [address, setAddress] = useState('');

  return (
    <div className="mb-8">
      <div className="relative">
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter wallet address..."
          className="w-full bg-black/50 border border-cyan-500/50 rounded-lg px-4 py-3 pl-12 font-mono text-cyan-400 placeholder-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent backdrop-blur-lg"
        />
        <Search className="absolute left-3 top-3 h-6 w-6 text-cyan-500" />
      </div>
    </div>
  );
}