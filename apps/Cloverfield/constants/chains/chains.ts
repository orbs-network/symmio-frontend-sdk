import { SupportedChainId } from '@symmio/frontend-sdk/constants/chains';
import {
  bsc,
  fantom,
  base,
  polygon,
  arbitrum,
  mainnet,
  mantle,
  blast,
  Chain,
  mode,
} from 'wagmi/chains';
import { FrontEndsName } from './addresses';

const bera = {
  id: 80094,
  name: 'Berachain',
  nativeCurrency: {
    decimals: 18,
    name: 'BERA Token',
    symbol: 'BERA',
  },
  contracts: {
    multicall3: {
      address: '0xcA11bde05977b3631167028862bE2a173976CA11',
      blockCreated: 0,
    },
  },
  rpcUrls: {
    default: { http: ['https://rpc.berachain.com'] },
  },
  blockExplorers: {
    default: {
      name: 'Berascan',
      url: 'https://berascan.com',
    },
  },
  testnet: false,
};

const supportedWagmiChain = {
  [SupportedChainId.FANTOM]: fantom,
  [SupportedChainId.BSC]: bsc,
  [SupportedChainId.BASE]: base,
  [SupportedChainId.POLYGON]: polygon,
  [SupportedChainId.ARBITRUM]: arbitrum,
  [SupportedChainId.MAINNET]: mainnet,
  [SupportedChainId.MANTLE]: mantle,
  [SupportedChainId.BLAST]: blast,
  [SupportedChainId.MODE]: mode,
  [SupportedChainId.BERA]: bera,
};

function getWagmiChain(supportChainList: number[]): Chain[] {
  return supportChainList.map((chainId) => supportedWagmiChain[chainId]);
}

export const WEBSOCKET_RPC_URLS: { [key in SupportedChainId]?: string } = {
  [SupportedChainId.POLYGON]: 'wss://polygon.drpc.org',
  [SupportedChainId.BSC]: 'wss://bsc-rpc.publicnode.com',
  [SupportedChainId.MANTLE]: 'wss://mantle-rpc.publicnode.com',
  [SupportedChainId.BASE]: 'wss://base-rpc.publicnode.com',
  [SupportedChainId.BLAST]: 'wss://blast.drpc.org',
  [SupportedChainId.ARBITRUM]: 'wss://arbitrum-one-rpc.publicnode.com',
};

export const ClientChain = [
  SupportedChainId.POLYGON,
  SupportedChainId.BSC,
  SupportedChainId.MANTLE,
  SupportedChainId.BASE,
  SupportedChainId.BLAST,
  SupportedChainId.MODE,
  SupportedChainId.ARBITRUM,
  SupportedChainId.BERA,
];

export const ALL_CHAINS = Object.values(supportedWagmiChain);

export const APP_CHAINS = getWagmiChain(ClientChain);

export const FALLBACK_CHAIN_ID = SupportedChainId.POLYGON;
export const FALLBACK_FE_NAME = FrontEndsName.ORBS;
