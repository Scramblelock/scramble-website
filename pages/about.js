import styled from 'styled-components'
import Image from 'next/image'
import { memo } from 'react'
import { media } from '../media'
import {
  BIO,
  TEACHINGS,
  CONTESTS,
  EVENTS,
  PERFORMANCES,
  JUDGE_EVENTS,
  BATTLE_GUEST_EVENTS,
  OTHERS,
} from '../const'

const AboutContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100vw;
  text-align: center;
  margin: auto;
  padding: 0;
  max-width: 100%;
  position: relative;
  overflow: hidden;
`

const SecondaryAboutContainer = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  text-align: center;
  width: 100%;
  overflow: hidden;
`

const BackgroundImage = styled(Image)`
  width: 100%;
  height: auto;
  object-fit: cover;
  z-index: -1;
  display: block;

  @media ${media.NON_DESKTOP} {
    object-fit: cover;
    object-position: 80% center;
  }

  @media ${media.TABLET} {
    object-fit: cover;
    object-position: 80% center;
  }
`

const DownArrow = styled(Image)`
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
`

const BlackDownArrow = styled(Image)`
  margin: 1px 0;
  padding-bottom: 10px;
  z-index: 1;
  width: 50px !important;
  height: 50px !important;

  @media ${media.MOBILE} {
    margin: 5px 0;
    padding-bottom: 5px;
  }

  @media ${media.SMALL_MOBILE} {
    width: 40px !important;
    height: 40px !important;
  }
`

const BioContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
`

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 100px 0;

  @media ${media.MOBILE} {
    margin: 20px 0;
  }
`

const ResumeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 200px 100px;
  min-height: 80vh;

  @media ${media.MOBILE} {
    padding: 100px 10px;
    min-height: 60vh;
  }
`

const ResumeSubHeader = styled.h4`
  font-size: 16px;

  @media ${media.MOBILE} {
    font-size: 12px;
  }
`

const Title = styled.h1`
  font-size: 48px;
  margin-bottom: 100px;

  @media ${media.MOBILE} {
    margin-bottom: 50px;
  }
`

const TextBox = styled.p`
  width: 70%;
  font-weight: 200;
  line-height: 1.5;

  @media ${media.TABLET} {
    font-size: 20px;
  }

  @media ${media.MOBILE} {
    font-size: 14px;
  }
`

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  width: 100%;
  max-width: 1200px;

  @media ${media.NON_DESKTOP} {
    grid-template-columns: 1fr;
    gap: 20px;
    padding: 0 10%;
  }
`

const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
`

const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
`

const UnorderedList = styled.ul`
  padding-left: 0;
`

const ListItem = styled.li`
  list-style: none;
  font-size: 16px;
  font-weight: 200;
  line-height: 30px;

  @media ${media.MOBILE} {
    font-size: 10px;
    line-height: 20px;
  }
`

const PlacementText = styled.p`
  font-style: italic;

  @media ${media.MOBILE} {
    font-size: 10px;
  }
`

function About() {
  return (
    <>
      <AboutContainer>
        <BackgroundImage
          src="/about.jpg"
          alt="About background"
          width={1920}
          height={1080}
          quality={85}
          sizes="100vw"
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
          priority
        />
        <DownArrow
          src="/chevron-white.svg"
          height={50}
          width={50}
          alt="down arrow"
          quality={80}
          sizes="50px"
        />
      </AboutContainer>
      <BioContainer>
        <TextContainer>
          <Title>BIO</Title>
          <TextBox>{BIO.p1}</TextBox>
          <TextBox>{BIO.p2}</TextBox>
        </TextContainer>
        <BlackDownArrow
          src="/chevron-black.svg"
          height={50}
          width={50}
          alt="down arrow"
          quality={80}
          sizes="50px"
        />
      </BioContainer>
      <SecondaryAboutContainer>
        <BackgroundImage
          src="/boxes.jpg"
          alt="Boxes background"
          width={1920}
          height={1080}
          quality={85}
          sizes="100vw"
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
          priority
        />
        <DownArrow
          src="/chevron-white.svg"
          height={50}
          width={50}
          alt="down arrow"
          quality={80}
          sizes="50px"
        />
      </SecondaryAboutContainer>
      <ResumeContainer>
        <Title>RESUME</Title>
        <GridContainer>
          <LeftColumn>
            <UnorderedList>
              <ResumeSubHeader>Teaching</ResumeSubHeader>
              {TEACHINGS.map((teaching, index) => (
                <ListItem key={`teaching-${index}`}>{teaching}</ListItem>
              ))}
            </UnorderedList>
            <UnorderedList>
              <ResumeSubHeader>Contests</ResumeSubHeader>
              {CONTESTS.map((contest, index) => {
                return (
                  <div key={`contest-container-${index}`}>
                    <PlacementText key={`contest-${index}`}>{contest.placement}</PlacementText>
                    {contest.description.map((desc, index) => {
                      return <ListItem key={`description-${index}`}>{desc}</ListItem>
                    })}
                  </div>
                )
              })}
            </UnorderedList>
          </LeftColumn>
          <RightColumn>
            <UnorderedList>
              <ResumeSubHeader>Events Organized</ResumeSubHeader>
              {EVENTS.map((event, index) => (
                <ListItem key={`event-${index}`}>{event}</ListItem>
              ))}
            </UnorderedList>
            <UnorderedList>
              <ResumeSubHeader>Performances</ResumeSubHeader>
              {PERFORMANCES.map((performance, index) => (
                <ListItem key={`performance-${index}`}>{performance}</ListItem>
              ))}
            </UnorderedList>
            <UnorderedList>
              <ResumeSubHeader>Guest Judge</ResumeSubHeader>
              {JUDGE_EVENTS.map((event, index) => (
                <ListItem key={`judge-${index}`}>{event}</ListItem>
              ))}
            </UnorderedList>
            <UnorderedList>
              <ResumeSubHeader>Battle Guest</ResumeSubHeader>
              {BATTLE_GUEST_EVENTS.map((event, index) => (
                <ListItem key={`battle-${index}`}>{event}</ListItem>
              ))}
            </UnorderedList>
            <UnorderedList>
              <ResumeSubHeader>Others</ResumeSubHeader>
              {OTHERS.map((event, index) => (
                <ListItem key={`other-${index}`}>{event}</ListItem>
              ))}
            </UnorderedList>
          </RightColumn>
        </GridContainer>
      </ResumeContainer>
    </>
  )
}

export default memo(About)
