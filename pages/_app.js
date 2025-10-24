import Layout from '../components/layout'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import * as ga from '../lib/ga'
import { ThemeProvider } from 'styled-components'
import { GlobalStyles, lightTheme } from '../styles/theme.config'
import { SpeedInsights } from '@vercel/speed-insights/react'
import { Analytics } from '@vercel/analytics/react'
import PerformanceMonitor from '../components/performanceMonitor'
import ClientOnly from '../components/clientOnly'

function MyApp({ Component, pageProps }) {
  const router = useRouter()

  useEffect(() => {
    const handleRouteChange = url => {
      ga.pageview(url)
    }

    //When the component is mounted, subscribe to router changes
    //and log those page views
    router.events.on('routeChangeComplete', handleRouteChange)

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return (
    <ThemeProvider theme={lightTheme}>
      <Head>
        {/* Preload critical resources for better LCP */}
        <link rel="preload" href="/background.jpg" as="image" />
        <link rel="preload" href="/Scramble-logo-invert.png" as="image" />
        {/* DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.youtube.com" />
      </Head>
      <GlobalStyles />
      <ClientOnly>
        <PerformanceMonitor />
      </ClientOnly>
      <Layout>
        <Component {...pageProps} />
        <ClientOnly>
          <SpeedInsights />
          <Analytics />
        </ClientOnly>
      </Layout>
    </ThemeProvider>
  )
}

export default MyApp
