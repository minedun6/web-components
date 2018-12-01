(function(w, doc) {
  'use strict';

  /**
   * Wraps an element inside another.
   * @param {HTMLElement} el The element to wrap
   * @param {HTMLElement} wrapper The element to be wrapped
   */
  function wrap(el, wrapper) {
    el.parentNode.insertBefore(wrapper, el);
    wrapper.appendChild(el);
  }

  /**
   * Determine if animations should run.
   * Checks for `prefers-reduced-motion media query`,
   * as well as `data-prefers-reduced-motion` attribute on the html element.
   */
  function animationEnabled() {
    return !(
      w.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      doc.documentElement.hasAttribute('data-prefers-reduced-motion')
    );
  }

  const template = doc.querySelector('#template'),
    closeImg = doc.querySelector('#remove-sm-18');


  /**
   * @property {HTMLElement} mainEl The root coachmark element
   * @property {HTMLElement} dismissBtn The button that closes the coachmark 
   * @property {HTMLElement} trigger The element that opened the coachmark
   * @property {Boolean} isAnimated Whether transitions animate
   */
  const coachmark = {
    mainEl: undefined,
    dismissBtn: undefined,
    trigger: undefined,
    isAnimated: undefined
  };

  function setPosition(el, anchor) {

    // TODO: Handle complex position scenarios
    const anchorRect = anchor.getBoundingClientRect();
    const coachPosition = {
      top: anchorRect.top + w.pageYOffset,
      left: anchorRect.left + w.pageXOffset,
      bottom: anchorRect.bottom + w.pageYOffset,
      right: anchorRect.right + w.pageXOffset,
      get computedTop() {
        return this.top - el.scrollHeight;
      }
    };

    el.style.left = coachPosition.left + 'px';
    el.style.top = coachPosition.computedTop + 'px';
  }

  function renderCoachmark(template, opts) {
    const clone = template.content.cloneNode(true);
    const type = opts.type;

    coachmark.mainEl = clone.firstElementChild;
    coachmark.dismissBtn = clone.querySelector('#dismiss');
    coachmark.isAnimated = opts.animated && animationEnabled();

    coachmark.mainEl.setAttribute('data-dismiss-type', type);

    if (type === 'link') {
      const pseudoFloatWrapper = doc.createElement('div');
      pseudoFloatWrapper.style.textAlign = 'right';

      coachmark.dismissBtn.classList.add('dismiss-link');
      coachmark.dismissBtn.textContent = 'Dismiss';

      wrap(coachmark.dismissBtn, pseudoFloatWrapper);
    }
    if (type === 'button') {
      let svgCopy = closeImg.cloneNode(true);
      svgCopy.removeAttribute('style');

      coachmark.dismissBtn.classList.add('pe-icon--btn');
      coachmark.dismissBtn.appendChild(svgCopy);
    }

    if (coachmark.isAnimated) {
      coachmark.mainEl.classList.add('coachmark.isAnimated');
      coachmark.mainEl.classList.add('fadeInFast');

      coachmark.mainEl.addEventListener('animationend', handleAnimationEnd);
    }

    coachmark.dismissBtn.addEventListener('click', handleDismissClick);

    doc.body.appendChild(clone);
    setPosition(coachmark.mainEl, coachmark.trigger);

    if (!coachmark.isAnimated) {
      coachmark.dismissBtn.focus();
    }
  }

  function destroyCoachmark() {
    coachmark.mainEl.remove();
    coachmark.trigger.focus();
  }

  function handleTriggerClick(e) {
    coachmark.trigger = e.target;

    const { type, animated } = e.target.dataset;
    const opts = {
      type,
      animated: animated !== undefined
    };

    renderCoachmark(template, opts);
  }

  function handleDismissClick() {
    coachmark.mainEl.classList.add('fadeOutFast');

    if (!coachmark.isAnimated) {
      destroyCoachmark();
    }
  }

  function handleAnimationEnd(e) {
    if (e.animationName === 'fadeInFast') {
      coachmark.dismissBtn.focus();
    }
    if (e.animationName === 'fadeOutFast') {
      destroyCoachmark();
    }
  }

  doc.addEventListener('DOMContentLoaded', function() {
    const triggers = doc.querySelectorAll('button[data-type]');

    triggers.forEach(function(trigger) {
      trigger.addEventListener('click', handleTriggerClick);
    });
  });
})(window, document);
