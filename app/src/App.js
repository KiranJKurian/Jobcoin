import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import Link from '@material-ui/core/Link';
import logo from './logo.svg';
import { GRAPHQL_URI } from './constants';
import './App.css';

const client = new ApolloClient({
  uri: GRAPHQL_URI,
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <Link
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </Link>
        </header>
      </div>
    </ApolloProvider>
  );
}

export default App;
