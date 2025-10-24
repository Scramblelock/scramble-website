import { useEffect } from 'react'

const useSlider = (slideImage, images) => {
  let slideCounter = 0

  useEffect(() => {
    // Use a timeout to ensure the ref is available
    const timer = setTimeout(() => {
      if (slideImage.current && images && images.length > 0) {
        startSlider()
      }
    }, 100)

    return () => clearTimeout(timer)
  }, [images])

  const startSlider = () => {
    if (slideImage.current && images && images.length > 0) {
      slideImage.current.style.backgroundImage = `url(${images[0].src})`
      slideImage.current.style.backgroundSize = 'contain'
      slideImage.current.style.backgroundPosition = 'center center'
      slideImage.current.style.backgroundRepeat = 'no-repeat'
    }
  }

  const handleSlide = slide => {
    if (slideImage.current && images && images[slide - 1]) {
      slideImage.current.style.backgroundImage = `url(${images[slide - 1].src})`
      animateSlide(slideImage)
    }
  }

  const animateSlide = () => {
    if (slideImage.current) {
      slideImage.current.classList.add('fadeIn')
      setTimeout(() => {
        if (slideImage.current) {
          slideImage.current.classList.remove('fadeIn')
        }
      }, 700)
    }
  }

  const goToPreviousSlide = () => {
    if (!slideImage.current || !images || images.length === 0) return

    if (slideCounter === 0) {
      handleSlide(images.length)
      slideCounter = images.length
    }

    handleSlide(slideCounter)
    slideCounter--
  }

  const goToNextSlide = () => {
    if (!slideImage.current || !images || images.length === 0) return

    if (slideCounter === images.length - 1) {
      startSlider()
      slideCounter = -1
      animateSlide(slideImage)
    }

    if (images[slideCounter + 1]) {
      slideImage.current.style.backgroundImage = `url(${images[slideCounter + 1].src})`
      slideCounter++
      animateSlide(slideImage)
    }
  }

  return { goToPreviousSlide, goToNextSlide }
}

export default useSlider
