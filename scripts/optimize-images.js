const sharp = require('sharp')
const fs = require('fs')
const path = require('path')

const publicDir = path.join(__dirname, '../public')
const outputDir = path.join(__dirname, '../public/optimized')

// Create optimized directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true })
}

// Large images that need optimization
const imagesToOptimize = [
  'background.jpg',
  '02.jpg',
  'contact3.jpg',
  '09.jpg',
  '15.jpg',
  'contact2.jpg',
  'boxes.jpg',
  '01.jpg',
  '05.jpg',
  'about.jpg',
]

async function optimizeImage(filename) {
  const inputPath = path.join(publicDir, filename)
  const outputPath = path.join(outputDir, filename)

  if (!fs.existsSync(inputPath)) {
    console.log(`File not found: ${filename}`)
    return
  }

  try {
    const stats = fs.statSync(inputPath)
    const originalSize = (stats.size / 1024 / 1024).toFixed(2)

    // Create multiple sizes and formats
    const sizes = [
      { width: 1920, suffix: '-1920' },
      { width: 1280, suffix: '-1280' },
      { width: 768, suffix: '-768' },
      { width: 480, suffix: '-480' },
    ]

    for (const size of sizes) {
      // WebP format
      await sharp(inputPath)
        .resize(size.width, null, {
          withoutEnlargement: true,
          fit: 'inside',
        })
        .webp({ quality: 85 })
        .toFile(path.join(outputDir, filename.replace('.jpg', `${size.suffix}.webp`)))

      // AVIF format (better compression)
      await sharp(inputPath)
        .resize(size.width, null, {
          withoutEnlargement: true,
          fit: 'inside',
        })
        .avif({ quality: 80 })
        .toFile(path.join(outputDir, filename.replace('.jpg', `${size.suffix}.avif`)))

      // Optimized JPEG
      await sharp(inputPath)
        .resize(size.width, null, {
          withoutEnlargement: true,
          fit: 'inside',
        })
        .jpeg({ quality: 85, progressive: true })
        .toFile(path.join(outputDir, filename.replace('.jpg', `${size.suffix}.jpg`)))
    }

    const newStats = fs.statSync(path.join(outputDir, filename.replace('.jpg', '-1920.jpg')))
    const newSize = (newStats.size / 1024 / 1024).toFixed(2)

    console.log(
      `✅ ${filename}: ${originalSize}MB → ${newSize}MB (${(
        (1 - newStats.size / stats.size) *
        100
      ).toFixed(1)}% reduction)`
    )
  } catch (error) {
    console.error(`❌ Error optimizing ${filename}:`, error.message)
  }
}

async function optimizeAllImages() {
  console.log('🚀 Starting image optimization...')

  for (const filename of imagesToOptimize) {
    await optimizeImage(filename)
  }

  console.log('✨ Image optimization complete!')
  console.log('📁 Optimized images saved to:', outputDir)
  console.log('💡 Next steps:')
  console.log('   1. Replace original images with optimized versions')
  console.log('   2. Update components to use responsive images')
  console.log('   3. Consider using Next.js Image component with srcSet')
}

optimizeAllImages().catch(console.error)
