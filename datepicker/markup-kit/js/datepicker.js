(function(win, doc) {
  'use strict';

  const datepickers = document.querySelectorAll('.datepicker-container');

  function closeCalendar (node, input, btn) {
    node.style.display = 'none' ;
    input.setAttribute('aria-expanded', false)
    btn.focus();
    node.removeEventListener('animationend', focusOnOpen)
  }

  function openCalendar (node, input) {
    node.style.display = 'inline-flex';
    input.setAttribute('aria-expanded', true);
    node.addEventListener('animationend', focusOnOpen(node,input))
  }

  function focusOnOpen (node, input) {
    const selectedDate = input.getAttribute('data-selected');
    if (selectedDate !== null) {
      const selectedNode = node.querySelector(`[data-date="${selectedDate}"]`);
      selectedNode.focus();
    } else {
      const currentNode = node.querySelector('.currentDate-box button');
      currentNode.focus();
    }
  }

  function selectDate(node, input, dates) {
    const value = node.getAttribute('data-date');

    Array.prototype.forEach.call(dates, date => {
      date.classList.remove('selected');
      date.setAttribute('aria-pressed', false)
    });
    input.setAttribute('data-selected', value);
    input.value = value;
    node.classList.add('selected');
    node.setAttribute('aria-pressed', true);
  }

  Array.prototype.forEach.call(datepickers, datepicker => {
      const input = datepicker.querySelector('input'),
        openCalendarBtn = datepicker.querySelector('.open-calendar'),
        calendar = datepicker.querySelector('.calendar-container'),
        dates = calendar.querySelectorAll(".pe-cal-dates button:not(:disabled)"),
        focusableElements = dates;

    Array.prototype.forEach.call(focusableElements, (el,index) => {
      el.setAttribute('data-index', index);
    });

    openCalendarBtn.addEventListener('click', event => {
      if (calendar.style.display === 'inline-flex') {
        return false
      } else {
        openCalendar(calendar, input)
      }
    });

    input.addEventListener('keydown', event => {
      switch (event.keyCode) {
        case 40:
          if (calendar.style.display === 'none') {
            openCalendar(calendar, input)
          }
          break
      }
    });

    calendar.addEventListener('animationend', event => {
      const calendar = datepicker.querySelector('.calendar-container'),
        dates = calendar.querySelectorAll(".pe-cal-dates button:not(:disabled)"),
        focusableElements = dates,
        firstFocusableElement = focusableElements[0],
        lastFocusableElement = focusableElements[focusableElements.length - 1];

      // sets the date when number is clicked
      calendar.addEventListener('click', event => {
        event.stopImmediatePropagation();
        if (event.target.classList.contains('date-selector')) {
          selectDate(event.target, input, dates)
          closeCalendar(calendar, input, openCalendarBtn)
        } else {
          return;
        }
      });

      // calendar keyboard navigation
      calendar.addEventListener("keydown", function(event) {
        const nextItem = parseInt(event.target.getAttribute('data-index')) + 1,
          prevItem = parseInt(event.target.getAttribute('data-index')) - 1,
          nextWeek = parseInt(event.target.getAttribute('data-index')) + 7,
          prevWeek = parseInt(event.target.getAttribute('data-index')) - 7,
          currentlySelected = input.getAttribute('data-selected'),
          nodeCurrentlySelected = datepicker.querySelector(`[data-date="${currentlySelected}"]`),
          previousMonth = datepicker.querySelector('.previous'),
          nextMonth = datepicker.querySelector('.next');

        event.preventDefault();
        event.stopImmediatePropagation();
        switch (event.keyCode) {

          case 39:
            if (document.activeElement === lastFocusableElement) {
              console.log('fire off next month')
            } else {
              if (focusableElements[nextItem] !== undefined) {
                focusableElements[nextItem].focus();
              } else {
                return
              }
            }
            break;
          case 37:
            if (document.activeElement === firstFocusableElement) {
              console.log('fire off previous month')
            } else {
              if (focusableElements[prevItem] !== undefined) {
                focusableElements[prevItem].focus();
              } else {
                return
              }
            }
            break;
          case 40:
            if (focusableElements[nextWeek] !== undefined) {
              focusableElements[nextWeek].focus();
            } else {
              // target next month
              console.log('fire off next month')
            }
            break;
          case 38:
            if (focusableElements[prevWeek] !== undefined) {
              focusableElements[prevWeek].focus();
            } else {
              console.log('fire off previous month')
            }
            break;
          case 13:
            if (document.activeElement !== previousMonth && document.activeElement !== nextMonth ) {
              selectDate(event.target, input, dates);
              closeCalendar(calendar, input,openCalendarBtn)
            } else if (document.activeElement === previousMonth){
              console.log('fire off previous Month')
            } else if (document.activeElement === nextMonth) {
              console.log('fire off next Month')
            } else {
              return
            }
            break;
          case 32:
            if (document.activeElement !== previousMonth && document.activeElement !== nextMonth ) {
              selectDate(event.target, input, dates);
              closeCalendar(calendar, input,openCalendarBtn)
            } else if (document.activeElement === previousMonth){
              console.log('fire off previous Month')
            } else if (document.activeElement === nextMonth) {
              console.log('fire off next Month')
            } else {
              return
            }
            break;
          case 33:
            console.log('fire off prev month')
            break;
          case 34:
            console.log('fire off next month')
            break;
          case 35:
            const endOfMonth = datepicker.querySelector('.end');
            endOfMonth.focus();
            break;
          case 36:
            const firstOfMonth = datepicker.querySelector('.start');
            firstOfMonth.focus();
            break;
          case 9:
            if (document.activeElement === previousMonth) {
              nextMonth.focus();
            } else if (document.activeElement === nextMonth){
              nodeCurrentlySelected.focus();
            } else {
              previousMonth.focus();
            }
            break;
          case 27:
            closeCalendar(calendar, input,openCalendarBtn)
            break;
        }
      });

    });

    // closes calendar on escape keypress
    doc.addEventListener('keydown', event => {
      if (event.keyCode === 27) {
        closeCalendar(calendar, input, openCalendarBtn);
      }
    });

    // closes dropdown when click is outside of component
    doc.addEventListener('click', event => {
      if (calendar.style.display === 'inline-flex') {
        let target = event.target;
        do {
          if (target === calendar || target === openCalendarBtn)  {
            return;
          }
          target = target.parentNode;
        } while (target);
        closeCalendar(calendar, input,openCalendarBtn);
      }
    }, true);
  })

})(window, document);
