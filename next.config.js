/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  crossOrigin: 'anonymous',
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  webpack: (config) => {
    config.resolve.alias['@/styles'] = path.join(__dirname, 'styles');
    return config;
  },
};

module.exports = nextConfig;
