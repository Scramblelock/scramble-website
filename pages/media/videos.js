import styled from 'styled-components'
import Image from 'next/image'
import ReactPlayer from 'react-player'
import React, { useState, useEffect } from 'react'
import { color } from '../../color'
import { media } from '../../media'
import { VIDEOS } from '../../const'

const SliderContainer = styled.div`
  background: ${color.DARK_GREY};
  height: 100vh;
`

const Button = styled.button`
  outline: 0;
  background-color: transparent;
  border: 0;
  position: absolute;
  cursor: pointer;
  user-select: none;
`

const PrevButton = styled(Button)`
  left: 20px;

  @media ${media.NON_DESKTOP} {
    left: 0;
  }

  @media ${media.SMALL_MOBILE} {
    width: 30px;
    top: 160px;
  }
`

const NextButton = styled(Button)`
  right: 20px;

  @media ${media.NON_DESKTOP} {
    right: 0;
  }

  @media ${media.SMALL_MOBILE} {
    width: 30px;
    top: 160px;
  }
`

const VideoContainer = styled.div`
  opactiy: ${props => (props.index === props.current ? 1 : 0)};
  position: relative;
  padding-top: ${props => props.index === props.current && '56.25%'};
  top: 70px;
  width: 85%;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: column;
`

const CustomReactPlayer = styled(ReactPlayer)`
  position: absolute;
  top: 0;
  left: 0;
`

const VideoText = styled.p`
  align-content: center;
  color: ${color.WHITE};
  position: absolute;
  text-align: center;
`

export default function Videos() {
  const [hasWindow, setHasWindow] = useState(false)
  const [current, setCurrent] = useState(0)
  const length = VIDEOS.length

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1)
  }

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1)
  }

  useEffect(() => {
    if (typeof window !== undefined) {
      setHasWindow(true)
    }
  }, [])

  if (!Array.isArray(VIDEOS) || VIDEOS.length <= 0) {
    return null
  }

  return (
    <SliderContainer>
      {VIDEOS.map((video, index) => {
        return (
          <VideoContainer index={index} current={current} key={index}>
            {index === current && hasWindow && (
              <CustomReactPlayer
                url={video.url}
                pip={true}
                controls={true}
                width="100%"
                height="100%"
              />
            )}
          </VideoContainer>
        )
      })}
      <PrevButton onClick={prevSlide}>
        <Image
          src={'/left-chevron.png'}
          width={50}
          height={50}
          alt="prev button"
        />
      </PrevButton>
      <NextButton onClick={nextSlide}>
        <Image
          src={'/right-chevron.png'}
          width={50}
          height={50}
          alt="next button"
        />
      </NextButton>
    </SliderContainer>
  )
}
