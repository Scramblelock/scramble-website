import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'
import Burger from './burger'
import Menu from './menu'
import { ROUTES, SOCIAL_ROUTES } from '../const'
import { media } from '../media'
import { color } from '../color'

const NavContainer = styled.div`
  width: 100%;
  position: fixed;
  margin: 0 auto;
  background-color: ${color.GREY};
  background: ${props => `rgba(10, 10, 10, ${props.backgroundTransparacy})`};
  display: flex;
  flex-direction: row;
  align-items: center;
  z-index: 1;
`

const LogoLink = styled.a`
  margin-left: 24px;

  @media ${media.MOBILE} {
    margin-left: 5px;
    padding: 5px;
  }
`

const NavItems = styled.ul`
  display: flex;
  list-style: none;
  justify-content: flex-end;
  align-items: center;
  margin-right: 12px;
`

const Item = styled.li`
  padding: 6px;
  margin: 0 16px;
  font-family: 'Fira Sans', sans-serif;
  color: ${color.WHITE};

  &:hover a {
    color: ${color.BLACK};
  }

  &#social {
    display: flex;
    margin-leeft: 16px;
    margin-right: 0;
  }
`

const SocialIcon = styled.a`
  display: flex;
  padding: 0 3px;
  margin: 0 6px;
  cursor: pointer;
`

const NoBurgerNav = styled.div`
  flex: 1;

  @media ${media.MOBILE} {
    display: none;
  }
`

const BurgerNav = styled.div`
  @media ${media.NON_MOBILE} {
    display: none;
  }
`

const Anchor = styled.a`
  &.active {
    border-bottom: 2px solid ${color.WHITE};
  }
`

const Navigation = () => {
  const router = useRouter()
  const [hamburgerOpen, setHamburgerOpen] = useState(false)
  const [clientWindowHeight, setClientWindowHeight] = useState('')
  const [backgroundTransparacy, setBackgroundTransparacy] = useState(0)

  const handleHamburgerClick = () => {
    setHamburgerOpen(!hamburgerOpen)
  }

  const handleScroll = () => {
    setClientWindowHeight(window.scrollY)
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  })

  useEffect(() => {
    let backgroundTransparacyVar = clientWindowHeight / 3000

    if (backgroundTransparacyVar < 1) {
      setBackgroundTransparacy(backgroundTransparacyVar)
    }
  }, [clientWindowHeight])

  return (
    <NavContainer backgroundTransparacy={backgroundTransparacy}>
      <Link href="/" passHref>
        <LogoLink>
          <Image
            src="/Scramble-logo-invert.png"
            width={120}
            height={50}
            alt="Scramblelock Logo"
          />
        </LogoLink>
      </Link>
      <NoBurgerNav>
        <NavItems>
          {ROUTES.map(route => (
            <Item key={route.href}>
              <Link href={route.href} passHref>
                <Anchor
                  className={router.pathname === route.href ? 'active' : ''}
                >
                  {route.label}
                </Anchor>
              </Link>
            </Item>
          ))}
          <Item id={'social'}>
            {SOCIAL_ROUTES.map(route => (
              <SocialIcon
                target="_blank"
                key={route.name}
                href={route.url}
                rel="noopener noreferrer"
              >
                <Image
                  src={route.logo}
                  width={16}
                  height={16}
                  alt={route.name}
                />
              </SocialIcon>
            ))}
          </Item>
        </NavItems>
      </NoBurgerNav>
      <BurgerNav onClick={handleHamburgerClick}>
        <Burger />
      </BurgerNav>
      <Menu
        hamburgerOpen={hamburgerOpen}
        handleHamburgerClick={handleHamburgerClick}
      />
    </NavContainer>
  )
}

export default Navigation
