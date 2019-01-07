(function() {
    'use strict';
    const calendars = document.querySelectorAll(".pe-calendar");
    function unfocusAll(calendar) {
        const dates = calendar.querySelectorAll(".date-selector:not(:disabled)");
        Array.prototype.forEach.call(dates, function(date) {
            date.setAttribute("tabindex","-1");
        });
    }
    Array.prototype.forEach.call(calendars, calendar => {
      const grid = calendar.querySelector(".pe-cal-dates"),
        dates = calendar.querySelectorAll(".date-selector:not(:disabled)");

      function selectDate(date) {
        focusDate(date);
        Array.prototype.forEach.call(dates, function(others) {
          others.setAttribute("aria-pressed","false");
          if ( others.classList.contains("pe-cal-selected") ) {
            others.classList.remove("pe-cal-selected");
            const oldLabel = others.getAttribute("aria-label");
            const newLabel = oldLabel.replace(" (Selected)", "");
            others.setAttribute("aria-label", newLabel)
          }
        });
        date.classList.add("pe-cal-selected");
        date.setAttribute("aria-pressed","true");

        const currentLabel = date.getAttribute("aria-label");
        date.setAttribute("aria-label", currentLabel + " (Selected)");

      }

      function focusDate(date) {
        unfocusAll(calendar);
        if (date !== undefined) {
          grid.setAttribute("aria-activedescendant", date.id);
          date.setAttribute("tabindex","0");
          date.focus();
        }
      }


      //onload, make sure all dates are set to tabindex -1
      unfocusAll(calendar);
      //set focus to already selected date (if available)
      var activeDescendant = grid.getAttribute("aria-activedescendant");
      if (activeDescendant) {
        document.getElementById(activeDescendant).setAttribute("tabindex","0");
      }

      grid.addEventListener("keydown", function(event) {
        var activeDescendant = grid.getAttribute("aria-activedescendant");
        //get position of active descendant in array
        var focusedItem = [].indexOf.call(dates,document.getElementById(activeDescendant));

        var which = event.which;

        if (which === 39) {
          //ArrowRight
          event.preventDefault();
          focusDate( dates[focusedItem + 1]);
        }
        else if (which === 37) {
          //ArrowLeft
          event.preventDefault();
          focusDate(dates[focusedItem - 1])
        }
        else if (which === 40) {
          //ArrowDown
          event.preventDefault();
          focusDate(dates[focusedItem + 7]);
        }
        else if (which === 38) {
          //ArrowUp
          event.preventDefault();
          focusDate( dates[focusedItem - 7]);
        }
        else if (which === 36) {
          //Home
          event.preventDefault();
          focusDate( dates[0]);
        }
        else if (which === 35) {
          //End
          event.preventDefault();
          focusDate( dates[dates.length - 1]);
        }

      })

      Array.prototype.forEach.call(dates, date => {
        date.addEventListener("click", event => {
          selectDate(event.currentTarget);
        })
      });
    })
})();
