# Pearson Drawer Web Component

## Table of Contents

1. [Demo](#demo)
2. [Install](#install)
3. [Usage](#usage)
4. [The Standard drawer](#the-standard-drawer)
5. [API](#api)
   1. [Attributes](#api-attributes)
   2. [Events](#api-events)

A shareable, accessible drawer.

<a name="demo"></a>

## Demo

https://pearson-ux.github.io/web-components/drawer/

<a name="install"></a>

## Installation

Make sure you have all the appropriate polyfills from [the main README](https://github.com/pearson-ux/web-components/blob/master/README.md) in place. Then, run the following in your terminal:

```bash
# my-app is the directory containing your app
cd my-app
npm install --save @pearson-ux/drawer
```

<a name="usage"></a>

## Usage

Import the web component onto the page, inbetween the `<head>` tags, like so:

``` html
<head>
  <!-- Font stack -->
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
1. The Google Fonts link is necessary to ensure that the components render properly. You must include it, **or** be sure that Open Sans is loaded in your app some other way.
2. The import path will be in the **node_modules** folder, which is usually held outside the application source. If you publish your application to a **./public** or **./dist** folder you will want to write a script to copy this dependency to a desired location.


<a name="the standard drawer"></a>

### The Standard Drawer

The standard drawer has exactly one panel. It takes two children: an `h3` element with the attributes `slot="title"` and `"class="title"`, and a div with the attributes`slot="content"` and `class="content"`. **These are necessary for the drawer to work.** The content of the `h3` becomes a title, and the content of the `.content` div, appropriately, becomes content.

```html
<pearson-drawer id="pearsonDrawer">
  <h3 slot="title" class="title">Help Topics</h3>
  <div slot="content" class="content">
    <p>
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Adipisci vel
      necessitatibus amet, enim cumque cum est facilis dolores optio doloremque
      quibusdam quas a dolorum? Nobis doloremque tempora alias laborum mollitia?
    </p>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt quas
      dignissimos qui, inventore, quam, harum quo atque similique recusandae non
      molestias id dolores pariatur. Asperiores cum fugit quis qui eaque. Lorem
      ipsum dolor sit amet consectetur adipisicing elit. Magni, rerum?
      <a href="#foo">Voluptatem</a> dolorum ad et quia veniam quas debitis
      expedita eos eligendi ipsam, cumque neque id temporibus voluptatum alias
      nihil natus? Lorem ipsum dolor sit amet consectetur adipisicing elit.
      Soluta cupiditate ex deserunt natus inventore, nihil laborum esse commodi
      dignissimos autem animi alias laudantium iure beatae eum adipisci, eos
      harum! Deleniti?
    </p>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto, explicabo
      repudiandae fugiat dolore officia corporis, quia pariatur corrupti odit
      aliquam debitis iure! Quam exercitationem error dolorem autem quasi
      consequuntur aperiam.
    </p>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Numquam optio
      tenetur dolor sed eos voluptate quibusdam natus, sit corrupti! Cumque,
      atque nulla tempora unde quibusdam voluptatibus eveniet dolores. Earum,
      libero.
    </p>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam corporis,
      incidunt illo sunt dolor odio architecto quo ad aperiam temporibus amet
      nostrum officia corrupti vitae quis, ducimus magni omnis minus!
    </p>
  </div>
</pearson-drawer>
```

<a name="the-details-drawer"></a>

### The Details Drawer

The details drawer renders _multiple panels_, the contents of which you can define. It requires the same `title` and `content` slots as the standard drawer, but accepts more complex markup. To create the panels, you add `div` elements with the attribute `data-panel` as children of the `content` slot. The panels are all _siblings_ and each `data-panel` attribute takes a number as its value, starting at 1.

**Panel 1** is the intial panel displayed in the drawer, which summarizes other content panels that are available. It displays buttons with short descriptions, and those buttons trigger other panels to open. To create the buttons for Panel 1, you must write an `h3` tag, followed by a `p` tag which described the heading. Like so:

```html
<div data-panel="1">
  <h3 class="pe-paragraph">Having trouble signing in or account locked?</h3>
  <p>
    You have a Pearson username and password if you've ever used a Pearson
    product...
  </p>
  <!-- Other h3-p pairings -->
</div>
```

Note that the text of the paragraph tag is a truncated summary!

Each of these `h3`-`p` pairings gets converted into a link that opens another panel. **Panel links are created in ascending order.** That means the `h3` above will always linl to Panel 2, and so on. You can create as many `h3` - `p` pairs as your drawer needs.

**All subsequent panels** after panel 1 dispkay full, unabridged content. Each panel must be wrapped in its own `data-panel` div, and must include at least _one_ h3 tag for focus management. Here is the full markup for panel 2:

```html
<div data-panel="2">
  <h3>Having trouble signing in or account locked?</h3>
  <p>
    You have a Pearson username and password if you've ever used a Pearson
    product (for example, Revel, MyLab Math, or Mastering Biology).
  </p>
  <p>
    <strong>Note:</strong> If you have an account but are asked to register,
    select <strong>register</strong> and follow the instructions.
  </p>
  <p>Check out these tips for resolving common sign in issues:</p>
  <p>
    <strong>Username:</strong> This may be your email apress and differ from
    your school or institution username.
  </p>
  <p>
    <strong>Password:</strong> This is case-sensitive and has at least 1
    uppercase letter, 1 number, and at least 8 characters. Select
    <strong>SHOW</strong> to see your password as you enter it.
  </p>
  <p>
    <strong>Get username and reset password:</strong> Select
    <strong>Forgot username or password</strong>. You'll receive an email with
    your username and a link to reset your password for each Pearson account
    associated with your email apress. Reset the password only for the account
    you want to use.
  </p>
  <p>
    <strong>Incorrect username or password or account locked:</strong>
    Try again or select
    <strong>Forgot username or password</strong> to reset your password.
  </p>
  <p>
    <strong>Browser cookies and cached files:</strong>&nbsp;<a
      href="https://support.pearson.com/getsupport/s/article/Browser-Settings"
      target="_blank"
      >Enable cookies and, if necessary, delete cached browser files.</a
    >
  </p>
  <p>
    If you still can't sign in, contact
    <a href="https://support.pearson.com/getsupport/s/" target="_blank"
      >Pearson Support</a
    >.
  </p>
</div>
```

Here is the entire drawer. Again, each `data-panel`:

- Is a direct child of the `content` slot
- has an attribute `data-panel=n` where `n` starts at 1
- _must have at least one h3 element_

```html
<pearson-drawer id="pearsonDrawer" class="animated">
  <h3 class="title" slot="title">Help Topics</h3>
  <div slot="content">
    <div data-panel="1">
      <h3 class="pe-paragraph">
        Having trouble signing in or account locked?
      </h3>
      <p>
        You have a Pearson username and password if you've ever used a Pearson
        product
      </p>
      <h3 class="pe-paragraph">I enable cookies?</h3>
      <p>
        Cookies are files from websites that store your browsing information,
        including
      </p>
      <h3 class="pe-parahraph">What if I get a date or clock error?</h3>
      <p>
        If the date or clock for your computer or other device is set
        incorrectly for your time zone, an error appears and you can't continue.
      </p>
      <h3 class="pe-title">Having trouble or need support?</h3>
    </div>
    <div data-panel="2">
      <h3>Having trouble signing in or account locked?</h3>
      <p>
        You have a Pearson username and password if you've ever used a Pearson
        product (for example, Revel, MyLab Math, or Mastering Biology).
      </p>
      <p>
        <strong>Note:</strong> If you have an account but are asked to register,
        select <strong>register</strong> and follow the instructions.
      </p>
      <p>Check out these tips for resolving common sign in issues:</p>
      <p>
        <strong>Username:</strong> This may be your email apress and differ from
        your school or institution username.
      </p>
      <p>
        <strong>Password:</strong> This is case-sensitive and has at least 1
        uppercase letter, 1 number, and at least 8 characters. Select
        <strong>SHOW</strong> to see your password as you enter it.
      </p>
      <p>
        <strong>Get username and reset password:</strong> Select
        <strong>Forgot username or password</strong>. You'll receive an email
        with your username and a link to reset your password for each Pearson
        account associated with your email apress. Reset the password only for
        the account you want to use.
      </p>
      <p>
        <strong>Incorrect username or password or account locked:</strong>
        Try again or select
        <strong>Forgot username or password</strong> to reset your password.
      </p>
      <p>
        <strong>Browser cookies and cached files:</strong>&nbsp;<a
          href="https://support.pearson.com/getsupport/s/article/Browser-Settings"
          target="_blank"
          >Enable cookies and, if necessary, delete cached browser files.</a
        >
      </p>
      <p>
        If you still can't sign in, contact
        <a href="https://support.pearson.com/getsupport/s/" target="_blank"
          >Pearson Support</a
        >.
      </p>
    </div>
    <div data-panel="3">
      <h3 class="pe-title">
        How do I enable cookies?
      </h3>
      <p>
        Cookies are files from websites that store your browsing information,
        including preferences and profile. To sign in or link accounts, you need
        to
        <a
          href="https://support.pearson.com/getsupport/s/article/Browser-Settings"
          target="_blank"
          >enable third-party cookies</a
        >.
      </p>
      <dl>
        <h3 class="pe-paragraph text">
          <strong>Chrome and Firefox:</strong> Enable all cookies or ap an
          exception for <strong>pi.pearsoned.com</strong>.
        </h3>
        <h3 class="pe-paragraph text">
          <strong>Internet Explorer:</strong> Enable all cookies or ap
          exceptions for <strong>pi.pearsoned.com</strong> and
          <strong>pearson.com</strong>.
        </h3>
        <h3 class="pe-paragraph text">
          <strong>Safari and Edge:</strong> Enable all cookies.
        </h3>
      </dl>
      <p>
        If you still have trouble, try
        <a
          href="https://support.pearson.com/getsupport/s/article/Browser-Settings"
          target="_blank"
          >deleting browser cached files</a
        >.
      </p>
      <p>
        Check Help for your browser if it isn’t covered in these instructions.
      </p>
    </div>
    <div data-panel="4">
      <h3 class="pe-title">
        What if I get a date or clock error?
      </h3>
      <p>
        If the date or clock for your computer or other device is set
        incorrectly for your time zone, an error appears and you can't continue.
      </p>
      <p>
        For example, the defadlt time zone for computers with the Windows
        operating system is Pacific Time. If you manually change the clock or
        switch the time zone without immediately making sure the
        clock—automatically or manually—matches the time zone, the error
        appears.
      </p>
      <p>
        <strong>Resolution:</strong>&nbsp;Switch to the correct time zone, if
        applicable. Make sure the date and time are correct for your time zone.
        If your clock is set manually—not from a network or Internet server,
        make sure it comes close to the time according to the World Clock. (You
        can search for the World Clock on the Internet.)
      </p>
    </div>
    <div data-panel="5">
      <h3 class="pe-title">
        Having trouble or need support?
      </h3>
      <p>
        Check out
        <a href="https://support.pearson.com/getsupport/s/" target="_new"
          >Pearson Support</a
        >
        for popdlar topics or contact information.
      </p>
    </div>
  </div>
</pearson-drawer>
```

<a name="api"></a>

## API

`pearson-drawer`'s API uses an `open` prop to manage the drawer's open state. You can use JavaScript to change the `open` prop to `true` or `false`.

| Attribute | Type      | Default | Description                           |
| --------- | --------- | ------- | ------------------------------------- |
| `open`    | `boolean` | `false` | Determines whether the drawer is open |

**You mau may also add an `animated` class to the drawer to enable animations

<a name="api-attributes-example"></a>

### Example

This standard drawer is closed by default. To open it, we must create a button with a `for` attribute which indicates the uique ID of the drawer.

HTML:

```html
<button for="pearsonDrawer">Open drawer</button>
<pearson-drawer id="pearsonDrawer">
  <!-- content.... -->
</pearson-drawer>
```

JS: 
``` js

const drawer = document.getElementById('pearsonDrawer');
const trigger = document.querySelector('[for="pearsonDrawer"]');

trigger.addEventListener('click', function(e) {
  drawer.open = true;
});

```

Now we can click on the button to open the drawer.
