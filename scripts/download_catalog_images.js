import fs from 'fs';
import path from 'path';

const imageCatalog = [
  // Jeans & Trousers
  { id: '1', name: 'black-baggy-jeans.jpg', folder: 'jeans', url: 'https://images.pexels.com/photos/37217928/pexels-photo-37217928.jpeg?auto=compress&cs=tinysrgb&w=900' },
  { id: '2', name: 'dark-blue-baggy-jeans.jpg', folder: 'jeans', url: 'https://images.pexels.com/photos/11862262/pexels-photo-11862262.jpeg?auto=compress&cs=tinysrgb&w=900' },
  { id: '3', name: 'light-blue-baggy-jeans.jpg', folder: 'jeans', url: 'https://images.pexels.com/photos/36600208/pexels-photo-36600208.jpeg?auto=compress&cs=tinysrgb&w=900' },
  { id: '4', name: 'washed-grey-baggy-jeans.jpg', folder: 'jeans', url: 'https://images.pexels.com/photos/34264016/pexels-photo-34264016.jpeg?auto=compress&cs=tinysrgb&w=900' },
  { id: '5', name: 'charcoal-wide-leg-jeans.jpg', folder: 'jeans', url: 'https://images.pexels.com/photos/34205262/pexels-photo-34205262.jpeg?auto=compress&cs=tinysrgb&w=900' },
  { id: '6', name: 'vintage-blue-denim.jpg', folder: 'jeans', url: 'https://images.pexels.com/photos/25484767/pexels-photo-25484767.jpeg?auto=compress&cs=tinysrgb&w=900' },
  { id: '7', name: 'light-wash-wide-leg.jpg', folder: 'jeans', url: 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=900' },
  { id: '8', name: 'dark-indigo-denim.jpg', folder: 'jeans', url: 'https://images.pexels.com/photos/1906818/pexels-photo-1906818.jpeg?auto=compress&cs=tinysrgb&w=900' },
  { id: '9', name: 'grey-washed-denim.jpg', folder: 'jeans', url: 'https://images.pexels.com/photos/2224959/pexels-photo-2224959.jpeg?auto=compress&cs=tinysrgb&w=900' },
  { id: '10', name: 'brown-wide-leg-trousers.jpg', folder: 'trousers', url: 'https://images.pexels.com/photos/1381556/pexels-photo-1381556.jpeg?auto=compress&cs=tinysrgb&w=900' },
  { id: '11', name: 'cream-wide-leg-trousers.jpg', folder: 'trousers', url: 'https://images.pexels.com/photos/1484801/pexels-photo-1484801.jpeg?auto=compress&cs=tinysrgb&w=900' },
  { id: '12', name: 'olive-relaxed-trousers.jpg', folder: 'trousers', url: 'https://images.pexels.com/photos/1755385/pexels-photo-1755385.jpeg?auto=compress&cs=tinysrgb&w=900' },

  // Oversized T-shirts
  { id: '13', name: 'oversized-black-tee.jpg', folder: 'tshirts', url: 'https://images.pexels.com/photos/36942017/pexels-photo-36942017.jpeg?auto=compress&cs=tinysrgb&w=900' },
  { id: '14', name: 'oversized-white-tee.jpg', folder: 'tshirts', url: 'https://images.pexels.com/photos/9558567/pexels-photo-9558567.jpeg?auto=compress&cs=tinysrgb&w=900' },
  { id: '15', name: 'oversized-navy-tee.jpg', folder: 'tshirts', url: 'https://images.pexels.com/photos/37025819/pexels-photo-37025819.jpeg?auto=compress&cs=tinysrgb&w=900' },
  { id: '16', name: 'oversized-brown-tee.jpg', folder: 'tshirts', url: 'https://images.pexels.com/photos/37014370/pexels-photo-37014370.jpeg?auto=compress&cs=tinysrgb&w=900' },
  { id: '17', name: 'oversized-red-tee.jpg', folder: 'tshirts', url: 'https://images.pexels.com/photos/36908564/pexels-photo-36908564.jpeg?auto=compress&cs=tinysrgb&w=900' },
  { id: '18', name: 'oversized-forest-green-tee.jpg', folder: 'tshirts', url: 'https://images.pexels.com/photos/37247738/pexels-photo-37247738.jpeg?auto=compress&cs=tinysrgb&w=900' },
  { id: '19', name: 'oversized-grey-tee.jpg', folder: 'tshirts', url: 'https://images.pexels.com/photos/37232797/pexels-photo-37232797.jpeg?auto=compress&cs=tinysrgb&w=900' },
  { id: '20', name: 'oversized-cream-tee.jpg', folder: 'tshirts', url: 'https://images.pexels.com/photos/31716926/pexels-photo-31716926.jpeg?auto=compress&cs=tinysrgb&w=900' },

  // Additional Fashion Products
  { id: '21', name: 'relaxed-zip-sweatshirt.jpg', folder: 'tshirts', url: 'https://images.pexels.com/photos/28758241/pexels-photo-28758241.jpeg?auto=compress&cs=tinysrgb&w=900' },
  { id: '22', name: 'graphic-acid-wash-tee.jpg', folder: 'tshirts', url: 'https://images.pexels.com/photos/28758240/pexels-photo-28758240.jpeg?auto=compress&cs=tinysrgb&w=900' },
  { id: '23', name: 'waffle-knit-street-top.jpg', folder: 'tshirts', url: 'https://images.pexels.com/photos/11790167/pexels-photo-11790167.jpeg?auto=compress&cs=tinysrgb&w=900' },
  { id: '24', name: 'contemporary-trucker-denim.jpg', folder: 'jeans', url: 'https://images.pexels.com/photos/8089960/pexels-photo-8089960.jpeg?auto=compress&cs=tinysrgb&w=900' },

  // Flash Sale Special flat-lays / text tees
  { id: '25', name: 'flash-texted-black-tee.jpg', folder: 'tshirts', url: 'https://images.pexels.com/photos/9558907/pexels-photo-9558907.jpeg?auto=compress&cs=tinysrgb&w=900' },
  { id: '26', name: 'flash-texted-brown-tee.jpg', folder: 'tshirts', url: 'https://images.pexels.com/photos/9985771/pexels-photo-9985771.jpeg?auto=compress&cs=tinysrgb&w=900' },
  { id: '27', name: 'flash-texted-red-tee.jpg', folder: 'tshirts', url: 'https://images.pexels.com/photos/8794466/pexels-photo-8794466.jpeg?auto=compress&cs=tinysrgb&w=900' },
  { id: '28', name: 'flash-baggy-sky-blue.jpg', folder: 'jeans', url: 'https://images.pexels.com/photos/1689731/pexels-photo-1689731.jpeg?auto=compress&cs=tinysrgb&w=900' },

  // Accessories
  { id: '29', name: 'silver-jean-chain.jpg', folder: 'accessories', url: 'https://images.pexels.com/photos/157675/pexels-photo-157675.jpeg?auto=compress&cs=tinysrgb&w=900' }
];

async function downloadItem(item) {
  const dir = path.join(process.cwd(), 'public', 'images', item.folder);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  const destPath = path.join(dir, item.name);
  
  console.log(`Downloading [${item.id}] ${item.name}...`);
  const res = await fetch(item.url, {
    headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
  });
  if (!res.ok) {
    throw new Error(`Failed to download ${item.name}: ${res.statusText}`);
  }
  const buffer = Buffer.from(await res.arrayBuffer());
  fs.writeFileSync(destPath, buffer);
  console.log(`Saved ${item.name} (${buffer.length} bytes)`);
}

async function run() {
  console.log(`Starting download of ${imageCatalog.length} catalog images...`);
  for (const item of imageCatalog) {
    try {
      await downloadItem(item);
    } catch (e) {
      console.error(`Error on ${item.name}:`, e.message);
    }
  }
  console.log('Finished downloading all catalog images!');
}

run();
