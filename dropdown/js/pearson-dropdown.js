(function(w, doc) {
  'use strict';

  const DROPDOWN_OPEN_SVG = `
  <svg
    version = "1.1"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    class="pe-icon--dropdown-open-sm-18"
    viewBox="0 0 18 18"
    focusable="false"
    aria-hidden="true"

  >
    <path 
      d="M12.7059871,7.29177258 C12.3143055,6.90291009 11.6828189,6.90390717 11.2931357,7.29376675 L9,9.59004962 L6.70686427,7.29376675 C6.31718108,6.90291009 5.68569446,6.901913 5.29401289,7.29177258 C4.90333051,7.68063507 4.90133213,8.31079173 5.29201452,8.70164839 L8.29257512,11.7068575 C8.48042241,11.8943092 8.73421608,12 9,12 C9.26578392,12 9.52057678,11.8943092 9.70742488,11.7068575 L12.7079855,8.70164839 C13.0986679,8.31079173 13.0966695,7.68063507 12.7059871,7.29177258"
    />
  </svg>`;

  const CHECMARK_SVG = `
  <svg
    version = "1.1"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    class="pe-icon--check-sm-18"
    viewBox="0 0 18 18"
    focusable="false"
    aria-hidden="true"
  >
    <path
      d="M7.35823097,13.99969 C7.08123097,13.99969 6.81423097,13.88469 6.62523097,13.67969 L4.26623097,11.13469 C3.89123097,10.72869 3.91523097,10.09669 4.32023097,9.72169 C4.72423097,9.34469 5.35623097,9.36869 5.73323097,9.77469 L7.25323097,11.41469 L12.182231,4.42369 C12.501231,3.97269 13.125231,3.86469 13.576231,4.18269 C14.027231,4.50069 14.135231,5.12469 13.817231,5.57569 L8.17523097,13.57569 C8.00223097,13.82269 7.72523097,13.97769 7.42423097,13.99769 C7.40223097,13.99869 7.38023097,13.99969"
    />
  </svg>`;

  const REMOVE_LG_SVG = `
  <svg
    version = "1.1"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    class="pe-icon--remove-lg-18"
    viewBox="0 0 18 18"
    focusable="false"
    aria-hidden="true"
  >
    <path d="M10.415,9.0014 L17.709,1.7074 C18.1,1.3164 18.1,0.6834 17.709,0.2934 C17.318,-0.0976 16.686,-0.0976 16.295,0.2934 L9.001,7.5874 L1.707,0.2934 C1.316,-0.0976 0.684,-0.0976 0.293,0.2934 C-0.098,0.6834 -0.098,1.3164 0.293,1.7074 L7.587,9.0014 L0.293,16.2954 C-0.098,16.6864 -0.098,17.3194 0.293,17.7094 C0.488,17.9054 0.744,18.0024 1,18.0024 C1.256,18.0024 1.512,17.9054 1.707,17.7094 L9.001,10.4154 L16.295,17.7094 C16.49,17.9054 16.746,18.0024 17.002,18.0024 C17.258,18.0024 17.514,17.9054 17.709,17.7094 C18.1,17.3194 18.1,16.6864 17.709,16.2954 L10.415,9.0014 Z"/>
`;

  const template = doc.createElement('template');
  template.innerHTML = `
  <style>
  @-webkit-keyframes slideInUp{0%{-webkit-transform:translate3d(0,100%,0);transform:translate3d(0,100%,0);visibility:visible}to{-webkit-transform:translateZ(0);transform:translateZ(0)}}@keyframes slideInUp{0%{-webkit-transform:translate3d(0,100%,0);transform:translate3d(0,100%,0);visibility:visible}to{-webkit-transform:translateZ(0);transform:translateZ(0)}}@-webkit-keyframes fadeOutUp{0%{opacity:1}to{-webkit-transform:translate3d(0,-100%,0);opacity:0;transform:translate3d(0,-100%,0)}}@keyframes fadeOutUp{0%{opacity:1}to{-webkit-transform:translate3d(0,-100%,0);opacity:0;transform:translate3d(0,-100%,0)}}@-webkit-keyframes fadeIn{0%{opacity:0}to{opacity:1}}@keyframes fadeIn{0%{opacity:0}to{opacity:1}}@-webkit-keyframes fadeOut{0%{opacity:1}to{opacity:0}}@keyframes fadeOut{0%{opacity:1}to{opacity:0}}.animated{-webkit-animation-duration:1s;-webkit-animation-fill-mode:backwards;animation-duration:1s;animation-fill-mode:backwards}@media screen and (prefers-reduced-motion:reduce){.animated{-webkit-animation:unset!important;animation:unset!important}}.animateIn{-webkit-animation-duration:.5s;-webkit-animation-name:fadeIn;animation-duration:.5s;animation-name:fadeIn}@media (max-width:480px){.animateIn{-webkit-animation-name:slideInUp;animation-name:slideInUp}}.animateOut{-webkit-animation-duration:.2s;-webkit-animation-name:fadeOut;animation-duration:.2s;animation-name:fadeOut}@media (max-width:480px){.animateOut{-webkit-animation-name:fadeOutUp;animation-name:fadeOutUp}}*,:after,:before{-webkit-box-sizing:border-box;box-sizing:border-box;color:inherit}button{background:transparent;border:none;color:inherit;cursor:pointer;font-family:inherit;font-size:inherit;line-height:inherit;overflow:visible;padding:0;text-transform:none}button::-moz-focus-inner{border-style:none;padding:0}button:focus{outline:none}button:focus:after{border:2px solid #0b73da;border-radius:4px;content:"";height:-webkit-calc(100% + 8px);height:calc(100% + 8px);left:-6px;position:absolute;top:-6px;width:-webkit-calc(100% + 8px);width:calc(100% + 8px);z-index:1}svg[class^=pe-icon--]{display:inline-block;fill:#6a7070;pointer-events:none;vertical-align:top}svg[class^=pe-icon--check]{fill:#038238}svg[class$="18"]{height:18px;width:18px}.pe-link--btn{cursor:pointer;text-decoration:underline}.pe-icon--btn,.pe-link--btn{background-color:transparent;border:0;position:relative}.pe-icon--btn{padding:0}.pe-title--small{color:#252525;font-size:1.28571rem;font-weight:400;line-height:1.57143rem}.text-icon{-ms-flex-align:center;-webkit-align-items:center;-webkit-box-align:center;align-items:center;cursor:pointer;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;padding:.5em}.text-icon svg{margin-left:.5em}:host{color:#252525;font:14px/18px Open Sans,Calibri,Tahoma,sans-serif}.dropdown-trigger{z-index:9}.dropdown-wrapper{margin-top:-9px;opacity:0;position:absolute;visibility:hidden;z-index:10}:host([open]) .dropdown-wrapper{opacity:1;visibility:visible}.mobile-group{background:#f5f5f5;border-bottom:1px solid #e9e9e9;display:-webkit-inline-box;display:-webkit-inline-flex;display:-ms-inline-flexbox;display:inline-flex;overflow:hidden;padding:24px;position:relative;top:-27px;width:100%;z-index:10}.mobile-group span{text-align:center;width:100%}.mobile-group button{margin-left:12px}::slotted(ul){background-color:#fff;border:1px solid #d9d9d9;border-radius:2px;list-style-type:none;margin-top:0;overflow-x:visible;padding:1em 0;position:absolute;top:16px;width:220px}.dropdown-menu li.seperator{border-bottom:1px solid #d9d9d9;margin-bottom:6px;padding-bottom:6px}.dropdown-menu button{-ms-flex-align:center;-webkit-align-items:center;-webkit-box-align:center;align-items:center;color:#252525;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;padding:0;position:relative;text-align:left;text-decoration:none;width:100%}.dropdown-menu button:focus,.dropdown-menu button:hover{background-color:#e9e9e9}.dropdown-menu button:focus:after{height:100%;left:0;top:0;width:100%}.dropdown-menu button[aria-checked=false] svg{display:none}.dropdown-menu button[aria-checked=true] svg{display:inline-block}.truncate{max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width:250px}@media (-ms-high-contrast:active),(-ms-high-contrast:none){.dropdown-menu button[aria-checked=true] svg{top:4px}}.dropdown-menu svg{left:12px;position:absolute}.dropdown-menu .option-text{display:-webkit-inline-box;display:-webkit-inline-flex;display:-ms-inline-flexbox;display:inline-flex;margin:5px 24px 5px 34px;width:100%}@media (min-width:480px){.mobile-group{display:none}.dropdown-menu{max-height:300px;overflow-y:scroll}}@media (max-width:480px){.dropdown-wrapper{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;width:100%}.dropdown-menu{border:0;height:100vh;top:44px;width:100%}.dropdown-menu .option-text{font-size:16px;margin:12px 42px}}
  </style>
  <button
  id="dropdownTrigger"
  class="dropdown-trigger text-icon pe-icon--btn"
  aria-haspopup="true"
  aria-expanded="false"
  class="text-icon pe-icon--btn"
>
  Introduction to Science
${DROPDOWN_OPEN_SVG}
</button>
<div id="dropdownWrapper" class="dropdown-wrapper animated">
  <div class="mobile-group">
    <span class="pe-title pe-title--small truncate"
      >Introduction to Science</span
    >
    <button
      id="mobileClose"
      class="pe-icon--btn"
      aria-label="close dropdown"
    >
      ${REMOVE_LG_SVG}
    </button>
  </div>
  <slot></slot>
</div>
`;

  if (w.ShadyCSS) w.ShadyCSS.prepareTemplate(template, 'pearson-dropdown');

  // A selector for targeting all elements that could receive
  // browser focus.
  // @see getFocusableChildren
  const FOCUSABLE_ELEMENTS = 'button:not([disabled]):not([inert])',
    TAB_KEY = 9,
    LEFT_KEY = 37,
    UP_KEY = 38,
    RIGHT_KEY = 39,
    DOWN_KEY = 40,
    ESCAPE_KEY = 27;

  /**
   * Get the current active element in the browser, regardless of whether it is in Light DOM or Shadow DOM
   */
  function getDeepActiveElement() {
    let a = doc.activeElement;
    while (a && a.shadowRoot && a.shadowRoot.activeElement) {
      a = a.shadowRoot.activeElement;
    }
    return a;
  }
  /**
   * Get all focusable children of a DOM node, excluding children that are too small to be seen by the user.
   * @param {HTMLElement} node
   * @returns HTMLElement
   */
  function getFocusableChildren(node) {
    const focusableChildren = node.querySelectorAll(FOCUSABLE_ELEMENTS);
    return Array.prototype.filter.call(focusableChildren, function(child) {
      return !!(
        child.offsetWidth ||
        child.offsetHeight ||
        child.getClientRects().length
      );
    });
  }
  /**
   * Set the browser focus to the first child of a node OR to a child that has the `autotofocus` attribute.
   * @param {HTMLElement} node
   */
  function setFocusToFirstChild(node) {
    const focusableChildren = getFocusableChildren(node),
      focusableChild =
        node.querySelector('[autofocus]') || focusableChildren[0];
    if (focusableChild) {
      focusableChild.focus();
    }
  }

  class Dropdown extends HTMLElement {
    static get observedAttributes() {
      return ['open'];
    }

    constructor() {
      super();
      this.attachShadow({ mode: 'open' });

      const clone = template.content.cloneNode(true);

      this.trigger = clone.querySelector('#dropdownTrigger');
      this.wrapper = clone.querySelector('#dropdownWrapper');
      this.menu = clone.querySelector('#dropdownMenu');

      this._onTriggerClick = this._onTriggerClick.bind(this);
      this._onDocClick = this._onDocClick.bind(this);
      this._onKeyDown = this._onKeyDown.bind(this);

      this.shadowRoot.appendChild(clone);
    }

    get isOpen() {
      return this.hasAttribute('open');
    }

    set isOpen(newValue) {
      const isOpen = Boolean(newValue);

      if (isOpen) {
        this.setAttribute('open', '');
      } else {
        this.removeAttribute('open');
      }
    }

    _toggleMenu() {
      this.isOpen = !this.isOpen;
    }

    _openMenu() {
      console.log('opening menu');
      setFocusToFirstChild(this.menu);
    }

    _closeMenu() {
      console.log('closing menu');
      this.trigger.focus();
    }

    _onTriggerClick() {
      this._toggleMenu();
    }

    _onDocClick() {
      if (!this.isOpen) return;

      this._toggleMenu();
    }

    _onKeyDown(e) {
      console.log(`pressed ${e.keyCode}`);
    }

    attributeChangedCallback(name, oldValue, newValue) {
      switch (name) {
        case 'open': {
          const willOpen = newValue !== null;

          if (willOpen) {
            this._openMenu();
          } else {
            this._closeMenu();
          }
        }
          break;
      
        default:
          break;
      }
    }

    connectedCallback() {
      this.trigger.addEventListener('click', this._onTriggerClick);
      this.wrapper.addEventListener('keydown', this._onKeyDown);

      doc.addEventListener('click', this._onDocClick, true);

      console.log(this.shadowRoot.querySelector('slot'))
    }

    diconnectedCallback() {
      doc.removeEventListener('click', this._onDocClick);

    }
  }
  customElements.define('pearson-dropdown', Dropdown);
})(window, document);
