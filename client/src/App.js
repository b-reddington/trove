import React from 'react';

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Signup from './pages/Signup';
import Login from './pages/Login';
import Post from './pages/Post';
import Header from './components/Header';
import Home from './pages/Home';

import Trip from './pages/Trip';
import Profile from './pages/Profile'

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: '/graphql',
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});


function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        {/* Header is the primary Nav */}
        <Header />
          <div className="container">
            <Routes>
              <Route
                path="/"
                element={<Home />}
              />
              <Route 
                path="/login" 
                element={<Login />} 
              />
              <Route 
                path="/register" 
                element={<Signup />} 
              />
              <Route
                path="/new-post"
                element={<Post />}
              />
              <Route
                path="/"
                element={<Home />}
              /><Route
              path="/profile"
              element={<Profile />}
            />
              <Route
                path="/trips/:_id"
                element={<Trip />}
              />

              <Route
                path="/profiles/:username"
                element={<Profile />}
              />
              <Route
                path="/me"
                element={<Profile />}
              />

            </Routes>
            
          </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
