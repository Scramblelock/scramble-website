import Head from 'next/head'
import HomePage from '../components/homepage'

export default function Home() {
  return (
    <>
      <Head>
        {/* Global site tag (gtag.js) - Google Analytics  */}
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
              page_path: window.location.pathname,
            });
          `,
          }}
        />
        <title>Scramblelock</title>
        <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
      </Head>
      <HomePage />
    </>
  )
}
