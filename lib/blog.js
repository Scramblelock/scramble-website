import fs from 'fs'
import path from 'path'

const BLOG_DIRECTORY = path.join(process.cwd(), 'content/blog')
const RESPONSIVE_IMAGE_WIDTHS = [640, 750, 828, 1080, 1200, 1920]
const RESPONSIVE_IMAGE_SIZES = '(max-width: 900px) 90vw, 820px'

const escapeHtml = value =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')

const slugFromFileName = fileName => fileName.replace(/\.md$/, '')

const isLocalImage = src => src.startsWith('/') && /\.(avif|gif|jpe?g|png|webp)$/i.test(src)

const nextImageUrl = (src, width) => `/_next/image?url=${encodeURIComponent(src)}&w=${width}&q=80`

const renderMarkdownImage = (alt, src) => {
  const imageAttributes = [
    `src="${src}"`,
    `alt="${alt}"`,
    'loading="lazy"',
    'decoding="async"',
  ]

  if (isLocalImage(src)) {
    imageAttributes.push(
      `srcset="${RESPONSIVE_IMAGE_WIDTHS.map(width => `${nextImageUrl(src, width)} ${width}w`).join(', ')}"`,
      `sizes="${RESPONSIVE_IMAGE_SIZES}"`
    )
  }

  return `<img ${imageAttributes.join(' ')} />`
}

const parseFrontmatter = fileContents => {
  const frontmatterMatch = fileContents.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/)

  if (!frontmatterMatch) {
    return {
      data: {},
      content: fileContents,
    }
  }

  const data = frontmatterMatch[1].split('\n').reduce((metadata, line) => {
    const separatorIndex = line.indexOf(':')

    if (separatorIndex === -1) {
      return metadata
    }

    const key = line.slice(0, separatorIndex).trim()
    const value = line
      .slice(separatorIndex + 1)
      .trim()
      .replace(/^['"]|['"]$/g, '')

    return {
      ...metadata,
      [key]: value,
    }
  }, {})

  return {
    data,
    content: frontmatterMatch[2],
  }
}

const renderInlineMarkdown = text => {
  const escapedText = escapeHtml(text)

  return escapedText
    .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (_, alt, src) => renderMarkdownImage(alt, src))
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
}

const flushParagraph = (paragraphLines, htmlBlocks) => {
  if (!paragraphLines.length) {
    return []
  }

  htmlBlocks.push(`<p>${renderInlineMarkdown(paragraphLines.join(' '))}</p>`)
  return []
}

const flushList = (listItems, htmlBlocks) => {
  if (!listItems.length) {
    return []
  }

  htmlBlocks.push(`<ul>${listItems.map(item => `<li>${renderInlineMarkdown(item)}</li>`).join('')}</ul>`)
  return []
}

export const markdownToHtml = markdown => {
  const htmlBlocks = []
  let paragraphLines = []
  let listItems = []

  markdown.split('\n').forEach(line => {
    const trimmedLine = line.trim()

    if (!trimmedLine) {
      paragraphLines = flushParagraph(paragraphLines, htmlBlocks)
      listItems = flushList(listItems, htmlBlocks)
      return
    }

    const headingMatch = trimmedLine.match(/^(#{1,3})\s+(.+)$/)
    const listMatch = trimmedLine.match(/^[-*]\s+(.+)$/)
    const blockquoteMatch = trimmedLine.match(/^>\s+(.+)$/)

    if (headingMatch) {
      paragraphLines = flushParagraph(paragraphLines, htmlBlocks)
      listItems = flushList(listItems, htmlBlocks)
      const level = headingMatch[1].length
      htmlBlocks.push(`<h${level}>${renderInlineMarkdown(headingMatch[2])}</h${level}>`)
      return
    }

    if (listMatch) {
      paragraphLines = flushParagraph(paragraphLines, htmlBlocks)
      listItems.push(listMatch[1])
      return
    }

    if (blockquoteMatch) {
      paragraphLines = flushParagraph(paragraphLines, htmlBlocks)
      listItems = flushList(listItems, htmlBlocks)
      htmlBlocks.push(`<blockquote>${renderInlineMarkdown(blockquoteMatch[1])}</blockquote>`)
      return
    }

    listItems = flushList(listItems, htmlBlocks)
    paragraphLines.push(trimmedLine)
  })

  paragraphLines = flushParagraph(paragraphLines, htmlBlocks)
  flushList(listItems, htmlBlocks)

  return htmlBlocks.join('\n')
}

export const getPostSlugs = () => {
  if (!fs.existsSync(BLOG_DIRECTORY)) {
    return []
  }

  return fs.readdirSync(BLOG_DIRECTORY).filter(fileName => fileName.endsWith('.md'))
}

export const getPostBySlug = slug => {
  const realSlug = slug.replace(/\.md$/, '')
  const fullPath = path.join(BLOG_DIRECTORY, `${realSlug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = parseFrontmatter(fileContents)

  return {
    slug: realSlug,
    title: data.title || realSlug,
    date: data.date || null,
    excerpt: data.excerpt || '',
    coverImage: data.coverImage || null,
    content,
    html: markdownToHtml(content),
  }
}

export const getAllPosts = () =>
  getPostSlugs()
    .map(fileName => getPostBySlug(slugFromFileName(fileName)))
    .sort((postA, postB) => new Date(postB.date || 0) - new Date(postA.date || 0))
