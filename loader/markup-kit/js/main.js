'use strict';
(function() {

  function showSpinner (event) {
    const liveregion = document.querySelector('#liveregion'),
      template = document.querySelector('#loading-template').innerHTML;

    document.querySelector('#loaded-content').innerHTML = "";
    liveregion.innerHTML = template;

    setTimeout(() => {
      document.querySelector('#spinner-icon').setAttribute('aria-label', 'Loaded!')
      document.querySelector('#loading-text').innerHTML = "Loaded!";
    }, 2000);

    setTimeout(() => {
      const request = new XMLHttpRequest();
      request.open('GET', 'loaded-content.html', true);
      request.onload = event => {
        if (request.status >= 200 && request.status < 400) {
          const resp = request.responseText;
          document.querySelector('#loaded-content').innerHTML = resp;
          document.querySelector('#loaded-content title').remove();
        }
      };
      request.send();
      liveregion.innerHTML = "";
    }, 2500);
  }

  window.addEventListener('load',  event => {
    const button = document.querySelector('#load-page');
    button.addEventListener('click', showSpinner);
  });

})();
