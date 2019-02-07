(function(w, doc) {
  'use strict';

  const template = doc.createElement('template');

  template.innerHTML = ` 
    <style>
      @-webkit-keyframes bouncedelay{0%,25%,to{transform:scale(1);-webkit-transform:scale(1)}12.5%{transform:scale(1.5);-webkit-transform:scale(1.5)}}@keyframes bouncedelay{0%,25%,to{transform:scale(1);-webkit-transform:scale(1)}12.5%{transform:scale(1.5);-webkit-transform:scale(1.5)}}@-webkit-keyframes fadein{0%{opacity:0}to{opacity:1}}@keyframes fadein{0%{opacity:0}to{opacity:1}}:host,:host *{-webkit-box-sizing:border-box;box-sizing:border-box}:host{display:block;position:relative;font:14px/18px Open Sans,Calibri,Tahoma,sans-serif;text-align:center;color:#fff;background-color:#252525;width:200px;height:70px;padding:0 20px;margin:auto;border:1px solid #252525;border-radius:5px}:host:before{content:"";display:inline-block;height:100%;vertical-align:middle}.loading-indicator{display:inline-block}.label,.pe-loadingSpinner{display:inline-block;vertical-align:middle}.pe-loadingSpinner{position:relative;width:23px;height:23px}.pe-loadingSpinner-container1>div,.pe-loadingSpinner-container2>div{width:4px;height:4px;background-color:#19a6a4;border-radius:100%;position:absolute;-webkit-animation:bouncedelay 1.6s ease-in-out infinite;animation:bouncedelay 1.6s ease-in-out infinite;-webkit-animation-fill-mode:both;animation-fill-mode:both}.pe-loadingSpinner .pe-loadingSpinner-container{position:absolute;width:100%;height:100%}.pe-loadingSpinner-container2{-webkit-transform:rotate(45deg);transform:rotate(45deg)}.circle1{top:0;left:0}.circle2{top:0;right:0}.circle3{right:0;bottom:0}.circle4{left:0;bottom:0}.pe-loadingSpinner-container2 .circle1{-webkit-animation-delay:-1.4s;animation-delay:-1.4s}.pe-loadingSpinner-container1 .circle2{-webkit-animation-delay:-1.2s;animation-delay:-1.2s}.pe-loadingSpinner-container2 .circle2{-webkit-animation-delay:-1s;animation-delay:-1s}.pe-loadingSpinner-container1 .circle3{-webkit-animation-delay:-.8s;animation-delay:-.8s}.pe-loadingSpinner-container2 .circle3{-webkit-animation-delay:-.6s;animation-delay:-.6s}.pe-loadingSpinner-container1 .circle4{-webkit-animation-delay:-.4s;animation-delay:-.4s}.pe-loadingSpinner-container2 .circle4{-webkit-animation-delay:-.2s;animation-delay:-.2s}.label{margin-left:12px}
    </style>
    <div class="loading-indicator">
      <div class="pe-loadingSpinner">
        <div class="pe-loadingSpinner-container pe-loadingSpinner-container1">
          <div class="circle1"></div>
          <div class="circle2"></div>
          <div class="circle3"></div>
          <div class="circle4"></div>
        </div>
        <div class="pe-loadingSpinner-container pe-loadingSpinner-container2">
          <div class="circle1"></div>
          <div class="circle2"></div>
          <div class="circle3"></div>
          <div class="circle4"></div>
        </div>
      </div>
      <span class="label" id="label"></span>
		</div>
`;

  if (w.ShadyCSS)
    w.ShadyCSS.prepareTemplate(template, 'pearson-loader');

  // ARIA attributes (and values) required for accessibility
  const DEFAULT_A11Y_ATTRS = {
    role: 'progressbar',
    'aria-valuemin': '0',
    'aria-valuemax': '100',
    'aria-live': 'polite'
  };

  /**
   * Ensure that the provided node has the attributes in the provided attr collection.
   * @param {HTMLElement} node Element whose attributes we are ensuring
   * @param {Object} attrs Collection of attributes and values to assign to the node
   */
  function ensureAttrs(node, attrs) {
    for (let attrName in attrs) {
      const requiredVal = attrs[attrName];
      if (
        !node.hasAttribute(attrName) ||
        node.getAttribute(attrName) !== requiredVal
      ) {
        node.setAttribute(attrName, requiredVal);
      }
    }
  }

  class Loader extends HTMLElement {
    static get observedAttributes() {
      return ['loaded'];
    }

    get loaded() {
      return this.hasAttribute('loaded');
    }

    set loaded(newValue) {
      const isLoaded = Boolean(newValue);

      if (isLoaded) {
        this.setAttribute('loaded', '');
      } else {
        this.removeAttribute('loaded');
      }
    }

    get loadingStateLabel() {
      return this.getAttribute('loadingStateLabel');
    }

    set loadingStateLabel(newValue) {
      this.setAttribute('loadingStateLabel', newValue);
    }

    get finishedStateLabel() {
      return this.getAttribute('finishedStateLabel');
    }

    set finishedStateLabel(newValue) {
      this.setAttribute('finishedStateLabel', newValue);
    }

    constructor() {
      super();
      this.attachShadow({ mode: 'open' });

      const clone = template.content.cloneNode(true);

      this.label = clone.querySelector('#label');

      this.shadowRoot.appendChild(clone);
    }

    connectedCallback() {
      const loadingStateLabel =
        this.loadingStateLabel !== null ? this.loadingStateLabel : 'Loading...';
      const finishedStateLabel =
        this.finishedStateLabel !== null ? this.finishedStateLabel : 'Loaded!';

      const consumerAttrs = {
        loadingStateLabel,
        finishedStateLabel,
        'aria-label': loadingStateLabel
      };

      ensureAttrs(this, Object.assign({}, DEFAULT_A11Y_ATTRS, consumerAttrs));

      this.label.textContent = this.loadingStateLabel;
    }

    attributeChangedCallback(name, oldValue, newValue) {
      if (name === 'loaded') {
        const isLoaded = newValue !== null;
        const newLabel = isLoaded
          ? this.finishedStateLabel
          : this.loadingStateLabel;

        ensureAttrs(this, {
          'aria-label': newLabel
        });

        if (this.label.textContent !== newLabel) {
          this.label.textContent = newLabel;
        }

        if (isLoaded) {
          setTimeout(() => {
            this.remove();
          }, 250);
        }
      }
    }
  }
  customElements.define('pearson-loader', Loader);
})(window, document);
