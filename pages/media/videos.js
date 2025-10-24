import styled from 'styled-components'
import Image from 'next/image'
import ReactPlayer from 'react-player'
import React, { useState, useEffect, useCallback, memo } from 'react'
import { color } from '../../color'
import { media } from '../../media'
import { VIDEOS } from '../../const'

const SliderContainer = styled.div`
  background: ${color.DARK_GREY};
  height: 100vh;
  width: 100vw;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 80px; /* Account for fixed navigation */
  padding-bottom: 20px;
  box-sizing: border-box;

  @media ${media.MOBILE} {
    height: auto;
    min-height: 100vh;
    padding-top: 70px;
    padding-bottom: 15px;
    align-items: flex-start;
    justify-content: flex-start;
  }
`

const VideoWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  max-width: 1200px;
  max-height: calc(100vh - 100px); /* Account for nav + padding */
  margin: 0 auto;
  background: #000;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;

  @media ${media.MOBILE} {
    margin: 0 60px;
    border-radius: 4px;
    max-height: none;
    height: auto;
    aspect-ratio: 16/9;
    position: absolute;
    top: 120px;
    left: 0;
    right: 0;
    width: calc(100% - 120px);
    max-width: 95%;
  }

  @media ${media.TABLET} {
    max-width: 90%;
  }
`

const VideoContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: ${props => (props.$index === props.$current ? 1 : 0)};
  transition: opacity 0.5s ease-in-out;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: ${props => (props.$index === props.$current ? 'auto' : 'none')};
  z-index: 1;
`

const NavigationButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.8);
  border: none;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 5;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  pointer-events: auto;
  tabindex: 0;

  &:hover {
    background: rgba(0, 0, 0, 0.9);
    transform: translateY(-50%) scale(1.1);
    border-color: rgba(255, 255, 255, 0.3);
  }

  &:active {
    transform: translateY(-50%) scale(0.95);
    background: rgba(0, 0, 0, 1);
  }

  &:focus {
    outline: 2px solid #fff;
    outline-offset: 2px;
  }

  @media ${media.MOBILE} {
    width: 50px;
    height: 50px;
    z-index: 0;
  }
`

const PrevButton = styled(NavigationButton)`
  left: 20px;
  top: 50%;
  transform: translateY(-50%);

  @media ${media.MOBILE} {
    left: 10px;
    top: 200px;
    transform: translateY(-50%);
  }
`

const NextButton = styled(NavigationButton)`
  right: 20px;
  top: 50%;
  transform: translateY(-50%);

  @media ${media.MOBILE} {
    right: 10px;
    top: 200px;
    transform: translateY(-50%);
  }
`

const VideoCounter = styled.div`
  position: absolute;
  top: 100px; /* Position below navigation */
  right: 20px;
  background: rgba(0, 0, 0, 0.8);
  color: ${color.WHITE};
  font-size: 16px;
  padding: 8px 16px;
  border-radius: 20px;
  z-index: 5;
  font-weight: 500;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);

  @media ${media.MOBILE} {
    top: 80px;
    right: 20px;
    font-size: 14px;
    padding: 6px 12px;
    z-index: 10;
  }
`

function Videos() {
  const [hasWindow, setHasWindow] = useState(false)
  const [current, setCurrent] = useState(0)
  const [mounted, setMounted] = useState(false)
  const [playerRef, setPlayerRef] = useState(null)
  const length = VIDEOS.length

  const nextSlide = useCallback(() => {
    // Pause current video if playing
    if (playerRef && playerRef.getInternalPlayer) {
      try {
        const internalPlayer = playerRef.getInternalPlayer()
        if (internalPlayer && internalPlayer.pauseVideo) {
          internalPlayer.pauseVideo()
        }
      } catch (error) {
        console.log('Could not pause video:', error)
      }
    }
    setCurrent(prev => (prev === length - 1 ? 0 : prev + 1))
  }, [length, playerRef])

  const prevSlide = useCallback(() => {
    // Pause current video if playing
    if (playerRef && playerRef.getInternalPlayer) {
      try {
        const internalPlayer = playerRef.getInternalPlayer()
        if (internalPlayer && internalPlayer.pauseVideo) {
          internalPlayer.pauseVideo()
        }
      } catch (error) {
        console.log('Could not pause video:', error)
      }
    }
    setCurrent(prev => (prev === 0 ? length - 1 : prev - 1))
  }, [length, playerRef])

  useEffect(() => {
    setMounted(true)
    setHasWindow(true)
  }, [])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = event => {
      if (event.key === 'ArrowLeft') {
        prevSlide()
      } else if (event.key === 'ArrowRight') {
        nextSlide()
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [prevSlide, nextSlide])

  if (!Array.isArray(VIDEOS) || VIDEOS.length <= 0) {
    return null
  }

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return (
      <SliderContainer>
        <VideoWrapper>
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              color: 'white',
              fontSize: '18px',
              textAlign: 'center',
            }}
          >
            Loading videos...
          </div>
        </VideoWrapper>
      </SliderContainer>
    )
  }

  return (
    <SliderContainer>
      <VideoCounter>
        {current + 1} / {length}
      </VideoCounter>

      <VideoWrapper>
        {VIDEOS.map((video, index) => {
          return (
            <VideoContainer $index={index} $current={current} key={index}>
              {index === current && hasWindow && (
                <ReactPlayer
                  ref={setPlayerRef}
                  url={video.url}
                  playing={false}
                  controls={true}
                  width="100%"
                  height="100%"
                  onReady={() => console.log('ReactPlayer ready')}
                  onError={error => console.error('Video error:', error, 'for video:', video.url)}
                  config={{
                    youtube: {
                      playerVars: {
                        modestbranding: 1,
                        rel: 0,
                        showinfo: 0,
                        fs: 1,
                        iv_load_policy: 3,
                        autoplay: 0,
                        controls: 1,
                        enablejsapi: 1,
                      },
                    },
                  }}
                />
              )}
            </VideoContainer>
          )
        })}
      </VideoWrapper>

      <PrevButton onClick={prevSlide} aria-label="Previous video">
        <Image
          src={'/left-chevron.png'}
          width={30}
          height={30}
          alt="Previous video"
          quality={90}
          sizes="30px"
        />
      </PrevButton>

      <NextButton onClick={nextSlide} aria-label="Next video">
        <Image
          src={'/right-chevron.png'}
          width={30}
          height={30}
          alt="Next video"
          quality={90}
          sizes="30px"
        />
      </NextButton>
    </SliderContainer>
  )
}
export default memo(Videos)
