(function(w, doc) {
  'use strict';

  const coachmarkTemplate = doc.querySelector('#template'),
    svg = doc.querySelector('#remove-sm-18'),
    triggers = doc.querySelectorAll('button[data-type]');

  let focusedBeforeCoachmark;

  // TODO: Handle positioning.

  function renderCoachmark(template, opts) {
    const clone = template.content.cloneNode(true),
      wrapper = clone.firstElementChild,
      dismissBtn = clone.querySelector('#dismiss');

    let { animated, type } = opts;



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

    doc.body.appendChild(clone);
    
    dismissBtn.addEventListener('click', handleDismissClick);
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
