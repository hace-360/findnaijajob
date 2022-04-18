import * as React from 'react';
// next
import Document, { Html, Head, Main, NextScript } from 'next/document';
// emotion
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import createEmotionServer from '@emotion/server/create-instance';
// theme
import palette from '../src/theme/palette';

// ----------------------------------------------------------------------

function createEmotionCache() {
  return createCache({ key: 'css' });
}

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <meta name="theme-color" content={palette.light.primary.main} />
          <meta
            name="description"
            content="Find naija job is a job recruitment platform for nigerian applicants and recruiters"
          />
          <meta 
            property="og:image" 
            content="https://firebasestorage.googleapis.com/v0/b/hace-360.appspot.com/o/findnaijajob%20logo.png?alt=media&token=6a7d6144-b563-4691-8818-5e2611ffaedc"
          />
          <meta
            name="keywords"
            content="user, career, jobs, recruiters, applicant"
          />
          <meta name="author" content="dolapo oluwole" />

          <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />

          {/* Fonts */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Barlow:wght@500;600;700&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap"
            rel="stylesheet"
          />

          <link href="https://fonts.googleapis.com/css2?family=Baloo+Bhai+2:wght@400;500;600;700;800&display=swap" 
          rel="stylesheet"
          />
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

// ----------------------------------------------------------------------

MyDocument.getInitialProps = async (ctx) => {
  const originalRenderPage = ctx.renderPage;

  const cache = createEmotionCache();
  const { extractCriticalToChunks } = createEmotionServer(cache);

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App) => (props) =>
        (
          <CacheProvider value={cache}>
            <App {...props} />
          </CacheProvider>
        ),
    });

  const initialProps = await Document.getInitialProps(ctx);

  const emotionStyles = extractCriticalToChunks(initialProps.html);
  const emotionStyleTags = emotionStyles.styles.map((style) => (
    <style
      data-emotion={`${style.key} ${style.ids.join(' ')}`}
      key={style.key}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: style.css }}
    />
  ));

  return {
    ...initialProps,
    styles: [...React.Children.toArray(initialProps.styles), ...emotionStyleTags],
  };
};
