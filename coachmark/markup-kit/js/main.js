(function(w, doc) {
  'use strict';

  const coachmarkTemplate = doc.querySelector('#template'),
    svg = doc.querySelector('#remove-sm-18'),
    triggers = doc.querySelectorAll('button[data-type]');

  let animated, wrapper, dismissBtn, focusedBeforeCoachmark;

  // TODO: Handle positioning.

  function animationEnabled() {
    return !(
      w.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      doc.documentElement.hasAttribute('data-prefers-reduced-motion')
    );
  }

  function renderCoachmark(template, opts) {
    const clone = template.content.cloneNode(true);
    const type = opts.type;
    
    wrapper = clone.firstElementChild;
    dismissBtn = clone.querySelector('#dismiss');
    animated = opts.animated && animationEnabled();

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

    if (animated) {
      wrapper.classList.add('animated');
      wrapper.classList.add('fadeInFast');

      wrapper.addEventListener('animationend', function(e) {
        if (e.animationName === 'fadeInFast') {
          dismissBtn.focus();
        }
        if (e.animationName === 'fadeOutFast') {
          focusedBeforeCoachmark.focus();
          wrapper.remove();
        }
      });
    }

    dismissBtn.addEventListener('click', handleDismissClick);

    doc.body.appendChild(clone);

    if (!animated) {
      dismissBtn.focus();
    }
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
    wrapper.classList.add('fadeOutFast');

    if (!animated) {
      focusedBeforeCoachmark.focus();
      wrapper.remove();
    }
  }

  doc.addEventListener('DOMContentLoaded', function() {
    triggers.forEach(function(trigger) {
      trigger.addEventListener('click', handleTriggerClick);
    });
  });
})(window, document);
