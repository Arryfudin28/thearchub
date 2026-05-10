import { ethers } from 'ethers';

const RPC_URL = 'https://rpc.testnet.arc.network';

export const getProvider = () => {
  return new ethers.JsonRpcProvider(RPC_URL);
};

export async function getBlockHeight(): Promise<number> {
  const provider = getProvider();
  return provider.getBlockNumber();
}

export async function getGasPrice(): Promise<string> {
  const provider = getProvider();
  const feeData = await provider.getFeeData();
  if (!feeData.gasPrice) return '0';
  return ethers.formatUnits(feeData.gasPrice, 'gwei');
}

export async function getLatestTransactions(limit: number = 10) {
  const provider = getProvider();
  const blockNumber = await provider.getBlockNumber();
  const transactions: any[] = [];

  for (let i = 0; i < Math.min(limit, 10); i++) {
    try {
      const block = await provider.getBlock(blockNumber - i);
      if (block && block.transactions.length > 0) {
        for (let j = 0; j < Math.min(block.transactions.length, 1); j++) {
          const txHash = block.transactions[j];
          const tx = await provider.getTransaction(txHash);
          if (tx) {
            transactions.push({
              hash: tx.hash,
              from: tx.from,
              to: tx.to || 'Contract Creation',
              value: tx.value ? ethers.formatUnits(tx.value, 18) : '0',
              blockNumber: tx.blockNumber,
              timestamp: block.timestamp,
              gasPrice: tx.gasPrice ? ethers.formatUnits(tx.gasPrice, 'gwei') : '0',
            });
          }
          if (transactions.length >= limit) break;
        }
      }
    } catch (error) {
      console.error(`Error fetching block ${blockNumber - i}:`, error);
    }
    if (transactions.length >= limit) break;
  }

  return transactions;
}

export async function getNetworkStats() {
  const provider = getProvider();
  const blockNumber = await provider.getBlockNumber();
  const block = await provider.getBlock(blockNumber);
  const gasPrice = await getGasPrice();

  return {
    blockHeight: blockNumber,
    blockTime: block ? Math.floor(Date.now() / 1000) - block.timestamp : 0,
    gasPrice: parseFloat(gasPrice),
    timestamp: Math.floor(Date.now() / 1000),
  };
}

export async function getBalance(address: string): Promise<string> {
  const provider = getProvider();
  try {
    const balance = await provider.getBalance(address);
    return ethers.formatUnits(balance, 18);
  } catch (error) {
    console.error('Error fetching balance:', error);
    return '0';
  }
}

export async function getUSDCBalance(address: string): Promise<string> {
  const provider = getProvider();
  const USDC_ADDRESS = '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913';
  const USDC_ABI = ['function balanceOf(address) public view returns (uint256)'];

  try {
    const contract = new ethers.Contract(USDC_ADDRESS, USDC_ABI, provider);
    const balance = await contract.balanceOf(address);
    return ethers.formatUnits(balance, 6);
  } catch (error) {
    console.error('Error fetching USDC balance:', error);
    return '0';
  }
}

export async function getTokenBalances(address: string) {
  const provider = getProvider();
  
  // Mock token list - in production, fetch from API
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
        const bal = await provider.getBalance(address);
        balance = ethers.formatUnits(bal, token.decimals);
      } else {
        // ERC20 token
        const ABI = ['function balanceOf(address) public view returns (uint256)'];
        const contract = new ethers.Contract(token.address, ABI, provider);
        const bal = await contract.balanceOf(address);
        balance = ethers.formatUnits(bal, token.decimals);
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