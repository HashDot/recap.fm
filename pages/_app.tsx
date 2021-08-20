import { AppProps } from 'next/app'
import Head from 'next/head'

import '../styles/base.css'
import '../styles/default.css'

function CustomApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <>
      <Head>
        <title>RECAP - Web Developer Podcast</title>
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default CustomApp
