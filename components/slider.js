import { useState, useEffect, useCallback } from 'react'
import styled from 'styled-components'
import Image from 'next/image'
import { media } from '../media'

const SliderContainer = styled.div`
  height: 100vh;
  width: 100%;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
`

const SliderContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`

const SliderFeature = styled.div`
  text-align: center;
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`

const MainImage = styled(Image)`
  object-fit: contain;
  max-width: 100%;
  max-height: 100vh;
  width: auto;
  height: auto;
  display: block;
  margin: 0 auto;

  @media ${media.MOBILE} {
    width: 100vw;
    height: auto;
    object-fit: cover;
  }

  @media ${media.TABLET} {
    width: 100vw;
    height: auto;
    object-fit: cover;
  }

  @media (min-width: 769px) {
    height: 100vh;
    width: auto;
    object-fit: contain;
  }
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
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const goToPreviousSlide = useCallback(() => {
    setCurrentImageIndex(prev => (prev === 0 ? images.length - 1 : prev - 1))
  }, [images.length])

  const goToNextSlide = useCallback(() => {
    setCurrentImageIndex(prev => (prev === images.length - 1 ? 0 : prev + 1))
  }, [images.length])

  if (!mounted || !images || images.length === 0) {
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

  const currentImage = images[currentImageIndex]

  return (
    <SliderContainer>
      <SliderContent>
        <SliderButtonLeft onClick={goToPreviousSlide} aria-label="Previous photo">
          <ArrowButton
            src={'/left-chevron.png'}
            width={100}
            height={100}
            alt="left arrow button"
            quality={80}
            sizes="(max-width: 768px) 30px, (max-width: 545px) 25px, 100px"
          />
        </SliderButtonLeft>
        <SliderFeature>
          <MainImage
            src={currentImage.src}
            alt={`Photo ${currentImageIndex + 1} of ${images.length}`}
            width={1920}
            height={1080}
            priority={currentImageIndex === 0}
            fetchpriority={currentImageIndex === 0 ? 'high' : 'auto'}
            quality={90}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1920px"
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
          />
        </SliderFeature>
        <SliderButtonRight onClick={goToNextSlide} aria-label="Next photo">
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
