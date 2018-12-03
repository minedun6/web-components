(function(w, doc) {
  'use strict';

  // Create a template element
  const template = doc.createElement('template');

  //Styles must be copied from the css file
  // and pasted between the style tags below

  // Other markup should be written after the closing tag.

  template.innerHTML = ` 
    <style>
      html{font-size:.875rem}body{color:#252525;font-family:Open Sans,Calibri,Tahoma,sans-serif}h1,h2,h3,h4,h5,h6{margin-bottom:0;margin-top:0}*+h1,*+h2,*+h3,*+h4,*+h5,*+h6{margin-top:20px}h1+h2{margin-top:40px}h2+h3,h3+h4,h4+h5,h5+h6{margin-top:6px}header{margin-bottom:20px}header h1+.subtitle{margin-top:34px}aside h1{font-size:1.25rem}aside h2{font-size:1.1rem}aside h3{font-size:1rem}aside h4,aside h5,aside h6{font-size:.8rem}table{border-collapse:collapse;margin-bottom:35px;max-width:100%;width:100%}table td,table th{line-height:1.42857143;padding:8px;text-align:left;vertical-align:top}table thead th{border-top:0;vertical-align:bottom}a{color:#047a9c;text-decoration:underline}a.active,a:active,a:focus,a:hover{color:#005a70;text-decoration:none}a:focus{-webkit-box-shadow:none;box-shadow:none;outline:2px solid #0b73da;outline-offset:4px}abbr,abbr[title]{text-decoration:none}ins:after,ins:before{content:"+"}mark{background:#ffb81c}small{font-size:.85714rem;line-height:1.14286rem}sub,sup{font-size:90%}sub{top:.2rem}sup{top:-.2rem}pre{max-width:100%;overflow-x:auto}code,kbd,pre{font-family:Monaco,Lucida Console,monospace}:focus{-webkit-box-shadow:none;box-shadow:none;outline:2px solid #0b73da;outline-offset:4px}@font-face{font-family:Open Sans;font-style:normal;font-weight:100;src:url(https://unpkg.com/@pearson-components/elements-sdk@1.6.1/build/fonts/opensans-light.woff2) format("woff2"),url(https://unpkg.com/@pearson-components/elements-sdk@1.6.1/build/fonts/opensans-light.woff) format("woff")}@font-face{font-family:Open Sans;font-style:italic;font-weight:100;src:url(https://unpkg.com/@pearson-components/elements-sdk@1.6.1/build/fonts/opensans-lightitalic.woff2) format("woff2"),url(https://unpkg.com/@pearson-components/elements-sdk@1.6.1/build/fonts/opensans-lightitalic.woff) format("woff")}@font-face{font-family:Open Sans;font-style:normal;font-weight:400;src:url(https://unpkg.com/@pearson-components/elements-sdk@1.6.1/build/fonts/opensans-regular.woff2) format("woff2"),url(https://unpkg.com/@pearson-components/elements-sdk@1.6.1/build/fonts/opensans-regular.woff) format("woff")}@font-face{font-family:Open Sans;font-style:italic;font-weight:400;src:url(https://unpkg.com/@pearson-components/elements-sdk@1.6.1/build/fonts/opensans-italic.woff2) format("woff2"),url(https://unpkg.com/@pearson-components/elements-sdk@1.6.1/build/fonts/opensans-italic.woff) format("woff")}@font-face{font-family:Open Sans;font-style:normal;font-weight:600;src:url(https://unpkg.com/@pearson-components/elements-sdk@1.6.1/build/fonts/opensans-semibold.woff2) format("woff2"),url(https://unpkg.com/@pearson-components/elements-sdk@1.6.1/build/fonts/opensans-semibold.woff) format("woff")}@font-face{font-family:Open Sans;font-style:italic;font-weight:600;src:url(https://unpkg.com/@pearson-components/elements-sdk@1.6.1/build/fonts/opensans-semibolditalic.woff2) format("woff2"),url(https://unpkg.com/@pearson-components/elements-sdk@1.6.1/build/fonts/opensans-semibolditalic.woff) format("woff")}.pe-base-fontsize{font-size:.875rem}.pe-fontstack{font-family:Open Sans,Calibri,Tahoma,sans-serif}.pe-copy{color:#252525;font-size:1rem;line-height:1.57143rem}.pe-copy--secondary,.pe-label--secondary{color:#6a7070}.pe-copy--small{color:#252525;font-size:.85714rem;line-height:1.42857rem}.pe-copy--large,.pe-heading-level6,h6,header h5+.subtitle{color:#252525;font-size:1.14286rem;line-height:1.71429rem}.pe-paragraph,p{color:#252525;font-size:1rem;line-height:1.57143rem;margin-bottom:.85714rem;margin-top:0}.pe-paragraph--last{color:#252525;margin-bottom:0}.pe-lead{font-size:1.42857rem;line-height:2rem}.pe-lead,.pe-page-title{color:#252525;font-weight:lighter}.pe-page-title{font-size:2.71429rem;line-height:3.71429rem}.pe-heading-level1,.pe-page-title--small,h1{color:#252525;font-size:2rem;font-weight:lighter;line-height:2.71429rem}.pe-heading-level3,.pe-heading-level4,.pe-title,h3,h4,header h2+.subtitle,header h3+.subtitle{color:#252525;font-size:1.42857rem;font-weight:400;line-height:1.85714rem}.pe-heading-level5,.pe-title--small,h5,header h4+.subtitle{color:#252525;font-size:1.28571rem;font-weight:400;line-height:1.57143rem}.pe-heading-level2,.pe-title--large,h2,header h1+.subtitle{color:#252525;font-size:1.71429rem;font-weight:400;line-height:2rem}.pe-page-title--secondary,.pe-title--secondary{color:#6a7070}.pe-label{font-size:1rem;line-height:1.28571rem}.pe-label.pe-label--inverse{color:#fff}.pe-label--secondary.pe-label--inverse{color:#f5f5f5}.pe-label--small{font-size:.85714rem;line-height:1.14286rem}.pe-label--large{font-size:1.14286rem;line-height:1.42857rem}.pe-bold,.pe-label--bold{font-weight:600}.pe-list{margin:12px 0;padding-left:1.85714rem}.pe-list li{font-size:1rem;line-height:1.57143rem;margin-bottom:.42857rem}.pe-list li>ol,.pe-list li>ul{margin-top:.42857rem}.pe-list.pe-styled-lists--ordered{list-style-type:decimal}.pe-list.pe-styled-lists--ordered ol{list-style-type:lower-alpha;padding-left:1.85714rem}.pe-list.pe-styled-lists--ordered ol ol{list-style-type:lower-roman}.pe-list.pe-styled-lists--unordered{list-style-type:disc}.pe-list.pe-styled-lists--unordered ul{list-style-type:circle;padding-left:1.85714rem}.pe-list.pe-styled-lists--unordered ul ul{list-style-type:square}.pe-list.pe-styled-lists-heading--ordered{list-style-type:decimal;margin-top:0}.pe-list.pe-styled-lists-heading--ordered ol{list-style-type:lower-alpha;padding-left:1.85714rem}.pe-list.pe-styled-lists-heading--ordered ol ol{list-style-type:lower-roman}.pe-list.pe-styled-lists-heading--unordered{list-style-type:disc;margin-top:0}.pe-list.pe-styled-lists-heading--unordered ul{list-style-type:circle;padding-left:1.85714rem}.pe-list.pe-styled-lists-heading--unordered ul ul{list-style-type:square}.pe-list--unstyled{list-style:none;padding-left:0}.pe-list--unstyled ul{padding-left:1.85714rem}.pe-heading-level1,.pe-heading-level2,h1,h2,header h1+.subtitle{margin-bottom:6px}.pe-heading-level3,h3,header h2+.subtitle{font-weight:700;margin-bottom:6px}.pe-heading-level4,.pe-heading-level5,.pe-heading-level6,h4,h5,h6,header h3+.subtitle,header h4+.subtitle,header h5+.subtitle{margin-bottom:6px}*+[class^=pe-heading-level]{margin-top:20px}.pe-code{background:#005a70;color:#f5f5f5;font-size:1rem;line-height:1.42857rem;padding:30px 50px}.pe-code,.pe-code-inline,.pe-kbd{font-family:Monaco,Lucida Console,monospace}.pe-code-inline,.pe-kbd{background:#e9e9e9;padding:0 4px}
    </style>
    <h1 class="pe-fontstack pe-page-title" id="title">I'm a default title</h1>
    <button id="button">Show an alert</button>
    <slot></slot>
`;

  if (w.ShadyCSS) w.ShadyCSS.prepareTemplate(template, 'pearson-dropdown');

  /** Any helper functions that do not need to be part of the class
   * can be declared here, before the class is defined.
   */

  class Dropdown extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });

      const clone = template.content.cloneNode(true);

      /** If we need references to the children of the component,
       * we can create them here. If they are created elsewhere,
       * they will not be available our lifecycle methods.
       */

      this.heading = clone.querySelector('#title');
      this.button = clone.querySelector('#button');

      /** After all this, we can append our clone to the shadowRoot */
      this.shadowRoot.appendChild(clone);

      /** We should also bind any event listeners to `this` so their
       * references do not get lost.
       */
      this.handleClick = this.handleClick.bind(this);
    }

    connectedCallback() {
      /** Any changes to what the component renders should be done here. */

      // Get the attributes set by the consumer
      const titleText = this.getAttribute('title');
      const buttonText = this.getAttribute('buttonText');

      this.heading.textContent = titleText;
      this.button.textContent = buttonText;

      /** Event listeners should also be bound here. */
      this.button.addEventListener('click', this.handleClick);
    }

    diconnectedCallback() {
      this.button.removeEventListener('click', this.handleClick);
    }

    handleClick() {
      this.shadowRoot.appendChild(doc.createTextNode('Shadow button clicked!'));
    }
  }
  customElements.define('pearson-dropdown', Dropdown);
})(window, document);
