import React from 'react';
import { Card, CardContent, Container } from '@material-ui/core';
import logo from '../../logo.svg';
import AddressForm from '../../components/AddressForm';
import LargeLogo from '../../styled-components/LargeLogo';
import CardHeaderWithBottomBorder from '../../styled-components/CardHeaderWithBottomBorder';

const LoginView = () => (
  <Container maxWidth="sm">
    <LargeLogo src={logo} alt="logo" />
    <Card>
      <CardHeaderWithBottomBorder title="Welcome! Sign in With Your Jobcoin Address" />
      <CardContent>
        <AddressForm />
      </CardContent>
    </Card>
  </Container>
);

export default LoginView;
