const { gql } = require('apollo-server');

const typeDefs = gql`
    scalar DateTime
    type Query {
        address(address: ID!): Address
        transactions: [Transaction]
    }
    type Mutation {
        transaction(fromAddress: ID!, toAddress: ID!, amount: Float!): TransactionResponse!
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
    type TransactionResponse {
        success: Boolean!
        status: String
        error: String
    }
`;

module.exports = typeDefs;