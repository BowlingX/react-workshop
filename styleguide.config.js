module.exports = {
  ignore: ['**/__stories__/**', '**/__tests__/**', '**/*.test.js', '**/*.test.jsx', '**/*.spec.js', '**/*.spec.jsx'],
  webpackConfig: require('./.storybook/webpack.config.js'),
  sections: [
    {
      name: 'State & Props',
      components: 'src/components/state/**/*.js',
      content: 'src/components/state/Readme.md'
    },
    {
      name: 'Styling',
      components: 'src/components/styling/**/*.js',
      content: 'src/components/styling/Readme.md'
    },
    {
      name: 'jQuery <-> React',
      content: 'src/components/jquery-react/Readme.md',
      components: 'src/components/jquery-react/**/*.js'
    },
    {
      name: 'Immutable Data-Structures',
      components: 'src/components/immutable/**/*.js'
    },
    {
      name: 'Routing',
      components: 'src/components/routing/**/index.js'
    }
  ]
};