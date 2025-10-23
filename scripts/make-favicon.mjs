#!/usr/bin/env node
import fs from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'
import pngToIco from 'png-to-ico'

async function main() {
  const srcArg = process.argv[2]
  if (!srcArg) {
    console.error('Usage: npm run make-favicon -- <source-image>')
    process.exit(1)
  }

  const cwd = process.cwd()
  const projectRoot = path.resolve(cwd)
  const srcPath = path.resolve(projectRoot, srcArg)

  try {
    await fs.access(srcPath)
  } catch {
    console.error(`Source image not found: ${srcPath}`)
    process.exit(1)
  }

  // Determine Next.js project root (the directory that contains app/ and public/)
  let rootDir = projectRoot
  const appAtCwd = path.join(rootDir, 'app')
  try {
    await fs.access(appAtCwd)
  } catch {
    const nested = path.join(projectRoot, 'treedi_landing_page')
    try {
      await fs.access(path.join(nested, 'app'))
      rootDir = nested
    } catch {
      // fallback to cwd
      rootDir = projectRoot
    }
  }

  const appOutDir = path.join(rootDir, 'app')
  const publicOutDir = path.join(rootDir, 'public')

  await fs.mkdir(appOutDir, { recursive: true })
  await fs.mkdir(publicOutDir, { recursive: true })

  const size = 512
  const circleSvg = Buffer.from(
    `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg"><circle cx="${size / 2}" cy="${size / 2}" r="${size / 2}" fill="#fff"/></svg>`
  )

  // Create a square, center-cropped version then mask to a circle with transparent outside
  const basePng = await sharp(srcPath)
    .resize(size, size, { fit: 'cover', position: 'centre' })
    .composite([{ input: circleSvg, blend: 'dest-in' }])
    .png()
    .toBuffer()

  const iconPngPath = path.join(appOutDir, 'icon.png')
  const favicon32Path = path.join(publicOutDir, 'favicon-32x32.png')
  const favicon16Path = path.join(publicOutDir, 'favicon-16x16.png')
  const faviconIcoPath = path.join(appOutDir, 'favicon.ico')

  // Write the 512 base icon
  await fs.writeFile(iconPngPath, basePng)

  // Write smaller PNGs
  await sharp(basePng).resize(32, 32).png().toFile(favicon32Path)
  await sharp(basePng).resize(16, 16).png().toFile(favicon16Path)

  // Create ICO containing 16 and 32 sizes
  const icoBuf = await pngToIco([favicon16Path, favicon32Path])
  await fs.writeFile(faviconIcoPath, icoBuf)

  console.log('Favicon generated:')
  console.log(' -', path.relative(projectRoot, iconPngPath))
  console.log(' -', path.relative(projectRoot, faviconIcoPath))
  console.log(' -', path.relative(projectRoot, favicon32Path))
  console.log(' -', path.relative(projectRoot, favicon16Path))
  console.log('\nNext.js will automatically pick these up on build.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
