(function(win, doc) {
  'use strict';
  // helper functions and globals go here
  const timepickers = doc.querySelectorAll('.timepicker-container');

  function closeDropdown (node, input) {
    node.style.display = 'none' ;
    input.setAttribute('aria-expanded', false)
  }

  function removeIcons (node) {
    const icons = node.querySelectorAll('.pe-icon-wrapper');
    return Array.prototype.forEach.call(icons, icon => {
      icon.style.display = 'none';
    })
  }

  function filterSelected (node, value) {
    return node.querySelector(`[data-time^='${value}']`)
  }

  function returnSelected (node) {
    return node.getAttribute('data-selected');
  }

  function returnSelectedNode (node) {
    const time = returnSelected(node)
    return node.querySelector(`[data-time='${time}']`)
  }

  function setSelectedFalse (node) {
    const list = node.querySelectorAll('#itemList li');
    return Array.prototype.forEach.call(list, item => {
      item.classList.remove('in-view');
      item.setAttribute('aria-selected', false);
    })
  }

  function getFocusableElements(node) {
    return  node.querySelectorAll('[role^="option"]');
  }

  Array.prototype.forEach.call(timepickers, timepicker => {
    const input = timepicker.querySelector('input'),
      dropdown = timepicker.querySelector('.pe-dropdown-container'),
      list = timepicker.querySelector('#itemList'),
      focusableElements = getFocusableElements(timepicker),
      firstFocusableElement = focusableElements[0],
      lastFocusableElement = focusableElements[focusableElements.length - 1];
    // sets a data index to all the focusable items
    Array.prototype.forEach.call(focusableElements, (el, index) => {
      el.setAttribute('data-index', index);
    });
    // main function controlling the dropdown mneu
    function selectTime (node) {
      const icon = node.querySelector('.pe-icon-wrapper');
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
      const isValid = /^([0-1][0-2]|\d):[0-5][0-9]\s(PM|AM|am|pm)$/.test(input.value);
      if (!isValid) {
        timepicker.classList.add('error');
        return false
      } else {
        timepicker.classList.remove('error');
        return true
      }
    }
    // sets focus based on element previously selected
    function focusListItem () {
      const selected = returnSelectedNode(list);
      if (selected === null) {
        firstFocusableElement.focus();
        timepicker.classList.remove('error');
      } else {
        selected.focus();
      }
    }
    // closes dropdown when click is outside of component
    doc.addEventListener('click', event => {
      if (dropdown.style.display === 'block') {
        if (event.target !== input) {
          closeDropdown(dropdown, input);
        }
      }
    });
    // closes dropdown on escape keypress
    doc.addEventListener('keydown', event => {
      if (event.key === 'Escape') {
        dropdown.style.display = 'none';
      }
    });
    // opens the dropdown menu and sets position of selected element
    input.addEventListener('click', event => {
      const selected = returnSelectedNode(list);
      dropdown.style.display = 'block';
      event.target.setAttribute('aria-expanded', true);
      if ((input.value.length > 6) && (selected !== null)) {
        selected.scrollIntoView();
      }
    });
    // on blur time is validated and selected in menu
    input.addEventListener('blur', event => {
      if (event.relatedTarget === null) {
        if (validateTime() === true) {
          filterSelected(list, input.value).click();
        }
      }
    });
    // on keyup add hover to the menu and if arrow down is pressed set focus to menu item
    input.addEventListener('keyup', event => {
      input.value = input.value.toUpperCase();
      hoverTime(filterSelected(list, input.value));
        switch (event.code) {
          case 'Enter':
            if (filterSelected(list, input.value) === null) {
              throwError(timepicker)
            } else {
              filterSelected(list, input.value).click();
            }
            break;
          case 'ArrowDown':
            if (dropdown.style.display === 'block') {
              focusListItem();
            } else {
              dropdown.style.display = 'block';
              input.setAttribute('aria-expanded', false);
              returnSelectedNode(list).scrollIntoView();
            }

            break;
        }
    });
    // keyboard functionality for accessibility
    list.addEventListener('keydown', event => {
      const nextItem = parseInt(event.target.getAttribute('data-index')) + 1,
        prevItem = parseInt(event.target.getAttribute('data-index')) - 1;
      event.preventDefault();
      switch(event.code) {
        case 'ArrowDown':
          if (document.activeElement === lastFocusableElement) {
            firstFocusableElement.focus();
          } else {
            focusableElements[nextItem].focus();
          }
          break;
        case 'ArrowUp':
          if (document.activeElement === firstFocusableElement) {
            lastFocusableElement.focus();
          } else {
            focusableElements[prevItem].focus();
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
    dropdown.addEventListener('click', event => {
      selectTime(event.target);
      event.stopImmediatePropagation();
    })
  });

})(window, document);
