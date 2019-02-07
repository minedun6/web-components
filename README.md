# web-components
A library of pearson web components

## Dependencies
You will need to add the following 3 polyfills, in order for your project to be cross-browser compatible.  These polyfills will need to go between the  `<head>  </head>` tags on the HTML page you want to load the web component on. 

 - **Web Component Loader - https://cdnjs.com/libraries/webcomponentsjs**
 - **ES5 Adapter - https://cdnjs.com/libraries/webcomponentsjs**
 - **Polyfill-io - https://polyfill.io/v2/docs/examples**

       <!-- loads web component polyfills -->
       <head>
           <script src="https://unpkg.com/@webcomponents/webcomponentsjs@^2/webcomponents-loader.js"></script>
           <script src="https://unpkg.com/@webcomponents/webcomponentsjs@^2/custom-elements-es5-adapter.js"></script>
           <script src="https://cdn.polyfill.io/v2/polyfill.min.js?rum=0"></script>
       </head>
       
**Additionally** 
If you prefer not to use a CDN, you can download these polyfills locally with NPM

## Contributing

> **Important note:**  Anyone can contribute.  All code must be subject to a througough accessibility review.  All code must be submitted through a pull request.  All code must go through proper code review before it can be merged into master.  If you have any questions about the process, please email david.odey@pearson.com  

**To get started assign yourself an open issue in GitHub.**  
https://github.com/pearson-ux/web-components/issues

**To view the project roadmap:**
https://github.com/pearson-ux/web-components/projects

<br>

**Starting a new web component:**
- Clone or fork this repo.
- Create a new branch for the component.
- Create a new folder for the component you are building.
- Download the web component markup kit as a zip file and place contents in the folder you created to start building out your HTML, CSS and JS.
 - **Web component markup kit - https://github.com/pearson-ux/web-component-markup-kit**
 - Build out the accessible component using the markup kit.  Do not include any superfluous code, not relating to the component.
 - Push the branch and submit a pull request for review.
 - When approved we will use this code to build out the web component. 

> **Important note:** Do not clone the markup kit, instead please download it as a zip file and place the contents in your folder.  This will prevent
> git from adding the code as a submodule.  We are not supporting git
> submodules at this time.

<br>

**Converting existing markup to a web component:**

 - Checkout the branch containing the markup of the code you want to convert.
 - Download the web component spec kit and place contents in the existing folder.
 - Use the web component spec kit as a boilerplate to break up the existing markup into a custom element using html templates and shadow dom.
  - **Web component spec kit - https://github.com/pearson-ux/web-component-spec-kit**
 - Push the branch and submit a pull request for review.
 - When approved we will publish the component to NPM for consumers.

> **Important Note:** Libraries or frameworks are not allowed.  All components must be built using the web component specification outlined by the W3C and not include
> any superfluous code not pertaining to the component.  For more information on web components please visit: https://www.webcomponents.org/introduction

To view an existing modal component and review its structure you can visit: https://github.com/pearson-ux/web-components/tree/master/modal