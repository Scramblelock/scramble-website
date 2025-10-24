import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { color } from '../color'
import { media } from '../media'

const CookieBanner = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: ${color.DARK_GREY};
  color: ${color.WHITE};
  padding: 20px;
  z-index: 1000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 15px;

  @media ${media.MOBILE} {
    flex-direction: column;
    text-align: center;
  }
`

const CookieText = styled.p`
  margin: 0;
  font-size: 14px;
  line-height: 1.4;
  flex: 1;
  max-width: 600px;

  @media ${media.MOBILE} {
    font-size: 12px;
  }
`

const CookieButtons = styled.div`
  display: flex;
  gap: 10px;
  flex-shrink: 0;

  @media ${media.MOBILE} {
    width: 100%;
    justify-content: center;
  }
`

const CookieButton = styled.button`
  background: ${props => (props.primary ? color.BLUE : 'transparent')};
  color: ${props => (props.primary ? color.WHITE : color.WHITE)};
  border: ${props => (props.primary ? 'none' : `1px solid ${color.WHITE}`)};
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => (props.primary ? color.WHITE : color.WHITE)};
    color: ${props => (props.primary ? color.BLUE : color.DARK_GREY)};
  }

  @media ${media.MOBILE} {
    padding: 10px 20px;
    font-size: 12px;
  }
`

const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('cookie-consent')
    if (!consent) {
      setShowBanner(true)
    }
  }, [])

  const acceptCookies = () => {
    localStorage.setItem('cookie-consent', 'accepted')
    setShowBanner(false)
    // Enable Google Analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: 'granted',
      })
    }
  }

  const declineCookies = () => {
    localStorage.setItem('cookie-consent', 'declined')
    setShowBanner(false)
    // Disable Google Analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: 'denied',
      })
    }
  }

  if (!showBanner) return null

  return (
    <CookieBanner>
      <CookieText>
        We use cookies to improve your experience and analyze site usage. By continuing to use this
        site, you consent to our use of cookies.
      </CookieText>
      <CookieButtons>
        <CookieButton onClick={declineCookies}>Decline</CookieButton>
        <CookieButton primary onClick={acceptCookies}>
          Accept
        </CookieButton>
      </CookieButtons>
    </CookieBanner>
  )
}

export default CookieConsent
