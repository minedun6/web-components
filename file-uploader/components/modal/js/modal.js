(function(w, doc) {
  'use strict';

  const currentDoc = doc.querySelector('link[href$="modal.html"]').import;
  const styles = currentDoc.querySelector('#styles');
  const template = currentDoc.querySelector('#template');
  const minimizedTemplate = currentDoc.querySelector('#minimized');
  const isIE11 = !!window.MSInputMethodContext && !!document.documentMode;

  if (w.ShadyCSS) w.ShadyCSS.prepareTemplate(styles, 'upload-modal');

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
    [tabindex]:not([tabindex^="-"]):not([inert])`,
    TAB_KEY = 9,
    ESCAPE_KEY = 27;

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

  class Modal extends HTMLElement {
    static get observedAttributes() {
      return ['footer', 'minimized'];
    }

    constructor() {
      super();

      this.attachShadow({ mode: 'open' });

      this.clone = doc.importNode(template.content.cloneNode(true), true);
      this.styles = doc.importNode(styles.content.cloneNode(true), true);

      this.openModal = this.openModal.bind(this);
      this.closeModal = this.closeModal.bind(this);

      this.bindKeyPress = this.bindKeyPress.bind(this);
      this.maintainFocus = this.maintainFocus.bind(this);
      this.minimizeDetail = {};
    }

    attributeChangedCallback(name, oldValue, newValue) {
      const minimizedContainer = this.shadowRoot.querySelector('.pe-modal-container__minimized'),
        modalOverlay = this.shadowRoot.querySelector('#modalOverlay');



      this.minimizedClone = doc.importNode(minimizedTemplate.content.cloneNode(true), true);
      // if `this.modal has not been defined yet,
      // bail out.
      if (!this.modal) return;
      if (name === 'footer') {
        if (!this.footer) {
          const actions = this.modal.querySelector('.actions');
          actions.remove();
        } else {
          this.renderfooter(this.modal);
        }
      }

      if (name === 'minimized') {
        if(!this.minimized) {
          if (isIE11) {
            minimizedContainer.remove();
            this.modal.classList.remove('hidden');
            modalOverlay.classList.remove('hidden');
          }  else {
            minimizedContainer.remove();
            this.modal.classList.remove('hidden');
            modalOverlay.classList.remove('hidden');
            this.modal.classList.remove('fadeOutFast');
            modalOverlay.classList.remove('fadeOutFast');
            this.modal.classList.add('fadeInFast');
          }

        } else {
          this.addEventListener('xhrLoading', event => {
            this.minimizeDetail = event.detail;
            this.updateProgress(this.minimizeDetail)
          });
          this.renderMinimized();
          if (isIE11) {
            modalOverlay.classList.add('hidden');
            this.modal.classList.add('hidden');
          } else {
            this.modal.classList.remove('slideInDown');
            this.modal.classList.add('fadeOutFast');
            modalOverlay.classList.add('fadeOutFast');
          }
        this.updateProgress(this.minimizeDetail)
        }



        modalOverlay.addEventListener('animationend', event => {
          if (event.animationName === 'fadeOutFast') {
            modalOverlay.classList.add('hidden');
            this.modal.classList.add('hidden');
          }
        });
      }
    }

    connectedCallback() {
      const minimizedHeader = this.querySelector('.pe-modal-container__minimized');
      this.shadowRoot.appendChild(this.styles);
      if (this.minimized) {
        this.renderMinimized();
      } else {
        this.renderFull();
      }
      this.addEventListener('xhrLoading', event => {
        this.minimizeDetail = event.detail;
      });
    }

    disconnectedCallback() {
      doc.removeEventListener('keydown', this.bindKeyPress);
      doc.body.removeEventListener('focus', this.maintainFocus);
    }

    get footer() {
      return this.hasAttribute('footer');
    }

    set footer(value) {
      const isfooterShown = Boolean(value);

      if (isfooterShown) {
        this.setAttribute('footer', '');
      } else {
        this.removeAttribute('footer');
      }
    }

    get minimized() {
      return this.hasAttribute('minimized');
    }

    set minimized(value) {
      const isMinimized = Boolean(value);
      if (isMinimized) {
        this.setAttribute('minimized', '');
      } else {
        this.removeAttribute('minimized');
      }
    }

    updateProgress (data) {
      const minimizedContainer = this.shadowRoot.querySelector('.pe-modal-container__minimized');
      if (minimizedContainer !== null) {
        const done = minimizedContainer.querySelector('#done'),
          progress = minimizedContainer.querySelector('#progress');

        done.innerHTML = data.done;
        progress.innerHTML = data.progress
      }
    }

    renderFull(){
      if (isIE11) {
        this.shadowRoot.addEventListener('click', event => {
          console.log(event.target.id)
          if (event.target.id === 'minimizeButton') {
            console.log('clik');
            event.stopImmediatePropagation();
            this.minimized = true
          } else {
            return
          }
        })
      }

      // Get component attributes
      const titleText = this.getAttribute('titleText'),
        triggerId = this.getAttribute('triggerId'),
        footer = this.hasAttribute('footer');

      // Create elements
      // create the footer
      if (footer) {
        this.renderfooter(this.clone);
      }

      const overlayButtonTemplate = currentDoc.querySelector('#overlayDiv'),
        overlayButtonClone = doc.importNode(
          overlayButtonTemplate.content,
          true
        ),
        overlayEntryPoint = this.clone.querySelector('#modalPlaceholder');

      overlayEntryPoint.parentNode.insertBefore(
        overlayButtonClone,
        overlayEntryPoint.nextElementSibling
      );
      overlayEntryPoint.remove();

      const title = this.clone.querySelector('#dialogHeading');
      if (titleText !== null) {
        title.innerHTML = titleText;
      } else {
        title.innerHTML = 'Modal Title';
      }

      // functionality
      this.body = doc.querySelector('body');
      this.main = doc.querySelector('main');
      this.triggerBtn = doc.querySelector('#' + triggerId);

      this.modal = this.clone.querySelector('#modal');
      this.eventBtns = this.clone.querySelectorAll('[data-event]');
      this.overlay = this.clone.querySelector('#modalOverlay');

      // When the modal trigger is clicked, open modal
      this.triggerBtn.addEventListener('click', this.openModal);

      this.eventBtns.forEach(btn => {
        btn.addEventListener('click', e => {
          const eventType = e.target.dataset.event;
          if (btn.id === 'closeButton') {
            this.closeModal(eventType);
          } else if (btn.id === 'minimizeButton') {
            this.minimized = true;
          }

        });
      });


      // sets the positioning for modals that are programmatically created and have scrolling content
      this.setPosition();
      this.shadowRoot.appendChild(this.clone);
      doc.addEventListener('keydown', this.bindKeyPress);
      doc.body.addEventListener('focus', this.maintainFocus, true);
    }


    renderMinimized() {
      this.shadowRoot.appendChild(this.minimizedClone);
        this.shadowRoot.addEventListener('click', event => {
          event.stopImmediatePropagation();
          if (event.target.id === 'expandButton'){
            this.minimized = false
          } else {
            return
          }
        });
    }

    openModal(e) {
      const thisButton = e.currentTarget,
        buttonDisabled = thisButton.getAttribute('disabled');

      if (buttonDisabled === null) {
        thisButton.setAttribute('disabled', true);
        this.main.setAttribute('aria-hidden', 'true');
        this.overlay.removeAttribute('disabled');
      }

      this.overlay.classList.remove('hidden');
      this.overlay.classList.remove('fadeOut');
      this.overlay.classList.add('fadeIn');

      this.modal.classList.remove('hidden');
      this.modal.classList.remove('slideOutDown');
      this.modal.classList.add('slideInDown');
      this.open = true;

      setTimeout(() => {
        this.maintainFocus();
      }, 250);
    }

    closeModal(eventName) {
      this.triggerBtn.removeAttribute('disabled');
      this.main.setAttribute('aria-hidden', 'false');
      this.body.classList.remove('hide-overflow');

      this.overlay.classList.remove('fadeIn');
      this.overlay.classList.add('fadeOut');

      this.modal.classList.remove('slideInDown');
      this.modal.classList.add('slideOutDown');

      setTimeout(() => {
        this.modal.classList.add('hidden');
        this.modal.classList.remove('slideOutDown');
      }, 400);

      setTimeout(() => {
        this.dispatchEvent(
          new Event(eventName, { bubbles: true, composed: true })
        );
      }, 500);

      setTimeout(() => {
        this.overlay.classList.add('hidden');
        this.overlay.classList.remove('fadeOut');
      }, 800);

      setTimeout(() => {
        this.triggerBtn.focus();
      }, 801);

      this.open = false;
    }

    maintainFocus() {
      // if the modal is not open, stop the function
      if (!this.open) return;

      /**
       * The DOM we want to trap focus in. If the consumer passed in
       * focusable children, it's the Light DOM; else, it's the Shadow DOM.
       */
      const targetDOM =
        getFocusableChildren(this).length > 0 ? this : this.modal;

      // if neither the Light DOM nor the Shadow DOM within the modal contain
      // the active element, set focus back into the targetDOM.
      if (
        !this.contains(getDeepActiveElement()) &&
        !this.modal.contains(getDeepActiveElement())
      ) {
        setFocusToFirstChild(targetDOM);
      }
    }
    bindKeyPress(e) {
      if (this.open && e.which === ESCAPE_KEY) {
        this.closeModal('cancel');
      }
      if (this.open && e.which === TAB_KEY) {
        trapTabKey(e, this, this.modal);
      }
    }

    setPosition() {
      setTimeout(() => {
        const modalPosition = this.modal.getBoundingClientRect();
        w.scrollTo(0, 0);
        if (modalPosition.top <= 0) {
          this.modal.style.top = '50px';
          this.modal.style.transform = 'translate(-50%)';
          this.modal.style.marginBottom = '50px';
        }
      }, 100);
    }


    renderfooter(parentNode) {
      const successBtnText = this.getAttribute('successBtnText'),
        cancelBtnText = this.getAttribute('cancelBtnText');


      const actionsTemplate = currentDoc.querySelector('#actions'),
        actionsClone = doc.importNode(actionsTemplate.content, true),
        cancelButton = actionsClone.querySelector('#cancelButton'),
        saveButton = actionsClone.querySelector('#successButton');

      const modalBody = parentNode.querySelector('#dialogDescription');

      if (cancelBtnText !== null) {
        cancelButton.innerHTML = cancelBtnText;
      }

      if (successBtnText !== null) {
        saveButton.innerHTML = successBtnText;
      }

      modalBody.parentNode.insertBefore(actionsClone, modalBody.nextSibling);
    }


  }

  customElements.define('upload-modal', Modal);
})(window, document);
