import styled from 'styled-components'
import Link from 'next/link'
import Image from 'next/image'
import React, { memo } from 'react'
import { media } from '../media'
import { color } from '../color'
import { ROUTES, SOCIAL_ROUTES } from '../const'

const StyledMenu = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1001;
  background-color: ${color.BLUE};
  transform: ${props => (props.$isOpen ? 'translateX(0)' : 'translateX(100%)')};
  transition: transform 0.3s ease-in-out;
  opacity: ${props => (props.$isOpen ? '1' : '0')};
  pointer-events: ${props => (props.$isOpen ? 'auto' : 'none')};

  @media (min-width: 769px) {
    display: none;
  }
`

const NavItems = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: ${color.BLUE};
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  text-align: center;
  list-style: none;
  position: absolute;
  text-decoration: none;
  z-index: 1001;
  padding-left: 0;
  margin: 0;
`

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: transparent;
  border: none;
  z-index: 1002;
`

const Item = styled.li`
  font-size: 2rem;
  text-transform: uppercase;
  padding: 2rem 0;
  font-weight: bold;
  letter-spacing: 0.5rem;
  color: ${color.WHITE};
  text-decoration: none;

  @media ${media.MOBILE} {
    font-size: 1.5rem;
  }
`

const SocialItems = styled.div`
  margin: 35px 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
`

const SocialIcon = styled.a`
  padding: 0 6px;
  margin: 0 6px;
  cursor: pointer;
`

const MenuLogo = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 1002;
`

const Menu = ({ handleHamburgerClick, $hamburgerOpen }) => {
  return (
    <StyledMenu $isOpen={$hamburgerOpen}>
      <NavItems>
        <MenuLogo>
          <Image
            src="/Scramble-logo-invert.png"
            width={120}
            height={50}
            alt="Scramblelock Logo"
            quality={90}
            sizes="120px"
          />
        </MenuLogo>
        <CloseButton onClick={handleHamburgerClick}>
          <Image
            src={'/close.svg'}
            width={40}
            height={40}
            alt={'close'}
            quality={80}
            sizes="40px"
          />
        </CloseButton>
        {ROUTES.map(route => (
          <Item key={route.href} onClick={handleHamburgerClick}>
            <Link href={route.href}>{route.label}</Link>
          </Item>
        ))}
        <SocialItems>
          {SOCIAL_ROUTES.map(route => (
            <SocialIcon target="_blank" href={route.url} key={route.name} rel="noopener noreferrer">
              <Image
                src={route.logo}
                width={24}
                height={24}
                alt={route.name}
                quality={80}
                sizes="24px"
              />
            </SocialIcon>
          ))}
        </SocialItems>
      </NavItems>
    </StyledMenu>
  )
}

export default memo(Menu)
