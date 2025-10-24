import { useEffect, useState, useCallback } from 'react'
import styled from 'styled-components'
import Image from 'next/image'
import Navigation from './navigation'
import ClientOnly from './clientOnly'

const BackToTopButton = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: transparent;
  cursor: pointer;
  border: none;
`

export default function Layout({ children }) {
  const [showButton, setShowButton] = useState(false)

  const handleScroll = useCallback(() => {
    const scrollY = window.pageYOffset
    setShowButton(scrollY > 300)
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

  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }, [])

  return (
    <>
      <ClientOnly>
        <Navigation />
      </ClientOnly>
      {children}
      <ClientOnly>
        {showButton && (
          <BackToTopButton onClick={scrollToTop}>
            <Image
              src="/up-arrow.png"
              width={50}
              height={50}
              alt="back to top"
              quality={80}
              sizes="50px"
            />
          </BackToTopButton>
        )}
      </ClientOnly>
    </>
  )
}
