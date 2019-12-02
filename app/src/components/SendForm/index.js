import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/react-hooks';
import createTransactions from '../../graphql/mutations/createTransactions';
import getAddressBalanceAndTransactions from '../../graphql/queries/getAddressBalanceAndTransactions';
import StretchedButton from '../../styled-components/StretchedButton';
import StretchedTextField from '../../styled-components/StretchedTextField';
import CenteredContainer from '../../styled-components/CenteredContainer';

const SendForm = ({ address }) => {
  const [destination, setDestination] = useState('');
  const [amount, setAmount] = useState('');
  const [
    sendData,
    { data: { transaction: { error, success = false } = {} } = {} } = {},
  ] = useMutation(createTransactions, {
    refetchQueries: ({
      data: { transaction: { error, success } = {} } = {},
    } = {}) => {
      if (error) {
        window.alert(error);
      }

      return success
        ? [{ query: getAddressBalanceAndTransactions, variables: { address } }]
        : [];
    },
  });

  return (
    <form
      autoComplete="off"
      onSubmit={e => {
        e.preventDefault();

        sendData({
          variables: {
            toAddress: destination,
            fromAddress: address,
            amount: Number(amount),
          },
        });
      }}
    >
      <CenteredContainer maxWidth="sm">
        <StretchedTextField
          onChange={({ target: { value } }) => setDestination(value)}
          value={destination}
          id="destination-field"
          label="Destination Address"
          required
        />
        <StretchedTextField
          onChange={({ target: { value } }) => setAmount(value)}
          value={amount}
          id="amount-field"
          label="Amount to Send"
          type="number"
          required
        />
        <StretchedButton color="primary" type="submit" variant="outlined">
          Submit
        </StretchedButton>
      </CenteredContainer>
    </form>
  );
};

SendForm.propTypes = {
  address: PropTypes.string,
};

SendForm.defaultProps = {
  address: '',
};

export default SendForm;
