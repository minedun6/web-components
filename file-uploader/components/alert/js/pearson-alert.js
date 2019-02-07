(function(w, doc) {
  'use strict';

  const template = doc.createElement('template');

  template.innerHTML = `
  <style>
.pe-alert{visibility:hidden;opacity:0;color:#252525;z-index:2000}@media (max-width:480px){.pe-alert{max-width:440px;padding:4px}}.pe-alert.alert--info,.pe-alert.alert--success{border-left-color:#19a6a4}.pe-alert.alert--error .pe-alert-box{border-left-color:#db0020}.pe-alert.alert--error .pe-alert-box a{color:#db0020}.pe-alert.alert-inline{position:absolute}.pe-alert.alert-global{position:fixed;top:32px;left:0;margin:0 32px}@media (max-width:768px){.pe-alert.alert-global{top:36px;margin:0 24px}}.pe-alert-box{-webkit-box-shadow:0 1px 1px 0 rgba(0,0,0,.16);box-shadow:0 1px 1px 0 rgba(0,0,0,.16);padding:8px;margin-bottom:1em;max-width:580px;-webkit-transition:all .2s ease;transition:all .2s ease;z-index:10;background:#fff;border:1px solid #c7c7c7;border-left:3px solid #19a6a4}.pe-alert-box .close-title{float:right;color:#6a7070;cursor:pointer}.pe-alert-box .alert-content-container{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:start;-webkit-align-items:flex-start;-ms-flex-align:start;align-items:flex-start;-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;padding:20px 4px 20px 20px}.pe-alert-box .alert-title{margin-right:4px;display:inline;font-size:14px;font-weight:400;top:-12px;position:relative}.pe-alert-box .alert-text{display:inline}.pe-alert button.pe-icon{background-color:transparent;border:0;padding:0;position:relative;overflow:visible}.pe-alert button.pe-icon:focus{outline:0}.pe-alert button.pe-icon::-moz-focus-inner{border:0}.pe-alert button.pe-icon:focus:after{display:block;border:2px solid #0b73da;border-radius:4px;content:"";height:-webkit-calc(100% + 8px);height:calc(100% + 8px);left:-6px;position:absolute;top:-6px;width:-webkit-calc(100% + 8px);width:calc(100% + 8px);z-index:1}.pe-alert img.pe-icon:not([src=""]){margin-right:12px;width:18px;height:18px}.pe-alert svg{width:24px;height:24px}@-webkit-keyframes slideInDown{0%{-webkit-transform:translate3d(0,-150%,0);transform:translate3d(0,-150%,0);opacity:0;visibility:hidden}to{-webkit-transform:translateZ(0);transform:translateZ(0);opacity:1;visibility:visible}}@keyframes slideInDown{0%{-webkit-transform:translate3d(0,-150%,0);transform:translate3d(0,-150%,0);opacity:0;visibility:hidden}to{-webkit-transform:translateZ(0);transform:translateZ(0);opacity:1;visibility:visible}}@-webkit-keyframes slideOutDown{0%{-webkit-transform:translateZ(0);transform:translateZ(0);opacity:1;visibility:visible}to{-webkit-transform:translate3d(0,100%,0);transform:translate3d(0,100%,0);opacity:0;visibility:hidden}}@keyframes slideOutDown{0%{-webkit-transform:translateZ(0);transform:translateZ(0);opacity:1;visibility:visible}to{-webkit-transform:translate3d(0,100%,0);transform:translate3d(0,100%,0);opacity:0;visibility:hidden}}@-webkit-keyframes fadeIn{0%{opacity:0;visibility:hidden}to{opacity:1;visibility:visible}}@keyframes fadeIn{0%{opacity:0;visibility:hidden}to{opacity:1;visibility:visible}}@-webkit-keyframes fadeOut{0%{opacity:1;visibility:visible}to{opacity:0;visibility:hidden}}@keyframes fadeOut{0%{opacity:1;visibility:visible}to{opacity:0;visibility:hidden}}.fadeIn,.slideInDown{opacity:1;visibility:visible}.fadeOut,.slideOutDown{opacity:0;visibility:hidden}.animated.slideInDown{-webkit-animation:slideInDown .3s ease-in-out 0s;animation:slideInDown .3s ease-in-out 0s}.animated.slideOutDown{-webkit-animation:slideOutDown .2s ease-in 0s;animation:slideOutDown .2s ease-in 0s}.animated.fadeIn{-webkit-animation:fadeIn .3s linear 0s;animation:fadeIn .3s linear 0s}.animated.fadeOut{-webkit-animation:fadeOut .2s linear 0s;animation:fadeOut .2s linear 0s}@media (prefers-reduced-motion){.animated{-webkit-animation:unset!important;animation:unset!important;-webkit-transition:none!important;transition:none!important}}html[data-prefers-reduced-motion] .animated{-webkit-animation:unset!important;animation:unset!important;-webkit-transition:none!important;transition:none!important}	</style>
	<div id="peAlert" class="pe-alert" role="dialog" aria-labelledby="alertTitle" aria-describedby="alertText">
		<div class="pe-alert-box">
			<button data-action="close-alert" class="close-title pe-icon pe-icon--btn remove-sm-24" aria-label="Close Lorem ipsum dolor sit amet.">
				<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="remove-sm-24" class="pe-icon--remove-sm-24"
				 viewBox="0 0 24 24" focusable="false" aria-hidden="true">
					<path d="M13.4092,11.9999 L17.7082,7.7009 C18.0972,7.3119 18.0972,6.6809 17.7082,6.2919 C17.3192,5.9029 16.6882,5.9029 16.2992,6.2919 L12.0002,10.5909 L7.7012,6.2919 C7.3122,5.9029 6.6812,5.9029 6.2922,6.2919 C5.9022,6.6809 5.9022,7.3119 6.2922,7.7009 L10.5912,11.9999 L6.2922,16.2989 C5.9022,16.6879 5.9022,17.3189 6.2922,17.7079 C6.4862,17.9029 6.7412,17.9999 6.9962,17.9999 C7.2512,17.9999 7.5062,17.9029 7.7012,17.7079 L12.0002,13.4089 L16.2992,17.7079 C16.4932,17.9029 16.7482,17.9999 17.0032,17.9999 C17.2582,17.9999 17.5132,17.9029 17.7082,17.7079 C18.0972,17.3189 18.0972,16.6879 17.7082,16.2989 L13.4092,11.9999 Z" />
				</svg>
			</button>
			<div id="contentContainer" class="alert-content-container">
				<img id="icon" class="pe-icon" src="" aria-hidden="true">
				<div id="content" class="alert-content" aria-hidden="true">
					<slot></slot>
				</div>
			</div>
		</div>
	</div>
  `;

  if (w.ShadyCSS) w.ShadyCSS.prepareTemplate(template, 'pearson-alert');

  const SUCCESS_ICON_URI =
    "data:image/svg+xml, %3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' version='1.1' viewBox='0 0 18 18' %3E%3Cpath fill='%2319a6a4' d='M5.7176,18 C5.4406,18 5.1736,17.885 4.9846,17.68 L0.2666,12.589 C-0.1084,12.184 -0.0854,11.551 0.3206,11.176 C0.7246,10.799 1.3566,10.823 1.7336,11.229 L5.6126,15.415 L16.1826,0.424 C16.5016,-0.028 17.1246,-0.135 17.5756,0.183 C18.0276,0.501 18.1356,1.125 17.8176,1.576 L6.5346,17.576 C6.3616,17.823 6.0846,17.978 5.7836,17.998 C5.7616,17.999 5.7396,18 5.7176,18' /%3E%3C/svg%3E";

  const ERROR_ICON_URI =
    "data:image/svg+xml, %3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' version='1.1' viewBox='0 0 18 18'%3E%3Cpath fill='%23db0020' d='M9.9999375,12.4775 C9.9999375,12.7525 9.7749375,12.9775 9.4999375,12.9775 L8.4999375,12.9775 C8.2249375,12.9775 7.9999375,12.7525 7.9999375,12.4775 L7.9999375,7.4775 C7.9999375,7.2025 8.2249375,6.9775 8.4999375,6.9775 L9.4999375,6.9775 C9.7749375,6.9775 9.9999375,7.2025 9.9999375,7.4775 L9.9999375,12.4775 Z M9.9999375,15.4775 C9.9999375,15.7525 9.7749375,15.9775 9.4999375,15.9775 L8.4999375,15.9775 C8.2249375,15.9775 7.9999375,15.7525 7.9999375,15.4775 L7.9999375,14.4775 C7.9999375,14.2025 8.2249375,13.9775 8.4999375,13.9775 L9.4999375,13.9775 C9.7749375,13.9775 9.9999375,14.2025 9.9999375,14.4775 L9.9999375,15.4775 Z M17.9469375,17.2535 L9.4469375,0.2535 C9.2769375,-0.0845 8.7229375,-0.0845 8.5529375,0.2535 L0.0529375,17.2535 C-0.0240625,17.4095 -0.0170625,17.5925 0.0739375,17.7405 C0.1659375,17.8875 0.3269375,17.9775 0.4999375,17.9775 L17.4999375,17.9775 C17.6729375,17.9775 17.8339375,17.8875 17.9259375,17.7405 C18.0169375,17.5925 18.0239375,17.4095 17.9469375,17.2535 L17.9469375,17.2535 Z' /%3E%3C/svg%3E";

  class Alert extends HTMLElement {
    constructor() {
      super();

      this.attachShadow({ mode: 'open' });

      const clone = template.content.cloneNode(true);

      this.alert = clone.querySelector('#peAlert');
      this.contentContainer = clone.querySelector('#contentContainer');
      this.icon = clone.querySelector('#icon');
      this.content = clone.querySelector('#content');
      this.closeBtn = clone.querySelector('button[data-action="close-alert"]');

      this.shadowRoot.appendChild(clone);

      this._onClose = this._onClose.bind(this);
      this._onAnimationEnd = this._onAnimationEnd.bind(this);
    }

    connectedCallback() {
      if (this.isAnimated) {
        this.alert.classList.toggle('animated');
      }

      if (this.type === 'error') {
        this.contentContainer.setAttribute('role', 'alert');
        this.contentContainer.setAttribute('aria-live', 'assertive');
        this.icon.src = ERROR_ICON_URI;
      } else {
        if (this.type === 'success') this.icon.src = SUCCESS_ICON_URI;

        this.contentContainer.setAttribute('role', 'status');
        this.contentContainer.setAttribute('aria-live', 'polite');
      }

      this.alert.classList.add('alert-' + this.level);
      this.alert.classList.add('alert--' + this.type);

      if (this.level === 'global') {
        this.alert.classList.add('slideInDown');
      }
      if (this.level === 'inline') {
        this.alert.classList.add('fadeIn');
      }

      this.content.setAttribute('aria-hidden', 'false');
      this.closeBtn.addEventListener('click', this._onClose);

      this.alert.addEventListener('animationend', this._onAnimationEnd);
    }

    disconnectedCallback() {

      this.alert.removeEventListener('animationend', this._onAnimationEnd);
      this.closeBtn.removeEventListener('click', this._onClose);

      document
        .querySelector('pearson-uploader')
        .shadowRoot.querySelector('upload-modal #attachFiles')
        .focus();
    }

    _onClose() {
      if (this.level === 'global') {
        this.alert.classList.add('slideOutDown');
      }
      if (this.level === 'inline') {
        this.alert.classList.add('fadeOut');
      }

      this.dispatchEvent(
        new Event('dismiss', {
          bubbles: true
        })
      );
    }

    _onAnimationEnd(e) {
      const { animationName } = e;
      if (animationName === 'fadeOut' || animationName === 'slideOutDown') {
        this.remove();
      }
      if (animationName === 'fadeIn' || animationName === 'slideInDown') {
        if (this.focusOnOpen) {
          this.closeBtn.focus();
        }
      }
    }

    get isAnimated() {
      return this.hasAttribute('animated');
    }

    get focusOnOpen() {
      return this.hasAttribute('focusOnOpen');
    }

    get level() {
      return this.getAttribute('level');
    }

    get type() {
      return this.getAttribute('type');
    }
  }

  customElements.define('pearson-alert', Alert);
})(window, document);
