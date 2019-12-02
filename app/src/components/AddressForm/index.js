import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import CenteredContainer from '../../styled-components/CenteredContainer';
import StretchedTextField from '../../styled-components/StretchedTextField';
import StretchedButton from '../../styled-components/StretchedButton';

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
