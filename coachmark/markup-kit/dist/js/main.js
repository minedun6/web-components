(function (w, doc) {
  'use strict';

  var coachmarkTemplate = doc.querySelector('#template'),
      svg = doc.querySelector('#remove-sm-18'),
      triggers = doc.querySelectorAll('button[data-type]');

  var animated = void 0,
      wrapper = void 0,
      dismissBtn = void 0,
      focusedBeforeCoachmark = void 0;

  // TODO: Handle positioning.

  function animationEnabled() {
    return !(w.matchMedia('(prefers-reduced-motion: reduce)').matches || doc.documentElement.hasAttribute('data-prefers-reduced-motion'));
  }

  function renderCoachmark(template, opts) {
    var clone = template.content.cloneNode(true);
    var type = opts.type;

    wrapper = clone.firstElementChild;
    dismissBtn = clone.querySelector('#dismiss');
    animated = opts.animated && animationEnabled();

    wrapper.setAttribute('data-dismiss-type', type);

    if (type === 'link') {
      dismissBtn.classList.add('dismiss-link');
      dismissBtn.textContent = 'Dismiss';
    }

    if (type === 'button') {
      var svgCopy = svg.cloneNode(true);
      svgCopy.removeAttribute('style');

      dismissBtn.classList.add('pe-icon--btn');
      dismissBtn.appendChild(svgCopy);
    }

    if (animated) {
      wrapper.classList.add('animated');
      wrapper.classList.add('fadeInFast');

      wrapper.addEventListener('animationend', handleAnimationEnd);
    }

    dismissBtn.addEventListener('click', handleDismissClick);

    doc.body.appendChild(clone);

    if (!animated) {
      dismissBtn.focus();
    }
  }

  function destroyCoachmark() {
    wrapper.remove();
    focusedBeforeCoachmark.focus();
  }

  function handleTriggerClick(e) {
    focusedBeforeCoachmark = e.target;

    var _e$target$dataset = e.target.dataset,
        type = _e$target$dataset.type,
        animated = _e$target$dataset.animated;

    var opts = {
      type: type,
      animated: animated !== undefined
    };

    renderCoachmark(coachmarkTemplate, opts);
  }

  function handleDismissClick() {
    wrapper.classList.add('fadeOutFast');

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

  doc.addEventListener('DOMContentLoaded', function () {
    triggers.forEach(function (trigger) {
      trigger.addEventListener('click', handleTriggerClick);
    });
  });
})(window, document);