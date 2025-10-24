import Head from 'next/head'
import Script from 'next/script'
import { memo } from 'react'
import HomePage from '../components/homepage'

function Home() {
  return (
    <>
      <Head>
        <title>Scramblelock - Artist and Educator Specializing in Locking Dance</title>
        <meta
          name="description"
          content="Scramblelock is an artist and educator specializing in Locking dance. Learn more about performances, teaching, and events."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
      </Head>
      {/* Global site tag (gtag.js) - Google Analytics  */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
            page_path: window.location.pathname,
          });
        `}
      </Script>
      <HomePage />
    </>
  )
}

export default memo(Home)
