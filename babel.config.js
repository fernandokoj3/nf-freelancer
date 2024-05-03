module.exports = {
  plugins: [
    [
      'module-resolver',
      {
        root: ['.'],
        alias: {
          '^@/(.+)': './src/app/\\1',
        },
      },
    ],
    'babel-plugin-transform-typescript-metadata',
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['@babel/plugin-transform-class-properties', { loose: false }],
    //['@babel/plugin-proposal-private-methods', { loose: true }],
  ],
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: '12',
        },
      },
    ],
    '@babel/preset-typescript',
  ],

  ignore: ['**/*.spec.ts', '**/*.test.ts'],
};
