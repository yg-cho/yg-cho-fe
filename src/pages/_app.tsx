import type { AppProps } from 'next/app';
import styled from 'styled-components';

import setupMSW from '../api/setup';
import GlobalStyle from '../styles/GlobalStyle';

import { QueryClientProvider, QueryClient } from 'react-query';
import {RecoilRoot} from 'recoil';
import Header from '@/components/header/Header';

setupMSW();


function MyApp({ Component, pageProps }: AppProps) {


  const client = new QueryClient()
  return (
    <>
      <QueryClientProvider client={client}>
        <RecoilRoot>
          <GlobalStyle />
          <Background />
          <Content>
            <Header/>
            <Component {...pageProps} />
          </Content>
        </RecoilRoot>
      </QueryClientProvider>
    </>
  );
}

export default MyApp;

const Background = styled.div`
  position: fixed;
  z-index: -1;
  width: 100%;
  height: 100%;
  background-color: #f0f0f5;
`;

const Content = styled.div`
  width: 420px;
  min-height: 100%;
  margin: 0 auto;
  background-color: #fff;
`;
