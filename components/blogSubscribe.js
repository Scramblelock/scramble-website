import { useMemo, useState } from 'react'
import styled from 'styled-components'
import { color } from '../color'
import { media } from '../media'

const SubscribeSection = styled.section`
  max-width: 820px;
  margin: 80px auto 0;
  padding: 32px;
  border: 1px solid rgba(233, 241, 247, 0.18);
  border-radius: 8px;
  background: ${color.WHITE};
  color: ${color.BLACK};

  @media ${media.MOBILE} {
    margin-top: 56px;
    padding: 24px;
  }
`

const Eyebrow = styled.p`
  margin: 0 0 12px;
  color: ${color.DARK_BLUE};
  font-size: 14px;
  font-weight: 700;
  text-transform: uppercase;
`

const Title = styled.h2`
  margin: 0 0 12px;
  font-size: 32px;
  line-height: 1.15;

  @media ${media.MOBILE} {
    font-size: 28px;
  }
`

const Copy = styled.p`
  margin: 0 0 24px;
  max-width: 540px;
  font-size: 16px;
  line-height: 1.6;
`

const Form = styled.form`
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 12px;

  @media ${media.MOBILE} {
    grid-template-columns: 1fr;
  }
`

const EmailInput = styled.input`
  min-height: 48px;
  padding: 0 14px;
  border: 1px solid rgba(19, 27, 35, 0.2);
  border-radius: 8px;
  font-size: 16px;
  color: ${color.BLACK};

  &::placeholder {
    color: rgba(19, 27, 35, 0.65);
  }
`

const SubmitButton = styled.button`
  min-height: 48px;
  padding: 0 20px;
  border: 1px solid ${color.BLACK};
  border-radius: 8px;
  background: ${color.BLACK};
  color: ${color.WHITE};
  font-size: 16px;
  font-weight: 700;

  &:hover {
    cursor: pointer;
  }

  &:disabled {
    cursor: wait;
    opacity: 0.75;
  }
`

const StatusText = styled.p`
  margin: 14px 0 0;
  min-height: 24px;
  color: ${({ $status }) => ($status === 'error' ? '#a31b1b' : color.DARK_BLUE)};
  font-size: 14px;
  font-weight: 700;
`

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const normalizeEmail = value => value.trim().toLowerCase()

export default function BlogSubscribe() {
  const subscribeUrl = useMemo(() => {
    const baseUrl = process.env.NEXT_PUBLIC_PORTFOLIO_API_URL

    if (!baseUrl) {
      return ''
    }

    return `${baseUrl.replace(/\/$/, '')}/api/subscribe`
  }, [])

  const [email, setEmail] = useState('')
  const [status, setStatus] = useState({
    type: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = event => {
    setEmail(normalizeEmail(event.target.value))

    if (status.message) {
      setStatus({
        type: '',
        message: '',
      })
    }
  }

  const handleSubmit = async event => {
    event.preventDefault()

    const normalizedEmail = normalizeEmail(email)

    if (!EMAIL_REGEX.test(normalizedEmail)) {
      setStatus({
        type: 'error',
        message: 'Enter a valid email address.',
      })
      return
    }

    if (!subscribeUrl) {
      setStatus({
        type: 'error',
        message: 'Subscription is unavailable right now.',
      })
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch(subscribeUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: normalizedEmail,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Subscription failed.')
      }

      setEmail('')
      setStatus({
        type: 'success',
        message: data.message || 'You are subscribed.',
      })
    } catch (error) {
      setStatus({
        type: 'error',
        message: error.message || 'Subscription failed.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <SubscribeSection>
      <Eyebrow>Stay in touch</Eyebrow>
      <Title>Get new posts in your inbox.</Title>
      <Copy>Join the mailing list for new posts, articles, and updates from Scramble.</Copy>
      <Form onSubmit={handleSubmit}>
        <EmailInput
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="Email address"
          maxLength="254"
          required
          value={email}
          onChange={handleChange}
          aria-label="Email address"
        />
        <SubmitButton type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Subscribing...' : 'Subscribe'}
        </SubmitButton>
      </Form>
      <StatusText $status={status.type} aria-live="polite">
        {status.message}
      </StatusText>
    </SubscribeSection>
  )
}
