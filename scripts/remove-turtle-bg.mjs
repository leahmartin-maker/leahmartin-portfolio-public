/**
 * REMOVE WHITE BACKGROUND FROM TURTLE PIN
 * 
 * This script removes the white background and makes it transparent.
 * Uses "chroma key" technique (like green screens in movies).
 */

import sharp from 'sharp';

async function removeWhiteBackground() {
  console.log('🐢 Removing white background from turtle pin...\n');

  try {
    await sharp('./public/images/turtle-pin.png')
      .removeAlpha() // Remove any existing alpha channel
      .flatten({ background: { r: 255, g: 255, b: 255 } }) // Flatten to white
      .toColorspace('b-w') // Convert to grayscale to identify white
      .negate() // Invert colors
      .toBuffer()
      .then(mask => {
        // Use the mask to make white areas transparent
        return sharp('./public/images/turtle-pin.png')
          .composite([{
            input: mask,
            blend: 'dest-in'
          }])
          .png({ quality: 100 })
          .toFile('./public/images/turtle-pin-transparent.png');
      });

    console.log('✅ Transparent turtle pin created: /public/images/turtle-pin-transparent.png');
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

removeWhiteBackground();
