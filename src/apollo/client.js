import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { getCurrentNetworkLinks } from '../utils/data'

let selectedNetwork = getCurrentNetworkLinks()

export const client = new ApolloClient({
  link: new HttpLink({
    uri: selectedNetwork.CLIENT_APOLLO_LINK,
  }),
  cache: new InMemoryCache(),
  shouldBatch: true,
})

export const healthClient = new ApolloClient({
  link: new HttpLink({
    uri: selectedNetwork.HEALTH_CLIENT_LINK,
  }),
  cache: new InMemoryCache(),
  shouldBatch: true,
})

export const v1Client = new ApolloClient({
  link: new HttpLink({
    uri: 'https://api.thegraph.com/subgraphs/name/ianlapham/uniswap',
  }),
  cache: new InMemoryCache(),
  shouldBatch: true,
})

export const stakingClient = new ApolloClient({
  link: new HttpLink({
    uri: 'https://api.thegraph.com/subgraphs/name/way2rach/talisman',
  }),
  cache: new InMemoryCache(),
  shouldBatch: true,
})

export const blockClient = new ApolloClient({
  link: new HttpLink({
    uri: selectedNetwork.BLOCK_CLIENT_LINK,
  }),
  cache: new InMemoryCache(),
})
