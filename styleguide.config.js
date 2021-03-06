module.exports = {
  ignore: ['**/__stories__/**', '**/reduxConfig/**', '**/container/**', '**/__tests__/**', '**/*.test.js', '**/*.test.jsx', '**/*.spec.js', '**/*.spec.jsx'],
  webpackConfig: require('./.storybook/webpack.config.js'),
  sections: [
    {
      name: 'State & Props',
      components: 'src/components/state/**/*.js',
      content: 'src/components/state/Readme.md'
    },
    {
      name: 'CSS Modules',
      components: 'src/components/styling/css-modules/**/*.js',
      content: 'src/components/styling/css-modules/Readme.md'
    },
    {
      name: 'Styling',
      components: 'src/components/styling/misc/**/*.js'
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
      name: 'Redux',
      components: 'src/components/redux/**/*.js',
      content: 'src/components/redux/Readme.md'
    },
    {
      name: 'Advanced',
      components: 'src/components/routing/**/index.js'
    }
  ]
};
