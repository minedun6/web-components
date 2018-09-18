'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

(function (w, doc) {
  'use strict';

  var currentDoc = doc.querySelector('link[href$="index.html"]').import;
  var template = currentDoc.querySelector('#template');

  if (w.ShadyCSS) w.ShadyCSS.prepareTemplate(template, 'pearson-alert');

  var Alert = function (_HTMLElement) {
    _inherits(Alert, _HTMLElement);

    function Alert() {
      _classCallCheck(this, Alert);

      var _this = _possibleConstructorReturn(this, (Alert.__proto__ || Object.getPrototypeOf(Alert)).call(this));

      _this.attachShadow({ mode: 'open' });

      var clone = doc.importNode(template.content.cloneNode(true), true);

      _this.alert = clone.querySelector('#peAlert');
      _this.contentContainer = clone.querySelector('#contentContainer');
      _this.content = clone.querySelector('#content');
      _this.closeBtn = clone.querySelector('button[data-action="close-alert"]');

      _this.shadowRoot.appendChild(clone);

      _this.close = _this.close.bind(_this);
      return _this;
    }

    _createClass(Alert, [{
      key: 'connectedCallback',
      value: function connectedCallback() {
        if (this.isAnimated) {
          this.alert.classList.toggle('animated');
        }

        if (this.severity === 'error') {
          this.contentContainer.setAttribute('role', 'alert');
          this.contentContainer.setAttribute('aria-live', 'assertive');
        } else {
          this.contentContainer.setAttribute('role', 'status');
          this.contentContainer.setAttribute('aria-live', 'polite');
        }

        this.alert.setAttribute('data-alert-type', this.type);

        if (this.type === 'global') {
          this.alert.classList.add('slideInDown');
        }

        this.content.setAttribute('aria-hidden', 'false');
        this.closeBtn.addEventListener('click', this.close);
      }
    }, {
      key: 'disconnectedCallback',
      value: function disconnectedCallback() {
        this.closeBtn.removeEventListener('click', this.close);
      }
    }, {
      key: 'close',
      value: function close() {
        this.remove();
      }
    }, {
      key: 'isAnimated',
      get: function get() {
        return this.hasAttribute('animated');
      }
    }, {
      key: 'type',
      get: function get() {
        return this.getAttribute('type');
      }
    }, {
      key: 'severity',
      get: function get() {
        return this.getAttribute('severity');
      }
    }]);

    return Alert;
  }(HTMLElement);

  customElements.define('pearson-alert', Alert);
})(window, document);