
The `HoverButton` `composes` the base button style with:

```css
:local(.hoverBtn) {
  composes: btn from './Button.scss';
  /* ... */
}
```

Composing will automatically add the generated `class` of the source to our `className` property.
So it will look something like this:

```html
<button class="HoverButton__hoverBtn_2WHPL8c5L1cZlsaIa1f5ad Button__btn_3hJvinCbSaxuSFk6vFRrc3">button</button>
```

    <HoverButton/>
