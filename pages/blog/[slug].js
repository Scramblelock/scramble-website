import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styled from 'styled-components'
import { getPostBySlug, getPostSlugs } from '../../lib/blog'
import BlogSubscribe from '../../components/blogSubscribe'
import { media } from '../../media'
import { color } from '../../color'
import {
  JsonLd,
  blogPostingSchema,
  personSchema,
  schemaGraph,
  webpageSchema,
  websiteSchema,
} from '../../lib/schema'

const PostContainer = styled.main`
  min-height: 100vh;
  padding: 130px 24px 80px;
  background: ${color.BLACK};
  color: ${color.WHITE};
`

const Article = styled.article`
  max-width: 820px;
  margin: 0 auto;
`

const BackLink = styled(Link)`
  display: inline-flex;
  margin-bottom: 42px;
  color: ${color.BEIGE};
  font-weight: 700;
`

const Header = styled.header`
  margin-bottom: 42px;
  text-align: center;
`

const DateText = styled.p`
  margin: 0 0 14px;
  color: ${color.BEIGE};
  font-size: 14px;
  font-weight: 700;
  text-transform: uppercase;
`

const Title = styled.h1`
  margin: 0 auto 22px;
  max-width: 900px;
  font-size: 48px;
  letter-spacing: 0;

  @media ${media.MOBILE} {
    font-size: 34px;
  }
`

const Excerpt = styled.p`
  margin: 0 auto;
  max-width: 680px;
  font-size: 20px;
  font-weight: 200;
  line-height: 1.6;

  @media ${media.MOBILE} {
    font-size: 16px;
  }
`

const CoverWrap = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  margin-bottom: 48px;
  overflow: hidden;
  border-radius: 8px;
  background: ${color.DARK_GREY};
`

const CoverImage = styled(Image)`
  object-fit: cover;
`

const Content = styled.div`
  font-size: 20px;
  font-weight: 200;
  line-height: 1.75;

  @media ${media.MOBILE} {
    font-size: 17px;
  }

  h1,
  h2,
  h3 {
    margin: 48px 0 18px;
    line-height: 1.2;
    letter-spacing: 0;
  }

  h1 {
    font-size: 40px;
  }

  h2 {
    font-size: 32px;
  }

  h3 {
    font-size: 26px;
  }

  p,
  ul,
  blockquote {
    margin: 0 0 24px;
  }

  ul {
    padding-left: 24px;
  }

  li {
    margin-bottom: 10px;
  }

  a {
    color: ${color.BEIGE};
    font-weight: 700;
    text-decoration: underline;
  }

  blockquote {
    border-left: 4px solid ${color.BEIGE};
    padding-left: 20px;
    font-style: italic;
  }

  img {
    width: 100%;
    height: auto;
    margin: 18px 0 28px;
    border-radius: 8px;
  }

  code {
    padding: 2px 5px;
    border-radius: 4px;
    background: rgba(233, 241, 247, 0.12);
    font-size: 0.9em;
  }
`

const formatPostDate = date => {
  if (!date) {
    return ''
  }

  const [year, month, day] = date.split('-').map(Number)

  return new Intl.DateTimeFormat('en', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(year, month - 1, day))
}

export default function BlogPost({ post }) {
  return (
    <>
      <Head>
        <title>{`${post.title} - Scramblelock`}</title>
        {post.excerpt && <meta name="description" content={post.excerpt} />}
      </Head>
      <JsonLd
        schema={schemaGraph([
          websiteSchema(),
          personSchema(),
          webpageSchema({
            path: `/blog/${post.slug}`,
            title: `${post.title} - Scramblelock`,
            description: post.excerpt,
          }),
          blogPostingSchema(post),
        ])}
      />
      <PostContainer>
        <Article>
          <BackLink href="/blog">Back to blog</BackLink>
          <Header>
            {post.date && <DateText>{formatPostDate(post.date)}</DateText>}
            <Title>{post.title}</Title>
            {post.excerpt && <Excerpt>{post.excerpt}</Excerpt>}
          </Header>
          {post.coverImage && (
            <CoverWrap>
              <CoverImage
                src={post.coverImage}
                alt=""
                fill
                priority
                sizes="(max-width: 900px) 90vw, 820px"
              />
            </CoverWrap>
          )}
          <Content dangerouslySetInnerHTML={{ __html: post.html }} />
          <BlogSubscribe />
        </Article>
      </PostContainer>
    </>
  )
}

export const getStaticPaths = async () => {
  const paths = getPostSlugs().map(fileName => ({
    params: {
      slug: fileName.replace(/\.md$/, ''),
    },
  }))

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps = async ({ params }) => {
  const post = getPostBySlug(params.slug)

  return {
    props: {
      post,
    },
  }
}
