import Head from 'next/head'
import {
  BIO,
  EMAIL,
  PRIMARY_SOCIAL_ICONS,
  SITE_URL,
  SITE_NAME,
  PERSON_NAME,
  MAIN_DESCRIPTION,
} from '../const'

const absoluteUrl = path => {
  if (!path) {
    return SITE_URL
  }

  if (/^https?:\/\//.test(path)) {
    return path
  }

  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`
}

const stripEmptyValues = value => {
  if (Array.isArray(value)) {
    return value.map(stripEmptyValues).filter(item => item !== undefined)
  }

  if (value && typeof value === 'object') {
    return Object.entries(value).reduce((schema, [key, entryValue]) => {
      const cleanValue = stripEmptyValues(entryValue)

      if (cleanValue === undefined) {
        return schema
      }

      return {
        ...schema,
        [key]: cleanValue,
      }
    }, {})
  }

  return value === null || value === '' ? undefined : value
}

export const personSchema = () =>
  stripEmptyValues({
    '@type': 'Person',
    '@id': `${SITE_URL}/#person`,
    name: PERSON_NAME,
    alternateName: 'Scramblelock',
    url: SITE_URL,
    email: EMAIL,
    description: `${BIO.p1} ${BIO.p2} ${BIO.p3}`.replace(/\s+/g, ' ').trim(),
    sameAs: PRIMARY_SOCIAL_ICONS.map(route => route.url).filter(url => !url.startsWith('mailto:')),
    jobTitle: ['Artist', 'Educator', 'Street dance archivist', 'Historian'],
    knowsAbout: ['Locking dance', 'Campbellocking', 'Street dance', 'Hip hop culture'],
  })

export const websiteSchema = () => ({
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  url: SITE_URL,
  name: SITE_NAME,
  description: MAIN_DESCRIPTION,
  publisher: {
    '@id': `${SITE_URL}/#person`,
  },
  inLanguage: 'en',
})

export const webpageSchema = ({ path = '/', title, description, type = 'WebPage' }) =>
  stripEmptyValues({
    '@type': type,
    '@id': `${absoluteUrl(path)}#webpage`,
    url: absoluteUrl(path),
    name: title,
    description,
    isPartOf: {
      '@id': `${SITE_URL}/#website`,
    },
    about: {
      '@id': `${SITE_URL}/#person`,
    },
    primaryImageOfPage: {
      '@type': 'ImageObject',
      url: absoluteUrl('/optimized/background-1920.avif'),
    },
    inLanguage: 'en',
  })

export const profilePageSchema = ({ path = '/about', title, description }) =>
  stripEmptyValues({
    ...webpageSchema({
      path,
      title,
      description,
      type: 'ProfilePage',
    }),
    mainEntity: {
      '@id': `${SITE_URL}/#person`,
    },
  })

export const blogSchema = posts =>
  stripEmptyValues({
    '@type': 'Blog',
    '@id': `${SITE_URL}/blog#blog`,
    url: `${SITE_URL}/blog`,
    name: 'Scramblelock Blog',
    description: 'Writing, research, and reflections from Scramblelock.',
    publisher: {
      '@id': `${SITE_URL}/#person`,
    },
    author: {
      '@id': `${SITE_URL}/#person`,
    },
    blogPost: posts.map(post => ({
      '@id': `${SITE_URL}/blog/${post.slug}#blogposting`,
    })),
    inLanguage: 'en',
  })

export const blogPostingSchema = post =>
  stripEmptyValues({
    '@type': 'BlogPosting',
    '@id': `${SITE_URL}/blog/${post.slug}#blogposting`,
    mainEntityOfPage: {
      '@id': `${SITE_URL}/blog/${post.slug}#webpage`,
    },
    headline: post.title,
    description: post.excerpt,
    image: post.coverImage ? absoluteUrl(post.coverImage) : undefined,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@id': `${SITE_URL}/#person`,
    },
    publisher: {
      '@id': `${SITE_URL}/#person`,
    },
    url: `${SITE_URL}/blog/${post.slug}`,
    inLanguage: 'en',
  })

export const schemaGraph = schemas => ({
  '@context': 'https://schema.org',
  '@graph': schemas.map(stripEmptyValues),
})

export function JsonLd({ schema }) {
  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </Head>
  )
}
