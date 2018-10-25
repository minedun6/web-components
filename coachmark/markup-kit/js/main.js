(function(w, doc) {
  'use strict';

  const coachmarkTemplate = doc.querySelector('#coachmark'),
    triggers = doc.querySelectorAll('button[data-type]');

  function renderCoachmark(template, type) {
    const clone = template.content.cloneNode(true),
      wrapper = clone.querySelector('#coachmark'),
      dismissBtn = clone.querySelector('#dismiss');
    
    doc.body.appendChild(clone);
  }

  function handleTriggerClick(e) {
    const { type } = e.target.dataset;
    renderCoachmark(coachmarkTemplate, type);
  }

  doc.addEventListener('DOMContentLoaded', function () {
    triggers.forEach(function(trigger) {
      trigger.addEventListener('click', handleTriggerClick);
    });
  });
})(window, document);
