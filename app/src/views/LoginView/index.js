import React from 'react';
import { Card, CardHeader, CardContent, Container } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import logo from '../../logo.svg';
import AddressForm from '../../components/AddressForm';

const LargeLogo = styled('img')({
  height: '40vmin',
});

const CardHeaderWithBorderBottom = styled(CardHeader)({
  borderBottom: '0.25px solid',
});

const LoginView = () => (
  <Container maxWidth="sm">
    <LargeLogo src={logo} alt="logo" />
    <Card>
      <CardHeaderWithBorderBottom title="Welcome! Sign in With Your Jobcoin Address" />
      <CardContent>
        <AddressForm />
      </CardContent>
    </Card>
  </Container>
);

export default LoginView;
