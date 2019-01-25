(function(w, doc) {
  'use strict';

  // Create a template element
  const template = doc.createElement('template');

  //Styles must be copied from the css file
  // and pasted between the style tags below

  const ICONS_CHEVRON_BACK_18 = `
    <svg
      class="pe-icon--chevron-back-18"
      aria-hidden="true"
      focusable="false"
      style="width:18px;height:18px;"
    >
      <path
        d="M13.749,17.6606035 C14.112,17.2486035 14.076,16.6116035 13.662,16.2436035 L5.509,8.9996035 L13.662,1.7566035 C14.077,1.3896035 14.113,0.752603504 13.749,0.339603504 C13.383,-0.0763964961 12.751,-0.115396496 12.338,0.252603504 L3.338,8.2476035 C3.123,8.4376035 3,8.7126035 3,8.9996035 C3,9.2876035 3.123,9.5616035 3.338,9.7526035 L12.338,17.7476035 C12.751,18.1156035 13.383,18.0766035 13.749,17.6606035"
      />
    </svg>
  `;

  const ICONS_REMOVE_SM_24 = `
    <svg
      class="pe-icon--remove-sm-24"
      aria-hidden="true"
      focusable="false"
      style="width:24px;height:24px;"
    >
      <path d="M13.4092,11.9999 L17.7082,7.7009 C18.0972,7.3119 18.0972,6.6809 17.7082,6.2919 C17.3192,5.9029 16.6882,5.9029 16.2992,6.2919 L12.0002,10.5909 L7.7012,6.2919 C7.3122,5.9029 6.6812,5.9029 6.2922,6.2919 C5.9022,6.6809 5.9022,7.3119 6.2922,7.7009 L10.5912,11.9999 L6.2922,16.2989 C5.9022,16.6879 5.9022,17.3189 6.2922,17.7079 C6.4862,17.9029 6.7412,17.9999 6.9962,17.9999 C7.2512,17.9999 7.5062,17.9029 7.7012,17.7079 L12.0002,13.4089 L16.2992,17.7079 C16.4932,17.9029 16.7482,17.9999 17.0032,17.9999 C17.2582,17.9999 17.5132,17.9029 17.7082,17.7079 C18.0972,17.3189 18.0972,16.6879 17.7082,16.2989 L13.4092,11.9999 Z"/>
    </svg>
  `;

  template.innerHTML = ` 
    <style>
      @-webkit-keyframes slideInRight{0%{right:-320px}to{right:0;visibility:visible}}@keyframes slideInRight{0%{right:-320px}to{right:0;visibility:visible}}@-webkit-keyframes slideOutRight{0%{right:0}to{right:-320px}}@keyframes slideOutRight{0%{right:0}to{right:-320px}}:host(.slideInRight){-webkit-animation-name:slideInRight;animation-name:slideInRight}:host(.slideOutRight){-webkit-animation-name:slideOutRight;animation-name:slideOutRight}:host(.animated){-webkit-animation-duration:.6s;animation-duration:.6s;-webkit-animation-fill-mode:forwards;animation-fill-mode:forwards}@media (prefers-reduced-motion){:host(.animated){-webkit-animation:unset!important;animation:unset!important;-webkit-transition:none!important;transition:none!important}}:host{display:block;-webkit-box-sizing:border-box;box-sizing:border-box;font-family:14px,18px,Open Sans,Calibri,Tahoma,sans-serif;color:#252525;position:fixed;padding:25px 20px 20px;height:100%;top:0;right:-320px;bottom:0;width:320px;border-left:1px solid #d9d9d9;border-bottom:30px solid #fff;-webkit-box-shadow:0 0 5px 0 #c7c7c7;box-shadow:0 0 5px 0 #c7c7c7}:host(:not(.animated)){visibility:hidden}:host([open]:not(.animated)){visibility:visible;right:0}@media (prefers-reduced-motion){:host(:not([open])){visibility:hidden}:host([open]){visibility:visible;right:0}}:host *,:host :after,:host :before{-webkit-box-sizing:border-box;box-sizing:border-box}:host button.back,:host button.close{position:absolute;top:15px;right:15px;border:0;cursor:pointer;background:none;height:44px;width:44px}:host button.back{right:auto;width:auto}:host button.back svg{margin-right:1px}::slotted(.title){display:inline-block;margin:0 0 20px}::slotted(.title:focus){-webkit-box-shadow:none;box-shadow:none;outline:2px solid #0b73da;outline-offset:4px}.content,.header{padding-left:10px;padding-right:10px}.header{border-bottom:1px solid #d9d9d9;height:44px}.content-scroll-wrapper{overflow-y:auto;height:-webkit-calc(100% - 30px);height:calc(100% - 30px)}.content{position:relative;margin-top:25px}.pe-icon--btn{position:relative;font-size:inherit;line-height:inherit;font-family:inherit;font-weight:600;padding:0;border:0;background-color:transparent}.pe-icon--btn:focus{outline:0}.pe-icon--btn:focus:after{border:2px solid #0b73da;content:"";position:absolute;border-radius:4px;width:-webkit-calc(100% + 8px);width:calc(100% + 8px);height:-webkit-calc(100% + 8px);height:calc(100% + 8px);top:-4px;left:-4px;z-index:1}.pe-icon--btn>*{pointer-events:none}.soft-shadow--bottom{-webkit-box-shadow:0 12px 5px -10px hsla(0,0%,78%,.7);box-shadow:0 12px 5px -10px hsla(0,0%,78%,.7)}svg[class^=pe-icon--]{display:inline-block;vertical-align:top;fill:#6a7070}svg:not(:root){overflow:hidden}
    </style>
    <div id="header" class="header">
      <slot name="title"></slot>
    </div>
    <div class="content-scroll-wrapper">
      <div id="content" class="content">
        <slot name="content"></slot>
      </div>
    </div>
    <button
      type="button"
      id="drawer-back"
      class="pe-icon--btn back"
      data-action="back"
      style="display:none;"
    >
      ${ICONS_CHEVRON_BACK_18} Back
    </button>
    <button
      type="button"
      class="pe-icon--btn close"
      data-action="close"
      aria-label=""
    >
      ${ICONS_REMOVE_SM_24}
    </button>
`;

  if (w.ShadyCSS) w.ShadyCSS.prepareTemplate(template, 'pearson-drawer');

  const FOCUSABLE_ELEMENTS = `
    a[href]:not([tabindex^="-"]):not([inert]),
    area[href]:not([tabindex^="-"]):not([inert]),
    input:not([disabled]):not([inert]),
    select:not([disabled]):not([inert]),
    textarea:not([disabled]):not([inert]),
    button:not([disabled]):not([inert]),
    iframe:not([tabindex^="-"]):not([inert]),
    audio:not([tabindex^="-"]):not([inert]),
    video:not([tabindex^="-"]):not([inert]),
    [contenteditable]:not([tabindex^="-"]):not([inert]),
    [tabindex]:not([inert])`;

  function getDeepActiveElement() {
    let a = doc.activeElement;
    while (a && a.shadowRoot && a.shadowRoot.activeElement) {
      a = a.shadowRoot.activeElement;
    }
    return a;
  }

  function getFocusableChildren(node) {
    const filter = Array.prototype.filter,
      focusableChildren = node.querySelectorAll(FOCUSABLE_ELEMENTS);
    return filter.call(focusableChildren, function(child) {
      return !!(
        child.offsetWidth ||
        child.offsetHeight ||
        child.getClientRects().length
      );
    });
  }

  function setFocusToFirstChild(node) {
    const focusableChildren = getFocusableChildren(node),
      focusableChild =
        node.querySelector('[autofocus]') || focusableChildren[0];

    if (focusableChild) {
      focusableChild.focus();
    }
  }

  function trapTabKey(e, ...nodes) {
    const focusableChildren = nodes.reduce(
        (acc, n) => acc.concat(getFocusableChildren(n)),
        []
      ),
      focusedItemIdx = focusableChildren.indexOf(getDeepActiveElement()),
      lastFocusableIdx = focusableChildren.length - 1;

    if (e.shiftKey && focusedItemIdx === 0) {
      focusableChildren[lastFocusableIdx].focus();
      e.preventDefault();
    }

    if (!e.shiftKey && focusedItemIdx === lastFocusableIdx) {
      focusableChildren[0].focus();
      e.preventDefault();
    }
  }

  function animationEnabled() {
    return !w.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  const forEach = Array.prototype.forEach;

  class Drawer extends HTMLElement {
    static get observedAttributes() {
      return ['activepanelidx', 'activePanelIdx', 'open'];
    }

    get activePanelIdx() {
      if (!this.hasAttribute('activePanelIdx')) {
        return 0;
      }
      return parseInt(this.getAttribute('activePanelIdx'), 10);
    }

    set activePanelIdx(newValue) {
      this.setAttribute('activePanelIdx', newValue);
    }

    get open() {
      return this.hasAttribute('open');
    }

    set open(newValue) {
      const isOpen = Boolean(newValue);

      if (isOpen) {
        this.setAttribute('open', '');
      } else {
        this.removeAttribute('open');
      }
    }

    constructor() {
      super();
      this.attachShadow({ mode: 'open' });

      const clone = template.content.cloneNode(true);

      this.backBtn = clone.querySelector('#drawer-back');
      this.closeBtn = clone.querySelector('button[data-action="close"]');

      // TODO: use ID to select these
      this.header = clone.querySelector('#header');
      this.scrollWrapper = clone.querySelector('.content-scroll-wrapper');
      this.content = clone.querySelector('#content');

      this.shadowRoot.appendChild(clone);

      this.trigger = doc.querySelector('#pearsonDrawerTrigger');

      this.onContentScroll = this.onContentScroll.bind(this);
      this.onTitleSlotChange = this.onTitleSlotChange.bind(this);
      this.onContentSlotChange = this.onContentSlotChange.bind(this);
      this.onContentClick = this.onContentClick.bind(this);
      this.onWindowClick = this.onWindowClick.bind(this);
      this.onWindowKeydown = this.onWindowKeydown.bind(this);
      this.onanimationend = this.onAnimationEnd.bind(this);
    }

    attributeChangedCallback(name, oldValue, newValue) {
      if (name === 'open') {
        const isOpen = newValue !== null;
        const isAnimated =
          this.classList.contains('animated') && animationEnabled();

        if (isAnimated) {
          const prevAnimation = isOpen ? 'slideOutRight' : 'slideInRight';
          const nextAnimation = isOpen ? 'slideInRight' : 'slideOutRight';

          this.classList.add(nextAnimation);
          this.classList.remove(prevAnimation);
        } else {
          this.manageOpenFocus(isOpen);
        }
      }

      // Check for both cases because older browsers do not
      // normalize observed attributes in lowercase
      if (name === 'activepanelidx' || name === 'activePanelIdx') {
        const panelIdx = parseInt(newValue, 10);

        this.showPanel(panelIdx);

        if (panelIdx > 0) {
          this.backBtn.style.display = 'inline-block';
          this.titleNode.style.display = 'none';
        } else {
          this.backBtn.style.display = 'none';
          this.titleNode.style.display = 'inline-block';
        }

        if (panelIdx === 0) {
          this.titleNode.focus();
        } else {
          setFocusToFirstChild(this.panels[panelIdx]);
        }
      }
    }

    connectedCallback() {
      const [titleSlot, contentSlot] = this.shadowRoot.querySelectorAll('slot');

      if (!this.open && !this.hasAttribute('aria-hidden')) {
        this.setAttribute('aria-hidden', true);
      }

      titleSlot.addEventListener('slotchange', this.onTitleSlotChange);
      contentSlot.addEventListener('slotchange', this.onContentSlotChange);

      this.backBtn.addEventListener('click', () => (this.activePanelIdx = 0));
      this.closeBtn.addEventListener('click', () => (this.open = false));
      this.scrollWrapper.addEventListener('scroll', this.onContentScroll);
      this.content.addEventListener('click', this.onContentClick, true);

      this.addEventListener('animationend', this.onAnimationEnd);

      w.addEventListener('click', this.onWindowClick, true);
      w.addEventListener('keydown', this.onWindowKeydown, true);
    }

    diconnectedCallback() {
      w.removeEventListener(this.onWindowClick);
      w.removeEventListener(this.onWindowKeydown);
    }

    convertPanelHeadings(headingNode, idx) {
      const headingText = headingNode.textContent;
      if (headingNode.parentNode.dataset.panel === '1') {
        const btnWrapper = `
          <button
            class="pe-link--btn"
            data-action="show"
            data-panel="${idx + 2}"
            style="color:#252525;padding:0;text-align:left;text-decoration:none;"
          >
            <span class="pe-label pe-bold" style="pointer-events:none;">${headingText}</span>
          </button>`;
        headingNode.innerHTML = btnWrapper;
      } else {
        headingNode.setAttribute('tabindex', '-1');
      }
    }

    showPanel(panelId) {
      const nextPanel = this.panels[panelId];

      forEach.call(this.panels, function(panel) {
        if (panel !== nextPanel) {
          panel.style.display = 'none';
        }
      });
      nextPanel.style.display = 'block';
    }

    manageOpenFocus(isOpen) {
      if (isOpen && this.titleNode) {
        this.removeAttribute('aria-hidden');
        if (this.activePanelIdx === 0) {
          this.titleNode.focus();
        } else {
          setFocusToFirstChild(this.panels[this.activePanelIdx]);
        }
      } else {
        this.trigger.focus();
        this.setAttribute('aria-hidden', 'true');
      }
    }

    /**
     * Decorates the title of the drawer with taonex and adds an aria-label
     * to the close button.
     * @param {Event} e An Event object
     */
    onTitleSlotChange(e) {
      this.titleNode = e.target.assignedNodes()[0];

      this.titleNode.setAttribute('tabindex', '-1');
      this.closeBtn.setAttribute(
        'aria-label',
        `Close ${this.titleNode.textContent.trim()}`
      );
    }

    onContentSlotChange(e) {
      this.contentNode = e.target.assignedNodes()[0];
      this.panels = this.contentNode.querySelectorAll('[data-panel]');
      const detailPanels = Array.prototype.slice.call(this.panels, 1);
      const headings = this.contentNode.querySelectorAll('h3');

      forEach.call(headings, this.convertPanelHeadings);
      forEach.call(detailPanels, p => (p.style.display = 'none'));
    }

    onContentScroll(e) {
      const scrollTop = e.target.scrollTop;

      if (scrollTop > 31) {
        this.header.classList.add('soft-shadow--bottom');
      }

      if (scrollTop < 31) {
        this.header.classList.remove('soft-shadow--bottom');
      }
    }

    onContentClick(e) {
      const target = e.target;
      if (!target.matches('button[data-panel]')) {
        return;
      }

      this.activePanelIdx = parseInt(target.dataset.panel, 10) - 1;
    }

    onWindowClick(e) {
      if (!this.open || e.target === this || this.contains(e.target)) return;

      this.open = false;
    }

    onWindowKeydown(e) {
      if (!this.open) {
        return;
      }

      if (e.key === 'Escape') {
        this.open = false;
      }

      if (e.key === 'Tab') {
        trapTabKey(e, this, this.shadowRoot);
      }
    }

    onAnimationEnd() {
      this.manageOpenFocus(this.open);
    }
  }
  customElements.define('pearson-drawer', Drawer);
})(window, document);
