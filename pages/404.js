import Head from 'next/head'
import Link from 'next/link'
import styled from 'styled-components'
import { color } from '../color'
import { media } from '../media'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  text-align: center;
  padding: 20px;
  background-color: ${color.BLACK};
  color: ${color.WHITE};
`

const Title = styled.h1`
  font-size: 4rem;
  margin-bottom: 1rem;
  color: ${color.BLUE};

  @media ${media.MOBILE} {
    font-size: 2.5rem;
  }
`

const Subtitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 2rem;
  font-weight: 300;

  @media ${media.MOBILE} {
    font-size: 1.2rem;
  }
`

const Description = styled.p`
  font-size: 1.1rem;
  margin-bottom: 3rem;
  max-width: 600px;
  line-height: 1.6;

  @media ${media.MOBILE} {
    font-size: 1rem;
  }
`

const Button = styled(Link)`
  background-color: ${color.DARK_BLUE};
  color: ${color.WHITE};
  padding: 12px 24px;
  border-radius: 30px;
  text-decoration: none;
  font-weight: bold;
  text-transform: uppercase;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${color.DARKER_BLUE};
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(26, 90, 122, 0.4);
  }

  &:focus {
    outline: 3px solid ${color.BEIGE};
    outline-offset: 2px;
  }
`

const NavigationLinks = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 2rem;
  flex-wrap: wrap;
  justify-content: center;

  @media ${media.MOBILE} {
    flex-direction: column;
    gap: 15px;
  }
`

const NavLink = styled(Link)`
  color: ${color.WHITE};
  text-decoration: none;
  padding: 8px 16px;
  border: 1px solid ${color.WHITE};
  border-radius: 4px;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${color.WHITE};
    color: ${color.BLACK};
  }

  &:focus {
    outline: 2px solid ${color.BEIGE};
    outline-offset: 2px;
  }
`

export default function Custom404() {
  return (
    <>
      <Head>
        <title>Page Not Found - Scramblelock</title>
        <meta name="description" content="The page you're looking for doesn't exist." />
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <Container>
        <Title>404</Title>
        <Subtitle>Page Not Found</Subtitle>
        <Description>
          Sorry, the page you&apos;re looking for doesn&apos;t exist. It may have been moved,
          deleted, or the URL might be incorrect.
        </Description>
        <Button href="/">Go Home</Button>
        <NavigationLinks>
          <NavLink href="/about">About</NavLink>
          <NavLink href="/media/photos">Photos</NavLink>
          <NavLink href="/media/videos">Videos</NavLink>
          <NavLink href="/contact">Contact</NavLink>
        </NavigationLinks>
      </Container>
    </>
  )
}
