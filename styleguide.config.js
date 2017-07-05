module.exports = {
  ignore: ['**/__stories__/**', '**/__tests__/**', '**/*.test.js', '**/*.test.jsx', '**/*.spec.js', '**/*.spec.jsx'],
  webpackConfig: require('./.storybook/webpack.config.js'),
  sections: [
    {
      name: 'jQuery <-> React',
      content: 'src/components/jquery-react/Readme.md',
      components: 'src/components/jquery-react/**/*.js'
    },
    {
      name: 'Immutable Data-Structures',
      components: 'src/components/immutable/**/*.js'
    }
  ]
};