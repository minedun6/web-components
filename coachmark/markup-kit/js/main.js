(function(w, doc) {
  'use strict';

  const coachmarkTemplate = doc.querySelector('#template'),
    svg = doc.querySelector('#remove-sm-18'),
    triggers = doc.querySelectorAll('button[data-type]');

  let focusedBeforeCoachmark;

  // TODO: Handle positioning.

  function animationEnabled() {
    return !(
      w.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      doc.documentElement.hasAttribute('data-prefers-reduced-motion')
    );
  }

  function renderCoachmark(template, opts) {
    const clone = template.content.cloneNode(true),
      wrapper = clone.firstElementChild,
      dismissBtn = clone.querySelector('#dismiss');

    const type = opts.type;
    const animated = opts.animated && animationEnabled();

    wrapper.setAttribute('data-dismiss-type', type);

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

    dismissBtn.addEventListener('click', handleDismissClick);

    doc.body.appendChild(clone);
    
    dismissBtn.focus();

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

  function handleDismissClick(e) {
    focusedBeforeCoachmark.focus();
    e.target.parentNode.remove();
  }

  doc.addEventListener('DOMContentLoaded', function() {
    triggers.forEach(function(trigger) {
      trigger.addEventListener('click', handleTriggerClick);
    });
  });
})(window, document);
