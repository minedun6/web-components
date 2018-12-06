var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

(function (w, doc) {
  'use strict';

  var DROPDOWN_CHEVRON_SVG = '\n  <svg\n    version = "1.1"\n    xmlns="http://www.w3.org/2000/svg"\n    xmlns:xlink="http://www.w3.org/1999/xlink"\n    class="pe-icon--dropdown-open-sm-18"\n    viewBox="0 0 18 18"\n\n  >\n    <path \n      d="M12.7059871,7.29177258 C12.3143055,6.90291009 11.6828189,6.90390717 11.2931357,7.29376675 L9,9.59004962 L6.70686427,7.29376675 C6.31718108,6.90291009 5.68569446,6.901913 5.29401289,7.29177258 C4.90333051,7.68063507 4.90133213,8.31079173 5.29201452,8.70164839 L8.29257512,11.7068575 C8.48042241,11.8943092 8.73421608,12 9,12 C9.26578392,12 9.52057678,11.8943092 9.70742488,11.7068575 L12.7079855,8.70164839 C13.0986679,8.31079173 13.0966695,7.68063507 12.7059871,7.29177258"\n    />\n  </svg>';

  var CHECK_ICON_IMG = '\n  <svg\n    version = "1.1"\n    xmlns="http://www.w3.org/2000/svg"\n    xmlns:xlink="http://www.w3.org/1999/xlink"\n    class="pe-icon--check-sm-18"\n    viewBox="0 0 18 18"\n  >\n    <path\n      d="M7.35823097,13.99969 C7.08123097,13.99969 6.81423097,13.88469 6.62523097,13.67969 L4.26623097,11.13469 C3.89123097,10.72869 3.91523097,10.09669 4.32023097,9.72169 C4.72423097,9.34469 5.35623097,9.36869 5.73323097,9.77469 L7.25323097,11.41469 L12.182231,4.42369 C12.501231,3.97269 13.125231,3.86469 13.576231,4.18269 C14.027231,4.50069 14.135231,5.12469 13.817231,5.57569 L8.17523097,13.57569 C8.00223097,13.82269 7.72523097,13.97769 7.42423097,13.99769 C7.40223097,13.99869 7.38023097,13.99969"\n    />\n  </svg>';

  var template = doc.createElement('template');
  template.innerHTML = '\n  <style>\n  @-webkit-keyframes slideInUp{0%{-webkit-transform:translate3d(0,100%,0);transform:translate3d(0,100%,0);visibility:visible}to{-webkit-transform:translateZ(0);transform:translateZ(0)}}@keyframes slideInUp{0%{-webkit-transform:translate3d(0,100%,0);transform:translate3d(0,100%,0);visibility:visible}to{-webkit-transform:translateZ(0);transform:translateZ(0)}}@-webkit-keyframes fadeOutUp{0%{opacity:1}to{-webkit-transform:translate3d(0,-100%,0);opacity:0;transform:translate3d(0,-100%,0)}}@keyframes fadeOutUp{0%{opacity:1}to{-webkit-transform:translate3d(0,-100%,0);opacity:0;transform:translate3d(0,-100%,0)}}@-webkit-keyframes fadeIn{0%{opacity:0}to{opacity:1}}@keyframes fadeIn{0%{opacity:0}to{opacity:1}}@-webkit-keyframes fadeOut{0%{opacity:1}to{opacity:0}}@keyframes fadeOut{0%{opacity:1}to{opacity:0}}.animated{-webkit-animation-duration:1s;-webkit-animation-fill-mode:backwards;animation-duration:1s;animation-fill-mode:backwards}@media screen and (prefers-reduced-motion:reduce){.animated{-webkit-animation:unset!important;animation:unset!important}}.animateIn{-webkit-animation-duration:.5s;-webkit-animation-name:fadeIn;animation-duration:.5s;animation-name:fadeIn}@media (max-width:480px){.animateIn{-webkit-animation-name:slideInUp;animation-name:slideInUp}}.animateOut{-webkit-animation-duration:.2s;-webkit-animation-name:fadeOut;animation-duration:.2s;animation-name:fadeOut}@media (max-width:480px){.animateOut{-webkit-animation-name:fadeOutUp;animation-name:fadeOutUp}}*,:after,:before{-webkit-box-sizing:border-box;box-sizing:border-box;color:inherit}button{background:transparent;border:none;color:inherit;cursor:pointer;font-family:inherit;font-size:inherit;line-height:inherit;overflow:visible;padding:0;text-transform:none}button::-moz-focus-inner{border-style:none;padding:0}button:focus{outline:none}button:focus:after{border:2px solid #0b73da;border-radius:4px;content:"";height:-webkit-calc(100% + 8px);height:calc(100% + 8px);left:-6px;position:absolute;top:-6px;width:-webkit-calc(100% + 8px);width:calc(100% + 8px);z-index:1}svg[class^=pe-icon--]{display:inline-block;fill:currentColor;pointer-events:none;vertical-align:top}svg[class$="18"]{height:18px;width:18px}.pe-link--btn{cursor:pointer;text-decoration:underline}.pe-icon--btn,.pe-link--btn{background-color:transparent;border:0;position:relative}.pe-icon--btn{padding:0}.pe-title--small{color:#252525;font-size:1.28571rem;font-weight:400;line-height:1.57143rem}.text-icon{-ms-flex-align:center;-webkit-align-items:center;-webkit-box-align:center;align-items:center;cursor:pointer;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;padding:.5em}.text-icon svg{margin-left:.5em}:host{color:#252525;font:14px/18px Open Sans,Calibri,Tahoma,sans-serif}.dropdown-trigger{z-index:9}.dropdown-wrapper{margin-top:-9px;position:absolute;z-index:10}.mobile-group{background:#f5f5f5;border-bottom:1px solid #e9e9e9;display:-webkit-inline-box;display:-webkit-inline-flex;display:-ms-inline-flexbox;display:inline-flex;overflow:hidden;padding:24px;position:relative;top:-27px;width:100%;z-index:10}.mobile-group span{text-align:center;width:100%}.mobile-group button{margin-left:12px}.dropdown-menu{background-color:#fff;border:1px solid #d9d9d9;border-radius:2px;list-style-type:none;margin-top:0;overflow-x:visible;padding:1em 0;position:absolute;top:16px;width:220px}.dropdown-menu li.seperator{border-bottom:1px solid #d9d9d9;margin-bottom:6px;padding-bottom:6px}.dropdown-menu button{-ms-flex-align:center;-webkit-align-items:center;-webkit-box-align:center;align-items:center;color:#252525;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;padding:0;position:relative;text-align:left;text-decoration:none;width:100%}.dropdown-menu button:hover{background-color:#e9e9e9}.dropdown-menu button:focus:after{height:100%;left:0;top:0;width:100%}.dropdown-menu button[aria-checked=false] svg{display:none}.dropdown-menu button[aria-checked=true] svg{display:inline-block}.truncate{max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width:250px}@media (-ms-high-contrast:active),(-ms-high-contrast:none){.dropdown-menu button[aria-checked=true] svg{top:4px}}.dropdown-menu svg{left:12px;position:absolute}.dropdown-menu .option-text{display:-webkit-inline-box;display:-webkit-inline-flex;display:-ms-inline-flexbox;display:inline-flex;margin:5px 24px 5px 34px;width:100%}@media (min-width:480px){.mobile-group{display:none}.dropdown-menu{max-height:300px;overflow-y:scroll}}@media (max-width:480px){.dropdown-wrapper{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;width:100%}.dropdown-menu{border:0;height:100vh;top:44px;width:100%}.dropdown-menu .option-text{font-size:16px;margin:12px 42px}}\n  </style>\n  <button\n  id="dropdownTrigger"\n  class="dropdown-trigger text-icon pe-icon--btn"\n  aria-haspopup="true"\n  aria-expanded="false"\n  class="text-icon pe-icon--btn"\n>\n  Introduction to Science\n' + DROPDOWN_CHEVRON_SVG + '\n</button>\n<div class="dropdown-wrapper animated">\n  <div class="mobile-group">\n    <span class="pe-title pe-title--small truncate"\n      >Introduction to Science</span\n    >\n    <button\n      id="mobileClose"\n      class="pe-icon--btn"\n      aria-label="close dropdown"\n    >\n      <svg focusable="false" class="pe-icon--remove-lg-18" aria-hidden="">\n        <use\n          xmlns:xlink="http://www.w3.org/1999/xlink"\n          xlink:href="#remove-lg-18"\n        ></use>\n      </svg>\n    </button>\n  </div>\n  <ul role="menu" class="dropdown-menu pe-label hidden">\n    <li role="none">\n      <button\n        class="pe-link--btn"\n        role="menuitemradio"\n        aria-checked="false"\n      >\n        ' + CHECK_ICON_IMG + '\n        <span class="option-text">Option One</span>\n      </button>\n    </li>\n    <li role="none">\n      <button\n        class="pe-link--btn"\n        role="menuitemradio"\n        aria-checked="false"\n      >\n        ' + CHECK_ICON_IMG + '\n        <span class="option-text">Option Two</span>\n      </button>\n    </li>\n    <li class="seperator" role="none">\n      <button\n        class="pe-link--btn"\n        role="menuitemradio"\n        aria-checked="false"\n      >\n        ' + CHECK_ICON_IMG + '\n        <span class="option-text">Option Three</span>\n      </button>\n    </li>\n    <li role="none">\n      <button\n        class="pe-link--btn"\n        role="menuitemradio"\n        aria-checked="false"\n      >\n        ' + CHECK_ICON_IMG + '\n        <span class="option-text">Option Four</span>\n      </button>\n    </li>\n    <li class="seperator" role="none">\n      <button\n        class="pe-link--btn"\n        role="menuitemradio"\n        aria-checked="false"\n      >\n        ' + CHECK_ICON_IMG + '\n        <span class="option-text">Option Five</span>\n      </button>\n    </li>\n    <li role="none">\n      <button\n        class="pe-link--btn"\n        role="menuitemradio"\n        aria-checked="false"\n      >\n        ' + CHECK_ICON_IMG + '\n        <span class="option-text">Option Six</span>\n      </button>\n    </li>\n  </ul>\n</div>\n';

  if (w.ShadyCSS) w.ShadyCSS.prepareTemplate(template, 'pearson-dropdown');

  /** Any helper functions that do not need to be part of the class
   * can be declared here, before the class is defined.
   */

  var Dropdown = function (_HTMLElement) {
    _inherits(Dropdown, _HTMLElement);

    function Dropdown() {
      _classCallCheck(this, Dropdown);

      var _this = _possibleConstructorReturn(this, (Dropdown.__proto__ || Object.getPrototypeOf(Dropdown)).call(this));

      _this.attachShadow({ mode: 'open' });

      var clone = template.content.cloneNode(true);

      /** After all this, we can append our clone to the shadowRoot */
      _this.shadowRoot.appendChild(clone);

      return _this;
    }

    _createClass(Dropdown, [{
      key: 'connectedCallback',
      value: function connectedCallback() {}
    }, {
      key: 'diconnectedCallback',
      value: function diconnectedCallback() {}
    }]);

    return Dropdown;
  }(HTMLElement);

  customElements.define('pearson-dropdown', Dropdown);
})(window, document);