(function (w, doc) {
  'use strict';

  var triggers = doc.querySelectorAll('\n      #openBottom,\n      #openTop, \n      #openTopStart, \n      #openTopEnd,\n      #openBottomStart,\n      #openBottomEnd,\n      #openLeft,\n      #openLeftEnd,\n      #openLeftStart,\n      #openRight,\n      #openRightEnd,\n      #openRightStart\n      '),
      coachMark = doc.querySelector('.coachmark-container'),
      closeBtn = coachMark.querySelector('.dismiss');

  function createPopper(placement) {
    var triggerId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : event.target.id;

    var reference = document.querySelector('#reference'),
        trigger = document.getElementById(triggerId),
        popperInstance = new Popper(reference, coachMark, {
      placement: placement,
      modifiers: {
        arrow: { enabled: true }
      }
    });

    coachMark.classList.remove('hidden');
    closeBtn.focus();

    closeBtn.addEventListener('click', function () {
      coachMark.classList.add('hidden');
      trigger.focus();
    });
    return popperInstance;
  }

  Array.prototype.forEach.call(triggers, function (trigger) {
    trigger.addEventListener('click', function (event) {
      if (event.target.id === 'openBottom') {
        createPopper('bottom');
      } else if (event.target.id === 'openTop') {
        createPopper('top');
      } else if (event.target.id === 'openTopStart') {
        createPopper('top-start');
      } else if (event.target.id === 'openTopEnd') {
        createPopper('top-end');
      } else if (event.target.id === 'openBottomStart') {
        createPopper('bottom-start');
      } else if (event.target.id === 'openBottomEnd') {
        createPopper('bottom-end');
      } else if (event.target.id === 'openLeft') {
        createPopper('left');
      } else if (event.target.id === 'openLeftStart') {
        createPopper('left-start');
      } else if (event.target.id === 'openLeftEnd') {
        createPopper('left-end');
      } else if (event.target.id === 'openRight') {
        createPopper('right');
      } else if (event.target.id === 'openRightStart') {
        createPopper('right-start');
      } else if (event.target.id === 'openRightEnd') {
        createPopper('right-end');
      }
    });
  });

  closeBtn.addEventListener('click', function () {
    coachMark.classList.add('hidden');
  });

  // Your code ends here!
})(window, document);