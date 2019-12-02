import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import { CssBaseline } from '@material-ui/core';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { GRAPHQL_URI } from './constants';
import LoginView from './views/LoginView';
import DashboardView from './views/DashboardView';
import AppContainer from './styled-components/AppContainer';

const client = new ApolloClient({
  uri: GRAPHQL_URI,
});

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
