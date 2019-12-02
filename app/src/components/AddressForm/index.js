import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, TextField, Button } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import { flexbox } from '@material-ui/system';

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

const AddressForm = () => {
  const { push } = useHistory();
  const [address, setAddress] = useState('');

  return (
    <form
      autoComplete="off"
      onSubmit={e => {
        e.preventDefault();
        push(`address/${address}`);
      }}
    >
      <CenteredContainer maxWidth="sm">
        <StretchedTextField
          onChange={({ target: { value } }) => setAddress(value)}
          value={address}
          id="address-field"
          label="Jobcoin Address"
          required
        />
        <StretchedButton color="primary" type="submit" variant="outlined">
          Submit
        </StretchedButton>
      </CenteredContainer>
    </form>
  );
};

export default AddressForm;
