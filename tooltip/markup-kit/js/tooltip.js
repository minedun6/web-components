
'use strict';


!function(){
  const buttons = document.querySelectorAll(".tooltip-trigger");

  function showTooltip (tooltip, btn) {     //Paste it outside of the forEach...
    tooltip.style.visibility = 'visible';
    btn.setAttribute('aria-expanded', 'true');
  }

  function hideTooltip (tooltip, btn) {
    tooltip.style.visibility = 'hidden';
    btn.setAttribute('aria-expanded', 'false');
  }

  Array.prototype.forEach.call(buttons, button => {    //buttons is my constant
    const tooltip = button.nextElementSibling;  
    button.addEventListener("click", function(event){
      event.preventDefault(); //Anne added this

      if(button.getAttribute('aria-expanded') === 'true'){
        hideTooltip(tooltip, button);
      } else { 
        showTooltip(tooltip, button);
        };
      })

      button.addEventListener('mouseover', function(event) {
        showTooltip(tooltip, button);
      })
      button.addEventListener('mouseout', function(event) {
        hideTooltip(tooltip, button);
      })
      button.addEventListener("focus", function(event){
        showTooltip(tooltip, button);
      })
      button.addEventListener("blur", function(event){
        hideTooltip(tooltip, button);
      })

    button.addEventListener("keydown", function(event){
      if(event.keyCode === 27) {
        hideTooltip(tooltip, button);
      }
    })

  })
}()

!function(){
  const links = document.querySelectorAll(".tooltip-trigger-url");

  function urlshowTooltip (tooltip, url) {     //Paste it outside of the forEach...
    tooltip.style.visibility = 'visible';
    url.setAttribute('aria-expanded', 'true');
  }

  function urlhideTooltip (tooltip, url) {
    tooltip.style.visibility = 'hidden';
    url.setAttribute('aria-expanded', 'false');
  }

  Array.prototype.forEach.call(links, link => {    //buttons is my constant
    const tooltip = link.nextElementSibling;  
    link.addEventListener("click", function(event){
      event.preventDefault(); //Anne added this

      if(link.getAttribute('aria-expanded') === 'true'){
        urlhideTooltip(tooltip, link);
      } else { 
        urlshowTooltip(tooltip, link);
        };
      })

      link.addEventListener('mouseover', function(event) {
        urlshowTooltip(tooltip, link);
      })
      link.addEventListener('mouseout', function(event) {
        urlhideTooltip(tooltip, link);
      })
      link.addEventListener("focus", function(event){
        urlshowTooltip(tooltip, link);
      })
      link.addEventListener("blur", function(event){
        urlhideTooltip(tooltip, link);
      })

    link.addEventListener("keydown", function(event){
      if(event.keyCode === 27) {
        urlhideTooltip(tooltip, link);
      }
    })

  })
}()