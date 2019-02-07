# Pearson Coachmark Web Component

## Table of Contents

1. [Demo](#demo)
2. [Install](#install)
3. [Usage](#usage)
4. [API](#api)
   1. [Attributes](#api-attributes)
   2. [Events](#api-events)

A shareable, accessible coachmark component.

<a name="demo"></a>

## Demo

https://pearson-ux.github.io/web-components/coachmark/

<a name="install"></a>

## Installation

Make sure you have all the appropriate polyfills from [the main README](https://github.com/pearson-ux/web-components/blob/master/README.md) in place. Then, run the following in your terminal:

```bash
# my-app is the directory containing your app
cd my-app
npm install --save @pearson-ux/coachmark
```

<a name="usage"></a>

## Usage

Import the web component onto the page, in between the `<head>` tags, like so:

```html
<head>
  <!-- Font stack-->
  <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i" rel="stylesheet">

  <!-- Polyfills -->
  <script src="https://unpkg.com/@webcomponents/webcomponentsjs@^2/webcomponents-loader.js"></script>
  <script src="https://unpkg.com/@webcomponents/webcomponentsjs@^2/custom-elements-es5-adapter.js"></script>
  <script src="https://cdn.polyfill.io/v2/polyfill.min.js?rum=0"></script>

  <!-- Web component script -->
  <script src="/path-to-datepicker/js/dist/pearson-datepicker.js" />
</head>
```

**Important Notes:**

> 1. The Google Fonts link is necessary to ensure that the components render properly. You must include it, **or** be sure that Open Sans is loaded in your app some other way.
>
> 2. The import path will be in the **node_modules** folder, which is usually held outside the applicaiton source. If you publish your application to a **./public** or **./dist** folder you will want to write a script to copy this dependency to a desired location..



<a name="api"></a>

## API

<a name="api-attributes"></a>

### Required Attributes


| Attribute    | Type    | Default | Description                                                                                                  |
| ------------ | ------- | ------- | ------------------------------------------------------------------------------------------------------------ |
| `position`      | String  | unset   | `top`  `right` `bottom` `left` Each placement can have a variation from `-start` `-end`
|`trigger` | String | unset| The ID of the button invoking the coachmark, this is important for accessibility and focus management.
|`reference` |String|unset|The ID of element you want the coachmark to appear on. |
|`title`|String|unset|The title of the coachmark
|`content`	| String|unset|The content you want the coachmark to display |
|`type `|String|`default` |The type of coachmark `default` `informational` `generic` |


### Optional Attributes

| Attribute    | Type    | Default | Description                                                                                                  |
| ------------ | ------- | ------- | ------------------------------------------------------------------------------------------------------------ |
| `arrow`      | Bool  | unset   | Renders an arrow on the coachmark.
|`gotit` | String | unset| If left blank `gotit=' '`, the coachmark will render an optional got it button.  If a value is specified e.g. `gotit='next coachmark` the coachmark will render a button with the label 'next coachmark'
|`dismiss` |Bool|unset|If set to true, the got it button will also dismiss the coachmark |

  ### Example:
  In the main body of the document, add a button with a unique ID, to trigger the coachmark.
```
<body>
	 <button id="openTop">Trigger Coachmark</button>
</body>
```

Add a script that builds and renders a coachmark, once the button has been pressed.


```html
<body>
	<button id="openTop">Trigger Coachmark</button>

	<script>
		(function (win,doc) {
			const trigger = doc.querySelector('#openTop'),
			coachMark = doc.createElement('pearson-coachmark');

			// function to build a coachmark
			function generateCoach (opts) {
			  for (let attrName in opts) {
			    coachMark.setAttribute(attrName, opts[attrName])
			  }
			  target.appendChild(coachMark)
			}

			// uses the above function to return a coachmark
			const coachOne = function (event) {
			  generateCoach({
			      position: 'top-start',
				  trigger: '#openTop',
				  reference: '#reference',
				  title: 'This is 1/12',
				  content: 'Content for your enjoyment',
				  type: 'default',
				  arrow: true,
				  gotIt: "Next Coachmark",
				  close: true
			  });
			};

			// render the coachmark
			trigger.addEventListener('click', function (event) {
			  coachOne();
			  event.stopImmediatePropagation()
			});

		})(window, document);
	</script>
</body>
```

<a name="api-events"></a>


### Emitted Events

`pearson-coachmark` emits two events: `dismiss` and `proceed`  Once an coachmark is dismissed, it is removed from the DOM.

| Event     | Description                                              |
| --------- | -------------------------------------------------------- |
| `dismiss` | Will fire when the user interacts with the close button.|
|`proceed` | Will fire when the user interacts with the 'got it' button and the `dismiss` attribute is not specified.

  ### Example:

```js
 coachOne = function (event) {
	  generateCoach({
	      position: 'top-start',
		  trigger: '#openTop',
		  reference: '#reference',
		  title: 'This is 1/12',
		  content: 'Content for your enjoyment',
		  type: 'default',
		  arrow: true,
		  gotIt: "Next Coachmark"
	  });
	  coachMark.addEventListener('proceed', coachTwo, false);
	};
```
