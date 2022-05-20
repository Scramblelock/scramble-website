import styled from 'styled-components'
import { Slider } from '../../components/slider'
import { IMAGES } from '../../const'
import { color } from '../../color'

const ImageContainer = styled.div`
  background: ${color.DARK_GREY};
`

export default function Photos() {
  return (
    <ImageContainer>
      <Slider images={IMAGES} />
    </ImageContainer>
  )
}
