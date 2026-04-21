import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styled from 'styled-components'
import { getAllPosts } from '../../lib/blog'
import BlogSubscribe from '../../components/blogSubscribe'
import { media } from '../../media'
import { color } from '../../color'

const BlogContainer = styled.main`
  min-height: 100vh;
  padding: 140px 8% 80px;
  background: ${color.BLACK};
  color: ${color.WHITE};

  @media ${media.MOBILE} {
    padding: 110px 24px 60px;
  }
`

const Header = styled.header`
  max-width: 900px;
  margin: 0 auto 70px;
  text-align: center;
`

const Title = styled.h1`
  margin: 0 0 24px;
  font-size: 48px;
  letter-spacing: 0;

  @media ${media.MOBILE} {
    font-size: 36px;
  }
`

const Intro = styled.p`
  margin: 0 auto;
  max-width: 680px;
  font-size: 20px;
  font-weight: 200;
  line-height: 1.6;

  @media ${media.MOBILE} {
    font-size: 16px;
  }
`

const PostGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 36px;
  max-width: 1120px;
  margin: 0 auto;

  @media ${media.NON_DESKTOP} {
    grid-template-columns: 1fr;
  }
`

const PostCard = styled.article`
  background: #ffffff;
  border: 1px solid rgba(233, 241, 247, 0.2);
  border-radius: 8px;
  color: ${color.BLACK};
  overflow: hidden;
`

const CoverWrap = styled.div`
  position: relative;
  aspect-ratio: 16 / 9;
  background: ${color.DARK_GREY};
`

const CoverImage = styled(Image)`
  object-fit: cover;
`

const PostBody = styled.div`
  padding: 28px;

  @media ${media.MOBILE} {
    padding: 22px;
  }
`

const DateText = styled.p`
  margin: 0 0 12px;
  color: ${color.DARK_BLUE};
  font-size: 14px;
  font-weight: 700;
  text-transform: uppercase;
`

const PostTitle = styled.h2`
  margin: 0 0 16px;
  font-size: 28px;
  letter-spacing: 0;

  @media ${media.MOBILE} {
    font-size: 24px;
  }
`

const Excerpt = styled.p`
  margin: 0 0 24px;
  font-size: 16px;
  font-weight: 200;
  line-height: 1.6;
`

const ReadMore = styled(Link)`
  display: inline-flex;
  align-items: center;
  min-height: 44px;
  padding: 0 18px;
  border: 1px solid ${color.BLACK};
  border-radius: 8px;
  font-weight: 700;
`

const EmptyText = styled.p`
  text-align: center;
  font-size: 18px;
  font-weight: 200;
  color: ${color.WHITE};
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

export default function Blog({ posts }) {
  return (
    <>
      <Head>
        <title>Blog - Scramblelock</title>
        <meta name="description" content="Writing, research, and reflections from Scramblelock." />
      </Head>
      <BlogContainer>
        <Header>
          <Title>BLOG</Title>
          <Intro>Writing, research, and reflections from Scramblelock.</Intro>
        </Header>

        {posts.length > 0 ? (
          <PostGrid>
            {posts.map(post => (
              <PostCard key={post.slug}>
                {post.coverImage && (
                  <CoverWrap>
                    <CoverImage
                      src={post.coverImage}
                      alt=""
                      fill
                      sizes="(max-width: 1024px) 84vw, 520px"
                    />
                  </CoverWrap>
                )}
                <PostBody>
                  {post.date && <DateText>{formatPostDate(post.date)}</DateText>}
                  <PostTitle>{post.title}</PostTitle>
                  {post.excerpt && <Excerpt>{post.excerpt}</Excerpt>}
                  <ReadMore href={`/blog/${post.slug}`}>Read more</ReadMore>
                </PostBody>
              </PostCard>
            ))}
          </PostGrid>
        ) : (
          <EmptyText>
            New posts are coming soon. Subscribe to get notified when they are available.
          </EmptyText>
        )}

        <BlogSubscribe />
      </BlogContainer>
    </>
  )
}

export const getStaticProps = async () => {
  const posts = getAllPosts().map(({ content, html, ...post }) => post)

  return {
    props: {
      posts,
    },
  }
}
