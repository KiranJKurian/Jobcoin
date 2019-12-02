import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Container, TextField, Button } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import { flexbox } from '@material-ui/system';
import { useMutation } from '@apollo/react-hooks';
import createTransactions from '../../graphql/mutations/createTransactions';
import getAddressBalanceAndTransactions from '../../graphql/queries/getAddressBalanceAndTransactions';

const CenteredContainer = styled(Container)({
  alignItems: 'center',
  display: flexbox,
  flexDirection: 'column',
});

const StretchedTextField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  width: '100%',
}));

const StretchedButton = styled(Button)({
  width: '100%',
});

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

  console.log({ success, error });

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
