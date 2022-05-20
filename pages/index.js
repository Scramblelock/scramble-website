import Head from 'next/head'
import HomePage from '../components/homepage'

export default function Home() {
  return (
    <>
      <Head>
        <title>Scramblelock</title>
      </Head>
      <HomePage />
    </>
  )
}
