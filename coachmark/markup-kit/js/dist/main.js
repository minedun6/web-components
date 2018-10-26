'use strict';

(function (w, doc) {
  'use strict';

  var coachmarkTemplate = doc.querySelector('#template'),
      svg = doc.querySelector('#remove-sm-18'),
      triggers = doc.querySelectorAll('button[data-type]');

  var focusedBeforeCoachmark = void 0;

  // TODO: Handle positioning.

  function renderCoachmark(template, opts) {
    var clone = template.content.cloneNode(true),
        wrapper = clone.firstElementChild,
        dismissBtn = clone.querySelector('#dismiss');

    var animated = opts.animated,
        type = opts.type;


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

    doc.body.appendChild(clone);

    dismissBtn.addEventListener('click', handleDismissClick);
    dismissBtn.focus();
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

  function handleDismissClick(e) {
    focusedBeforeCoachmark.focus();
    e.target.parentNode.remove();
  }

  doc.addEventListener('DOMContentLoaded', function () {
    triggers.forEach(function (trigger) {
      trigger.addEventListener('click', handleTriggerClick);
    });
  });
})(window, document);