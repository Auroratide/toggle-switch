# &lt;toggle-switch&gt; Element

An accessible **toggle switch**!

See the **[Live Demo](https://auroratide.github.io/toggle-switch/)** for some examples!

## Installation

You can import through CDN:

```html
<script type="module" src="https://unpkg.com/@auroratide/toggle-switch/lib/define.js"></script>
```

Or, you may install through [NPM](https://www.npmjs.com/package/@auroratide/toggle-switch) and include it as part of your build process:

```
$ npm i @auroratide/toggle-switch
```

```js
import '@auroratide/toggle-switch/lib/define.js'
```

## Usage

`<toggle-switch>` is an **inline markup element** that you can use in your HTML document.

```html
<label>Enable: <toggle-switch></toggle-switch></label>
```

By default, the switch starts in the **off** position. You can have it start in the **on** state instead:

```html
<label>Enable: <toggle-switch checked></toggle-switch></label>
```

### All Attributes

| Attribute | Default | Description |
| ------------- | --------- | ------------- |
| `checked` | - | Whether the switch is on or not |

## Style API

Since `toggle-switch` is Just HTML<sup>TM</sup>, you can style it the same way you style any HTML tag.

```css
toggle-switch {
    width: 5em;
}
```

### Parts

The element is composed of two customizable parts:

* `slider`, the element that slides when toggled
* `track`, the element upon which the slider slides

CSS Shadow Parts allow you to customize these elements:

```css
toggle-switch::part(slider) {
    background-color: red;
}

toggle-switch::part(track) {
    background-color: green;
}
```

Additionally, using the `checked` state, you can define special styling for when the toggle is on.

```css
toggle-switch[checked]::part(track) {
    background-color: blue;
}
```

## Javascript API

The element exposes a function to programmatically toggle its state:

| Method | Description |
| ------------- | ------------- |
| `toggle()` | Change from off to on, or from on to off |

### Properties

Each attribute can be accessed as a Javascript property.

* `elem.checked`

### Events

The `toggle-switch` element dispatches the following events:

| Name | When Triggered |
| ------------- | ------------- |
| `toggle-switch:change` | Any time the state changes (on to off, or off to on) |

The `toggle-switch:change` event contains the checked state in its details:

```js
elem.addEventListener('toggle-switch:change', e => {
    console.log(e.detail.checked)
})
```

## Accessibility

This custom element is built with accessibility in mind! It follows the WAI-ARIA guidelines for the [switch role](https://www.w3.org/TR/wai-aria-1.1/#switch).

* The element can be focused
* The element can be toggled with `Enter` or `Space`
