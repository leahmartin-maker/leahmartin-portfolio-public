import sharp from 'sharp';

const files = ['aquarius', 'aquarius2', 'aquarius3', 'aquariusme'];

for (const name of files) {
  await sharp(`public/images/${name}.jpg`)
    .webp({ quality: 85 })
    .toFile(`public/images/${name}.webp`);
  console.log(`✅ ${name}.jpg → ${name}.webp`);
}

console.log('🎉 Aquarius photos converted!');
