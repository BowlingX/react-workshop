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

const requireAll = (requireContext) => requireContext.keys().map(requireContext);
const loadStories = () => requireAll(require.context('../src/components', true, /^.*\/__stories__\/.*\.js$/));

configure(loadStories, module);
