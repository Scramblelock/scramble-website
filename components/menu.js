import styled from 'styled-components'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'
import { media } from '../media'
import { color } from '../color'
import { ROUTES, SOCIAL_ROUTES } from '../const'
import { route } from 'next/dist/server/router'

const StyledMenu = styled.div`
  @media ${media.NON_MOBILE} {
    display: none;
  }
`

const NavItems = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: ${color.BLUE};
  top: 47px;
  height: 100vh;
  text-align: center;
  list-style: none;
  position: absolute;
  right: 0;
  text-decoration: none;

  @media ${media.MOBILE} {
    width: ${props => (props.hamburgerOpen ? '100vw' : '0')};
    overflow-x: hidden;
    transition: 0.5s;
    padding-left: 0;
  }
`

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 22px;
  margin-left: 50px;
  background: transparent;
  border: none;
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
`

const Menu = ({ handleHamburgerClick, hamburgerOpen }) => {
  const router = useRouter()

  return (
    <StyledMenu>
      <NavItems hamburgerOpen={hamburgerOpen}>
        <CloseButton onClick={handleHamburgerClick}>
          <Image src={'/close.svg'} width={40} height={40} alt={'close'} />
        </CloseButton>
        {ROUTES.map(route => (
          <Item key={route.href} onClick={handleHamburgerClick}>
            <Link href={route.href}>
              <a>{route.label}</a>
            </Link>
          </Item>
        ))}
        <SocialItems>
          {SOCIAL_ROUTES.map(route => (
            <SocialIcon target="_blank" href={route.url} key={route.name} rel="noopener noreferrer">
              <Image src={route.logo} width={24} height={24} alt={route.name} />
            </SocialIcon>
          ))}
        </SocialItems>
      </NavItems>
    </StyledMenu>
  )
}

export default Menu
