
The `HoverButton` `composes` the base button style with:

```css
:local(.hoverBtn) {
  composes: btn from './Button.scss';
  /* ... */
}
```

Composing will automatically add the generated `class` of the source to our `className` property.
So it will look like this:

```html
<button class="HoverButton__hoverBtn_2WHP Button__btn_3hJv">button</button>
```

    <HoverButton/>
