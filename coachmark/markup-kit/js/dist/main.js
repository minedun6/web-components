'use strict';

(function (w, doc) {
  'use strict';

  var coachmarkTemplate = doc.querySelector('#coachmark'),
      triggers = doc.querySelectorAll('button[data-type]');

  function renderCoachmark(template, type) {
    var clone = template.content.cloneNode(true),
        wrapper = clone.querySelector('#coachmark'),
        dismissBtn = clone.querySelector('#dismiss');

    doc.body.appendChild(clone);
  }

  function handleTriggerClick(e) {
    var type = e.target.dataset.type;

    renderCoachmark(coachmarkTemplate, type);
  }

  doc.addEventListener('DOMContentLoaded', function () {
    triggers.forEach(function (trigger) {
      trigger.addEventListener('click', handleTriggerClick);
    });
  });
})(window, document);