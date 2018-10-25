(function(w, doc) {
  'use strict';

  const coachmarkTemplate = doc.querySelector('#template'),
    svg = doc.querySelector('#remove-sm-18'),
    triggers = doc.querySelectorAll('button[data-type]');

  function renderCoachmark(template, dismissType) {
    const clone = template.content.cloneNode(true),
      wrapper = clone.firstElementChild,
      dismissBtn = clone.querySelector('#dismiss');

      console.log(wrapper)

    wrapper.setAttribute('data-dismiss-type', dismissType);

    if (dismissType === 'link') {
      dismissBtn.classList.add('dismiss-link');
      dismissBtn.textContent = 'Dismiss';
    }

    if (dismissType === 'button') {
      let svgCopy = svg.cloneNode(true);
      svgCopy.removeAttribute('style');

      dismissBtn.classList.add('pe-icon--btn');
      dismissBtn.appendChild(svgCopy);
    }

    doc.body.appendChild(clone);
  }

  function handleTriggerClick(e) {
    const { type } = e.target.dataset;
    renderCoachmark(coachmarkTemplate, type);
  }

  doc.addEventListener('DOMContentLoaded', function() {
    triggers.forEach(function(trigger) {
      trigger.addEventListener('click', handleTriggerClick);
    });
  });
})(window, document);
