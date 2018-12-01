(function(w, doc) {
  'use strict';

  function animationEnabled() {
    return !(
      w.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      doc.documentElement.hasAttribute('data-prefers-reduced-motion')
    );
  }

  const coachmarkTemplate = doc.querySelector('#template'),
    svg = doc.querySelector('#remove-sm-18'),
    triggers = doc.querySelectorAll('button[data-type]');

  let animated, coachmarkEl, dismissBtn, focusedBeforeCoachmark;

  // TODO: Handle positioning.

  function setPosition(el, anchor) {
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

    coachmarkEl = clone.firstElementChild;
    dismissBtn = clone.querySelector('#dismiss');
    animated = opts.animated && animationEnabled();

    coachmarkEl.setAttribute('data-dismiss-type', type);

    if (type === 'link') {
      dismissBtn.classList.add('dismiss-link');
      dismissBtn.textContent = 'Dismiss';
    }

    if (type === 'button') {
      let svgCopy = svg.cloneNode(true);
      svgCopy.removeAttribute('style');

      dismissBtn.classList.add('pe-icon--btn');
      dismissBtn.appendChild(svgCopy);
    }

    if (animated) {
      coachmarkEl.classList.add('animated');
      coachmarkEl.classList.add('fadeInFast');

      coachmarkEl.addEventListener('animationend', handleAnimationEnd);
    }

    dismissBtn.addEventListener('click', handleDismissClick);

    doc.body.appendChild(clone);
    setPosition(coachmarkEl, focusedBeforeCoachmark);

    if (!animated) {
      dismissBtn.focus();
    }
  }

  function destroyCoachmark() {
    coachmarkEl.remove();
    focusedBeforeCoachmark.focus();
  }

  function handleTriggerClick(e) {
    focusedBeforeCoachmark = e.target;

    const { type, animated } = e.target.dataset;
    const opts = {
      type,
      animated: animated !== undefined
    };

    renderCoachmark(coachmarkTemplate, opts);
  }

  function handleDismissClick() {
    coachmarkEl.classList.add('fadeOutFast');

    if (!animated) {
      destroyCoachmark();
    }
  }

  function handleAnimationEnd(e) {
    if (e.animationName === 'fadeInFast') {
      dismissBtn.focus();
    }
    if (e.animationName === 'fadeOutFast') {
      destroyCoachmark();
    }
  }

  doc.addEventListener('DOMContentLoaded', function() {
    triggers.forEach(function(trigger) {
      trigger.addEventListener('click', handleTriggerClick);
    });
  });
})(window, document);
