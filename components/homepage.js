import styled from 'styled-components'
import Image from 'next/image'
import Link from 'next/link'
import { memo } from 'react'
import { color } from '../color'
import { media } from '../media'

const HomeContainer = styled.div`
  height: 100vh;
  width: 100vw;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-left: 80px;

  @media ${media.TABLET} {
    justify-content: center;
    padding-left: 0;
  }

  @media ${media.MOBILE} {
    justify-content: center;
    padding-left: 0;
  }
`

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${color.WHITE};
  position: relative;
  padding: 20px;
  margin: 20px 0;
  width: 100%;
  max-width: 600px;
  z-index: 2;

  @media ${media.TABLET} {
    width: 90%;
    padding: 15px;
    align-items: center;
  }

  @media ${media.MOBILE} {
    width: 95%;
    padding: 10px;
    margin: 10px 0;
    align-items: center;
  }
`

const BackgroundImage = styled(Image)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
`

const MainImage = styled(Image)`
  z-index: 1;
  max-width: 100%;
  height: auto;
  width: 100%;
  object-fit: contain;
  aspect-ratio: 600/250;

  @media ${media.MOBILE} {
    max-width: 90%;
  }
`

const TextBox = styled.div`
  border: 2px solid ${color.WHITE};
  padding: 20px;
  margin: 20px 0;
  width: 100%;
  max-width: 600px;
  background-color: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(5px);

  @media ${media.MOBILE} {
    padding: 15px;
    margin: 15px 0;
  }
`

const Text = styled.p`
  font-size: 36px;
  text-align: center;

  @media ${media.TABLET} {
    font-size: 24px;
  }

  @media ${media.MOBILE} {
    font-size: 18px;
  }
`

const Button = styled(Link)`
  background-color: ${color.BLUE};
  width: 200px;
  height: 50px;
  border-radius: 30px;
  cursor: pointer;
  font-size: 16px;
  border: 0;
  text-transform: uppercase;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  color: ${color.WHITE};
  margin-top: 20px;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${color.DARK_GREY};
    color: ${color.WHITE};
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(34, 116, 165, 0.3);
  }

  &:focus {
    outline: 3px solid ${color.BEIGE};
    outline-offset: 2px;
  }

  @media ${media.MOBILE} {
    width: 80%;
    max-width: 250px;
    font-size: 14px;
    height: 45px;
  }
`

function HomePage() {
  return (
    <>
      <HomeContainer>
        <BackgroundImage
          src="/background.jpg"
          alt="Background"
          fill
          priority
          quality={75}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1920px"
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
        />
        <TextContainer>
          <MainImage
            src="/Scramble-logo-invert.png"
            width={600}
            height={250}
            alt="Scramblelock Logo"
            priority
            quality={80}
            sizes="(max-width: 768px) 90vw, (max-width: 1200px) 80vw, 600px"
          />
          <TextBox>
            <Text>Artist and educator specializing in Campbellocking (aka Locking) dance</Text>
          </TextBox>
          <Button href="/about">Learn more</Button>
        </TextContainer>
      </HomeContainer>
    </>
  )
}

export default memo(HomePage)
