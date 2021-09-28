import { BinanceIcon, HuobiIcon, PolygonIcon } from '../svg'
import hecoTokensConfig from '../config/tokens/heco.json'
import polygonTokensConfig from '../config/tokens/matic.json'

const params = new URLSearchParams(window.location.search.toString())
const networkName = params.get('network')

export const FACTORY_ADDRESSES = {
  binance: '0x4a3B76860C1b76f0403025485DE7bfa1F08C48fD',
  huobi:   '0x4a3B76860C1b76f0403025485DE7bfa1F08C48fD',
  polygon: '0x17c1D25D5a2d833c266639De5Fbe8896bDBeB234'
}

export const FACTORY_ADDRESS = FACTORY_ADDRESSES[networkName]

export const BUNDLE_ID = '1'

export const timeframeOptions = {
  WEEK: '1 week',
  MONTH: '1 month',
  // THREE_MONTHS: '3 months',
  // YEAR: '1 year',
  ALL_TIME: 'All time',
}

// token list urls to fetch tokens from - use for warnings on tokens and pairs
export const SUPPORTED_LIST_URLS__NO_ENS = [
  'https://raw.githubusercontent.com/pancakeswap/pancake-swap-interface/master/src/constants/token/pancakeswap.json',
]

// hide from overview list
export const OVERVIEW_TOKEN_BLACKLIST = [
  '0x495c7f3a713870f68f8b418b355c085dfdc412c3',
  '0xc3761eb917cd790b30dad99f6cc5b4ff93c4f9ea',
  '0xe31debd7abff90b06bca21010dd860d8701fd901',
  '0xfc989fbb6b3024de5ca0144dc23c18a063942ac1',
  '0xe40fc6ff5f2895b44268fd2e1a421e07f567e007',
  '0xfd158609228b43aa380140b46fff3cdf9ad315de',
  '0xc00af6212fcf0e6fd3143e692ccd4191dc308bea',
  '0x205969b3ad459f7eba0dee07231a6357183d3fb6',
  '0x0bd67d358636fd7b0597724aa4f20beedbf3073a',
  '0xedf5d2a561e8a3cb5a846fbce24d2ccd88f50075',
  '0x702b0789a3d4dade1688a0c8b7d944e5ba80fc30',
  '0x041929a760d7049edaef0db246fa76ec975e90cc',
  '0xba098df8c6409669f5e6ec971ac02cd5982ac108',
  '0x1bbed115afe9e8d6e9255f18ef10d43ce6608d94',
  '0xe99512305bf42745fae78003428dcaf662afb35d',
  '0xbE609EAcbFca10F6E5504D39E3B113F808389056',
]

// pair blacklist
export const PAIR_BLACKLIST = ['0xb6a741f37d6e455ebcc9f17e2c16d0586c3f57a5']

/**
 * For tokens that cause erros on fee calculations
 */
export const FEE_WARNING_TOKENS = ['0xd46ba6d942050d489dbd938a2c909a5d5039a161']

// export const CLIENT_APOLLO_LINK = window.location.search.network === 'huobi'

export const networks = [
  {
    title: 'huobi',
    label: 'HECO',
    icon: HuobiIcon,
    links: {
      CLIENT_APOLLO_LINK: 'https://q.hg.network/subgraphs/name/gravis/heco',
      HEALTH_CLIENT_LINK: 'https://h.hg.network/graphql',
      BLOCK_CLIENT_LINK: 'https://n10.hg.network/subgraphs/name/makiblocks/heco',
      // BLOCK_CLIENT_LINK: 'https://heco-graph.sashimi.cool/subgraphs/name/blocklytics/ethereum-blocks', // reserve
      SUBGRAPH_NAME: 'gravis/heco',
      SCAN_LINK: `${process.env.REACT_APP_HECO_INFO_LINK}/address/`,
      SCAN_LINK_TX: `${process.env.REACT_APP_HECO_INFO_LINK}/tx/`,
      SCAN_LINK_TOKEN: `${process.env.REACT_APP_HECO_INFO_LINK}/token/`,
      SCAN_LINK_BLOCK: `${process.env.REACT_APP_HECO_INFO_LINK}/block/`,
      TOKEN_TITLE: 'HT',
      SCAN_LINK_TITLE: 'viewOnHecoInfo',
      TOKENS_URL: (tokenAddress) => {
        // return `https://mdex.com/token-icons/heco/${tokenAddress}.png`
        // return console.log(hecoTokensConfig.tokens.find(token => token.address === tokenAddress))
        if (tokenAddress)
          return `${
            hecoTokensConfig.tokens
              .find((token) => token.address.toLowerCase() === tokenAddress.toLowerCase())
              ?.logoURI.includes('http')
              ? hecoTokensConfig.tokens.find((token) => token.address.toLowerCase() === tokenAddress.toLowerCase())
                  ?.logoURI
              : window.location.origin +
                hecoTokensConfig.tokens.find((token) => token.address.toLowerCase() === tokenAddress.toLowerCase())
                  ?.logoURI
          }`
      },
    },
  },
  {
    title: 'binance',
    label: 'BSC',
    icon: BinanceIcon,
    links: {
      // CLIENT_APOLLO_LINK: 'https://api.studio.thegraph.com/query/10086/chkbsc/v0.2.0',
      CLIENT_APOLLO_LINK: 'https://api.thegraph.com/subgraphs/name/vkolerts/bsc',
      HEALTH_CLIENT_LINK: 'https://api.bscgraph.org/graphql',
      BLOCK_CLIENT_LINK: 'https://api.thegraph.com/subgraphs/name/pancakeswap/blocks',
      SUBGRAPH_NAME: 'vkolerts/bsc',
      SCAN_LINK: `${process.env.REACT_APP_BSC_SCAN_LINK}/address/`,
      SCAN_LINK_TX: `${process.env.REACT_APP_BSC_SCAN_LINK}/tx/`,
      SCAN_LINK_TOKEN: `${process.env.REACT_APP_BSC_SCAN_LINK}/token/`,
      SCAN_LINK_BLOCK: `${process.env.REACT_APP_BSC_SCAN_LINK}/block/`,
      TOKEN_TITLE: 'BNB',
      SCAN_LINK_TITLE: 'viewOnBscscan',
      TOKENS_URL: (tokenName) => {
        return `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/smartchain/assets/${tokenName}/logo.png`
      },
    },
  },
  {
    title: 'polygon',
    label: 'Polygon',
    icon: PolygonIcon,
    links: {
      CLIENT_APOLLO_LINK: 'https://api.thegraph.com/subgraphs/name/darth-crypto/gravis-finance',
      HEALTH_CLIENT_LINK: 'https://api.thegraph.com/index-node/graphql',
      BLOCK_CLIENT_LINK: 'https://api.thegraph.com/subgraphs/name/sameepsi/maticblocks',
      SUBGRAPH_NAME: 'darth-crypto/gravis-finance',
      SCAN_LINK: `${process.env.REACT_APP_POLYGON_SCAN_LINK}/address/`,
      SCAN_LINK_TX: `${process.env.REACT_APP_POLYGON_SCAN_LINK}/tx/`,
      SCAN_LINK_TOKEN: `${process.env.REACT_APP_POLYGON_SCAN_LINK}/token/`,
      SCAN_LINK_BLOCK: `${process.env.REACT_APP_POLYGON_SCAN_LINK}/block/`,
      TOKEN_TITLE: 'MATIC',
      SCAN_LINK_TITLE: 'viewOnPolygonScan',
      TOKENS_URL: (tokenAddress) => {
        if (tokenAddress)
          return `${
            polygonTokensConfig.tokens
              .find((token) => token.address.toLowerCase() === tokenAddress.toLowerCase())
              ?.logoURI.includes('http')
              ? polygonTokensConfig.tokens.find((token) => token.address.toLowerCase() === tokenAddress.toLowerCase())
                  ?.logoURI
              : window.location.origin +
                polygonTokensConfig.tokens.find((token) => token.address.toLowerCase() === tokenAddress.toLowerCase())
                  ?.logoURI
          }`
      },
    },
  },
]

export const comparedNetworksIds = [
  {
    name: "huobi",
    networks: [128, 256],
  },
  {
    name: "binance",
    networks: [56, 97],
  },
  {
    name: "polygon",
    networks: [137, 80001],
  }
]
