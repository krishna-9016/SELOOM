import fs from 'fs';
import path from 'path';

async function downloadFile(url, destPath) {
  const res = await fetch(url, {
    headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
  });
  if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.statusText}`);
  const arrayBuffer = await res.arrayBuffer();
  fs.writeFileSync(destPath, Buffer.from(arrayBuffer));
}

async function searchPexels(query) {
  try {
    const res = await fetch(`https://www.pexels.com/search/${encodeURIComponent(query)}/`, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36' }
    });
    const html = await res.text();
    const matches = [...html.matchAll(/https:\/\/images\.pexels\.com\/photos\/([0-9]+)\/pexels-photo-[0-9]+\.jpeg\?[^"'\s]+/g)];
    const urls = matches.map(m => {
      return `https://images.pexels.com/photos/${m[1]}/pexels-photo-${m[1]}.jpeg?auto=compress&cs=tinysrgb&w=1000&dpr=1`;
    });
    return [...new Set(urls)];
  } catch (e) {
    console.error('Error searching:', query, e);
    return [];
  }
}

async function main() {
  console.log('Testing search with native fetch...');
  const jeans = await searchPexels('baggy jeans model');
  console.log('Jeans found:', jeans.length, jeans.slice(0, 3));
}

main();
