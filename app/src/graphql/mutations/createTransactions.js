import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';
import { GET_ADDRESS_BALANCE_AND_TRANSACTIONS } from '../queries/getAddressBalanceAndTransactions';

export const CREATE_TRANSACTIONS = gql`
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

export const useCreateTransaction = address =>
  useMutation(CREATE_TRANSACTIONS, {
    refetchQueries: ({
      data: { transaction: { error, success } = {} } = {},
    } = {}) => {
      if (error) {
        window.alert(error);
      }

      return success
        ? [
            {
              query: GET_ADDRESS_BALANCE_AND_TRANSACTIONS,
              variables: { address },
            },
          ]
        : [];
    },
  });
