import styled from 'styled-components'
import Image from 'next/image'
import Link from 'next/link'
import { color } from '../color'
import { media } from '../media'

const HomeContainer = styled.div`
  height: 100vh;
  width: 100vw;
  background-image: url(/background.jpg);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: top center;
  background-attachment: fixed;
`

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${color.WHITE};
  position: absolute;
  padding: 20px;
  margin: 20px 0;
  top: 20%;
  width: 50%;
  height: 70%;
  overflow: auto;

  @media ${media.NON_DESKTOP} {
    width: 70%;
    padding: 10px;
    margin: 10px 0;
  }
`

const MainImage = styled(Image)``

const TextBox = styled.div`
  border: 2px solid ${color.WHITE};
  padding: 0 20px;
  margin: 50px 70px;

  @media ${media.MOBILE} {
    width: 70%;
    margin: 20px 20px;
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

const Button = styled.button`
  background-color: ${color.WHITE};
  width: 200px;
  height: 50px;
  border-radius: 30px;
  cursor: pointer;
  font-size: 16px;
  border: 0;
  text-transform: uppercase;
  font-weight: bold;

  &:hover {
    background-color: ${color.BLUE};
    color: ${color.WHITE};
  }

  @media ${media.MOBILE} {
    width: 60%;
    font-size: 14px;
  }
`

export default function HomePage() {
  return (
    <>
      <HomeContainer>
        <TextContainer>
          <MainImage
            src="/Scramble-logo-invert.png"
            width={600}
            height={250}
            alt="Scramblelock Logo"
          />
          <TextBox>
            <Text>Artist and educator specializing in Locking dance</Text>
          </TextBox>
          <Link href="/about" passHref>
            <Button>
              <a>Learn more</a>
            </Button>
          </Link>
        </TextContainer>
      </HomeContainer>
    </>
  )
}
