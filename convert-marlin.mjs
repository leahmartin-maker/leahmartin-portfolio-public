import sharp from 'sharp';

const files = ['marlin1', 'marlin2', 'marlin3'];

for (const name of files) {
  await sharp(`public/images/${name}.jpg`)
    .webp({ quality: 85 })
    .toFile(`public/images/${name}.webp`);
  console.log(`✅ ${name}.jpg → ${name}.webp`);
}

console.log('🎉 Marlin photos converted!');
