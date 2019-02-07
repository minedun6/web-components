'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Footer = function (_HTMLElement) {
  _inherits(Footer, _HTMLElement);

  function Footer() {
    _classCallCheck(this, Footer);

    var _this = _possibleConstructorReturn(this, (Footer.__proto__ || Object.getPrototypeOf(Footer)).call(this));

    _this.attachShadow({ mode: 'open' });
    return _this;
  }

  _createClass(Footer, [{
    key: 'connectedCallback',
    value: function connectedCallback() {
      var currentDoc = document.querySelector('link[href$="footer.html"]').import;
      var template = currentDoc.querySelector('#template');
      var clone = document.importNode(template.content, true);
      this._renderFooter(clone);
      this.shadowRoot.appendChild(clone);
    }
  }, {
    key: '_renderFooter',
    value: function _renderFooter(parentNode) {
      var nologo = true,
          footerLinks = void 0,
          styleTemplate = void 0,
          styleClone = void 0,
          liNode = [],
          aNode = [];

      var urlArray = this.getAttribute('url').split(','),
          textArray = this.getAttribute('text').split(',');
      var arrayLength = urlArray.length < textArray.length ? urlArray.length : textArray.length;

      var footerBody = parentNode.querySelector('.pe-footer');

      var currentDoc = document.querySelector('link[href$="footer.html"]').import;

      if (this.hasAttribute('type')) {
        var footerType = this.getAttribute('type');

        switch (footerType) {
          case 'glp':
            footerBody.classList.add('pe-footer--glp');
            styleTemplate = currentDoc.querySelector('#glpStyles');
            break;
          case 'lightText':
            footerBody.classList.add('pe-footer--light');
            styleTemplate = currentDoc.querySelector('#lightStyles');
            break;
          case 'logo':
            nologo = false;
            styleTemplate = currentDoc.querySelector('#logoStyles');
            break;
          default:
            return;
        }
        styleClone = document.importNode(styleTemplate.content, true);
        footerBody.parentNode.insertBefore(styleClone, footerBody.nextSibling);
      }

      var selector = nologo ? '#noLogo' : '#withLogo';
      var innerTemplate = currentDoc.querySelector(selector);
      var innerClone = document.importNode(innerTemplate.content, true);
      footerBody.appendChild(innerClone);

      footerLinks = footerBody.querySelector('ul');
      for (var i = 0; i < arrayLength; i++) {
        aNode[i] = document.createElement("A");
        aNode[i].innerHTML = textArray[i];
        aNode[i].setAttribute('href', urlArray[i]);
        aNode[i].setAttribute('target', '_blank');
        liNode[i] = document.createElement("LI");
        liNode[i].appendChild(aNode[i]);
        footerLinks.appendChild(liNode[i]);
      }
    }
  }]);

  return Footer;
}(HTMLElement);

customElements.define('pearson-footer', Footer);