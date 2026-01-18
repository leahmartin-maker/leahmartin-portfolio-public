import sharp from 'sharp';

const files = ['Portillo-1', 'portillo2', 'portillo4', 'portillo5', 'portillo6', 'portillo7', 'portillodog'];

for (const name of files) {
  await sharp(`public/images/${name}.jpg`)
    .webp({ quality: 85 })
    .toFile(`public/images/${name}.webp`);
  console.log(`✅ ${name}.jpg → ${name}.webp`);
}

console.log('🎉 Portillo photos converted!');
