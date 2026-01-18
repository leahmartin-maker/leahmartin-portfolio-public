/**
 * IMAGE OPTIMIZATION SCRIPT
 * 
 * What this does:
 * 1. Backs up your original images to /images/originals/
 * 2. Converts HEIC files to WebP (browser-compatible)
 * 3. Optimizes JPG/PNG to WebP (smaller file sizes, better quality)
 * 4. Skips already-optimized WebP files
 * 
 * Real World Context:
 * Tech companies use automated image optimization in their build pipelines.
 * This saves bandwidth, improves load times, and maintains quality.
 * Tools like Next.js Image component work best with WebP format.
 */

import sharp from 'sharp';
import { readdir, mkdir, copyFile } from 'fs/promises';
import { join, extname, basename } from 'path';
import { existsSync } from 'fs';

const IMAGES_DIR = './images';
const BACKUP_DIR = './images/originals';
const PUBLIC_IMAGES_DIR = './public/images';

// Supported formats to convert
const CONVERT_FORMATS = ['.heic', '.jpg', '.jpeg', '.png'];

async function optimizeImages() {
  console.log('🎨 Starting image optimization...\n');

  // Create backup directory if it doesn't exist
  if (!existsSync(BACKUP_DIR)) {
    await mkdir(BACKUP_DIR, { recursive: true });
    console.log('✅ Created backup folder: /images/originals/\n');
  }

  // Create public/images directory if it doesn't exist
  if (!existsSync(PUBLIC_IMAGES_DIR)) {
    await mkdir(PUBLIC_IMAGES_DIR, { recursive: true });
    console.log('✅ Created public images folder\n');
  }

  // Read all files in images directory
  const files = await readdir(IMAGES_DIR);
  
  let converted = 0;
  let skipped = 0;

  for (const file of files) {
    const ext = extname(file).toLowerCase();
    const fileName = basename(file, ext);
    const inputPath = join(IMAGES_DIR, file);

    // Skip if it's a directory or not an image format we want to convert
    if (!CONVERT_FORMATS.includes(ext)) {
      skipped++;
      continue;
    }

    // Skip if it's already in the originals folder
    if (inputPath.includes('originals')) {
      continue;
    }

    try {
      // Backup original file
      const backupPath = join(BACKUP_DIR, file);
      await copyFile(inputPath, backupPath);

      // Convert to WebP
      const outputFileName = `${fileName}.webp`;
      const outputPath = join(PUBLIC_IMAGES_DIR, outputFileName);

      await sharp(inputPath)
        .webp({ quality: 85, effort: 6 }) // High quality, good compression
        .toFile(outputPath);

      console.log(`✅ ${file} → ${outputFileName}`);
      converted++;

    } catch (error) {
      console.error(`❌ Failed to process ${file}:`, error.message);
    }
  }

  console.log('\n🎉 Optimization complete!');
  console.log(`   Converted: ${converted} images`);
  console.log(`   Skipped: ${skipped} files`);
  console.log(`   Originals backed up to: ${BACKUP_DIR}`);
  console.log(`   Optimized images in: ${PUBLIC_IMAGES_DIR}`);
}

optimizeImages().catch(console.error);
