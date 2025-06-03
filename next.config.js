/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
};
module.exports = {
  i18n: {
    locales: ['en', 'id'], // Menambahkan bahasa Inggris (en) dan bahasa Indonesia (id)
    defaultLocale: 'id', // Set bahasa Indonesia sebagai default
  },
}
module.exports = nextConfig;
