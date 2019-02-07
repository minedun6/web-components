# A11y Modal Web Component

A shareable, accessible, modal, powered by web components.

## Demo

https://pearson-ux.github.io/web-components/modal/

## Install

Before you install, make sure you have all the appropriate polyfills from the main README.md in place.
https://github.com/pearson-ux/web-components/blob/master/README.md

``` bash
cd my-app
npm install --save @pearson-ux/modal
```

## Usage

Import the web component onto the page, inbetween the `<head>` tags

``` html
<head>
  <!-- Font stack -->
  <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i" rel="stylesheet">
   
   <!-- Polyfills -->
  <script src="https://unpkg.com/@webcomponents/webcomponentsjs@^2/webcomponents-loader.js"></script>
  <script src="https://unpkg.com/@webcomponents/webcomponentsjs@^2/custom-elements-es5-adapter.js"></script>
  <script src="https://cdn.polyfill.io/v2/polyfill.min.js?rum=0"></script>

  <!-- Web component script -->
  <script src="/path-to-datepicker/js/dist/pearson-modal.js" />
</head>
```


**Important Notes:**
1. The Google Fonts link is necessary to ensure that the components render properly. You must include it, **or** be sure that Open Sans is loaded in your app some other way.
2. The import path will be in the **node_modules** folder, which is usually held outside the application source. If you publish your application to a **./public** or **./dist** folder you will want to write a script to copy this dependency to a desired location.


**To Use**
Add the `<pearson-modal> </pearson-modal>` tags to the page, passing in a `triggerId`, the unuque ID of the button you want to open the modal. You can add any content you like between the tags as normal HTML5 markup, and it will render in the body of the modal.

**Important Note:**

> To maintain accessibility, the `pearson-modal` tag must be a sibling of
> your main content. The main content must be wrapped in an element
> with an ID of 'main'.

**Example Code:**

```html
<body>
  <!-- The pearson-modal must be a sibling of an element with an id of `main` -->
  <main id="main">
    <section class="container">
      <button id="trigger-modal">Open Modal</button>
    </section>
  </main>

  <!-- The display:none is to prevent a FOUC in Firefox -->
  <pearson-modal triggerId="trigger-modal" style="display:none;">
    <p> Hello World </p>
  </pearson-modal>
</body>
```

To set the title and toggle action buttons, see the API below.

## API

| Attribute        | Type      | Default         | Description                                       |
| ---------------- | --------- | --------------- | ------------------------------------------------- |
| `triggerid`      | `String`  | Required        | The unique ID of the button that opens the modal. |
| `titletext`      | `String`  | 'Modal Title'`  | The title of the modal.                           |
| `footer`         | `Boolean` | `false`         | If set, shows the `Success` and `Cancel` buttons. |
| `successbtntext` | `String`  | `'Save'`        | The text to display in the `Success` button.      |
| `cancelbtntext`  | `String`  | `'Cancel'`      | The text to display in the `Cancel` button.       |
| `hidecancel`     | `Boolean` | `false`         | Hides the Cancel button completely                |
| `hidesuccess`    | `Boolean` | `false`         | Hides the Success/CTA button completely           |
| `elements`       | `Boolean` | `false`         | Sets the styling to the old version of elements   |

**Example Code:**

```html
<!-- for accessibility, the must be adjacent to an element with an id of main -->
<main id="main">
  <section class="container">
    <button id="trigger-modal">Open Modal</button>
  </section>
</main>

<!-- place modal before the end of the body and pass in the reference ID of the button that triggers the modal -->
<pearson-modal
  triggerId="trigger-modal"
  titleText="Basic Title"
  successBtnText="Success"
  cancelBtnText="Cancel"
  footer
>
  <p>Pass in any valid HTML tags as children of the modal.</p>
  <input type="text" />
  <button>Click Me</button>
</pearson-modal>
```

## Events

The `pearson-modal` component emits two different events:

| Event     | Description                                                        |
| --------- | ------------------------------------------------------------------ |
| `success` | Will fire when the success button in the modal is pressed.         |
| `cancel`  | Will fire when any button other than the success buton is pressed, or when the user closes the modal with the `escape` key. |

**Important Note:**

> For the purposes of event emission, the modal treats *any button that is not the success button* as a 'cancel' button. If you want your modal to emit a `success` event, you *must* show the footer and the success button. If the success button is independently hidden through the `hideSuccess` configuration, or if the footer is hidden by setting  `footer` to `false`, it will prevent the emission of the `success` event completely.

**Example Code:**

```js
// You can query a web component like any other element in JavaScript
const modal = document.querySelector('pearson-modal');

modal.addEventListener('success', () => {
  // Do something
});

modal.addEventListener('cancel', () => {
  // Do something
});
```
