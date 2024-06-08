import React, { useState } from 'react';
import { ApolloProvider } from '@apollo/client';
import create_api_client from '../utils/apolloClient';
import Header from './Header';
import Chat from './Chat';

interface AuthenticatedProps {
  userInfo: Record<string, any>;
  logout: () => void;
  csrf: string;
}

function on_graphql_error(messages: string[]) {
  messages.forEach(message => alert(message));
}

const Home: React.FC<AuthenticatedProps> = ({ userInfo, logout, csrf }) => {

  return (
    <ApolloProvider client={create_api_client(csrf, on_graphql_error)}>
      <Header logout={logout} />
      <main className='min-h-[calc(100vh - 68px)] max-w-3xl mx-auto' style={{
        minHeight: 'calc(100vh - 68px)',
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}>
        <Chat />
      </main>
    </ApolloProvider>
  )
}

export default Home;

