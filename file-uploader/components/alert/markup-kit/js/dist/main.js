'use strict';

(function (w, doc) {
  'use strict';

  var alertTrigger = doc.querySelector('[data-action="trigger-alert"]'),
      alert = doc.querySelector('[data-alert]'),
      alertClose = alert.querySelector('[data-action="close-alert"]');

  var alertType = alert.dataset.alertType;

  var focusBeforeOpen = void 0;

  if (alertType === 'inline') {
    var wrapper = doc.createElement('div');
    wrapper.style.position = 'relative';

    // Move the alert into an absolutely positioned wrapper
    alert.parentNode.insertBefore(wrapper, alert);
    wrapper.appendChild(alert);

    // Place the wrapper in the dom rightg after the trigger
    alertTrigger.parentNode.insertBefore(wrapper, alertTrigger.nextElementSibling);
  }

  function triggerAlert() {
    focusBeforeOpen = doc.activeElement;

    if (alertType === 'inline') {
      alert.classList.add('fadeIn');
      alert.classList.remove('fadeOut');
    }

    if (alertType === 'global') {
      alert.classList.add('slideInDown');
      alert.classList.remove('slideOutDown');
    }

    if (alert.hasAttribute('data-important')) {
      setTimeout(function () {
        alertClose.focus();
      }, 250);
    }
  }

  function closeAlert() {
    if (alertType === 'inline') {
      alert.classList.add('fadeOut');
      alert.classList.remove('fadeIn');
    }
    if (alertType === 'global') {
      alert.classList.remove('slideInDown');
      alert.classList.add('slideOutDown');
    }
    focusBeforeOpen.focus();
  }

  alertTrigger.addEventListener('click', triggerAlert);
  alertClose.addEventListener('click', closeAlert);
})(window, document);