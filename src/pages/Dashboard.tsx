import React from 'react';
import type { AppProps } from 'next/app';
import { LoadingProvider } from '../context/LoadingContext';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <LoadingProvider>
      <Component {...pageProps} />
    </LoadingProvider>
  );
}

export default MyApp;