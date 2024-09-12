import Layout from '../components/layout'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import * as ga from '../lib/ga'
import { ThemeProvider } from 'styled-components'
import { GlobalStyles, lightTheme } from '../styles/theme.config'
import { SpeedInsights } from '@vercel/speed-insights/react'

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
      <GlobalStyles />
      <Layout>
        <Component {...pageProps} />
        <SpeedInsights />
      </Layout>
    </ThemeProvider>
  )
}

export default MyApp
