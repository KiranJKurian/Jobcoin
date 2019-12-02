import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

export const GET_ADDRESS_BALANCE_AND_TRANSACTIONS = gql`
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

export const useAddressBalanceAndTransactions = address =>
  useQuery(GET_ADDRESS_BALANCE_AND_TRANSACTIONS, {
    variables: { address },
  });
