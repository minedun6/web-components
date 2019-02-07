(function () {
  'use strict';

  var calendars = document.querySelectorAll(".pe-calendar");

  function unfocusAll(node) {
    var dates = node.querySelectorAll(".date-selector:not(:disabled)");
    Array.prototype.forEach.call(dates, function (date) {
      date.setAttribute("tabindex", "-1");
    });
  }

  calendars.forEach(function (calendar) {
    var grid = calendar.querySelector(".pe-cal-dates"),
        dates = calendar.querySelectorAll(".date-selector:not(:disabled)"),
        activeDescendant = grid.getAttribute("aria-activedescendant");

    function selectDate(date) {
      var currentLabel = date.getAttribute("aria-label");
      focusDate(date);
      Array.prototype.forEach.call(dates, function (date) {
        var oldLabel = date.getAttribute("aria-label"),
            newLabel = oldLabel.replace(" (Selected)", "");
        date.setAttribute("aria-pressed", "false");
        if (date.classList.contains("pe-cal-selected")) {
          date.classList.remove("pe-cal-selected");
          date.setAttribute("aria-label", newLabel);
        }
      });
      date.classList.add("pe-cal-selected");
      date.setAttribute("aria-pressed", "true");
      date.setAttribute("aria-label", currentLabel + " (Selected)");
    }

    function focusDate(date) {
      unfocusAll(calendar);
      if (date !== undefined) {
        grid.setAttribute("aria-activedescendant", date.id);
        date.setAttribute("tabindex", "0");
        date.focus();
      }
    }

    //onload, make sure all dates are set to tabindex -1
    unfocusAll(calendar);

    //set focus to already selected date (if available)
    if (activeDescendant) {
      document.getElementById(activeDescendant).setAttribute("tabindex", "0");
    }

    grid.addEventListener("keydown", function (event) {
      event.preventDefault();
      var activeDescendant = grid.getAttribute("aria-activedescendant"),
          focusedItem = [].indexOf.call(dates, document.getElementById(activeDescendant));
      switch (event.keyCode) {
        case 39:
          focusDate(dates[focusedItem + 1]);
          break;
        case 37:
          focusDate(dates[focusedItem - 1]);
          break;
        case 40:
          focusDate(dates[focusedItem + 7]);
          break;
        case 38:
          focusDate(dates[focusedItem - 7]);
          break;
        case 36:
          focusDate(dates[0]);
          break;
        case 35:
          focusDate(dates[dates.length - 1]);
          break;
      }
    });

    Array.prototype.forEach.call(dates, function (date) {
      date.addEventListener("click", function (event) {
        selectDate(event.currentTarget);
      });
    });
  });
})();