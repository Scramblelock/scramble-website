import { useState, useEffect, useCallback, useRef } from 'react'
import styled from 'styled-components'
import Image from 'next/image'
import useSlider from '../hooks/useSlider'
import { media } from '../media'

const SliderContainer = styled.div`
  background-position: center center;
  background-repeat: no-repeat;
  background-size: contain;
  height: 100vh;
  width: 100%;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;

  @media ${media.MOBILE} {
    background-size: contain;
    background-position: center center;
  }
`

const SliderContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`

const SliderFeature = styled.div`
  text-align: center;
`

const SliderButtonLeft = styled.button`
  position: fixed;
  left: 20px;
  top: 50%;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  outline: none;
  font-size: 4rem;
  color: #eee;
  padding: 0 1rem;
  cursor: pointer;
  transition: transform 0.1s ease-in-out;
  z-index: 10;
  tabindex: 0;

  &:focus-visible {
    outline: 2px solid #fff;
    outline-offset: 2px;
  }

  @media ${media.MOBILE} {
    height: 60px;
    width: 60px;
    left: 10px;
    font-size: 2rem;
    padding: 0 0.5rem;
  }

  @media ${media.SMALL_MOBILE} {
    height: 50px;
    width: 50px;
    left: 5px;
    font-size: 1.5rem;
    padding: 0 0.25rem;
  }
`

const SliderButtonRight = styled.button`
  position: fixed;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  outline: none;
  font-size: 4rem;
  color: #eee;
  padding: 0 1rem;
  cursor: pointer;
  transition: transform 0.1s ease-in-out;
  z-index: 10;
  tabindex: 0;

  &:focus-visible {
    outline: 2px solid #fff;
    outline-offset: 2px;
  }

  @media ${media.MOBILE} {
    height: 60px;
    width: 60px;
    right: 10px;
    font-size: 2rem;
    padding: 0 0.5rem;
  }

  @media ${media.SMALL_MOBILE} {
    height: 50px;
    width: 50px;
    right: 5px;
    font-size: 1.5rem;
    padding: 0 0.25rem;
  }
`

const ArrowButton = styled(Image)`
  @media ${media.MOBILE} {
    width: 30px !important;
    height: 30px !important;
  }

  @media ${media.SMALL_MOBILE} {
    width: 25px !important;
    height: 25px !important;
  }
`

export const Slider = ({ images }) => {
  const slideImage = useRef(null)
  const [mounted, setMounted] = useState(false)
  const { goToPreviousSlide, goToNextSlide } = useSlider(slideImage, images)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Callback ref to ensure image is set when ref is available
  const setSlideImageRef = useCallback(
    node => {
      slideImage.current = node
      if (node && images && images.length > 0) {
        node.style.backgroundImage = `url(${images[0].src})`
        node.style.backgroundSize = 'contain'
        node.style.backgroundPosition = 'center center'
        node.style.backgroundRepeat = 'no-repeat'
      }
    },
    [images]
  )

  if (!mounted) {
    return (
      <SliderContainer>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            color: 'white',
            fontSize: '18px',
          }}
        >
          Loading photos...
        </div>
      </SliderContainer>
    )
  }

  return (
    <SliderContainer ref={setSlideImageRef}>
      <SliderContent>
        <SliderButtonLeft onClick={goToPreviousSlide} tabIndex={10} aria-label="Previous photo">
          <ArrowButton
            src={'/left-chevron.png'}
            width={100}
            height={100}
            alt="left arrow button"
            quality={80}
            sizes="(max-width: 768px) 30px, (max-width: 545px) 25px, 100px"
          />
        </SliderButtonLeft>
        <SliderFeature />
        <SliderButtonRight onClick={goToNextSlide} tabIndex={11} aria-label="Next photo">
          <ArrowButton
            src={'/right-chevron.png'}
            width={100}
            height={100}
            alt="right arrow button"
            quality={80}
            sizes="(max-width: 768px) 30px, (max-width: 545px) 25px, 100px"
          />
        </SliderButtonRight>
      </SliderContent>
    </SliderContainer>
  )
}
