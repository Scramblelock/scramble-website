import Head from 'next/head'
import styled from 'styled-components'
import { Slider } from '../../components/slider'
import { IMAGES } from '../../const'
import { color } from '../../color'

const ImageContainer = styled.div`
  background: ${color.DARK_GREY};
`

export default function Photos() {
  return (
    <>
      <Head>
        <link rel="preload" href={IMAGES[0]?.src} as="image" />
      </Head>
      <ImageContainer>
        <Slider images={IMAGES} />
      </ImageContainer>
    </>
  )
}
