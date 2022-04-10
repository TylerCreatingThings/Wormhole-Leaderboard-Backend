const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
    target: 'node',
    externals: [
      nodeExternals()
    ],
    resolve: {
      extensions: ['*','.ts','.js'],
      alias: {
        '@': path.resolve(__dirname, 'src/'),
      },
    },
  };