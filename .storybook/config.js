import { configure, setAddon } from '@storybook/react';
import infoAddon, { setDefaults } from '@storybook/addon-info';

// addon-info
setDefaults({
  inline: true,
  maxPropsIntoLine: 1,
  maxPropObjectKeys: 10,
  maxPropArrayLength: 10,
  maxPropStringLength: 100,
});

setAddon(infoAddon);

configure(function () {
  //...
}, module);
function loadStories() {
  require('../src/js/stories/index.js');
  // You can require as many stories as you need.
}

configure(loadStories, module);