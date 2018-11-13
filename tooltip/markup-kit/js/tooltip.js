
'use strict';


!function(){
  const buttons = document.querySelectorAll(".tooltip-trigger-01")

  buttons.forEach(function(button){
    // button is the DOM object tooltip trigger
    
    button.addEventListener("click", function(event){
      // do your stuff here
      if(document.getElementById('trigger-btn-01')
      .getAttribute('aria-expanded')=='true'){
        document.getElementById('trigger-tt-01').style.visibility = 'hidden';
        document.getElementById('trigger-btn-01').setAttribute('aria-expanded', 'false');
      } else { 
        document.getElementById('trigger-tt-01').style.visibility = 'visible'; 
        document.getElementById('trigger-btn-01').setAttribute('aria-expanded', 'true');
      };
      
    })
    button.addEventListener("mouseover", function(event){
      // do your stuff here
      document.getElementById('trigger-tt-01').style.visibility = 'visible'; 
      document.getElementById('trigger-btn-01').setAttribute('aria-expanded', 'true');

    })
    button.addEventListener("mouseout", function(event){
      // do your stuff here
      document.getElementById('trigger-tt-01').style.visibility = 'hidden'; 
      document.getElementById('trigger-btn-01').setAttribute('aria-expanded', 'false');
    })
    button.addEventListener("focus", function(event){
      // do your stuff here
      document.getElementById('trigger-tt-01').style.visibility = 'visible'; 
	    document.getElementById('trigger-btn-01').setAttribute('aria-expanded', 'true');
    })
    button.addEventListener("blur", function(event){
      // do your stuff here
      document.getElementById('trigger-tt-01').style.visibility = 'hidden'; 
	    document.getElementById('trigger-btn-01').setAttribute('aria-expanded', 'false');
    })

    button.addEventListener("keydown", function(event){
      if(event.keyCode==27){document.getElementById('trigger-tt-01').style.visibility = 'hidden'; 
	document.getElementById('trigger-btn-01').setAttribute('aria-expanded', 'false');};
    })

  })
}()



!function(){
  const buttons = document.querySelectorAll(".tooltip-trigger-02")

  buttons.forEach(function(button){
    // button is the DOM object tooltip trigger
    
    button.addEventListener("click", function(event){
      // do your stuff here
      if(document.getElementById('trigger-btn-02')
      .getAttribute('aria-expanded')=='true'){
        document.getElementById('trigger-tt-02').style.visibility = 'hidden';
        document.getElementById('trigger-btn-02').setAttribute('aria-expanded', 'false');
      } else { 
        document.getElementById('trigger-tt-02').style.visibility = 'visible'; 
        document.getElementById('trigger-btn-02').setAttribute('aria-expanded', 'true');
      };
      
    })
    button.addEventListener("mouseover", function(event){
      // do your stuff here
      document.getElementById('trigger-tt-02').style.visibility = 'visible'; 
      document.getElementById('trigger-btn-02').setAttribute('aria-expanded', 'true');

    })
    button.addEventListener("mouseout", function(event){
      // do your stuff here
      document.getElementById('trigger-tt-02').style.visibility = 'hidden'; 
      document.getElementById('trigger-btn-02').setAttribute('aria-expanded', 'false');
    })
    button.addEventListener("focus", function(event){
      // do your stuff here
      document.getElementById('trigger-tt-02').style.visibility = 'visible'; 
	    document.getElementById('trigger-btn-02').setAttribute('aria-expanded', 'true');
    })
    button.addEventListener("blur", function(event){
      // do your stuff here
      document.getElementById('trigger-tt-02').style.visibility = 'hidden'; 
	    document.getElementById('trigger-btn-02').setAttribute('aria-expanded', 'false');
    })

    button.addEventListener("keydown", function(event){
      if(event.keyCode==27){document.getElementById('trigger-tt-02').style.visibility = 'hidden'; 
	document.getElementById('trigger-btn-02').setAttribute('aria-expanded', 'false');};
    })

  })
}()



!function(){
  const buttons = document.querySelectorAll(".tooltip-trigger-03")

  buttons.forEach(function(button){
    // button is the DOM object tooltip trigger
    
    button.addEventListener("click", function(event){
      // do your stuff here
      if(document.getElementById('trigger-btn-03')
      .getAttribute('aria-expanded')=='true'){
        document.getElementById('trigger-tt-03').style.visibility = 'hidden';
        document.getElementById('trigger-btn-03').setAttribute('aria-expanded', 'false');
      } else { 
        document.getElementById('trigger-tt-03').style.visibility = 'visible'; 
        document.getElementById('trigger-btn-03').setAttribute('aria-expanded', 'true');
      };
      
    })
    button.addEventListener("mouseover", function(event){
      // do your stuff here
      document.getElementById('trigger-tt-03').style.visibility = 'visible'; 
      document.getElementById('trigger-btn-03').setAttribute('aria-expanded', 'true');

    })
    button.addEventListener("mouseout", function(event){
      // do your stuff here
      document.getElementById('trigger-tt-03').style.visibility = 'hidden'; 
      document.getElementById('trigger-btn-03').setAttribute('aria-expanded', 'false');
    })
    button.addEventListener("focus", function(event){
      // do your stuff here
      document.getElementById('trigger-tt-03').style.visibility = 'visible'; 
	    document.getElementById('trigger-btn-03').setAttribute('aria-expanded', 'true');
    })
    button.addEventListener("blur", function(event){
      // do your stuff here
      document.getElementById('trigger-tt-03').style.visibility = 'hidden'; 
	    document.getElementById('trigger-btn-03').setAttribute('aria-expanded', 'false');
    })

    button.addEventListener("keydown", function(event){
      if(event.keyCode==27){document.getElementById('trigger-tt-03').style.visibility = 'hidden'; 
	document.getElementById('trigger-btn-03').setAttribute('aria-expanded', 'false');};
    })

  })
}()



!function(){
  const buttons = document.querySelectorAll(".tooltip-trigger-04")

  buttons.forEach(function(button){
    // button is the DOM object tooltip trigger
    
    button.addEventListener("click", function(event){
      // do your stuff here
      if(document.getElementById('trigger-btn-04')
      .getAttribute('aria-expanded')=='true'){
        document.getElementById('trigger-tt-04').style.visibility = 'hidden';
        document.getElementById('trigger-btn-04').setAttribute('aria-expanded', 'false');
      } else { 
        document.getElementById('trigger-tt-04').style.visibility = 'visible'; 
        document.getElementById('trigger-btn-04').setAttribute('aria-expanded', 'true');
      };
      
    })
    button.addEventListener("mouseover", function(event){
      // do your stuff here
      document.getElementById('trigger-tt-04').style.visibility = 'visible'; 
      document.getElementById('trigger-btn-04').setAttribute('aria-expanded', 'true');

    })
    button.addEventListener("mouseout", function(event){
      // do your stuff here
      document.getElementById('trigger-tt-04').style.visibility = 'hidden'; 
      document.getElementById('trigger-btn-04').setAttribute('aria-expanded', 'false');
    })
    button.addEventListener("focus", function(event){
      // do your stuff here
      document.getElementById('trigger-tt-04').style.visibility = 'visible'; 
	    document.getElementById('trigger-btn-04').setAttribute('aria-expanded', 'true');
    })
    button.addEventListener("blur", function(event){
      // do your stuff here
      document.getElementById('trigger-tt-04').style.visibility = 'hidden'; 
	    document.getElementById('trigger-btn-04').setAttribute('aria-expanded', 'false');
    })

    button.addEventListener("keydown", function(event){
      if(event.keyCode==27){document.getElementById('trigger-tt-04').style.visibility = 'hidden'; 
	document.getElementById('trigger-btn-04').setAttribute('aria-expanded', 'false');};
    })

  })
}()


!function(){
  const buttons = document.querySelectorAll(".tooltip-trigger-05")

  buttons.forEach(function(button){
    // button is the DOM object tooltip trigger
    
    button.addEventListener("click", function(event){
      // do your stuff here
      if(document.getElementById('trigger-btn-05')
      .getAttribute('aria-expanded')=='true'){
        document.getElementById('trigger-tt-05').style.visibility = 'hidden';
        document.getElementById('trigger-btn-05').setAttribute('aria-expanded', 'false');
      } else { 
        document.getElementById('trigger-tt-05').style.visibility = 'visible'; 
        document.getElementById('trigger-btn-05').setAttribute('aria-expanded', 'true');
      };
      
    })
    button.addEventListener("mouseover", function(event){
      // do your stuff here
      document.getElementById('trigger-tt-05').style.visibility = 'visible'; 
      document.getElementById('trigger-btn-05').setAttribute('aria-expanded', 'true');

    })
    button.addEventListener("mouseout", function(event){
      // do your stuff here
      document.getElementById('trigger-tt-05').style.visibility = 'hidden'; 
      document.getElementById('trigger-btn-05').setAttribute('aria-expanded', 'false');
    })
    button.addEventListener("focus", function(event){
      // do your stuff here
      document.getElementById('trigger-tt-05').style.visibility = 'visible'; 
	    document.getElementById('trigger-btn-05').setAttribute('aria-expanded', 'true');
    })
    button.addEventListener("blur", function(event){
      // do your stuff here
      document.getElementById('trigger-tt-05').style.visibility = 'hidden'; 
	    document.getElementById('trigger-btn-05').setAttribute('aria-expanded', 'false');
    })

    button.addEventListener("keydown", function(event){
      if(event.keyCode==27){document.getElementById('trigger-tt-05').style.visibility = 'hidden'; 
	document.getElementById('trigger-btn-05').setAttribute('aria-expanded', 'false');};
    })

  })
}()



!function(){
  const buttons = document.querySelectorAll(".tooltip-trigger-06")

  buttons.forEach(function(button){
    // button is the DOM object tooltip trigger
    
    button.addEventListener("click", function(event){
      // do your stuff here
      if(document.getElementById('trigger-btn-06')
      .getAttribute('aria-expanded')=='true'){
        document.getElementById('trigger-tt-06').style.visibility = 'hidden';
        document.getElementById('trigger-btn-06').setAttribute('aria-expanded', 'false');
      } else { 
        document.getElementById('trigger-tt-06').style.visibility = 'visible'; 
        document.getElementById('trigger-btn-06').setAttribute('aria-expanded', 'true');
      };
      
    })
    button.addEventListener("mouseover", function(event){
      // do your stuff here
      document.getElementById('trigger-tt-06').style.visibility = 'visible'; 
      document.getElementById('trigger-btn-06').setAttribute('aria-expanded', 'true');

    })
    button.addEventListener("mouseout", function(event){
      // do your stuff here
      document.getElementById('trigger-tt-06').style.visibility = 'hidden'; 
      document.getElementById('trigger-btn-06').setAttribute('aria-expanded', 'false');
    })
    button.addEventListener("focus", function(event){
      // do your stuff here
      document.getElementById('trigger-tt-06').style.visibility = 'visible'; 
	    document.getElementById('trigger-btn-06').setAttribute('aria-expanded', 'true');
    })
    button.addEventListener("blur", function(event){
      // do your stuff here
      document.getElementById('trigger-tt-06').style.visibility = 'hidden'; 
	    document.getElementById('trigger-btn-06').setAttribute('aria-expanded', 'false');
    })

    button.addEventListener("keydown", function(event){
      if(event.keyCode==27){document.getElementById('trigger-tt-06').style.visibility = 'hidden'; 
	document.getElementById('trigger-btn-06').setAttribute('aria-expanded', 'false');};
    })

  })
}()



!function(){
  const buttons = document.querySelectorAll(".tooltip-trigger-07")

  buttons.forEach(function(button){
    // button is the DOM object tooltip trigger
    
    button.addEventListener("click", function(event){
      // do your stuff here
      if(document.getElementById('trigger-btn-07')
      .getAttribute('aria-expanded')=='true'){
        document.getElementById('trigger-tt-07').style.visibility = 'hidden';
        document.getElementById('trigger-btn-07').setAttribute('aria-expanded', 'false');
      } else { 
        document.getElementById('trigger-tt-07').style.visibility = 'visible'; 
        document.getElementById('trigger-btn-07').setAttribute('aria-expanded', 'true');
      };
      
    })
    button.addEventListener("mouseover", function(event){
      // do your stuff here
      document.getElementById('trigger-tt-07').style.visibility = 'visible'; 
      document.getElementById('trigger-btn-07').setAttribute('aria-expanded', 'true');

    })
    button.addEventListener("mouseout", function(event){
      // do your stuff here
      document.getElementById('trigger-tt-07').style.visibility = 'hidden'; 
      document.getElementById('trigger-btn-07').setAttribute('aria-expanded', 'false');
    })
    button.addEventListener("focus", function(event){
      // do your stuff here
      document.getElementById('trigger-tt-07').style.visibility = 'visible'; 
	    document.getElementById('trigger-btn-07').setAttribute('aria-expanded', 'true');
    })
    button.addEventListener("blur", function(event){
      // do your stuff here
      document.getElementById('trigger-tt-07').style.visibility = 'hidden'; 
	    document.getElementById('trigger-btn-07').setAttribute('aria-expanded', 'false');
    })

    button.addEventListener("keydown", function(event){
      if(event.keyCode==27){document.getElementById('trigger-tt-07').style.visibility = 'hidden'; 
	document.getElementById('trigger-btn-07').setAttribute('aria-expanded', 'false');};
    })

  })
}()




!function(){
  const buttons = document.querySelectorAll(".tooltip-trigger-08")

  buttons.forEach(function(button){
    // button is the DOM object tooltip trigger
    
    button.addEventListener("click", function(event){
      // do your stuff here
      if(document.getElementById('trigger-btn-08')
      .getAttribute('aria-expanded')=='true'){
        document.getElementById('trigger-tt-08').style.visibility = 'hidden';
        document.getElementById('trigger-btn-08').setAttribute('aria-expanded', 'false');
      } else { 
        document.getElementById('trigger-tt-08').style.visibility = 'visible'; 
        document.getElementById('trigger-btn-08').setAttribute('aria-expanded', 'true');
      };
      
    })
    button.addEventListener("mouseover", function(event){
      // do your stuff here
      document.getElementById('trigger-tt-08').style.visibility = 'visible'; 
      document.getElementById('trigger-btn-08').setAttribute('aria-expanded', 'true');

    })
    button.addEventListener("mouseout", function(event){
      // do your stuff here
      document.getElementById('trigger-tt-08').style.visibility = 'hidden'; 
      document.getElementById('trigger-btn-08').setAttribute('aria-expanded', 'false');
    })
    button.addEventListener("focus", function(event){
      // do your stuff here
      document.getElementById('trigger-tt-08').style.visibility = 'visible'; 
	    document.getElementById('trigger-btn-08').setAttribute('aria-expanded', 'true');
    })
    button.addEventListener("blur", function(event){
      // do your stuff here
      document.getElementById('trigger-tt-08').style.visibility = 'hidden'; 
	    document.getElementById('trigger-btn-08').setAttribute('aria-expanded', 'false');
    })

    button.addEventListener("keydown", function(event){
      if(event.keyCode==27){document.getElementById('trigger-tt-08').style.visibility = 'hidden'; 
	document.getElementById('trigger-btn-08').setAttribute('aria-expanded', 'false');};
    })

  })
}()