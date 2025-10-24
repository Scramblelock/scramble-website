import { useState, useEffect, useCallback, memo } from 'react'
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
  background: ${props => `rgba(10, 10, 10, ${props.$backgroundTransparacy})`};
  display: flex;
  flex-direction: row;
  align-items: center;
  z-index: 1000;
  top: 0;
  left: 0;

  @media ${media.MOBILE} {
    display: ${props => (props.$hamburgerOpen ? 'none' : 'flex')};
  }
`

const LogoLink = styled.div`
  margin-left: 24px;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.2s ease;
  outline: none;

  &:focus {
    outline: 2px solid ${color.WHITE};
    outline-offset: 2px;
  }

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

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
    color: ${color.BEIGE};
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
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 0.7;
  }
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

const StyledLink = styled(Link)`
  &.active {
    border-bottom: 2px solid ${color.WHITE};
  }
`

const Navigation = () => {
  const router = useRouter()
  const [hamburgerOpen, setHamburgerOpen] = useState(false)
  const [clientWindowHeight, setClientWindowHeight] = useState(0)
  const [backgroundTransparacy, setBackgroundTransparacy] = useState(0)

  const handleHamburgerClick = useCallback(() => {
    setHamburgerOpen(prev => !prev)
  }, [])

  const handleScroll = useCallback(() => {
    setClientWindowHeight(window.scrollY)
  }, [])

  useEffect(() => {
    let timeoutId
    const throttledScroll = () => {
      if (timeoutId) return
      timeoutId = setTimeout(() => {
        handleScroll()
        timeoutId = null
      }, 16) // ~60fps
    }

    window.addEventListener('scroll', throttledScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', throttledScroll)
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [handleScroll])

  useEffect(() => {
    const backgroundTransparacyVar = Math.min(clientWindowHeight / 3000, 1)
    setBackgroundTransparacy(backgroundTransparacyVar)
  }, [clientWindowHeight])

  return (
    <>
      <NavContainer $backgroundTransparacy={backgroundTransparacy} $hamburgerOpen={hamburgerOpen}>
        <LogoLink
          tabIndex={1}
          role="button"
          aria-label="Go to homepage"
          onClick={() => (window.location.href = '/')}
          onKeyDown={e => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              window.location.href = '/'
            }
          }}
        >
          <Image
            src="/Scramble-logo-invert.png"
            width={120}
            height={50}
            alt="Scramblelock Logo"
            quality={90}
            sizes="120px"
          />
        </LogoLink>
        <NoBurgerNav>
          <NavItems>
            {ROUTES.map((route, index) => (
              <Item key={route.href}>
                <StyledLink
                  href={route.href}
                  className={router.pathname === route.href ? 'active' : ''}
                  tabIndex={2 + index}
                >
                  {route.label}
                </StyledLink>
              </Item>
            ))}
            <Item id={'social'}>
              {SOCIAL_ROUTES.map((route, index) => (
                <SocialIcon
                  target="_blank"
                  key={route.name}
                  href={route.url}
                  rel="noopener noreferrer"
                  tabIndex={2 + ROUTES.length + index}
                >
                  <Image
                    src={route.logo}
                    width={16}
                    height={16}
                    alt={route.name}
                    quality={80}
                    sizes="16px"
                  />
                </SocialIcon>
              ))}
            </Item>
          </NavItems>
        </NoBurgerNav>
        <BurgerNav onClick={handleHamburgerClick}>
          <Burger />
        </BurgerNav>
      </NavContainer>
      <Menu hamburgerOpen={hamburgerOpen} handleHamburgerClick={handleHamburgerClick} />
    </>
  )
}

export default memo(Navigation)
