(function(w, doc) {
  'use strict';

  const currentDoc = doc.querySelector('link[href$="alert.html"]').import;
  const template = currentDoc.querySelector('#template');

  if (w.ShadyCSS) w.ShadyCSS.prepareTemplate(template, 'pearson-alert');

  const SUCCESS_ICON_URI =
    "data:image/svg+xml, %3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' version='1.1' viewBox='0 0 18 18' %3E%3Cpath fill='%2319a6a4' d='M5.7176,18 C5.4406,18 5.1736,17.885 4.9846,17.68 L0.2666,12.589 C-0.1084,12.184 -0.0854,11.551 0.3206,11.176 C0.7246,10.799 1.3566,10.823 1.7336,11.229 L5.6126,15.415 L16.1826,0.424 C16.5016,-0.028 17.1246,-0.135 17.5756,0.183 C18.0276,0.501 18.1356,1.125 17.8176,1.576 L6.5346,17.576 C6.3616,17.823 6.0846,17.978 5.7836,17.998 C5.7616,17.999 5.7396,18 5.7176,18' /%3E%3C/svg%3E";

  const ERROR_ICON_URI =
    "data:image/svg+xml, %3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' version='1.1' viewBox='0 0 18 18'%3E%3Cpath fill='%23db0020' d='M9.9999375,12.4775 C9.9999375,12.7525 9.7749375,12.9775 9.4999375,12.9775 L8.4999375,12.9775 C8.2249375,12.9775 7.9999375,12.7525 7.9999375,12.4775 L7.9999375,7.4775 C7.9999375,7.2025 8.2249375,6.9775 8.4999375,6.9775 L9.4999375,6.9775 C9.7749375,6.9775 9.9999375,7.2025 9.9999375,7.4775 L9.9999375,12.4775 Z M9.9999375,15.4775 C9.9999375,15.7525 9.7749375,15.9775 9.4999375,15.9775 L8.4999375,15.9775 C8.2249375,15.9775 7.9999375,15.7525 7.9999375,15.4775 L7.9999375,14.4775 C7.9999375,14.2025 8.2249375,13.9775 8.4999375,13.9775 L9.4999375,13.9775 C9.7749375,13.9775 9.9999375,14.2025 9.9999375,14.4775 L9.9999375,15.4775 Z M17.9469375,17.2535 L9.4469375,0.2535 C9.2769375,-0.0845 8.7229375,-0.0845 8.5529375,0.2535 L0.0529375,17.2535 C-0.0240625,17.4095 -0.0170625,17.5925 0.0739375,17.7405 C0.1659375,17.8875 0.3269375,17.9775 0.4999375,17.9775 L17.4999375,17.9775 C17.6729375,17.9775 17.8339375,17.8875 17.9259375,17.7405 C18.0169375,17.5925 18.0239375,17.4095 17.9469375,17.2535 L17.9469375,17.2535 Z' /%3E%3C/svg%3E";

  class Alert extends HTMLElement {
    constructor() {
      super();

      this.attachShadow({ mode: 'open' });

      const clone = doc.importNode(template.content.cloneNode(true), true);

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

      if (this.severity === 'error') {
        this.contentContainer.setAttribute('role', 'alert');
        this.contentContainer.setAttribute('aria-live', 'assertive');
        this.icon.src = ERROR_ICON_URI;
      } else {
        if (this.severity === 'success') this.icon.src = SUCCESS_ICON_URI;

        this.contentContainer.setAttribute('role', 'status');
        this.contentContainer.setAttribute('aria-live', 'polite');
      }

      this.alert.classList.add('alert-' + this.type);
      this.alert.classList.add('alert--' + this.severity);

      if (this.type === 'global') {
        this.alert.classList.add('slideInDown');
      }
      if (this.type === 'inline') {
        this.alert.classList.add('fadeIn');
      }

      this.content.setAttribute('aria-hidden', 'false');
      this.closeBtn.addEventListener('click', this._onClose);

      this.alert.addEventListener('animationend', this._onAnimationEnd);
    }

    disconnectedCallback() {
      const returnNode = this._findReturnNode();

      this.alert.removeEventListener('animationend', this._onAnimationEnd);
      this.closeBtn.removeEventListener('click', this._onClose);

      returnNode.focus();
    }

    _onClose() {
      if (this.type === 'global') {
        this.alert.classList.add('slideOutDown');
      }
      if (this.type === 'inline') {
        this.alert.classList.add('fadeOut');
      }

      this.dispatchEvent(
        new Event('dismiss', {
          bubbles: true
        })
      );
    }

    _onAnimationEnd(e) {
      if (e.animationName === 'fadeOut' || e.animationName === 'slideOutDown') {
        this.remove();
      }
      if (e.animationName === 'fadeIn' || e.animationName === 'slideInDown') {
        if (this.severity === 'important') {
          this.closeBtn.focus();
        }
      }
    }

    _findReturnNode() {
      return doc.querySelector(this.getAttribute('returnNode'));
    }

    get isAnimated() {
      return this.hasAttribute('animated');
    }

    get type() {
      return this.getAttribute('type');
    }

    get severity() {
      return this.getAttribute('severity');
    }
  }

  customElements.define('pearson-alert', Alert);
})(window, document);
