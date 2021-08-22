import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render(): JSX.Element {
    return (
      <Html lang="en-US">
        <Head>
          <link rel="shortcut icon" type="image/x-icon" href="/logo.svg" />
          <link
            href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;600&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
