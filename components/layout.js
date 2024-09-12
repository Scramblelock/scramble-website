import { useEffect, useState } from 'react'
import styled from 'styled-components'
import Image from 'next/image'
import Navigation from './navigation'

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

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 300) {
        setShowButton(true)
      } else {
        setShowButton(false)
      }
    })
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <>
      <Navigation />
      {children}
      {showButton && (
        <BackToTopButton onClick={scrollToTop}>
          <Image src="/up-arrow.png" width={50} height={50} layout={'raw'} alt="back to top" />
        </BackToTopButton>
      )}
    </>
  )
}
