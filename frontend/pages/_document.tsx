import { Head, Html, Main, NextScript } from 'next/document'

function Document() {
  return (
    <Html>
      <Head>
        <meta
          name="description"
          content="サークルや部活内でのグループを整理したい人へ!LINEでグループが増えすぎて管理が大変だという人へ!Clubroomを用いれば複数のグループを効果的に管理できます。"
        />
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        ></link>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

export default Document
