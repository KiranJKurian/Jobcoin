const { gql } = require('apollo-server');

const typeDefs = gql`
    scalar DateTime
    type Query {
        address(address: ID!): Address
        transactions: [Transaction]
    }
    type Address {
        address: ID!
        balance: Float!
        transactions: [Transaction]
    }
    type Transaction {
        timestamp: DateTime!
        toAddress: ID!
        amount: Float!
        fromAddress: ID
    }
`;

module.exports = typeDefs;