'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var Apollo = require('@apollo/client');
var utilities = require('@apollo/client/utilities');

// const GRAPHQL_URL = process.env.REACT_APP_AWS_API_ENDPOINT;
var GRAPHQL_URL = "https://beta.api.uniswap.org/v1/graphql";
var apolloClient = new Apollo.ApolloClient({
  connectToDevTools: true,
  uri: GRAPHQL_URL,
  headers: {
    "Content-Type": "application/json",
    Origin: "https://app.uniswap.org"
  },
  cache: new Apollo.InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          nftBalances: utilities.relayStylePagination(["ownerAddress", "filter"]),
          nftAssets: utilities.relayStylePagination(),
          nftActivity: utilities.relayStylePagination(),
          // tell apollo client how to reference Token items in the cache after being fetched by queries that return Token[]
          token: {
            read: function read(_, _ref) {
              var args = _ref.args,
                toReference = _ref.toReference;
              return toReference({
                __typename: "Token",
                chain: args === null || args === void 0 ? void 0 : args.chain,
                address: args === null || args === void 0 ? void 0 : args.address
              });
            }
          }
        }
      },
      Token: {
        // key by chain, address combination so that Token(chain, address) endpoint can read from cache
        /**
         * NOTE: In any query for `token` or `tokens`, you must include the `chain` and `address` fields
         * in order for result to normalize properly in the cache.
         */
        keyFields: ["chain", "address"],
        fields: {
          address: {
            read: function read(address) {
              var _address$toLowerCase;
              // backend endpoint sometimes returns checksummed, sometimes lowercased addresses
              // always use lowercased addresses in our app for consistency
              return (_address$toLowerCase = address === null || address === void 0 ? void 0 : address.toLowerCase()) !== null && _address$toLowerCase !== void 0 ? _address$toLowerCase : null;
            }
          }
        }
      }
    }
  }),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "cache-and-network"
    }
  }
});

exports.apolloClient = apolloClient;
