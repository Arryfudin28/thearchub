import { createPublicClient, http, formatEther, formatGwei } from 'viem';
import { arcTestnet } from '@/app/components/Web3Provider';

const client = createPublicClient({
  chain: arcTestnet,
  transport: http('https://rpc.testnet.arc.network'),
});

export async function getBlockHeight(): Promise<number> {
  return Number(await client.getBlockNumber());
}

export async function getGasPrice(): Promise<string> {
  const gasPrice = await client.getGasPrice();
  return formatGwei(gasPrice);
}

export async function getLatestTransactions(limit: number = 10) {
  const blockNumber = await client.getBlockNumber();
  const transactions: any[] = [];

  // Get transactions from the last 20 blocks
  for (let i = 0; i < Math.min(20, Number(blockNumber)); i++) {
    try {
      const block = await client.getBlock({
        blockNumber: blockNumber - BigInt(i),
        includeTransactions: true,
      });

      if (block.transactions && block.transactions.length > 0) {
        for (const tx of block.transactions) {
          transactions.push({
            hash: tx.hash,
            from: tx.from,
            to: tx.to || 'Contract Creation',
            value: formatEther(tx.value),
            blockNumber: tx.blockNumber,
            timestamp: Number(block.timestamp),
            gasPrice: formatGwei(tx.gasPrice || BigInt(0)),
          });

          if (transactions.length >= limit) break;
        }
      }

      if (transactions.length >= limit) break;
    } catch (error) {
      console.error(`Error fetching block ${blockNumber - BigInt(i)}:`, error);
    }
  }

  return transactions;
}

export async function getNetworkStats() {
  const blockNumber = await client.getBlockNumber();
  const block = await client.getBlock({ blockNumber });
  const gasPrice = await client.getGasPrice();

  return {
    blockHeight: Number(blockNumber),
    blockTime: block ? Math.floor(Date.now() / 1000) - Number(block.timestamp) : 0,
    gasPrice: parseFloat(formatGwei(gasPrice)),
    timestamp: Math.floor(Date.now() / 1000),
  };
}

export async function getBalance(address: `0x${string}`): Promise<string> {
  try {
    const balance = await client.getBalance({ address });
    return formatEther(balance);
  } catch (error) {
    console.error('Error fetching balance:', error);
    return '0';
  }
}

export async function getUSDCBalance(address: `0x${string}`): Promise<string> {
  const USDC_ADDRESS = '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913' as `0x${string}`;
  const USDC_ABI = [
    {
      inputs: [{ name: 'account', type: 'address' }],
      name: 'balanceOf',
      outputs: [{ name: '', type: 'uint256' }],
      stateMutability: 'view',
      type: 'function',
    },
  ] as const;

  try {
    const balance = await client.readContract({
      address: USDC_ADDRESS,
      abi: USDC_ABI,
      functionName: 'balanceOf',
      args: [address],
    });
    return (Number(balance) / 1e6).toFixed(2); // USDC has 6 decimals
  } catch (error) {
    console.error('Error fetching USDC balance:', error);
    return '0';
  }
}

export async function getTokenBalances(address: `0x${string}`) {
  const tokens = [
    {
      name: 'ARC',
      symbol: 'ARC',
      address: '0x0000000000000000000000000000000000000000',
      decimals: 18,
    },
    {
      name: 'USD Coin',
      symbol: 'USDC',
      address: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
      decimals: 6,
    },
  ];

  const balances = [];

  for (const token of tokens) {
    try {
      let balance: string;

      if (token.address === '0x0000000000000000000000000000000000000000') {
        // Native token (ARC)
        const bal = await client.getBalance({ address });
        balance = formatEther(bal);
      } else {
        // ERC20 token
        const ABI = [
          {
            inputs: [{ name: 'account', type: 'address' }],
            name: 'balanceOf',
            outputs: [{ name: '', type: 'uint256' }],
            stateMutability: 'view',
            type: 'function',
          },
        ] as const;

        const bal = await client.readContract({
          address: token.address as `0x${string}`,
          abi: ABI,
          functionName: 'balanceOf',
          args: [address],
        });
        balance = (Number(bal) / Math.pow(10, token.decimals)).toString();
      }

      balances.push({
        ...token,
        balance: parseFloat(balance).toFixed(4),
      });
    } catch (error) {
      console.error(`Error fetching balance for ${token.symbol}:`, error);
    }
  }

  return balances;
}

export async function getVolumeData(blocks: number = 50) {
  const blockNumber = await client.getBlockNumber();
  const volumeData: { date: string; volume: number }[] = [];

  for (let i = 0; i < blocks; i++) {
    try {
      const block = await client.getBlock({
        blockNumber: blockNumber - BigInt(i),
        includeTransactions: true,
      });

      if (block.transactions) {
        const blockVolume = block.transactions.reduce((sum, tx) => {
          return sum + parseFloat(formatEther(tx.value));
        }, 0);

        const date = new Date(Number(block.timestamp) * 1000);
        const dateKey = date.toISOString().split('T')[0]; // YYYY-MM-DD

        const existingEntry = volumeData.find(d => d.date === dateKey);
        if (existingEntry) {
          existingEntry.volume += blockVolume;
        } else {
          volumeData.push({ date: dateKey, volume: blockVolume });
        }
      }
    } catch (error) {
      console.error(`Error fetching block ${blockNumber - BigInt(i)}:`, error);
    }
  }

  // Sort by date and return last 30 days
  return volumeData
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(-30);
}