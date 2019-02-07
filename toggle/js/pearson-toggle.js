(function(w, doc) {
  'use strict';

  const template = doc.createElement('template');

  template.innerHTML = `
  <style>
  *,* :after,* :before,:host:after,:host:before{-webkit-box-sizing:border-box;box-sizing:border-box}:host{-webkit-transition:background .3s;background:#6a7070;border:1px solid #c7c7c7;border-radius:100px;color:#fff;cursor:pointer;display:inline-block;font-family:Open Sans,Calibri,Tahoma,sans-serif;font-size:0;height:23px;overflow:visible;position:relative;text-transform:uppercase;transition:background .3s;vertical-align:middle;width:55px}:host(:focus){outline:0!important}:host(:focus):after{-webkit-transform:translate(-50%,-50%);border:2px solid #0b73da;border-radius:22px;content:"";height:-webkit-calc(100% + 10px);height:calc(100% + 10px);left:50%;position:absolute;top:50%;transform:translate(-50%,-50%);width:-webkit-calc(100% + 10px);width:calc(100% + 10px);z-index:1}:host::-moz-focus-inner{border:0}:host([on]){background:#047a9c}:host([disabled]){color:#f2f2f2;cursor:not-allowed}:host([on]:focus){background-color:#005a70;border:1px solid #005a70}:host([on]):before{left:32px}:host([disabled]):before{background:#f2f2f2}:host:before,:host>span{line-height:23px;position:absolute}:host:before{-webkit-transition:left .3s;background:#fff;border:1px solid #6a7070;border-radius:100%;content:"";display:block;height:20px;left:1px;transition:left .3s;width:20px}:host>span{font-size:11.2px;pointer-events:none;top:-1px}:host([hidelabels])>span{display:none}:host .toggle-on{right:27px}:host .toggle-off{right:5px}:host(:not([on]))>span.toggle-on,:host([on])>span.toggle-off{display:none}@media screen and (prefers-reduced-motion:reduced){:host,:host:before{-webkit-transition:none!important;transition:none!important}}
	</style>
	<span class="toggle-on">On</span>
	<span class="toggle-off">Off</span>
  `;

  if (w.ShadyCSS) w.ShadyCSS.prepareTemplate(template, 'pearson-toggle');

  const KEYCODE = {
    ENTER: 13,
    SPACE: 32
  };

  class Toggle extends HTMLElement {
    static get observedAttributes() {
      return ['on', 'disabled'];
    }

    constructor() {
      super();

      this.attachShadow({ mode: 'open' });

      const clone = template.content.cloneNode(true);

      this.shadowRoot.appendChild(clone);

      this._onToggleClick = this._onToggleClick.bind(this);
      this._onToggleKeyUp = this._onToggleKeyUp.bind(this);

      this._onLabelClick = this._onLabelClick.bind(this);

      this._onDOMLoaded = this._onDOMLoaded.bind(this);
    }

    connectedCallback() {
      // Add attributes required for a11y
      if (!this.hasAttribute('role')) {
        this.setAttribute('role', 'switch');
      }
      if (!this.hasAttribute('tabindex') && !this.disabled) {
        this.setAttribute('tabindex', 0);
      }

      // Lazily upgrade properties to make sure
      // observed attributes are handled properly
      this._upgradeProperty('on');
      this._upgradeProperty('disabled');

      // Bind listeners to the toggle
      this.addEventListener('click', this._onToggleClick);
      this.addEventListener('keyup', this._onToggleKeyUp);

      // If the consumer did not set an `aria-label`,
      if (!this.hasAttribute('aria-label')) {
        // We need to find an external one
        doc.addEventListener('DOMContentLoaded', this._onDOMLoaded, true);
      }
    }

    _onToggleClick(e) {
      e.stopPropagation();
      this._toggleOn();
    }

    _onToggleKeyUp(e) {
      if (e.altKey) {
        return;
      }

      if (e.keyCode === KEYCODE.SPACE || e.keyCode === KEYCODE.ENTER) {
        e.preventDefault();
        this._toggleOn();
      }
    }

    _upgradeProperty(prop) {
      if (this.hasOwnProperty(prop)) {
        let value = this[prop];
        delete this[prop];
        this[prop] = value;
      }
    }

    _toggleOn() {
      if (this.disabled) return;

      this.on = !this.on;

      // The toggle should emit a change event
      // for the benefit of consumers
      this.dispatchEvent(
        new CustomEvent('change', {
          detail: {
            on: this.on
          },
          bubbles: true
        })
      );
    }

    // Helper function for finding external label node
    _findLabelNode() {
      if (this.parentElement.tagName === 'LABEL') {
        return this.parentElement;
      }
      const scope = this.getRootNode();
      return scope.querySelector(`label[for="${this.id}"]`);
    }

    // When this label is clicked, we want to
    // click on this toggle and focus on it
    _onLabelClick(e) {
      e.preventDefault();

      if (this.disabled) return;

      this.click();
      this.focus();
    }

    _onDOMLoaded() {
      this.labelNode = this._findLabelNode();

      // If the external label does not have an ID, we must
      // ensure that it has one
      if (!this.labelNode.id) this.labelNode.id = this.id + '_label';

      // This toggle must be labelled by the external label node
      this.setAttribute('aria-labelledby', this.labelNode.id);

      // We listen for the external label to be clicked
      this.labelNode.addEventListener('click', this._onLabelClick);
    }

    get on() {
      return this.hasAttribute('on');
    }

    set on(value) {
      const ison = Boolean(value);
      if (ison) {
        this.setAttribute('on', '');
      } else {
        this.removeAttribute('on');
      }
    }

    get disabled() {
      return this.hasAttribute('disabled');
    }

    set disabled(value) {
      const isDisabled = Boolean(value);
      if (isDisabled) {
        this.setAttribute('disabled', '');
      } else {
        this.removeAttribute('disabled');
      }
    }

    get name() {
      return this.getAttribute('name');
    }

    get value() {
      return this.getAttribute('value');
    }

    attributeChangedCallback(name, oldValue, newValue) {
      const isTruthy = newValue !== null;
      if (name === 'on') {
        this.setAttribute('aria-on', isTruthy);
      }
      if (name === 'disabled') {
        this.setAttribute('aria-disabled', isTruthy);
        if (isTruthy) {
          this.removeAttribute('tabindex');
          this.blur();
        } else {
          this.setAttribute('tabindex', '0');
        }
      }
    }

    disconnectedCallback() {
      this.removeEventListener('click', this._onToggleClick);
      this.removeEventListener('keyup', this._onToggleKeyUp);

      doc.removeEventListener('DOMContentLoaded', this._onDOMLoaded);

      if (this.labelNode) {
        this.labelNode.removeEventListener('click', this._onLabelClick);
      }
    }
  }

  customElements.define('pearson-toggle', Toggle);
})(window, document);
