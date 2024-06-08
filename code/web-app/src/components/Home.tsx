import React, { useState } from 'react';
import { ApolloProvider } from '@apollo/client';
import create_api_client from '../utils/apolloClient';
import Products from './Products';
import Header from './Header';
import LanguagePicker from './LanguagePicker';
import { LANGUAGES, ZubaanLanguage } from '../utils/languages';

interface AuthenticatedProps {
  userInfo: Record<string, any>;
  logout: () => void;
  csrf: string;
}

function on_graphql_error(messages: string[]) {
  messages.forEach(message => alert(message));
}

const Home: React.FC<AuthenticatedProps> = ({ userInfo, logout, csrf }) => {
  const [sourceLanguage, setSourceLanguage] = useState<ZubaanLanguage>(LANGUAGES[0])
  const [targetLanguage, setTargetLanguage] = useState<ZubaanLanguage>(LANGUAGES[0])
  return (
    <ApolloProvider client={create_api_client(csrf, on_graphql_error)}>
      <Header logout={logout} />
      <main className='min-h-[calc(100vh - 68px)] max-w-3xl mx-auto'>
        <form>
          <div className='flex flex-col gap-4'>
            <LanguagePicker onChange={(lang: ZubaanLanguage) => {
              setSourceLanguage(lang);
            }} />
            <LanguagePicker onChange={(lang: ZubaanLanguage) => {
              setTargetLanguage(lang);
            }} />
          </div>
          <textarea placeholder="What do you need translated?" className="mt-4 textarea textarea-bordered textarea-lg w-full" >

          </textarea>
          <button type="button">Submit</button>

        </form>        {/* <Products /> */}
      </main>
    </ApolloProvider>
  )
}

export default Home;

