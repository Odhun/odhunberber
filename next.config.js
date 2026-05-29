/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  register: true,
  skipWaiting: true,
});

const isGithubPages = process.env.DEPLOY_TARGET === 'ghpages';

const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  basePath: isGithubPages ? '/odhunberber' : '',
  assetPrefix: isGithubPages ? '/odhunberber/' : '',
};

module.exports = withPWA(nextConfig);
