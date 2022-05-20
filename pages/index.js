import Head from 'next/head'
import HomePage from '../components/homepage'

export default function Home() {
  return (
    <>
      <Head>
        <title>Scramblelock</title>
        <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
      </Head>
      <HomePage />
    </>
  )
}
