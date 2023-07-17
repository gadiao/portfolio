import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles'
import { CacheProvider } from '@emotion/react';
import { darkTheme } from '../src/theme';
import createEmotionCache from '../src/createEmotionCache';
import { Analytics } from '@vercel/analytics/react';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export default function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  const [theme, setTheme] = useState(darkTheme);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>Gil Paolo Adiao</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Component {...pageProps} setTheme={setTheme}/>
        <Analytics />
      </ThemeProvider>
    </CacheProvider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};