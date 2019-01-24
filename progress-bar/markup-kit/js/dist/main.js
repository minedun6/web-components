(function () {
    'use strict';

    Array.prototype.forEach.call(document.querySelectorAll(".pe-progress-bar.standard"), function(bar) {
        var loadingBar = bar.querySelector("[role=progressbar]"),
            endPercent = loadingBar.getAttribute("aria-valuenow");

        setTimeout(function () {
            loadingBar.setAttribute("style", "width: " + endPercent + "%;");
        });
    });
})();
