import React from 'react';
import { Container, Box } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import AppBarWithLogout from '../../components/AppBarWithLogout';
import Dashboard from '../../components/Dashboard';

const DashboardView = () => {
  const { address } = useParams();

  return (
    <>
      <AppBarWithLogout />
      <Container>
        <Box my={10}>
          <Dashboard address={address} />
        </Box>
      </Container>
    </>
  );
};

export default DashboardView;
