const { GraphQLDateTime } = require('graphql-iso-date');

module.exports = {
    DateTime: GraphQLDateTime,
    Query: {
        address: (_, { address }, { dataSources }) =>
            dataSources.jobcoinAPI.getAddress({ address }),
        transactions: (_, __, { dataSources }) =>
            dataSources.jobcoinAPI.getAllTransactions(),
    },
    Mutation: {
        transaction: (_, { fromAddress, toAddress, amount }, { dataSources }) =>
            dataSources.jobcoinAPI.createTransaction({ fromAddress, toAddress, amount }),
    },
  };
