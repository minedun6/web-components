(function(w, doc) {
  'use strict';

  // Create a template element
  const component = doc.createElement('template'),
    liveRegion = doc.createElement('template');

  //Styles must be copied from the css file
  // and pasted between the style tags below
  liveRegion.innerHTML = `
        <div role="alert" aria-live="polite" class="loading-bar-liveregion" id="liveRegion">
          <!-- insert loaded confirmation message here, visually hidden region -->
        </div>
  `;

  component.innerHTML = ` 
    <style>
    .loading-bar-liveregion{position:absolute!important;height:1px;width:1px;overflow:hidden;clip:rect(1px 1px 1px 1px);clip:rect(1px,1px,1px,1px)}.pe-progress-bar{position:relative;padding-bottom:16px}.pe-progress-bar .fullbar{width:100%;text-align:center;margin:0;line-height:18px;font-size:14px;font-family:Open Sans,Calibri,Tahoma,sans-serif}.pe-progress-bar .fullbar:after{content:"";height:4px;width:100%;position:absolute;bottom:4px;left:0;background-color:#c7c7c7}.pe-progress-bar.left-aligned .fullbar{text-align:left}.pe-progress-bar.right-aligned .fullbar{text-align:right}.pe-progress-bar div[role=progressbar]{height:12px;width:0;position:absolute;left:0;bottom:0;background-color:#19a6a4;-webkit-animation:shift .25s linear infinite;animation:shift .25s linear infinite}.pe-progress-bar.loading div[role=progressbar]{background-image:-webkit-linear-gradient(315deg,#19a6a4 33.33%,#daf0ed 0,#daf0ed 50%,#19a6a4 0,#19a6a4 83.33%,#daf0ed 0,#daf0ed);background-image:linear-gradient(135deg,#19a6a4 33.33%,#daf0ed 0,#daf0ed 50%,#19a6a4 0,#19a6a4 83.33%,#daf0ed 0,#daf0ed);background-size:18px 18px}@-webkit-keyframes shift{to{background-position:9px 9px}}@keyframes shift{to{background-position:9px 9px}}@media screen and (prefers-reduced-motion:reduce){.pe-progress-bar div[role=progressbar]{-webkit-animation:unset!important;animation:unset!important;-webkit-transition:unset!important;transition:unset!important}}
    </style>
     <div class="pe-progress-bar">
      <p class="fullbar" id="label">0%</p>
      <div role="progressbar" aria-valuenow="0" aria-valuemax="100" aria-valuemin="0" id="progress"></div>
  </div>
`;

  if (w.ShadyCSS) w.ShadyCSS.prepareTemplate(component, 'pearson-progress-bar');

  class ProgressBar extends HTMLElement {
    static get observedAttributes() {
      return ['progress', 'type', 'max', 'alignment', 'text'];
    }

    get alignment() {
      return this.getAttribute('alignment');
    }

    get text() {
      return this.getAttribute('text');
    }

    get progress() {
      return parseInt(this.getAttribute('progress'), 10);
    }

    set progress(newValue) {
      this.setAttribute('progress', newValue);
    }

    get type() {
      return this.getAttribute('type');
    }

    get max() {
      return this.getAttribute('max');
    }

    set titleAlignment(alignment) {
      this.wrapper.classList.add(alignment);
    }

    set progressBar(progress) {
      this.loadingBar.setAttribute('aria-valuenow', progress);
      this.loadingBar.setAttribute('style', 'width: ' + progress + '%;');
      if (this.text === null) {
        this.label.innerHTML = progress + '%';
      } else {
        this.label.innerHTML = this.text;
      }
    }

    set loaderType(value) {
      this.wrapper.classList.add(value);
    }

    set maxValue(value) {
      this.loadingBar.setAttribute('aria-valuemax', value);
    }

    set alertMessage(message) {
      this.liveRegion.innerHTML = message;
    }

    constructor() {
      super();
      this.attachShadow({ mode: 'open' });

      const componentClone = component.content.cloneNode(true);
      const liveRegionClone = liveRegion.content.cloneNode(true);

      this.liveRegion = liveRegionClone.querySelector('#liveRegion');

      this.loadingBar = componentClone.querySelector('[role=progressbar]');
      this.wrapper = componentClone.querySelector('.pe-progress-bar');
      this.label = componentClone.querySelector('#label');

      this.shadowRoot.appendChild(liveRegionClone);
      this.shadowRoot.appendChild(componentClone);
    }

    connectedCallback() {
      if (!this.hasAttribute('progress')) {
        this.setAttribute('progress', '0');
      }

      this.progressBar = this.progress;
      this.loaderType = this.type;
      this.maxValue = this.max;
      this.titleAlignment = this.alignment;
    }

    attributeChangedCallback(name, oldValue, newValue) {
      if (this.type !== 'loading') return;

      if (name === 'progress') {
        this.progressBar = newValue;

        if (oldValue === '0') {
          this.alertMessage = 'Starting.';
        }

        if (this.progress % 20 === 0) {
          this.alertMessage = this.progress + ' percent loaded.';
        }

        if (this.progress === 100) {
          this.alertMessage = 'Finished loading.';
          this.dispatchEvent(
            new Event('loaded', {
              bubbles: true
            })
          );
        }
      }
    }
  }
  customElements.define('pearson-progress-bar', ProgressBar);
})(window, document);
