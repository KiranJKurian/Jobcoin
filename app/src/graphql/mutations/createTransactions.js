import { gql } from 'apollo-boost';

export default gql`
  mutation createTransaction(
    $toAddress: ID!
    $fromAddress: ID!
    $amount: Float!
  ) {
    transaction(
      toAddress: $toAddress
      fromAddress: $fromAddress
      amount: $amount
    ) {
      status
      success
      error
    }
  }
`;
