(function(w, doc) {
  'use strict';

  const triggers = doc.querySelectorAll
    (`
      #openBottom,
      #openTop, 
      #openTopStart, 
      #openTopEnd,
      #openBottomStart,
      #openBottomEnd,
      #openLeft,
      #openLeftEnd,
      #openLeftStart,
      #openRight,
      #openRightEnd,
      #openRightStart
      `),
    coachMark = doc.querySelector('.coachmark-container'),
    closeBtn = coachMark.querySelector('.dismiss');

  function createPopper (placement, triggerId = event.target.id) {
    const reference = document.querySelector('#reference'),
      trigger = document.getElementById(triggerId),

      popperInstance = new Popper(reference, coachMark, {
        placement: placement,
        modifiers: {
          arrow: { enabled: true },
        }
      });

    coachMark.classList.remove('hidden');
    closeBtn.focus();

    closeBtn.addEventListener('click', () => {
      coachMark.classList.add('hidden');
      trigger.focus();
    });
    return popperInstance
  }


  Array.prototype.forEach.call(triggers, (trigger) => {
    trigger.addEventListener('click', event => {
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
    })
  })


  closeBtn.addEventListener('click', () => {
    coachMark.classList.add('hidden');
  });

  // Your code ends here!
})(window, document);
