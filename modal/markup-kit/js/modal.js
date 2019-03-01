'use strict';
(function() {
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

  const body = document.body,
    container = body.querySelector('#modalContainer');

  const main = body.querySelector('#main'),
    modalButton = main.querySelector('#trigger-modal');

  const overlay = container.querySelector('#modalOverlay'),
    modal = container.querySelector('#modal'),
    modalBody = modal.querySelector('.modal-body'),
    title = modal.querySelector('#dialog-heading'),
    lastButton = modal.querySelector('#lastButton'),
    isScroll = modal.getAttribute('data-scroll'),
    isSticky = modal.getAttribute('data-sticky');

  const viewPortHeight = window.innerHeight;

  function bindKeyPress(e) {
    if (main.getAttribute('aria-hidden') === 'true') {
      if (e.which === ESCAPE_KEY) {
        closeModal();
      }
      if (e.which === TAB_KEY) {
        trapTabKey(modal, e);
      }
    }
  }

  function trapTabKey(node, e) {
    const focusableChildren = getFocusableChildren(node),
      focusedItemIdx = focusableChildren.indexOf(document.activeElement),
      lastFocusableIdx = focusableChildren.length - 1;

    if (e.target.getAttribute('tabindex') === '-1') {
      e.preventDefault();
      return false;
    }

    if (e.shiftKey && focusedItemIdx === 0) {
      focusableChildren[lastFocusableIdx].focus();
      e.preventDefault();
    }

    if (!e.shiftKey && focusedItemIdx === lastFocusableIdx) {
      focusableChildren[0].focus();
      e.preventDefault();
    }
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

  function maintainFocus(e) {
    if (
      main.getAttribute('aria-hidden') === 'true' &&
      !modal.contains(e.target)
    ) {
      setFocusToFirstChild(modal);
    }
  }

  function setFocusToFirstChild(node) {
    const focusableChildren = getFocusableChildren(node),
      focusableChild =
        node.querySelector('[autofocus]') || focusableChildren[0];

    if (focusableChild) {
      focusableChild.focus();
    }
  }

  function closeModal() {
    modalButton.removeAttribute('disabled');
    main.setAttribute('aria-hidden', 'false');
    overlay.classList.add('hidden');
    modal.classList.add('hidden');
    modal.classList.remove('sticky');
    modal.classList.remove('modal-scroll');
    body.classList.remove('hide-overflow');
    modalButton.focus();

    if (overlay.tagName === 'BUTTON') {
      overlay.setAttribute('disabled', 'true');
    } else if (isScroll === 'true') {
      container.classList.add('hidden');
    }
  }

  modalButton.addEventListener('click', event => {
    let modal = document.getElementById('modal');
    const thisButton = event.currentTarget,
      buttonDisabled = thisButton.getAttribute('disabled');

    if (buttonDisabled === null) {
      thisButton.setAttribute('disabled', true);
      main.setAttribute('aria-hidden', 'true');
      overlay.removeAttribute('disabled');
    }

    overlay.classList.remove('hidden');
    modal.classList.remove('hidden');
    modalBody.scrollIntoView(true);

    if (isScroll === 'true') {
      modal = document.querySelector('.modal-container');
      modal.classList.remove('hidden');
      setTimeout(() => {
        modal.scrollIntoView();
      }, 1);
    } else if (isSticky === 'true') {
      modal.style.height = viewPortHeight - 100 + 'px';
      body.classList.add('hide-overflow');
      modalBody.classList.add('modal-scroll');
      modal.classList.add('sticky');
      setTimeout(event => {
        modal.style.transform = 'translate(-50%, -50%)';
        modalBody.scrollTop = 0;
      }, 100);
    }

    if (overlay.tagName === 'BUTTON') {
      title.focus();
    } else {
      setFocusToFirstChild(container);
    }
  });

  if (lastButton) {
    lastButton.addEventListener('click', () => {
      closeModal();
    });
  }

  overlay.addEventListener('click', () => {
    closeModal();
  });

  document.addEventListener('keydown', bindKeyPress);
  document.body.addEventListener('focus', maintainFocus, true);
})();
