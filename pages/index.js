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
          
          // Set default consent to denied
          gtag('consent', 'default', {
            analytics_storage: 'denied',
            ad_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied'
          });
          
          gtag('js', new Date());
          gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
            page_path: window.location.pathname,
            anonymize_ip: true,
            cookie_flags: 'SameSite=None;Secure',
            cookie_domain: 'auto',
            send_page_view: true,
            allow_google_signals: false,
            allow_ad_personalization_signals: false
          });
        `}
      </Script>
      <HomePage />
    </>
  )
}

export default memo(Home)
