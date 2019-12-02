import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import { CssBaseline } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { GRAPHQL_URI } from './constants';
import LoginView from './views/LoginView';
import DashboardView from './views/DashboardView';

const client = new ApolloClient({
  uri: GRAPHQL_URI,
});

const AppContainer = styled('div')(({ theme }) => ({
  backgroundColor: '#282c34',
  color: 'white',
  fontSize: '1em',
  flexGrow: 1,
  minHeight: '100vh',
  padding: theme.spacing(2),
  textAlign: 'center',
}));

const App = () => (
  <ApolloProvider client={client}>
    <CssBaseline />
    <AppContainer>
      <Router>
        <Switch>
          <Route exact path="/">
            <LoginView />
          </Route>
          <Route path="/address/:address">
            <DashboardView />
          </Route>
        </Switch>
      </Router>
    </AppContainer>
  </ApolloProvider>
);

export default App;
