var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

(function (w, doc) {
  'use strict';

  // Create a template element

  var template = doc.createElement('template');

  //Styles must be copied from the css file
  // and pasted between the style tags below

  var ICONS_CHEVRON_BACK_18 = '\n    <svg\n      class="pe-icon--chevron-back-18"\n      aria-hidden="true"\n      focusable="false"\n      style="width:18px;height:18px;"\n    >\n      <path\n        d="M13.749,17.6606035 C14.112,17.2486035 14.076,16.6116035 13.662,16.2436035 L5.509,8.9996035 L13.662,1.7566035 C14.077,1.3896035 14.113,0.752603504 13.749,0.339603504 C13.383,-0.0763964961 12.751,-0.115396496 12.338,0.252603504 L3.338,8.2476035 C3.123,8.4376035 3,8.7126035 3,8.9996035 C3,9.2876035 3.123,9.5616035 3.338,9.7526035 L12.338,17.7476035 C12.751,18.1156035 13.383,18.0766035 13.749,17.6606035"\n      />\n    </svg>\n  ';

  var ICONS_REMOVE_SM_24 = '\n    <svg\n      class="pe-icon--remove-sm-24"\n      aria-hidden="true"\n      focusable="false"\n      style="width:24px;height:24px;"\n    >\n      <path d="M13.4092,11.9999 L17.7082,7.7009 C18.0972,7.3119 18.0972,6.6809 17.7082,6.2919 C17.3192,5.9029 16.6882,5.9029 16.2992,6.2919 L12.0002,10.5909 L7.7012,6.2919 C7.3122,5.9029 6.6812,5.9029 6.2922,6.2919 C5.9022,6.6809 5.9022,7.3119 6.2922,7.7009 L10.5912,11.9999 L6.2922,16.2989 C5.9022,16.6879 5.9022,17.3189 6.2922,17.7079 C6.4862,17.9029 6.7412,17.9999 6.9962,17.9999 C7.2512,17.9999 7.5062,17.9029 7.7012,17.7079 L12.0002,13.4089 L16.2992,17.7079 C16.4932,17.9029 16.7482,17.9999 17.0032,17.9999 C17.2582,17.9999 17.5132,17.9029 17.7082,17.7079 C18.0972,17.3189 18.0972,16.6879 17.7082,16.2989 L13.4092,11.9999 Z"/>\n    </svg>\n  ';

  template.innerHTML = ' \n    <style>\n      @-webkit-keyframes slideInRight{0%{right:-320px}to{right:0;visibility:visible}}@keyframes slideInRight{0%{right:-320px}to{right:0;visibility:visible}}@-webkit-keyframes slideOutRight{0%{right:0}to{right:-320px}}@keyframes slideOutRight{0%{right:0}to{right:-320px}}:host(.slideInRight){-webkit-animation-name:slideInRight;animation-name:slideInRight}:host(.slideOutRight){-webkit-animation-name:slideOutRight;animation-name:slideOutRight}:host(.animated){-webkit-animation-duration:.6s;animation-duration:.6s;-webkit-animation-fill-mode:forwards;animation-fill-mode:forwards}@media (prefers-reduced-motion){:host(.animated){-webkit-animation:unset!important;animation:unset!important;-webkit-transition:none!important;transition:none!important}}:host{display:block;-webkit-box-sizing:border-box;box-sizing:border-box;font-family:14px,18px,Open Sans,Calibri,Tahoma,sans-serif;color:#252525;position:fixed;padding:25px 20px 20px;height:100%;top:0;right:-320px;bottom:0;width:320px;border-left:1px solid #d9d9d9;border-bottom:30px solid #fff;-webkit-box-shadow:0 0 5px 0 #c7c7c7;box-shadow:0 0 5px 0 #c7c7c7}:host(:not(.animated)){visibility:hidden}:host([open]:not(.animated)){visibility:visible;right:0}@media (prefers-reduced-motion){:host(:not([open])){visibility:hidden}:host([open]){visibility:visible;right:0}}:host *,:host :after,:host :before{-webkit-box-sizing:border-box;box-sizing:border-box}:host button.back,:host button.close{position:absolute;top:15px;right:15px;border:0;cursor:pointer;background:none;height:44px;width:44px}:host button.back{right:auto;width:auto}:host button.back svg{margin-right:1px}::slotted(.title){display:inline-block;margin:0 0 20px}::slotted(.title:focus){-webkit-box-shadow:none;box-shadow:none;outline:2px solid #0b73da;outline-offset:4px}.content,.header{padding-left:10px;padding-right:10px}.header{border-bottom:1px solid #d9d9d9;height:44px}.content-scroll-wrapper{overflow-y:auto;height:-webkit-calc(100% - 30px);height:calc(100% - 30px)}.content{position:relative;margin-top:25px}.pe-icon--btn{position:relative;font-size:inherit;line-height:inherit;font-family:inherit;font-weight:600;padding:0;border:0;background-color:transparent}.pe-icon--btn:focus{outline:0}.pe-icon--btn:focus:after{border:2px solid #0b73da;content:"";position:absolute;border-radius:4px;width:-webkit-calc(100% + 8px);width:calc(100% + 8px);height:-webkit-calc(100% + 8px);height:calc(100% + 8px);top:-4px;left:-4px;z-index:1}.pe-icon--btn>*{pointer-events:none}.soft-shadow--bottom{-webkit-box-shadow:0 12px 5px -10px hsla(0,0%,78%,.7);box-shadow:0 12px 5px -10px hsla(0,0%,78%,.7)}svg[class^=pe-icon--]{display:inline-block;vertical-align:top;fill:#6a7070}svg:not(:root){overflow:hidden}\n    </style>\n    <div id="header" class="header">\n      <slot name="title"></slot>\n    </div>\n    <div class="content-scroll-wrapper">\n      <div id="content" class="content">\n        <slot name="content"></slot>\n      </div>\n    </div>\n    <button\n      type="button"\n      id="drawer-back"\n      class="pe-icon--btn back"\n      data-action="back"\n      style="display:none;"\n    >\n      ' + ICONS_CHEVRON_BACK_18 + ' Back\n    </button>\n    <button\n      type="button"\n      class="pe-icon--btn close"\n      data-action="close"\n      aria-label=""\n    >\n      ' + ICONS_REMOVE_SM_24 + '\n    </button>\n';

  if (w.ShadyCSS) w.ShadyCSS.prepareTemplate(template, 'pearson-drawer');

  var FOCUSABLE_ELEMENTS = '\n    a[href]:not([tabindex^="-"]):not([inert]),\n    area[href]:not([tabindex^="-"]):not([inert]),\n    input:not([disabled]):not([inert]),\n    select:not([disabled]):not([inert]),\n    textarea:not([disabled]):not([inert]),\n    button:not([disabled]):not([inert]),\n    iframe:not([tabindex^="-"]):not([inert]),\n    audio:not([tabindex^="-"]):not([inert]),\n    video:not([tabindex^="-"]):not([inert]),\n    [contenteditable]:not([tabindex^="-"]):not([inert]),\n    [tabindex]:not([inert])';

  function getDeepActiveElement() {
    var a = doc.activeElement;
    while (a && a.shadowRoot && a.shadowRoot.activeElement) {
      a = a.shadowRoot.activeElement;
    }
    return a;
  }

  function getFocusableChildren(node) {
    var filter = Array.prototype.filter,
        focusableChildren = node.querySelectorAll(FOCUSABLE_ELEMENTS);
    return filter.call(focusableChildren, function (child) {
      return !!(child.offsetWidth || child.offsetHeight || child.getClientRects().length);
    });
  }

  function setFocusToFirstChild(node) {
    var focusableChildren = getFocusableChildren(node),
        focusableChild = node.querySelector('[autofocus]') || focusableChildren[0];

    if (focusableChild) {
      focusableChild.focus();
    }
  }

  function trapTabKey(e) {
    for (var _len = arguments.length, nodes = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      nodes[_key - 1] = arguments[_key];
    }

    var focusableChildren = nodes.reduce(function (acc, n) {
      return acc.concat(getFocusableChildren(n));
    }, []),
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

  var forEach = Array.prototype.forEach;

  var Drawer = function (_HTMLElement) {
    _inherits(Drawer, _HTMLElement);

    _createClass(Drawer, [{
      key: 'activePanelIdx',
      get: function get() {
        if (!this.hasAttribute('activePanelIdx')) {
          return 0;
        }
        return parseInt(this.getAttribute('activePanelIdx'), 10);
      },
      set: function set(newValue) {
        this.setAttribute('activePanelIdx', newValue);
      }
    }, {
      key: 'open',
      get: function get() {
        return this.hasAttribute('open');
      },
      set: function set(newValue) {
        var isOpen = Boolean(newValue);

        if (isOpen) {
          this.setAttribute('open', '');
        } else {
          this.removeAttribute('open');
        }
      }
    }], [{
      key: 'observedAttributes',
      get: function get() {
        return ['activepanelidx', 'activePanelIdx', 'open'];
      }
    }]);

    function Drawer() {
      _classCallCheck(this, Drawer);

      var _this = _possibleConstructorReturn(this, (Drawer.__proto__ || Object.getPrototypeOf(Drawer)).call(this));

      _this.attachShadow({ mode: 'open' });

      var clone = template.content.cloneNode(true);

      _this.backBtn = clone.querySelector('#drawer-back');
      _this.closeBtn = clone.querySelector('button[data-action="close"]');

      // TODO: use ID to select these
      _this.header = clone.querySelector('#header');
      _this.scrollWrapper = clone.querySelector('.content-scroll-wrapper');
      _this.content = clone.querySelector('#content');

      _this.shadowRoot.appendChild(clone);

      _this.trigger = doc.querySelector('#pearsonDrawerTrigger');

      _this.onContentScroll = _this.onContentScroll.bind(_this);
      _this.onTitleSlotChange = _this.onTitleSlotChange.bind(_this);
      _this.onContentSlotChange = _this.onContentSlotChange.bind(_this);
      _this.onContentClick = _this.onContentClick.bind(_this);
      _this.onWindowClick = _this.onWindowClick.bind(_this);
      _this.onWindowKeydown = _this.onWindowKeydown.bind(_this);
      _this.onanimationend = _this.onAnimationEnd.bind(_this);
      return _this;
    }

    _createClass(Drawer, [{
      key: 'attributeChangedCallback',
      value: function attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'open') {
          var isOpen = newValue !== null;
          var isAnimated = this.classList.contains('animated') && animationEnabled();

          if (isAnimated) {
            var prevAnimation = isOpen ? 'slideOutRight' : 'slideInRight';
            var nextAnimation = isOpen ? 'slideInRight' : 'slideOutRight';

            this.classList.add(nextAnimation);
            this.classList.remove(prevAnimation);
          } else {
            this.manageOpenFocus(isOpen);
          }
        }

        // Check for both cases because older browsers do not
        // normalize observed attributes in lowercase
        if (name === 'activepanelidx' || name === 'activePanelIdx') {
          var panelIdx = parseInt(newValue, 10);

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
    }, {
      key: 'connectedCallback',
      value: function connectedCallback() {
        var _this2 = this;

        var _shadowRoot$querySele = this.shadowRoot.querySelectorAll('slot'),
            _shadowRoot$querySele2 = _slicedToArray(_shadowRoot$querySele, 2),
            titleSlot = _shadowRoot$querySele2[0],
            contentSlot = _shadowRoot$querySele2[1];

        if (!this.open && !this.hasAttribute('aria-hidden')) {
          this.setAttribute('aria-hidden', true);
        }

        titleSlot.addEventListener('slotchange', this.onTitleSlotChange);
        contentSlot.addEventListener('slotchange', this.onContentSlotChange);

        this.backBtn.addEventListener('click', function () {
          return _this2.activePanelIdx = 0;
        });
        this.closeBtn.addEventListener('click', function () {
          return _this2.open = false;
        });
        this.scrollWrapper.addEventListener('scroll', this.onContentScroll);
        this.content.addEventListener('click', this.onContentClick, true);

        this.addEventListener('animationend', this.onAnimationEnd);

        w.addEventListener('click', this.onWindowClick, true);
        w.addEventListener('keydown', this.onWindowKeydown, true);
      }
    }, {
      key: 'diconnectedCallback',
      value: function diconnectedCallback() {
        w.removeEventListener(this.onWindowClick);
        w.removeEventListener(this.onWindowKeydown);
      }
    }, {
      key: 'convertPanelHeadings',
      value: function convertPanelHeadings(headingNode, idx) {
        var headingText = headingNode.textContent;
        if (headingNode.parentNode.dataset.panel === '1') {
          var btnWrapper = '\n          <button\n            class="pe-link--btn"\n            data-action="show"\n            data-panel="' + (idx + 2) + '"\n            style="color:#252525;padding:0;text-align:left;text-decoration:none;"\n          >\n            <span class="pe-label pe-bold" style="pointer-events:none;">' + headingText + '</span>\n          </button>';
          headingNode.innerHTML = btnWrapper;
        } else {
          headingNode.setAttribute('tabindex', '-1');
        }
      }
    }, {
      key: 'showPanel',
      value: function showPanel(panelId) {
        var nextPanel = this.panels[panelId];

        forEach.call(this.panels, function (panel) {
          if (panel !== nextPanel) {
            panel.style.display = 'none';
          }
        });
        nextPanel.style.display = 'block';
      }
    }, {
      key: 'manageOpenFocus',
      value: function manageOpenFocus(isOpen) {
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

    }, {
      key: 'onTitleSlotChange',
      value: function onTitleSlotChange(e) {
        this.titleNode = e.target.assignedNodes()[0];

        this.titleNode.setAttribute('tabindex', '-1');
        this.closeBtn.setAttribute('aria-label', 'Close ' + this.titleNode.textContent.trim());
      }
    }, {
      key: 'onContentSlotChange',
      value: function onContentSlotChange(e) {
        this.contentNode = e.target.assignedNodes()[0];
        this.panels = this.contentNode.querySelectorAll('[data-panel]');
        var detailPanels = Array.prototype.slice.call(this.panels, 1);
        var headings = this.contentNode.querySelectorAll('h3');

        forEach.call(headings, this.convertPanelHeadings);
        forEach.call(detailPanels, function (p) {
          return p.style.display = 'none';
        });
      }
    }, {
      key: 'onContentScroll',
      value: function onContentScroll(e) {
        var scrollTop = e.target.scrollTop;

        if (scrollTop > 31) {
          this.header.classList.add('soft-shadow--bottom');
        }

        if (scrollTop < 31) {
          this.header.classList.remove('soft-shadow--bottom');
        }
      }
    }, {
      key: 'onContentClick',
      value: function onContentClick(e) {
        var target = e.target;
        if (!target.matches('button[data-panel]')) {
          return;
        }

        this.activePanelIdx = parseInt(target.dataset.panel, 10) - 1;
      }
    }, {
      key: 'onWindowClick',
      value: function onWindowClick(e) {
        if (!this.open || e.target === this || this.contains(e.target)) return;

        this.open = false;
      }
    }, {
      key: 'onWindowKeydown',
      value: function onWindowKeydown(e) {
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
    }, {
      key: 'onAnimationEnd',
      value: function onAnimationEnd() {
        this.manageOpenFocus(this.open);
      }
    }]);

    return Drawer;
  }(HTMLElement);

  customElements.define('pearson-drawer', Drawer);
})(window, document);