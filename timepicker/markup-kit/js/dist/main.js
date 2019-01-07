'use strict';

(function (win, doc) {
  'use strict';
  // helper functions and globals go here

  var timepickers = doc.querySelectorAll('.timepicker-container');

  function closeDropdown(node, input) {
    node.style.display = 'none';
    input.setAttribute('aria-expanded', false);
  }

  function removeIcons(node) {
    var icons = node.querySelectorAll('.pe-icon-wrapper');
    return Array.prototype.forEach.call(icons, function (icon) {
      icon.style.display = 'none';
    });
  }

  function filterSelected(node, value) {
    return node.querySelector('[data-time^=\'' + value + '\']');
  }

  function returnSelected(node) {
    return node.getAttribute('data-selected');
  }

  function returnSelectedNode(node) {
    var time = returnSelected(node);
    return node.querySelector('[data-time=\'' + time + '\']');
  }

  function setSelectedFalse(node) {
    var items = node.querySelectorAll('#itemList li');
    return Array.prototype.forEach.call(items, function (item) {
      item.classList.remove('in-view');
      item.setAttribute('aria-selected', false);
    });
  }

  function getFocusableElements(node) {
    return node.querySelectorAll('[role^="option"]');
  }

  Array.prototype.forEach.call(timepickers, function (timepicker) {
    var input = timepicker.querySelector('input'),
        dropdown = timepicker.querySelector('.pe-dropdown-container'),
        list = timepicker.querySelector('#itemList'),
        focusableElements = getFocusableElements(timepicker),
        firstFocusableElement = focusableElements[0],
        lastFocusableElement = focusableElements[focusableElements.length - 1];
    // sets a data index to all the focusable items
    Array.prototype.forEach.call(focusableElements, function (el, index) {
      el.setAttribute('data-index', index);
    });
    // main function controlling the dropdown menu
    function selectTime(node) {
      var icon = node.querySelector('.pe-icon-wrapper');
      removeIcons(list);
      setSelectedFalse(timepicker);
      closeDropdown(dropdown, input);
      input.setAttribute('aria-expanded', false);
      list.setAttribute('data-selected', node.getAttribute('data-time'));
      input.value = node.getAttribute('data-time');
      icon.style.display = 'block';
      node.setAttribute('aria-selected', true);
      node.classList.add('in-view');
      validateTime();
    }
    // sets the highlight state of autocomplete
    function hoverTime(match) {
      setSelectedFalse(timepicker);
      if (match !== null) {
        match.classList.add('in-view');
        match.scrollIntoView();
      }
    }
    // validates the input form
    function validateTime() {
      function isValids() {
        var type = list.getAttribute('data-time-type');
        var isValid = void 0;
        if (type === '24 hour') {
          isValid = /^([01]\d|2[0-3]):?([0-5]\d)$/.test(input.value);
          return isValid;
        } else {
          isValid = /^([0-1][0-2]|\d):[0-5][0-9]\s(PM|AM|am|pm)$/.test(input.value);
          return isValid;
        }
      }
      var isValid = isValids();
      if (!isValid && input.value !== '') {
        timepicker.classList.add('error');
        removeIcons(list);
        return false;
      } else {
        timepicker.classList.remove('error');
        return true;
      }
    }
    // sets focus based on element previously selected
    function focusListItem() {
      var selected = returnSelectedNode(list);
      if (selected === null) {
        firstFocusableElement.focus();
        timepicker.classList.remove('error');
      } else {
        selected.focus();
      }
    }
    // closes dropdown when click is outside of component
    doc.addEventListener('click', function (event) {
      if (dropdown.style.display === 'block') {
        if (event.target !== input) {
          closeDropdown(dropdown, input);
        }
      }
    });
    // closes dropdown on escape keypress
    doc.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') {
        dropdown.style.display = 'none';
        input.setAttribute('aria-expanded', false);
        input.focus();
      }
    });
    // opens the dropdown menu and sets position of selected element
    input.addEventListener('click', function (event) {
      var readOnly = input.getAttribute('readonly');
      if (!readOnly) {
        var selected = returnSelectedNode(list);
        dropdown.style.display = 'block';
        event.target.setAttribute('aria-expanded', true);
        if (input.value.length > 6 && selected !== null) {
          selected.scrollIntoView();
        }
      } else {
        return true;
      }
    });
    // on blur time is validated and selected in menu
    input.addEventListener('blur', function (event) {
      if (event.relatedTarget === null) {
        if (validateTime() === true) {
          if (filterSelected(list, input.value) !== null) {
            filterSelected(list, input.value).click();
          }
        }
      }
    });
    // on keyup add hover to the menu and if arrow down is pressed set focus to menu item
    input.addEventListener('keyup', function (event) {
      input.value = input.value.toUpperCase();
      hoverTime(filterSelected(list, input.value));
      switch (event.code) {
        case 'Backspace':
          removeIcons(list);
          break;
        case 'Enter':
          if (filterSelected(list, input.value) === null) {
            timepicker.classList.add('error');
            removeIcons(list);
          } else {
            filterSelected(list, input.value).click();
          }
          break;
        case 'ArrowDown':
          if (dropdown.style.display === 'block') {
            focusListItem();
          } else {
            dropdown.style.display = 'block';
            input.setAttribute('aria-expanded', true);
            if (returnSelectedNode(list) !== null) {
              returnSelectedNode(list).scrollIntoView();
            }
          }
          break;
      }
    });
    // keyboard functionality for accessibility
    list.addEventListener('keydown', function (event) {
      console.log(event);
      var nextItem = parseInt(event.target.getAttribute('data-index')) + 1,
          prevItem = parseInt(event.target.getAttribute('data-index')) - 1;
      event.preventDefault();
      switch (event.code) {
        case 'Tab':
          input.focus();
          closeDropdown(dropdown, input);
          break;
        case 'ArrowDown':
          if (document.activeElement === lastFocusableElement) {
            firstFocusableElement.focus();
          } else {
            if (focusableElements[nextItem] !== undefined) {
              focusableElements[nextItem].focus();
            } else {
              return;
            }
          }
          break;
        case 'ArrowUp':
          if (document.activeElement === firstFocusableElement) {
            lastFocusableElement.focus();
          } else {
            if (focusableElements[prevItem] !== undefined) {
              focusableElements[prevItem].focus();
            } else {
              return;
            }
          }
          break;
        case 'Space':
          event.target.click();
          input.focus();
          break;
        case 'Enter':
          event.target.click();
          input.focus();
          break;
        case 'Home':
          firstFocusableElement.focus();
          break;
        case 'End':
          lastFocusableElement.focus();
          break;
      }
    });
    // selects the item on menu click
    dropdown.addEventListener('click', function (event) {
      selectTime(event.target);
      event.stopImmediatePropagation();
    });
  });
})(window, document);