import styled from 'styled-components'
import format from 'date-fns/format'
import Image from 'next/image'
import { media } from '../media'
import { color } from '../color'
import { PRIMARY_SOCIAL_ICONS, SECONDARY_SOCIAL_ICONS, EMAIL } from '../const'

const ContactContainer = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  height: 100vh;
  width: 100vw;
  background-image: url(/contact1.jpg);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: top center;
  background-attachment: fixed;

  @media ${media.NON_DESKTOP} {
    background-attachment: scroll;
  }
`

const DownArrow = styled(Image)`
  align-self: flex-end;
  padding-bottom: 10px;
`

const ContactInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  margin: 50px 0;

  @media ${media.SMALL_MOBILE} {
    padding: 0 20px;
  }
`

const Title = styled.h1`
  font-size: 48px;
  margin-bottom: 100px;

  @media ${media.MOBILE} {
    margin-bottom: 50px;
  }
`

const ContentContainer = styled.div`
  display: flex;
  justify-content: center;
  padding-bottom: 50px;

  @media ${media.NON_DESKTOP} {
    flex-wrap: wrap;
  }
`

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-right: 0;
  text-align: center;
  width: 50%;

  @media ${media.SMALL_MOBILE} {
    width: 90%;
  }
`

const PrimarySocials = styled.div`
  margin: 40px 0;

  @media ${media.SMALL_MOBILE} {
    display: flex;
    margin: 20px 0;
  }
`

const SecondarySocials = styled.div`
  margin: 10px 0 40px 0;
`

const ContactImage = styled(Image)`
  margin-left: 20px;

  @media ${media.MOBILE} {
    margin-left: 0;
  }
`

const TextBox = styled.p`
  font-size: 24px;
  font-weight: 200;
  line-height: 1.5;

  @media ${media.NON_DESKTOP} {
    font-size: 20px;
  }
`

const EmailLink = styled.a``

const CreditsText = styled(TextBox)`
  font-size: 12px;
  width: 60%;
  margin: 0 140px;
  text-align: left;

  @media ${media.TABLET} {
    padding: 0 20px 0 20px;
    width: 100% !important;
    margin-left: 0;
    margin-right: 0;
  }

  @media ${media.MOBILE} {
    margin-left: 0;
    padding: 0 20px 40px 20px;
    width: 100%;
  }
`

const FinalImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  text-align: center;
  height: 100vh;
  width: 100vw;
  background-image: url(/contact3.jpg);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: top center;
  background-attachment: fixed;

  @media ${media.NON_DESKTOP} {
    background-attachment: scroll;
  }
`

const CopyrightText = styled.p`
  color: ${color.WHITE};
  font-size: 24px;
  font-weight: 200;
  line-height: 1.5;

  @media ${media.TABLET} {
    font-size: 20px;
  }

  @media ${media.MOBILE} {
    font-size: 14px;
  }
`

const SocialIcon = styled.a`
  margin-right: 12px;
`

export default function Contact() {
  return (
    <>
      <ContactContainer>
        <DownArrow
          src="/chevron-white.svg"
          height={50}
          width={50}
          layout={'raw'}
          alt="down arrow"
        />
      </ContactContainer>
      <ContactInfoContainer>
        <Title>CONTACT</Title>
        <ContentContainer>
          <TextContainer>
            <TextBox>Marc "Scramblelock" Sakalauskas</TextBox>
            <EmailLink target="_blank" href={`mailto:${EMAIL}`}>
              <TextBox>scramblelock@gmail.com</TextBox>
            </EmailLink>
            <PrimarySocials>
              {PRIMARY_SOCIAL_ICONS.map((icon, index) => {
                return (
                  <SocialIcon
                    target="_blank"
                    key={icon.name}
                    href={icon.url}
                    rel="noopener noreferrer"
                  >
                    <Image src={icon.logo} width={40} height={40} alt={icon.name} />
                  </SocialIcon>
                )
              })}
            </PrimarySocials>
            <SecondarySocials>
              {' '}
              {SECONDARY_SOCIAL_ICONS.map((icon, index) => {
                return (
                  <SocialIcon
                    target="_blank"
                    key={icon.name}
                    href={icon.url}
                    rel="noopener noreferrer"
                  >
                    <Image src={icon.logo} width={60} height={60} alt={icon.name} />
                  </SocialIcon>
                )
              })}
            </SecondarySocials>
            <CreditsText>
              <strong>Photo credits:</strong> Melika Dez, Hoi Do, Kyle Ruggles, Alain Wong, Kei
              Nakagawa, Morgan Petrowski, Sasha Box, Victah Little, Yo Tidav, Derek Samaha, Little
              Shao, Mark Valino, KNG Artworks, Julie Soto, Paul Green
            </CreditsText>
          </TextContainer>
          <ContactImage
            src="/contact2.jpg"
            height={600}
            width={400}
            alt="contact image 2"
          ></ContactImage>
        </ContentContainer>
      </ContactInfoContainer>
      <FinalImageContainer>
        <CopyrightText>MARC SAKALAUSKAS © {format(new Date(), 'yyyy')}</CopyrightText>
      </FinalImageContainer>
    </>
  )
}
