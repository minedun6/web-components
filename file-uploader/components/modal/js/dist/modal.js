'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

(function (w, doc) {
  'use strict';

  var currentDoc = doc.querySelector('link[href$="modal.html"]').import;
  var styles = currentDoc.querySelector('#styles');
  var template = currentDoc.querySelector('#template');
  var minimizedTemplate = currentDoc.querySelector('#minimized');
  var isIE11 = !!window.MSInputMethodContext && !!document.documentMode;

  if (w.ShadyCSS) w.ShadyCSS.prepareTemplate(styles, 'upload-modal');

  var FOCUSABLE_ELEMENTS = '\n    a[href]:not([tabindex^="-"]):not([inert]),\n    area[href]:not([tabindex^="-"]):not([inert]),\n    input:not([disabled]):not([inert]),\n    select:not([disabled]):not([inert]),\n    textarea:not([disabled]):not([inert]),\n    button:not([disabled]):not([inert]),\n    iframe:not([tabindex^="-"]):not([inert]),\n    audio:not([tabindex^="-"]):not([inert]),\n    video:not([tabindex^="-"]):not([inert]),\n    [contenteditable]:not([tabindex^="-"]):not([inert]),\n    [tabindex]:not([tabindex^="-"]):not([inert])',
      TAB_KEY = 9,
      ESCAPE_KEY = 27;

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

  var Modal = function (_HTMLElement) {
    _inherits(Modal, _HTMLElement);

    _createClass(Modal, null, [{
      key: 'observedAttributes',
      get: function get() {
        return ['footer', 'minimized'];
      }
    }]);

    function Modal() {
      _classCallCheck(this, Modal);

      var _this = _possibleConstructorReturn(this, (Modal.__proto__ || Object.getPrototypeOf(Modal)).call(this));

      _this.attachShadow({ mode: 'open' });

      _this.clone = doc.importNode(template.content.cloneNode(true), true);
      _this.styles = doc.importNode(styles.content.cloneNode(true), true);

      _this.openModal = _this.openModal.bind(_this);
      _this.closeModal = _this.closeModal.bind(_this);

      _this.bindKeyPress = _this.bindKeyPress.bind(_this);
      _this.maintainFocus = _this.maintainFocus.bind(_this);
      _this.minimizeDetail = {};
      return _this;
    }

    _createClass(Modal, [{
      key: 'attributeChangedCallback',
      value: function attributeChangedCallback(name, oldValue, newValue) {
        var _this2 = this;

        var minimizedContainer = this.shadowRoot.querySelector('.pe-modal-container__minimized'),
            modalOverlay = this.shadowRoot.querySelector('#modalOverlay');

        this.minimizedClone = doc.importNode(minimizedTemplate.content.cloneNode(true), true);
        // if `this.modal has not been defined yet,
        // bail out.
        if (!this.modal) return;
        if (name === 'footer') {
          if (!this.footer) {
            var actions = this.modal.querySelector('.actions');
            actions.remove();
          } else {
            this.renderfooter(this.modal);
          }
        }

        if (name === 'minimized') {
          if (!this.minimized) {
            if (isIE11) {
              minimizedContainer.remove();
              this.modal.classList.remove('hidden');
              modalOverlay.classList.remove('hidden');
            } else {
              minimizedContainer.remove();
              this.modal.classList.remove('hidden');
              modalOverlay.classList.remove('hidden');
              this.modal.classList.remove('fadeOutFast');
              modalOverlay.classList.remove('fadeOutFast');
              this.modal.classList.add('fadeInFast');
            }
          } else {
            this.addEventListener('xhrLoading', function (event) {
              _this2.minimizeDetail = event.detail;
              _this2.updateProgress(_this2.minimizeDetail);
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
            this.updateProgress(this.minimizeDetail);
          }

          modalOverlay.addEventListener('animationend', function (event) {
            if (event.animationName === 'fadeOutFast') {
              modalOverlay.classList.add('hidden');
              _this2.modal.classList.add('hidden');
            }
          });
        }
      }
    }, {
      key: 'connectedCallback',
      value: function connectedCallback() {
        var _this3 = this;

        var minimizedHeader = this.querySelector('.pe-modal-container__minimized');
        this.shadowRoot.appendChild(this.styles);
        if (this.minimized) {
          this.renderMinimized();
        } else {
          this.renderFull();
        }
        this.addEventListener('xhrLoading', function (event) {
          _this3.minimizeDetail = event.detail;
        });
      }
    }, {
      key: 'disconnectedCallback',
      value: function disconnectedCallback() {
        doc.removeEventListener('keydown', this.bindKeyPress);
        doc.body.removeEventListener('focus', this.maintainFocus);
      }
    }, {
      key: 'updateProgress',
      value: function updateProgress(data) {
        var minimizedContainer = this.shadowRoot.querySelector('.pe-modal-container__minimized');
        if (minimizedContainer !== null) {
          var done = minimizedContainer.querySelector('#done'),
              progress = minimizedContainer.querySelector('#progress');

          done.innerHTML = data.done;
          progress.innerHTML = data.progress;
        }
      }
    }, {
      key: 'renderFull',
      value: function renderFull() {
        var _this4 = this;

        if (isIE11) {
          this.shadowRoot.addEventListener('click', function (event) {
            console.log(event.target.id);
            if (event.target.id === 'minimizeButton') {
              event.stopImmediatePropagation();
              _this4.minimized = true;
            } else if (event.target.id === 'closeButton') {
              var eventType = event.target.dataset.event;
              event.stopImmediatePropagation();
              _this4.closeModal(eventType);
            }
          });
        }

        // Get component attributes
        var titleText = this.getAttribute('titleText'),
            triggerId = this.getAttribute('triggerId'),
            footer = this.hasAttribute('footer');

        // Create elements
        // create the footer
        if (footer) {
          this.renderfooter(this.clone);
        }

        var overlayButtonTemplate = currentDoc.querySelector('#overlayDiv'),
            overlayButtonClone = doc.importNode(overlayButtonTemplate.content, true),
            overlayEntryPoint = this.clone.querySelector('#modalPlaceholder');

        overlayEntryPoint.parentNode.insertBefore(overlayButtonClone, overlayEntryPoint.nextElementSibling);
        overlayEntryPoint.remove();

        var title = this.clone.querySelector('#dialogHeading');
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

        this.eventBtns.forEach(function (btn) {
          btn.addEventListener('click', function (e) {
            var eventType = e.target.dataset.event;
            if (btn.id === 'closeButton') {
              _this4.closeModal(eventType);
            } else if (btn.id === 'minimizeButton') {
              _this4.minimized = true;
            }
          });
        });

        // sets the positioning for modals that are programmatically created and have scrolling content
        this.setPosition();
        this.shadowRoot.appendChild(this.clone);
        doc.addEventListener('keydown', this.bindKeyPress);
        doc.body.addEventListener('focus', this.maintainFocus, true);
      }
    }, {
      key: 'renderMinimized',
      value: function renderMinimized() {
        var _this5 = this;

        this.shadowRoot.appendChild(this.minimizedClone);
        this.shadowRoot.addEventListener('click', function (event) {
          event.stopImmediatePropagation();
          if (event.target.id === 'expandButton') {
            _this5.minimized = false;
          } else {
            return;
          }
        });
      }
    }, {
      key: 'openModal',
      value: function openModal(e) {
        var _this6 = this;

        var thisButton = e.currentTarget,
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

        setTimeout(function () {
          _this6.maintainFocus();
        }, 250);
      }
    }, {
      key: 'closeModal',
      value: function closeModal(eventName) {
        var _this7 = this;

        this.triggerBtn.removeAttribute('disabled');
        this.main.setAttribute('aria-hidden', 'false');
        this.body.classList.remove('hide-overflow');

        this.overlay.classList.remove('fadeIn');
        this.overlay.classList.add('fadeOut');

        this.modal.classList.remove('slideInDown');
        this.modal.classList.add('slideOutDown');

        setTimeout(function () {
          _this7.modal.classList.add('hidden');
          _this7.modal.classList.remove('slideOutDown');
        }, 400);

        setTimeout(function () {
          _this7.dispatchEvent(new Event(eventName, { bubbles: true, composed: true }));
        }, 500);

        setTimeout(function () {
          _this7.overlay.classList.add('hidden');
          _this7.overlay.classList.remove('fadeOut');
        }, 800);

        setTimeout(function () {
          _this7.triggerBtn.focus();
        }, 801);

        this.open = false;
      }
    }, {
      key: 'maintainFocus',
      value: function maintainFocus() {
        // if the modal is not open, stop the function
        if (!this.open) return;

        /**
         * The DOM we want to trap focus in. If the consumer passed in
         * focusable children, it's the Light DOM; else, it's the Shadow DOM.
         */
        var targetDOM = getFocusableChildren(this).length > 0 ? this : this.modal;

        // if neither the Light DOM nor the Shadow DOM within the modal contain
        // the active element, set focus back into the targetDOM.
        if (!this.contains(getDeepActiveElement()) && !this.modal.contains(getDeepActiveElement())) {
          setFocusToFirstChild(targetDOM);
        }
      }
    }, {
      key: 'bindKeyPress',
      value: function bindKeyPress(e) {
        if (this.open && e.which === ESCAPE_KEY) {
          this.closeModal('cancel');
        }
        if (this.open && e.which === TAB_KEY) {
          trapTabKey(e, this, this.modal);
        }
      }
    }, {
      key: 'setPosition',
      value: function setPosition() {
        var _this8 = this;

        setTimeout(function () {
          var modalPosition = _this8.modal.getBoundingClientRect();
          w.scrollTo(0, 0);
          if (modalPosition.top <= 0) {
            _this8.modal.style.top = '50px';
            _this8.modal.style.transform = 'translate(-50%)';
            _this8.modal.style.marginBottom = '50px';
          }
        }, 100);
      }
    }, {
      key: 'renderfooter',
      value: function renderfooter(parentNode) {
        var successBtnText = this.getAttribute('successBtnText'),
            cancelBtnText = this.getAttribute('cancelBtnText');

        var actionsTemplate = currentDoc.querySelector('#actions'),
            actionsClone = doc.importNode(actionsTemplate.content, true),
            cancelButton = actionsClone.querySelector('#cancelButton'),
            saveButton = actionsClone.querySelector('#successButton');

        var modalBody = parentNode.querySelector('#dialogDescription');

        if (cancelBtnText !== null) {
          cancelButton.innerHTML = cancelBtnText;
        }

        if (successBtnText !== null) {
          saveButton.innerHTML = successBtnText;
        }

        modalBody.parentNode.insertBefore(actionsClone, modalBody.nextSibling);
      }
    }, {
      key: 'footer',
      get: function get() {
        return this.hasAttribute('footer');
      },
      set: function set(value) {
        var isfooterShown = Boolean(value);

        if (isfooterShown) {
          this.setAttribute('footer', '');
        } else {
          this.removeAttribute('footer');
        }
      }
    }, {
      key: 'minimized',
      get: function get() {
        return this.hasAttribute('minimized');
      },
      set: function set(value) {
        var isMinimized = Boolean(value);
        if (isMinimized) {
          this.setAttribute('minimized', '');
        } else {
          this.removeAttribute('minimized');
        }
      }
    }]);

    return Modal;
  }(HTMLElement);

  customElements.define('upload-modal', Modal);
})(window, document);