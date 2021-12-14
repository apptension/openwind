const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['avatars.githubusercontent.com'],
  },
  webpack: (config, { isServer, dev }) => {
    if (!isServer) {
      config.resolve.fallback.fs = false;
    }

    config.plugins.push(new CopyWebpackPlugin({
      patterns: [
        { from: './src/lib', to: !dev && isServer ? '../lib' : './lib' },
      ],
    }));

    return config;
  },
};
