import { gql } from 'apollo-boost';

export default gql`
  query getAddressBalanceAndTransactions($address: ID!) {
    address(address: $address) {
      balance
      transactions {
        amount
        timestamp
        toAddress
        fromAddress
      }
    }
  }
`;
