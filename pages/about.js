import styled from 'styled-components'
import Image from 'next/image'
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
  height: 100vh;
  width: 100vw;
  text-align: center;
  margin: auto;
  padding: 0;
  max-width: 100%;
  background-image: url(/about.jpg);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: right;

  @media ${media.DESKTOP} {
    background-attachment: fixed;
  }

  @media ${media.NON_DESKTOP} {
    background-attachment: scroll;
  }
`

const SecondaryAboutContainer = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  text-align: center;
  height: 100vh;
  background-image: url(/boxes.jpg);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;

  @media ${media.DESKTOP} {
    background-attachment: fixed;
  }

  @media ${media.NON_DESKTOP} {
    background-attachment: scroll;
  }
`

const DownArrow = styled(Image)`
  align-self: flex-end;
  padding-bottom: 10px;
`

const BlackDownArrow = styled(Image)`
  position: absolute;
  bottom: 0;
  margin-top: 10px;
  padding-bottom: 10px;

  @media ${media.SMALL_MOBILE} {
    height: 40px;
  }
`

const BioContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
`

const ResumeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 200px 100px;

  @media ${media.MOBILE} {
    padding: 100px 10px;
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
  display: table;
`

const LeftColumn = styled.div`
  float: left;
  width: 50%;

  @media ${media.NON_DESKTOP} {
    width: 100%;
    padding: 0 10%;
  }
`

const RightColumn = styled.div`
  float: left;
  width: 50%;
  padding-left: 40px;

  @media ${media.NON_DESKTOP} {
    width: 100%;
    padding: 0 10%;
  }
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

export default function About() {
  return (
    <>
      <AboutContainer>
        <DownArrow
          src="/chevron-white.svg"
          height={50}
          width={50}
          layout={'raw'}
          alt="down arrow"
        />
      </AboutContainer>
      <BioContainer>
        <Title>BIO</Title>
        <TextBox>{BIO.p1}</TextBox>
        <TextBox>{BIO.p2}</TextBox>
        <BlackDownArrow
          src="/chevron-black.svg"
          height={50}
          width={50}
          layout={'raw'}
          alt="down arrow"
        />
      </BioContainer>
      <SecondaryAboutContainer>
        <DownArrow
          src="/chevron-white.svg"
          height={50}
          width={50}
          layout={'raw'}
          alt="down arrow"
        />
      </SecondaryAboutContainer>
      <ResumeContainer>
        <Title>RESUME</Title>
        <GridContainer>
          <LeftColumn>
            <UnorderedList>
              <ResumeSubHeader>Teaching</ResumeSubHeader>
              {TEACHINGS.map((teaching, index) => {
                return <ListItem key={`teaching-${index}`}>{teaching}</ListItem>
              })}
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
              {EVENTS.map((event, index) => {
                return <ListItem key={`event-${index}`}>{event}</ListItem>
              })}
            </UnorderedList>
            <UnorderedList>
              <ResumeSubHeader>Performances</ResumeSubHeader>
              {PERFORMANCES.map((performance, index) => {
                return <ListItem key={`performance-${index}`}>{performance}</ListItem>
              })}
            </UnorderedList>
            <UnorderedList>
              <ResumeSubHeader>Guest Judge</ResumeSubHeader>
              {JUDGE_EVENTS.map((event, index) => {
                return <ListItem key={`judge-${index}`}>{event}</ListItem>
              })}
            </UnorderedList>
            <UnorderedList>
              <ResumeSubHeader>Battle Guest</ResumeSubHeader>
              {BATTLE_GUEST_EVENTS.map((event, index) => {
                return <ListItem key={`battle-${index}`}>{event}</ListItem>
              })}
            </UnorderedList>
            <UnorderedList>
              <ResumeSubHeader>Others</ResumeSubHeader>
              {OTHERS.map((event, index) => {
                return <ListItem key={`other-${index}`}>{event}</ListItem>
              })}
            </UnorderedList>
          </RightColumn>
        </GridContainer>
      </ResumeContainer>
    </>
  )
}
