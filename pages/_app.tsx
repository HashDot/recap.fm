import { AppProps } from 'next/app'
import Head from 'next/head'

import '../styles/base.css'
import '../styles/default.css'

function CustomApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <>
      <Head>
        <title>RECAP - Web Developer Podcast</title>
        <meta name="description" content="Weekly Web Development Podcast" />
        <link rel="preload" as="script" href="/hashdot.png" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default CustomApp
