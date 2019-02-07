var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

(function (w, doc) {
  'use strict';

  var template = doc.createElement('template');

  template.innerHTML = '\n  <style>\n  *,* :after,* :before,:host:after,:host:before{-webkit-box-sizing:border-box;box-sizing:border-box}:host{-webkit-transition:background .3s;background:#6a7070;border:1px solid #c7c7c7;border-radius:100px;color:#fff;cursor:pointer;display:inline-block;font-family:Open Sans,Calibri,Tahoma,sans-serif;font-size:0;height:23px;overflow:visible;position:relative;text-transform:uppercase;transition:background .3s;vertical-align:middle;width:55px}:host(:focus){outline:0!important}:host(:focus):after{-webkit-transform:translate(-50%,-50%);border:2px solid #0b73da;border-radius:22px;content:"";height:-webkit-calc(100% + 10px);height:calc(100% + 10px);left:50%;position:absolute;top:50%;transform:translate(-50%,-50%);width:-webkit-calc(100% + 10px);width:calc(100% + 10px);z-index:1}:host::-moz-focus-inner{border:0}:host([on]){background:#047a9c}:host([disabled]){color:#f2f2f2;cursor:not-allowed}:host([on]:focus){background-color:#005a70;border:1px solid #005a70}:host([on]):before{left:32px}:host([disabled]):before{background:#f2f2f2}:host:before,:host>span{line-height:23px;position:absolute}:host:before{-webkit-transition:left .3s;background:#fff;border:1px solid #6a7070;border-radius:100%;content:"";display:block;height:20px;left:1px;transition:left .3s;width:20px}:host>span{font-size:11.2px;pointer-events:none;top:-1px}:host([hidelabels])>span{display:none}:host .toggle-on{right:27px}:host .toggle-off{right:5px}:host(:not([on]))>span.toggle-on,:host([on])>span.toggle-off{display:none}@media screen and (prefers-reduced-motion:reduced){:host,:host:before{-webkit-transition:none!important;transition:none!important}}\n\t</style>\n\t<span class="toggle-on">On</span>\n\t<span class="toggle-off">Off</span>\n  ';

  if (w.ShadyCSS) w.ShadyCSS.prepareTemplate(template, 'pearson-toggle');

  var KEYCODE = {
    ENTER: 13,
    SPACE: 32
  };

  var Toggle = function (_HTMLElement) {
    _inherits(Toggle, _HTMLElement);

    _createClass(Toggle, null, [{
      key: 'observedAttributes',
      get: function get() {
        return ['on', 'disabled'];
      }
    }]);

    function Toggle() {
      _classCallCheck(this, Toggle);

      var _this = _possibleConstructorReturn(this, (Toggle.__proto__ || Object.getPrototypeOf(Toggle)).call(this));

      _this.attachShadow({ mode: 'open' });

      var clone = template.content.cloneNode(true);

      _this.shadowRoot.appendChild(clone);

      _this._onToggleClick = _this._onToggleClick.bind(_this);
      _this._onToggleKeyUp = _this._onToggleKeyUp.bind(_this);

      _this._onLabelClick = _this._onLabelClick.bind(_this);

      _this._onDOMLoaded = _this._onDOMLoaded.bind(_this);
      return _this;
    }

    _createClass(Toggle, [{
      key: 'connectedCallback',
      value: function connectedCallback() {
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
    }, {
      key: '_onToggleClick',
      value: function _onToggleClick(e) {
        e.stopPropagation();
        this._toggleOn();
      }
    }, {
      key: '_onToggleKeyUp',
      value: function _onToggleKeyUp(e) {
        if (e.altKey) {
          return;
        }

        if (e.keyCode === KEYCODE.SPACE || e.keyCode === KEYCODE.ENTER) {
          e.preventDefault();
          this._toggleOn();
        }
      }
    }, {
      key: '_upgradeProperty',
      value: function _upgradeProperty(prop) {
        if (this.hasOwnProperty(prop)) {
          var value = this[prop];
          delete this[prop];
          this[prop] = value;
        }
      }
    }, {
      key: '_toggleOn',
      value: function _toggleOn() {
        if (this.disabled) return;

        this.on = !this.on;

        // The toggle should emit a change event
        // for the benefit of consumers
        this.dispatchEvent(new CustomEvent('change', {
          detail: {
            on: this.on
          },
          bubbles: true
        }));
      }

      // Helper function for finding external label node

    }, {
      key: '_findLabelNode',
      value: function _findLabelNode() {
        if (this.parentElement.tagName === 'LABEL') {
          return this.parentElement;
        }
        var scope = this.getRootNode();
        return scope.querySelector('label[for="' + this.id + '"]');
      }

      // When this label is clicked, we want to
      // click on this toggle and focus on it

    }, {
      key: '_onLabelClick',
      value: function _onLabelClick(e) {
        e.preventDefault();

        if (this.disabled) return;

        this.click();
        this.focus();
      }
    }, {
      key: '_onDOMLoaded',
      value: function _onDOMLoaded() {
        this.labelNode = this._findLabelNode();

        // If the external label does not have an ID, we must
        // ensure that it has one
        if (!this.labelNode.id) this.labelNode.id = this.id + '_label';

        // This toggle must be labelled by the external label node
        this.setAttribute('aria-labelledby', this.labelNode.id);

        // We listen for the external label to be clicked
        this.labelNode.addEventListener('click', this._onLabelClick);
      }
    }, {
      key: 'attributeChangedCallback',
      value: function attributeChangedCallback(name, oldValue, newValue) {
        var isTruthy = newValue !== null;
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
    }, {
      key: 'disconnectedCallback',
      value: function disconnectedCallback() {
        this.removeEventListener('click', this._onToggleClick);
        this.removeEventListener('keyup', this._onToggleKeyUp);

        doc.removeEventListener('DOMContentLoaded', this._onDOMLoaded);

        if (this.labelNode) {
          this.labelNode.removeEventListener('click', this._onLabelClick);
        }
      }
    }, {
      key: 'on',
      get: function get() {
        return this.hasAttribute('on');
      },
      set: function set(value) {
        var ison = Boolean(value);
        if (ison) {
          this.setAttribute('on', '');
        } else {
          this.removeAttribute('on');
        }
      }
    }, {
      key: 'disabled',
      get: function get() {
        return this.hasAttribute('disabled');
      },
      set: function set(value) {
        var isDisabled = Boolean(value);
        if (isDisabled) {
          this.setAttribute('disabled', '');
        } else {
          this.removeAttribute('disabled');
        }
      }
    }, {
      key: 'name',
      get: function get() {
        return this.getAttribute('name');
      }
    }, {
      key: 'value',
      get: function get() {
        return this.getAttribute('value');
      }
    }]);

    return Toggle;
  }(HTMLElement);

  customElements.define('pearson-toggle', Toggle);
})(window, document);