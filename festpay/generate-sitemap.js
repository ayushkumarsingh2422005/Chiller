import { SitemapStream, streamToPromise } from 'sitemap';
import { Readable } from 'stream';
import fs from 'fs';
import { resolve } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Base URL of your website
const BASE_URL = 'https://festpay.in'; // Replace with your actual domain

// Static routes from App.jsx
const routes = [
  { url: '/', changefreq: 'daily', priority: 1.0 },
  { url: '/privacy-policy', changefreq: 'monthly', priority: 0.8 },
  { url: '/terms-and-conditions', changefreq: 'monthly', priority: 0.8 },
  { url: '/return-policy', changefreq: 'monthly', priority: 0.8 },
  { url: '/faq', changefreq: 'weekly', priority: 0.8 },
  { url: '/about-us', changefreq: 'monthly', priority: 0.8 },
  { url: '/account', changefreq: 'monthly', priority: 0.8 },
  { url: '/contact-us', changefreq: 'monthly', priority: 0.8 },
  { url: '/dashboard', changefreq: 'daily', priority: 0.9 },
  { url: '/clubs', changefreq: 'daily', priority: 0.9 },
  { url: '/user/auth', changefreq: 'monthly', priority: 0.7 },
  { url: '/user/dashboard', changefreq: 'daily', priority: 0.9 },
  { url: '/organization/auth', changefreq: 'monthly', priority: 0.7 },
  { url: '/organization/dashboard', changefreq: 'daily', priority: 0.9 }
];

async function generateSitemap() {
  try {
    // Create a stream to write to
    const stream = new SitemapStream({ hostname: BASE_URL });
    
    // Return a promise that resolves with your XML string
    const data = await streamToPromise(
      Readable.from(routes).pipe(stream)
    );

    const buildPath = resolve(__dirname, 'public', 'sitemap.xml');
    fs.writeFileSync(buildPath, data.toString());
    console.log(`✅ Sitemap generated successfully at ${buildPath}`);
  } catch (error) {
    console.error('Error generating sitemap:', error);
    process.exit(1);
  }
}

// Execute
generateSitemap();
