import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent, Grid, CircularProgress } from '@material-ui/core';
import { useAddressBalanceAndTransactions } from '../../graphql/queries/getAddressBalanceAndTransactions';
import SendForm from '../SendForm';
import HistoryGraph from '../HistoryGraph';
import CardHeaderWithBorderBottom from '../../styled-components/CardHeaderWithBorderBottom';

const Dashboard = ({ address }) => {
  const {
    loading,
    error,
    data: { address: { balance = 0, transactions = [] } = {} } = {},
  } = useAddressBalanceAndTransactions(address);

  if (error) {
    return <div>Oops, looks like we got an error. Please try again later</div>;
  }

  return (
    <Grid container spacing={4}>
      <Grid item xs={12} md={4}>
        <Grid container direction="column" spacing={2}>
          <Grid item xs={12}>
            <Card>
              <CardHeaderWithBorderBottom title="Jobcoin Balance" />
              <CardContent>
                {loading ? <CircularProgress /> : balance}
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card>
              <CardHeaderWithBorderBottom title="Send Jobcoin" />
              <CardContent>
                <SendForm address={address} />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} md={8}>
        <Card>
          <CardContent>
            <HistoryGraph
              transactions={transactions}
              address={address}
              balance={balance}
            />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

Dashboard.propTypes = {
  address: PropTypes.string,
};

Dashboard.defaultProps = {
  address: '',
};

export default Dashboard;
