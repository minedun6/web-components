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
    style="width:18px;height:18px;"
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
    style="width:18px;height:18px;"
  >
    <path
      d="M7.35823097,13.99969 C7.08123097,13.99969 6.81423097,13.88469 6.62523097,13.67969 L4.26623097,11.13469 C3.89123097,10.72869 3.91523097,10.09669 4.32023097,9.72169 C4.72423097,9.34469 5.35623097,9.36869 5.73323097,9.77469 L7.25323097,11.41469 L12.182231,4.42369 C12.501231,3.97269 13.125231,3.86469 13.576231,4.18269 C14.027231,4.50069 14.135231,5.12469 13.817231,5.57569 L8.17523097,13.57569 C8.00223097,13.82269 7.72523097,13.97769 7.42423097,13.99769 C7.40223097,13.99869 7.38023097,13.99969 7.35823097,13.99969"
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
    style="width:18px;height:18px;"
  >
    <path d="M10.415,9.0014 L17.709,1.7074 C18.1,1.3164 18.1,0.6834 17.709,0.2934 C17.318,-0.0976 16.686,-0.0976 16.295,0.2934 L9.001,7.5874 L1.707,0.2934 C1.316,-0.0976 0.684,-0.0976 0.293,0.2934 C-0.098,0.6834 -0.098,1.3164 0.293,1.7074 L7.587,9.0014 L0.293,16.2954 C-0.098,16.6864 -0.098,17.3194 0.293,17.7094 C0.488,17.9054 0.744,18.0024 1,18.0024 C1.256,18.0024 1.512,17.9054 1.707,17.7094 L9.001,10.4154 L16.295,17.7094 C16.49,17.9054 16.746,18.0024 17.002,18.0024 C17.258,18.0024 17.514,17.9054 17.709,17.7094 C18.1,17.3194 18.1,16.6864 17.709,16.2954 L10.415,9.0014 Z"/>
`;

  const template = doc.createElement('template');
  template.innerHTML = `
  <style>
@-webkit-keyframes slideInUp{0%{-webkit-transform:translate3d(0,100%,0);transform:translate3d(0,100%,0);visibility:visible}to{-webkit-transform:translateZ(0);transform:translateZ(0)}}@keyframes slideInUp{0%{-webkit-transform:translate3d(0,100%,0);transform:translate3d(0,100%,0);visibility:visible}to{-webkit-transform:translateZ(0);transform:translateZ(0)}}@-webkit-keyframes fadeOutUp{0%{opacity:1}to{opacity:0;-webkit-transform:translate3d(0,-100%,0);transform:translate3d(0,-100%,0)}}@keyframes fadeOutUp{0%{opacity:1}to{opacity:0;-webkit-transform:translate3d(0,-100%,0);transform:translate3d(0,-100%,0)}}@-webkit-keyframes fadeIn{0%{opacity:0}to{opacity:1}}@keyframes fadeIn{0%{opacity:0}to{opacity:1}}@-webkit-keyframes fadeOut{0%{opacity:1}to{opacity:0}}@keyframes fadeOut{0%{opacity:1}to{opacity:0}}.animated{-webkit-animation-duration:1s;animation-duration:1s;-webkit-animation-fill-mode:backwards;animation-fill-mode:backwards}@media screen and (prefers-reduced-motion:reduce){.animated{-webkit-animation:unset!important;animation:unset!important}}.animateIn{-webkit-animation-name:fadeIn;animation-name:fadeIn;-webkit-animation-duration:.5s;animation-duration:.5s}@media (max-width:480px){.animateIn{-webkit-animation-name:slideInUp;animation-name:slideInUp}}.animateOut{-webkit-animation-name:fadeOut;animation-name:fadeOut;-webkit-animation-duration:.2s;animation-duration:.2s}@media (max-width:480px){.animateOut{-webkit-animation-name:fadeOutUp;animation-name:fadeOutUp}}*,:after,:before{-webkit-box-sizing:border-box;box-sizing:border-box;color:inherit}button{font-family:inherit;font-size:inherit;line-height:inherit;color:inherit;overflow:visible;text-transform:none;background:transparent;border:none;padding:0;cursor:pointer}button::-moz-focus-inner{border-style:none;padding:0}button:focus{outline:none}button:focus:after{border:2px solid #0b73da;content:"";position:absolute;border-radius:4px;width:-webkit-calc(100% + 8px);width:calc(100% + 8px);height:-webkit-calc(100% + 8px);height:calc(100% + 8px);top:-6px;left:-6px;z-index:1}svg[class^=pe-icon--]{display:inline-block;vertical-align:top;fill:#6a7070;pointer-events:none}svg[class^=pe-icon--check]{fill:#038238}.pe-link--btn{text-decoration:underline;cursor:pointer}.pe-icon--btn,.pe-link--btn{background-color:transparent;border:0;position:relative}.pe-icon--btn{padding:0}.pe-title--small{font-size:1.28571rem;line-height:1.57143rem;font-weight:400;color:#252525}.text-icon{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;padding:.5em;cursor:pointer}.text-icon svg{margin-left:.5em}:host{font:14px/18px Open Sans,Calibri,Tahoma,sans-serif;color:#252525}.dropdown-trigger{z-index:9}.dropdown-wrapper{position:absolute;z-index:10;margin-top:-9px;visibility:hidden;opacity:0}:host([open]) .dropdown-wrapper{visibility:visible;opacity:1}.mobile-group{background:#f5f5f5;border-bottom:1px solid #e9e9e9;display:-webkit-inline-box;display:-webkit-inline-flex;display:-ms-inline-flexbox;display:inline-flex;width:100%;padding:24px;position:relative;top:-27px;z-index:10;overflow:hidden}.mobile-group span{width:100%;text-align:center}.mobile-group button{margin-left:12px}.dropdown-menu{position:absolute;list-style-type:none;padding:1em 0;border:1px solid #d9d9d9;border-radius:2px;width:220px;margin-top:0;top:16px;background-color:#fff;overflow-x:visible}.dropdown-menu li.seperator{padding-bottom:6px;margin-bottom:6px;border-bottom:1px solid #d9d9d9}.dropdown-menu button{position:relative;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;text-decoration:none;width:100%;color:#252525;text-align:left;padding:0}.dropdown-menu button:focus,.dropdown-menu button:hover{background-color:#e9e9e9}.dropdown-menu button:focus:after{width:100%;height:100%;top:0;left:0}.dropdown-menu button svg{display:none}.dropdown-menu button[aria-checked=true] svg{display:inline-block}.truncate{max-width:100%;width:250px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}@media (-ms-high-contrast:active),(-ms-high-contrast:none){.dropdown-menu button[aria-checked=true] svg{top:4px}}.dropdown-menu svg{position:absolute;left:12px}.dropdown-menu .option-text{display:-webkit-inline-box;display:-webkit-inline-flex;display:-ms-inline-flexbox;display:inline-flex;margin:5px 24px 5px 34px;width:100%}@media (min-width:480px){.mobile-group{display:none}.dropdown-menu{max-height:300px;overflow-y:scroll}}@media (max-width:480px){.dropdown-wrapper{width:100%;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex}.dropdown-menu{width:100%;top:44px;border:0;height:100vh}.dropdown-menu .option-text{font-size:16px;margin:12px 42px}}
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
  const FOCUSABLE_ELEMENTS = 'button:not([disabled]):not([inert])';
  const RETURN = 13,
    UP_KEY = 38,
    DOWN_KEY = 40,
    ESCAPE_KEY = 27,
    SPACEBAR = 32;

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

      this._onSlotChange = this._onSlotChange.bind(this);

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
    _onSlotChange(e) {
      const listNode = e.target.assignedNodes()[1];
      if (!listNode) return;
      this._importList(listNode);
      e.target.remove();
    }

    _importList(listNode){
      listNode.classList.add('dropdown-menu');
      listNode.setAttribute('role', 'menu');

      let firstChild = listNode.firstElementChild;
      let node = firstChild;

      while(firstChild && node) {
        node.setAttribute('role', 'none');

        node.innerHTML = (`
          <button
            class="pe-link--btn"
            role="menuitemradio"
            aria-checked="false"
          >
          ${CHECMARK_SVG}
          <span class="option-text">${node.textContent}</span>
          </button>
        `);

        node = node.nextElementSibling;
      }
      this.options = getFocusableChildren(listNode);
      this.wrapper.appendChild(listNode);
    }

    _toggleMenu() {
      this.isOpen = !this.isOpen;
    }

    _openMenu() {
      console.log('opening menu');
      setFocusToFirstChild(this.wrapper);
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
      const key = e.which;

      if (key ===  RETURN || key === SPACEBAR) {
        this._checkOption(getDeepActiveElement());
        return;
      }

      const idxMap = {
        [UP_KEY]: index - 1,
        [DOWN_KEY]: index + 1
      };

      const optionLen = this.options.length;
      const firstOption = this.options[0];
      const lastOption = this.options[optionLen - 1];
      
      const index = this.options.indexOf(e.target);
      let nextIdx = key in idxMap ? idxMap[key] : null;
      
      let nextOption = this.options[nextIdx];

      if (nextOption) {
        nextOption.focus();
      }

      if (nextIdx === - 1) {
        lastOption.focus();
      }

      if (nextIdx === optionLen) {
        firstOption.focus();
      }
    }

    _checkOption(option) {
      Array.prototype.forEach.call(this.options, function (opt) {
        if (opt === option) {
          opt.setAttribute('aria-checked', 'true');
        } else {
          opt.removeAttribute('aria-checked');
        }
      });
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
      const slot = this.shadowRoot.querySelector('slot');

      slot.addEventListener('slotchange', this._onSlotChange);
      this.trigger.addEventListener('click', this._onTriggerClick);
      this.wrapper.addEventListener('keydown', this._onKeyDown);

      doc.addEventListener('click', this._onDocClick, true);
    }

    diconnectedCallback() {
      doc.removeEventListener('click', this._onDocClick);

    }
  }
  customElements.define('pearson-dropdown', Dropdown);
})(window, document);
