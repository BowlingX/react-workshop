import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import JQueryTodo from '../examples/jquery-todo';
import ReactTodo from '../examples/react-todo';

storiesOf('TODO-App', module)
  .add('jQuery', () => <JQueryTodo onSave={action('saved')}/>)
  .add('React', () => <ReactTodo onSave={action('saved')}/>);

storiesOf('Button', module)
  .addWithInfo('with text', `
  ## Header
  
  This is a detail component description
  
  `, () => (
<button onClick={action('clicked')}>Hello Button</button>
))
.add('with some emoji', () => (
<button onClick={action('clicked')}>😀 😎 👍 💯</button>
));


