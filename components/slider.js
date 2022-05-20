import { useRef } from 'react'
import styled from 'styled-components'
import Image from 'next/image'
import useSlider from '../hooks/useSlider'
import { media } from '../media'

const SliderContainer = styled.div`
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 100vh;
  width: 100%;
`

const SliderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100vh;
`

const SliderFeature = styled.div`
  text-align: center;
`

const SliderButtonLeft = styled.button`
  background: transparent;
  border: none;
  outline: none;
  font-size: 4rem;
  color: #eee;
  padding: 0 1rem;
  cursor: pointer;
  transition: transform 0.1s ease-in-out;

  @media ${media.SMALL_MOBILE} {
    height: 100px;
    width: 100px;
  }
`

const SliderButtonRight = styled.button`
  background: transparent;
  border: none;
  outline: none;
  font-size: 4rem;
  color: #eee;
  padding: 0 1rem;
  cursor: pointer;
  transition: transform 0.1s ease-in-out;

  @media ${media.SMALL_MOBILE} {
    height: 100px;
    width: 100px;
  }
`

const ArrowButton = styled(Image)``

export const Slider = ({ images }) => {
  const slideImage = useRef(null)
  const { goToPreviousSlide, goToNextSlide } = useSlider(slideImage, images)

  return (
    <SliderContainer ref={slideImage}>
      <SliderContent>
        <SliderButtonLeft onClick={goToPreviousSlide}>
          <ArrowButton
            src={'/left-chevron.png'}
            width={100}
            height={100}
            alt="left arrow button"
          />
        </SliderButtonLeft>
        <SliderFeature />
        <SliderButtonRight onClick={goToNextSlide}>
          <ArrowButton
            src={'/right-chevron.png'}
            width={100}
            height={100}
            alt="left arrow button"
          />
        </SliderButtonRight>
      </SliderContent>
    </SliderContainer>
  )
}
