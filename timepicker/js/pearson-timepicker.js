(function(w, doc) {
  'use strict';
  // Create a template element
  const template = doc.createElement('template'),
    timeItem = doc.createElement('template'),
    dropdown = doc.createElement('template'),
    isIE11 = !!window.MSInputMethodContext && !!document.documentMode,
    checkIcon = `
      <svg
        aria-hidden="true"
        focusable="false"
        style="width:18px;height:18px;fill:currentColor"
      >
        <path d="M7.35823097,13.99969 C7.08123097,13.99969 6.81423097,13.88469 6.62523097,13.67969 L4.26623097,11.13469 C3.89123097,10.72869 3.91523097,10.09669 4.32023097,9.72169 C4.72423097,9.34469 5.35623097,9.36869 5.73323097,9.77469 L7.25323097,11.41469 L12.182231,4.42369 C12.501231,3.97269 13.125231,3.86469 13.576231,4.18269 C14.027231,4.50069 14.135231,5.12469 13.817231,5.57569 L8.17523097,13.57569 C8.00223097,13.82269 7.72523097,13.97769 7.42423097,13.99769 C7.40223097,13.99869 7.38023097,13.99969 7.35823097,13.99969"/>
      </svg>
    `,
    clockIcon = `
      <svg
        aria-hidden="true"
        focusable="false"
        style="width:18px;height:18px;fill:currentColor" 
      >
        <path d="M13.1035,14.1035 C13.0055,14.2015 12.8775,14.2495 12.7495,14.2495 C12.6225,14.2495 12.4945,14.2015 12.3965,14.1035 L8.1475,9.8545 C8.1005,9.8075 8.0635,9.7525 8.0385,9.6905 C8.0135,9.6295 7.9995,9.5655 7.9995,9.4995 L7.9995,5.4995 C7.9995,5.2235 8.2235,4.9995 8.4995,4.9995 C8.7765,4.9995 8.9995,5.2235 8.9995,5.4995 L8.9995,9.2925 L13.1035,13.3965 C13.2985,13.5915 13.2985,13.9085 13.1035,14.1035 M8.9995,-0.0005 C4.0375,-0.0005 -0.0005,4.0375 -0.0005,8.9995 C-0.0005,13.9625 4.0375,17.9995 8.9995,17.9995 C13.9625,17.9995 17.9995,13.9625 17.9995,8.9995 C17.9995,4.0375 13.9625,-0.0005 8.9995,-0.0005"/>
      </svg>
    `,
    warningIcon = `
      <svg
        aria-hidden="true"
        focusable="false"
        style="width:18px;height:18px;fill:currentColor" 
      >
        <path d="M9.99994044,10.5 C9.99994044,10.776 9.77594044,11 9.49994044,11 L8.49994044,11 C8.22394044,11 7.99994044,10.776 7.99994044,10.5 L7.99994044,7.5 C7.99994044,7.224 8.22394044,7 8.49994044,7 L9.49994044,7 C9.77594044,7 9.99994044,7.224 9.99994044,7.5 L9.99994044,10.5 Z M9.99994044,13.5 C9.99994044,13.776 9.77594044,14 9.49994044,14 L8.49994044,14 C8.22394044,14 7.99994044,13.776 7.99994044,13.5 L7.99994044,12.5 C7.99994044,12.224 8.22394044,12 8.49994044,12 L9.49994044,12 C9.77594044,12 9.99994044,12.224 9.99994044,12.5 L9.99994044,13.5 Z M15.9460591,15.275 L9.44500379,2.276 C9.26100222,1.908 8.73899778,1.908 8.55499621,2.276 L2.05394089,15.275 C1.88693947,15.607 2.12794152,16 2.49894468,16 L15.5010553,16 C15.8720585,16 16.1130605,15.607 15.9460591,15.275 Z"/>
    </svg>`;

  //Styles must be copied from the css file
  // and pasted between the style tags below

  dropdown.innerHTML = `
    <div id="dropDown" class="pe-dropdown-container animated animateIn">
      <ul id="itemList" class="itemList" role="listbox" tabindex="0" data-selected data-time-type="12 hour">
      </ul>
    </div>
  `;

  timeItem.innerHTML = `
    <li class="item" role="option" tabindex="-1" aria-selected="false" data-time="6:00 AM">
      <span class="pe-icon-wrapper">
				${checkIcon}
      </span>
      <span class="time"></span>
    </li>
  `;

  // Other markup should be written after the closing tag.
  template.innerHTML = ` 
   <style>
/*! normalize.css v5.0.0 | MIT License | github.com/necolas/normalize.css */*,:after,:before{-webkit-box-sizing:inherit;box-sizing:inherit}html{font-family:sans-serif;line-height:1.15;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%}body{margin:0}article,aside,footer,header,nav,section{display:block}h1{font-size:2em;margin:.67em 0}figcaption,figure,main{display:block}figure{margin:1em 40px}hr{-webkit-box-sizing:content-box;box-sizing:content-box;height:0;overflow:visible}pre{font-family:monospace,monospace;font-size:1em}a{background-color:transparent;-webkit-text-decoration-skip:objects}a:active,a:hover{outline-width:0}abbr[title]{border-bottom:none;text-decoration:underline;-webkit-text-decoration:underline dotted;text-decoration:underline dotted}b,strong{font-weight:inherit;font-weight:bolder}code,kbd,samp{font-family:monospace,monospace;font-size:1em}dfn{font-style:italic}mark{background-color:#ff0;color:#000}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-.25em}sup{top:-.5em}audio,video{display:inline-block}audio:not([controls]){display:none;height:0}img{border-style:none}svg:not(:root){overflow:hidden}button,input,optgroup,select,textarea{font-family:Open Sans,Calibri,Tahoma,sans-serif;font-size:100%;line-height:1.15;margin:0}button,input{overflow:visible}button,select{text-transform:none}[type=reset],[type=submit],button,html [type=button]{-webkit-appearance:button}[type=button]::-moz-focus-inner,[type=reset]::-moz-focus-inner,[type=submit]::-moz-focus-inner,button::-moz-focus-inner{border-style:none;padding:0}[type=button]:-moz-focusring,[type=reset]:-moz-focusring,[type=submit]:-moz-focusring,button:-moz-focusring{outline:1px dotted ButtonText}fieldset{border:1px solid silver;margin:0 2px;padding:.35em .625em .75em}legend{-webkit-box-sizing:border-box;box-sizing:border-box;color:inherit;display:table;max-width:100%;padding:0;white-space:normal}progress{display:inline-block;vertical-align:baseline}textarea{overflow:auto}[type=checkbox],[type=radio]{-webkit-box-sizing:border-box;box-sizing:border-box;padding:0}[type=number]::-webkit-inner-spin-button,[type=number]::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}[type=search]::-webkit-search-cancel-button,[type=search]::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}details,menu{display:block}summary{display:list-item}canvas{display:inline-block}template{display:none}[hidden]{display:none}.pe-base-fontsize{font-size:.875rem}.pe-fontstack{font-family:Open Sans,Calibri,Tahoma,sans-serif}.pe-copy{font-size:1rem;line-height:1.57143rem;color:#252525}.pe-copy--secondary,.pe-label--secondary{color:#6a7070}.pe-copy--small{font-size:.85714rem;line-height:1.42857rem;color:#252525}.pe-copy--large,.pe-heading-level6,h6,header h5+.subtitle{font-size:1.14286rem;line-height:1.71429rem;color:#252525}.pe-paragraph,p{font-size:1rem;line-height:1.57143rem;margin-bottom:.85714rem;margin-top:0;color:#252525}.pe-paragraph--last{margin-bottom:0;color:#252525}.pe-lead{font-size:1.42857rem;line-height:2rem}.pe-lead,.pe-page-title{font-weight:lighter;color:#252525}.pe-page-title{font-size:2.71429rem;line-height:3.71429rem}.pe-heading-level1,.pe-page-title--small,h1{font-size:2rem;line-height:2.71429rem;font-weight:lighter;color:#252525}.pe-heading-level3,.pe-heading-level4,.pe-title,h3,h4,header h2+.subtitle,header h3+.subtitle{font-size:1.42857rem;line-height:1.85714rem;font-weight:400;color:#252525}.pe-heading-level5,.pe-title--small,h5,header h4+.subtitle{font-size:1.28571rem;line-height:1.57143rem;font-weight:400;color:#252525}.pe-heading-level2,.pe-title--large,h2,header h1+.subtitle{font-size:1.71429rem;line-height:2rem;font-weight:400;color:#252525}.pe-page-title--secondary,.pe-title--secondary{color:#6a7070}.pe-label{font-size:1rem;line-height:1.28571rem}.pe-label.pe-label--inverse{color:#fff}.pe-label--secondary.pe-label--inverse{color:#f5f5f5}.pe-label--small{font-size:.85714rem;line-height:1.14286rem}.pe-label--large{font-size:1.14286rem;line-height:1.42857rem}.pe-bold,.pe-label--bold{font-weight:600}.pe-list{margin:12px 0;padding-left:1.85714rem}.pe-list li{font-size:1rem;line-height:1.57143rem;margin-bottom:.42857rem}.pe-list li>ol,.pe-list li>ul{margin-top:.42857rem}.pe-list.pe-styled-lists--ordered{list-style-type:decimal}.pe-list.pe-styled-lists--ordered ol{list-style-type:lower-alpha;padding-left:1.85714rem}.pe-list.pe-styled-lists--ordered ol ol{list-style-type:lower-roman}.pe-list.pe-styled-lists--unordered{list-style-type:disc}.pe-list.pe-styled-lists--unordered ul{list-style-type:circle;padding-left:1.85714rem}.pe-list.pe-styled-lists--unordered ul ul{list-style-type:square}.pe-list.pe-styled-lists-heading--ordered{list-style-type:decimal;margin-top:0}.pe-list.pe-styled-lists-heading--ordered ol{list-style-type:lower-alpha;padding-left:1.85714rem}.pe-list.pe-styled-lists-heading--ordered ol ol{list-style-type:lower-roman}.pe-list.pe-styled-lists-heading--unordered{list-style-type:disc;margin-top:0}.pe-list.pe-styled-lists-heading--unordered ul{list-style-type:circle;padding-left:1.85714rem}.pe-list.pe-styled-lists-heading--unordered ul ul{list-style-type:square}.pe-list--unstyled{list-style:none;padding-left:0}.pe-list--unstyled ul{padding-left:1.85714rem}.pe-heading-level1,h1{margin-bottom:6px}.pe-heading-level2,h2,header h1+.subtitle{margin-bottom:6px}.pe-heading-level3,h3,header h2+.subtitle{font-weight:700;margin-bottom:6px}.pe-heading-level4,h4,header h3+.subtitle{margin-bottom:6px}.pe-heading-level5,h5,header h4+.subtitle{margin-bottom:6px}.pe-heading-level6,h6,header h5+.subtitle{margin-bottom:6px}*+[class^=pe-heading-level]{margin-top:20px}.pe-code{color:#f5f5f5;font-size:1rem;line-height:1.42857rem;background:#005a70;padding:30px 50px}.pe-code,.pe-code-inline,.pe-kbd{font-family:Monaco,Lucida Console,monospace}.pe-code-inline,.pe-kbd{background:#e9e9e9;padding:0 4px}html{font-size:.875rem}body{font-family:Open Sans,Calibri,Tahoma,sans-serif;color:#252525}h1,h2,h3,h4,h5,h6{margin-top:0;margin-bottom:0}*+h1,*+h2,*+h3,*+h4,*+h5,*+h6{margin-top:20px}h1+h2{margin-top:40px}h2+h3,h3+h4,h4+h5,h5+h6{margin-top:6px}header{margin-bottom:20px}header h1+.subtitle{margin-top:34px}aside h1{font-size:1.25rem}aside h2{font-size:1.1rem}aside h3{font-size:1rem}aside h4,aside h5,aside h6{font-size:.8rem}table{width:100%;max-width:100%;margin-bottom:35px;border-collapse:collapse}table td,table th{padding:8px;line-height:1.42857143;vertical-align:top;text-align:left}table thead th{vertical-align:bottom;border-top:0}a{color:#047a9c;text-decoration:underline}a.active,a:active,a:hover{color:#005a70;text-decoration:none}a:focus{color:#005a70;text-decoration:none;-webkit-box-shadow:none;box-shadow:none;outline:2px solid #0b73da;outline-offset:4px}abbr,abbr[title]{text-decoration:none}ins:before{content:"+"}ins:after{content:"+"}mark{background:#ffb81c}small{font-size:.85714rem;line-height:1.14286rem}sub,sup{font-size:90%}sub{top:.2rem}sup{top:-.2rem}pre{max-width:100%;overflow-x:auto}code,kbd,pre{font-family:Monaco,Lucida Console,monospace}:focus{-webkit-box-shadow:none;box-shadow:none;outline:2px solid #0b73da;outline-offset:4px}.pe-selectInput--fancy,.pe-selectInput-fancy-disabled,.pe-selectInput-fancy-error,.pe-selectInput-fancy-readonly,.pe-textInput,.pe-textInput--input_error,.pe-textInput--input_readonly{padding:8px 0 10px;font-size:14px;color:#252525;width:100%;border:none;line-height:18px}.pe-textInput{border-bottom:1px;border-bottom-style:solid;border-bottom-color:#6a7070}.pe-textInput::-webkit-input-placeholder{font-size:14px;color:#c7c7c7}.pe-textInput:-moz-placeholder,.pe-textInput::-moz-placeholder{font-size:14px;color:#c7c7c7}.pe-textInput:-ms-input-placeholder{font-size:14px;color:#c7c7c7}.pe-textInput:focus{outline:none}.pe-input_underline{background-color:#047a9c;display:block;height:4px;-webkit-transform:scaleX(0);transform:scaleX(0);-webkit-transition:all .2s ease;transition:all .2s ease;width:100%;margin-top:-3px}input:focus+.pe-input_underline{-webkit-transform:scale(1);transform:scale(1)}.pe-textLabelInput__label,.pe-textLabelInput__label--label-disabled,.pe-textLabelInput__label--label_error,.pe-textLabelInput__label--label_focus{font-size:12px;line-height:16px;display:block}.pe-textLabelInput__label{color:#6a7070}.pe-textLabelInput__label--label_focus{color:#047a9c}.pe-textLabelInput__label--label_error{color:#db0020}.pe-textLabelInput__label--label-disabled{color:#c7c7c7}input:focus+.pe-inputError_underline{-webkit-transform:scale(1);transform:scale(1)}.pe-inputError_underline{background-color:#db0020;display:block;height:4px;-webkit-transform:scaleX(0);transform:scaleX(0);-webkit-transition:all .2s ease;transition:all .2s ease;width:100%;margin-top:-3px}.pe-textInput--input_error{border-bottom:1px;border-bottom-style:solid;border-bottom-color:#db0020}.pe-textInput--input_error::-webkit-input-placeholder{font-size:14px;color:#c7c7c7}.pe-textInput--input_error:-moz-placeholder,.pe-textInput--input_error::-moz-placeholder{font-size:14px;color:#c7c7c7}.pe-textInput--input_error:-ms-input-placeholder{font-size:14px;color:#c7c7c7}.pe-textInput--input_error:focus{outline:none}.pe-input-wrapper{min-height:52px}.pe-textInput--input_readonly{border-bottom:0;background-color:transparent;font-size:14px;color:#252525;-webkit-appearance:none}.pe-textInput--input_readonly::-webkit-input-placeholder{font-size:14px}.pe-textInput--input_readonly:-moz-placeholder,.pe-textInput--input_readonly::-moz-placeholder{font-size:14px}.pe-textInput--input_readonly:-ms-input-placeholder{font-size:14px}.pe-textInput--input_readonly:focus{outline:none}.pe-input_underline-readonly{background-color:#c7c7c7;display:block;height:4px;-webkit-transform:scaleX(0);transform:scaleX(0);-webkit-transition:all .2s ease;transition:all .2s ease;width:100%;margin-top:-3px}input:focus+.pe-input_underline-readonly{-webkit-transform:scale(1);transform:scale(1)}.pe-textInput-disabled,.pe-textInput:disabled{color:#c7c7c7;font-size:14px;background-color:#fff;border-bottom:4px;border-bottom-style:solid;border-bottom-color:#c7c7c7}.pe-textInput--basic{border:1px solid #c7c7c7;margin-top:6px}.pe-textInput--basic::-webkit-input-placeholder{font-size:14px;color:#c7c7c7}.pe-textInput--basic:-moz-placeholder,.pe-textInput--basic::-moz-placeholder{font-size:14px;color:#c7c7c7}.pe-textInput--basic:-ms-input-placeholder{font-size:14px;color:#c7c7c7}.pe-textInput--basic:focus{border:1px solid #047a9c;-webkit-box-shadow:none;box-shadow:none;outline:2px solid #0b73da;outline-offset:4px}.pe-textInput--basic_error{border:1px solid #db0020;margin-top:6px}.pe-textInput--basic_error::-webkit-input-placeholder{font-size:14px;color:#c7c7c7}.pe-textInput--basic_error:-moz-placeholder,.pe-textInput--basic_error::-moz-placeholder{font-size:14px;color:#c7c7c7}.pe-textInput--basic_error:-ms-input-placeholder{font-size:14px;color:#c7c7c7}.pe-textInput--basic_error:focus{-webkit-box-shadow:none;box-shadow:none;outline:2px solid #0b73da;outline-offset:4px}.pe-textInput--basic:disabled{background-color:#e9e9e9;margin-top:6px}.pe-textInput--basic_readonly{border:0;margin-top:6px}.pe-textInput--basic_readonly::-webkit-input-placeholder{font-size:14px;color:#c7c7c7}.pe-textInput--basic_readonly:-moz-placeholder,.pe-textInput--basic_readonly::-moz-placeholder{font-size:14px;color:#c7c7c7}.pe-textInput--basic_readonly:-ms-input-placeholder{font-size:14px;color:#c7c7c7}.pe-textInput--basic_readonly:focus{-webkit-box-shadow:none;box-shadow:none;outline:2px solid #0b73da;outline-offset:4px}.pe-select-container,.pe-select-container--fancy,.pe-select-container-disabled,.pe-select-container-error,.pe-select-container-fancy-disabled,.pe-select-container-fancy-error,.pe-select-container-fancy-error-focus,.pe-select-container-fancy-focus,.pe-select-container-fancy-readonly,.pe-select-container-focus,.pe-select-container-focus-error,.pe-select-container-readonly{position:relative;display:block;min-width:250px;padding:0}.pe-select-container--fancy svg,.pe-select-container-disabled svg,.pe-select-container-error svg,.pe-select-container-fancy-disabled svg,.pe-select-container-fancy-error-focus svg,.pe-select-container-fancy-error svg,.pe-select-container-fancy-focus svg,.pe-select-container-fancy-readonly svg,.pe-select-container-focus-error svg,.pe-select-container-focus svg,.pe-select-container-readonly svg,.pe-select-container svg{position:absolute;top:5px;bottom:8px;right:14px;pointer-events:none}.pe-select-container--fancy select,.pe-select-container-disabled select,.pe-select-container-error select,.pe-select-container-fancy-disabled select,.pe-select-container-fancy-error-focus select,.pe-select-container-fancy-error select,.pe-select-container-fancy-focus select,.pe-select-container-fancy-readonly select,.pe-select-container-focus-error select,.pe-select-container-focus select,.pe-select-container-readonly select,.pe-select-container select{-webkit-box-sizing:border-box;box-sizing:border-box;width:100%;min-height:34px;margin:0;padding:0 14px;outline:none}.pe-select--basic_error,.pe-selectInput--basic{-webkit-appearance:none;-moz-appearance:none;appearance:none;background-color:#fff;border:1px solid transparent;padding-top:8px}.pe-select-container,.pe-select-container--fancy,.pe-select-container-disabled,.pe-select-container-error,.pe-select-container-fancy-disabled,.pe-select-container-fancy-error,.pe-select-container-fancy-error-focus,.pe-select-container-fancy-focus,.pe-select-container-fancy-readonly,.pe-select-container-focus,.pe-select-container-focus-error,.pe-select-container-readonly,.pe-textInput--basic,.pe-textInput--basic_error,.pe-textInput--basic_readonly{padding:0 14px;height:36px;width:100%;-webkit-box-sizing:border-box;box-sizing:border-box;display:block;border-radius:3px;font-size:14px;line-height:18px;background-color:#fff;color:#252525}.pe-select-container{border:1px solid #c7c7c7;padding:0;margin-top:6px}.pe-select-container select{padding:0 14px}.pe-select-container select:focus{border:1px solid #047a9c;-webkit-box-shadow:none;box-shadow:none;outline:2px solid #0b73da;outline-offset:4px}.pe-select-container select:focus::-ms-value{background:transparent;color:#222}.pe-select-container select::-ms-expand{opacity:0}.pe-selectInput--basic:-moz-focusring{color:transparent;text-shadow:0 0 0 #000}.pe-select-container-focus{border:1px solid transparent;padding:0;margin-top:6px}.pe-select-container-focus select{padding:.3em .3em .3em 14px}.pe-select-container-focus select:focus{border:1px solid #047a9c;-webkit-box-shadow:none;box-shadow:none;outline:2px solid #0b73da;outline-offset:4px}.pe-select-container-focus select:focus::-ms-value{background:transparent;color:#222}.pe-select-container-focus select:focus::-ms-expand{opacity:0}.pe-select-container-error{border:1px solid #db0020;padding:0;margin-top:6px}.pe-select-container-error select{padding:.3em .3em .3em 14px}.pe-select-container-error select:focus{border:1px solid #db0020;-webkit-box-shadow:none;box-shadow:none;outline:2px solid #0b73da;outline-offset:4px}.pe-select-container-error select:focus::-ms-value{background:transparent;color:#222}.pe-select-container-error select::-ms-expand{opacity:0}.pe-select-container-focus-error{border:1px solid transparent;padding:0;margin-top:6px}.pe-select-container-focus-error select{padding:.3em .3em .3em 14px}.pe-select-container-focus-error select:focus{border:1px solid #db0020;-webkit-box-shadow:none;box-shadow:none;outline:2px solid #0b73da;outline-offset:4px}.pe-select-container-focus-error select:focus::-ms-value{background:transparent;color:#222}.pe-select-container-focus-error select::-ms-expand{opacity:0}.pe-select--basic_error{-webkit-appearance:none}.pe-select--basic_error::-webkit-input-placeholder{font-size:14px;color:#c7c7c7}.pe-select--basic_error:-moz-placeholder,.pe-select--basic_error::-moz-placeholder{font-size:14px;color:#c7c7c7}.pe-select--basic_error:-ms-input-placeholder{font-size:14px;color:#c7c7c7}.pe-select--basic_error:focus{outline:none;-webkit-box-shadow:0 0 4px 0 #db0020;box-shadow:0 0 4px 0 #db0020}.pe-select--basic_error:-moz-focusring{color:transparent;text-shadow:0 0 0 #000}.pe-select-container-disabled{outline:none;padding:0;color:#c7c7c7!important;background-color:#e9e9e9!important;-webkit-appearance:none;-moz-appearance:none;appearance:none;margin-top:6px}.pe-select-container-disabled svg{fill:#c7c7c7}.pe-select-container-disabled select{border:1px solid #c7c7c7}.pe-select-container-disabled select:focus{border:1px solid #db0020;-webkit-box-shadow:none;box-shadow:none;outline:2px solid #0b73da;outline-offset:4px}.pe-select-container-disabled select:focus::-ms-value{background:transparent;color:#222}.pe-select-container-disabled select::-ms-expand{opacity:0}.pe-select-container-readonly{padding:0;border:none;-webkit-appearance:none;-moz-appearance:none;appearance:none;margin-top:6px}.pe-select-container-readonly svg{right:8px}.pe-select-container-readonly select{padding:.3em .3em .3em 14px}.pe-select-container-readonly select:focus{border:0;-webkit-box-shadow:none;box-shadow:none;outline:2px solid #0b73da;outline-offset:4px}.pe-select-container-readonly select:focus::-ms-value{background:transparent;color:#222}.pe-select-container-readonly select::-ms-expand{opacity:0}.pe-select-container--fancy{-webkit-appearance:none;-moz-appearance:none;padding:0;border:none}.pe-select-container--fancy svg{right:0;outline:none}.pe-select-container--fancy select{padding:8px 0 10px;outline:none;-webkit-box-shadow:none;box-shadow:none}.pe-select-container--fancy select:focus{outline:none;-webkit-box-shadow:none;box-shadow:none}.pe-select-container--fancy select:focus::-ms-value{background:transparent;color:#222}.pe-select-container--fancy select::-ms-expand{opacity:0}.pe-selectInput--fancy{-webkit-appearance:none;-moz-appearance:none;appearance:none;outline:none;background-color:transparent;padding-top:8px;border-bottom:1px;border-bottom-style:solid;border-bottom-color:#6a7070;border-radius:0}.pe-selectInput--fancy:-moz-focusring{color:transparent;text-shadow:0 0 0 #000}select:focus+.pe-input_underline{-webkit-transform:scale(1);transform:scale(1)}.pe-select-container-fancy-focus{border:none;padding:0}.pe-select-container-fancy-focus svg{right:0}.pe-select-container-fancy-focus select{padding:8px 0 10px;border:none}.pe-select-container-fancy-focus select:focus{outline:none}.pe-select-container-fancy-focus select:focus::-ms-value{background:transparent;color:#222}.pe-select-container-fancy-focus select:focus::-ms-expand{opacity:0}.pe-select-container-fancy-error{background-color:transparent;-webkit-appearance:none;-moz-appearance:none;padding:0}.pe-select-container-fancy-error svg{right:0}.pe-select-container-fancy-error select{padding:8px 0 10px}.pe-select-container-fancy-error select:focus{outline:none;-webkit-box-shadow:none;box-shadow:none}.pe-select-container-fancy-error select:focus::-ms-value{background:transparent;color:#222}.pe-select-container-fancy-error select::-ms-expand{opacity:0}.pe-selectInput-fancy-error{-webkit-appearance:none;-moz-appearance:none;appearance:none;background-color:transparent;padding-top:8px;border-bottom:1px;border-bottom-style:solid;border-bottom-color:#db0020;border-radius:0}.pe-selectInput-fancy-error:-moz-focusring{color:transparent;text-shadow:0 0 0 #000}select:focus+.pe-inputError_underline{-webkit-transform:scale(1);transform:scale(1)}.pe-select-container-fancy-error-focus{border:none;padding:0}.pe-select-container-fancy-error-focus svg{right:0}.pe-select-container-fancy-error-focus select{padding:8px 0 10px}.pe-select-container-fancy-error-focus select:focus{outline:none}.pe-select-container-fancy-error-focus select:focus::-ms-value{background:transparent;color:#222}.pe-select-container-fancy-error-focus select:focus::-ms-expand{opacity:0}.pe-select-container-fancy-disabled{background-color:transparent;-webkit-appearance:none;-moz-appearance:none;appearance:none;padding:0}.pe-select-container-fancy-disabled svg{right:0;fill:#c7c7c7}.pe-select-container-fancy-disabled select{padding:8px 0 10px;color:#c7c7c7;border-bottom:4px;border-bottom-style:solid;border-bottom-color:#c7c7c7}.pe-select-container-fancy-disabled select::-ms-expand{opacity:0}.pe-selectInput-fancy-disabled{padding-top:8px;border:none;border-radius:0}.pe-select-container-fancy-readonly,.pe-selectInput-fancy-disabled{-webkit-appearance:none;-moz-appearance:none;appearance:none;background-color:transparent}.pe-select-container-fancy-readonly{padding:0}.pe-select-container-fancy-readonly svg{right:0}.pe-select-container-fancy-readonly select{padding:8px 0 10px;-webkit-appearance:none;-moz-appearance:none;appearance:none}.pe-select-container-fancy-readonly select::-ms-expand{opacity:0}.pe-selectInput-fancy-readonly{-webkit-appearance:none;-moz-appearance:none;appearance:none;background-color:transparent;padding-top:8px;border:none;border-radius:0}select:focus+.pe-input_underline-readonly{-webkit-transform:scale(1);transform:scale(1)}.pe-multiLineText,.pe-multiLineText--disabled,.pe-multiLineText--error,.pe-multiLineText--readOnly{border:1px solid #c7c7c7;border-radius:3px;font-size:14px;color:#252525;margin-top:6px;line-height:18px;padding:9px 14px;resize:none;width:100%;-webkit-box-sizing:border-box;box-sizing:border-box}.pe-multiLineText--disabled::-webkit-input-placeholder,.pe-multiLineText--error::-webkit-input-placeholder,.pe-multiLineText--readOnly::-webkit-input-placeholder,.pe-multiLineText::-webkit-input-placeholder{font-size:14px;color:#c7c7c7;line-height:18px}.pe-multiLineText--disabled:-moz-placeholder,.pe-multiLineText--disabled::-moz-placeholder,.pe-multiLineText--error:-moz-placeholder,.pe-multiLineText--error::-moz-placeholder,.pe-multiLineText--readOnly:-moz-placeholder,.pe-multiLineText--readOnly::-moz-placeholder,.pe-multiLineText:-moz-placeholder,.pe-multiLineText::-moz-placeholder{font-size:14px;color:#c7c7c7;line-height:18px}.pe-multiLineText--disabled:-ms-input-placeholder,.pe-multiLineText--error:-ms-input-placeholder,.pe-multiLineText--readOnly:-ms-input-placeholder,.pe-multiLineText:-ms-input-placeholder{font-size:14px;color:#c7c7c7;line-height:18px}.pe-multiLineText,.pe-multiLineText--error{background-color:#fff}.pe-multiLineText--error:focus,.pe-multiLineText:focus{-webkit-box-shadow:none;box-shadow:none;outline:2px solid #0b73da;outline-offset:4px;border:1px solid #047a9c;resize:both;overflow:auto}.pe-multiLineText--error{background-color:#fff;border:1px solid #db0020}.pe-multiLineText--error:focus{-webkit-box-shadow:none;box-shadow:none;outline:2px solid #0b73da;outline-offset:4px;resize:both;overflow:auto;border:1px solid #db0020}.pe-multiLineText--disabled{outline:none;color:#e9e9e9;background-color:#e9e9e9}.pe-multiLineText--readOnly{background-color:#fff;border:none}.pe-multiLineText--readOnly:focus{-webkit-box-shadow:none;box-shadow:none;outline:2px solid #0b73da;outline-offset:4px}.pe-input--error_message,.pe-input--info_message{display:block;padding-top:3px;font-size:12px;line-height:16px;margin-bottom:0}.pe-input--error_message{color:#db0020}.pe-input--info_message{color:#6a7070}.pe-checkbox{position:relative;min-height:16px;margin-bottom:14px}.pe-checkbox:last-child{margin-bottom:0}input[type=checkbox]{opacity:0;position:absolute}input[type=checkbox]~span{left:0;top:0;position:absolute;z-index:0;height:16px;width:16px;border:1px solid #c7c7c7;border-radius:2px}input[type=checkbox]~span svg{opacity:0;height:16px;width:16px}input[type=checkbox]:checked~span svg{opacity:1}input[type=checkbox]:focus~span{border:1px solid #047a9c;border-radius:2px;-webkit-box-shadow:none;box-shadow:none;outline:2px solid #0b73da;outline-offset:4px}input[type=checkbox]:disabled~span{background-color:#e9e9e9}input[type=checkbox]:disabled~span svg{fill:#c7c7c7}input[type=checkbox]~label{min-height:18px;display:inline-block;padding-left:28px;line-height:18px;position:relative;z-index:2}.pe-radio{position:relative;min-height:16px;margin-bottom:14px}.pe-radio:last-child{margin-bottom:0}input[type=radio]{opacity:0;position:absolute}input[type=radio]+label{display:inline-block;padding-left:28px;line-height:18px}input[type=radio]~span{display:block;-webkit-box-sizing:content-box;box-sizing:content-box;position:absolute;left:0;top:0;height:5px;width:5px;padding:3px 6px 6px 3px;color:#6a7070;border:1px solid #c7c7c7;border-radius:50%;pointer-events:none}input[type=radio]:focus~span{color:#6a7070;border:1px solid #047a9c;border-radius:50%;-webkit-box-shadow:none;box-shadow:none;outline:2px solid #0b73da;outline-offset:4px}input[type=radio]:disabled~span{color:#c7c7c7;background-color:#e9e9e9}input[type=radio]~span svg{opacity:0;height:8px;width:8px}input[type=radio]:checked~span svg{opacity:1}.pe-textInput__showButton,.pe-textInput__showButton--disabled,.pe-textInput__showButton--error,.pe-textInput__showButton-basic,.pe-textInput__showButton-basic--disabled{position:relative;background-color:none;text-decoration:none;float:right;padding:2px;border:0;color:#047a9c;background:#fff}.pe-textInput__showButton--disabled:focus,.pe-textInput__showButton--error:focus,.pe-textInput__showButton-basic--disabled:focus,.pe-textInput__showButton-basic:focus,.pe-textInput__showButton:focus{text-decoration:underline}.pe-textInput__showButton,.pe-textInput__showButton--error{margin-top:-28px}.pe-textInput__showButton--disabled{margin-top:-35px;color:#c7c7c7}.pe-textInput__showButton-basic{margin-right:14px;margin-top:-28px}.pe-textInput__showButton-basic--disabled{margin-right:14px;margin-top:-28px;color:#c7c7c7;background-color:#e9e9e9}.pe-fieldset{border:none}.pe-legend{opacity:0}::-ms-reveal{display:none}#pe-icons-sprite{display:none}svg[class^=pe-icon--]{display:inline-block;vertical-align:top;fill:currentColor}[class^=pe-btn] svg[class$="-18"],[class^=pe-btn] svg[class$="-24"]{vertical-align:middle;margin-left:.5em;margin-bottom:.3em}svg[class$="-18"]{width:18px;height:18px}svg[class$="-24"]{width:24px;height:24px}svg[class$=font-setting-18]{width:24px;height:18px}svg[class$=font-setting-24]{width:32px;height:24px}svg[class$=new-notification-9]{vertical-align:middle;width:10px;height:10px}.timepicker-container{min-width:150px;position:relative;max-width:400px;font-family:Open Sans,Calibri,Tahoma,sans-serif}.timepicker-container.error input{border-color:#db0020}.timepicker-container.error label{color:#db0020}.timepicker-container .timepicker{position:relative}.timepicker-container .timepicker input{padding-right:46px;text-transform:uppercase}.timepicker-container .timepicker .pe-textInput--basic.error{border-color:#db0020}.timepicker-container .timepicker .pe-icon-wrapper{color:#6a7070;position:absolute;right:14px;bottom:-webkit-calc(50% - 14px);bottom:calc(50% - 14px)}.timepicker-container .pe-textLabelInput__label.error{color:#db0020}.timepicker-container .error-msg{color:#db0020;margin-top:1px;margin-bottom:0;font-size:12px;line-height:18px}.timepicker-container .pe-dropdown-container{width:220px;position:absolute;top:68px;z-index:1000}.timepicker-container .pe-dropdown-container .itemList{margin:0;padding:12px 0;list-style-type:none;width:218px;max-height:300px;overflow-y:auto;border:1px solid #c7c7c7;border-radius:2px;background-color:#fff}.timepicker-container .pe-dropdown-container .itemList .item{padding:4px 24px;position:relative;display:block;width:100%;-webkit-box-sizing:border-box;box-sizing:border-box;cursor:pointer;font-size:14px}.timepicker-container .pe-dropdown-container .itemList .item .pe-icon-wrapper{color:#6a7070;position:absolute;left:6px;display:none}.timepicker-container .pe-dropdown-container .itemList .item:hover{background-color:#e9e9e9}.timepicker-container .pe-dropdown-container .itemList .item:focus{background-color:#e9e9e9;outline:0}.timepicker-container .pe-dropdown-container .itemList .item:focus:after{border:2px solid #0b73da;content:"";position:absolute;border-radius:4px;width:100%;height:-webkit-calc(100% + 4px);height:calc(100% + 4px);top:-2px;left:0;z-index:1}.timepicker-container .pe-dropdown-container .itemList.with-selection .pe-itemList-item{padding:4px 24px 4px 34px}.in-view{background-color:#e9e9e9}#inputAriaId{display:none}.error #inputAriaId{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center}@media (-ms-high-contrast:none){.pe-icon-wrapper{width:20px;height:23px}}@-webkit-keyframes slideInUp{0%{-webkit-transform:translate3d(0,100%,0);transform:translate3d(0,100%,0);visibility:visible}to{-webkit-transform:translateZ(0);transform:translateZ(0)}}@keyframes slideInUp{0%{-webkit-transform:translate3d(0,100%,0);transform:translate3d(0,100%,0);visibility:visible}to{-webkit-transform:translateZ(0);transform:translateZ(0)}}@-webkit-keyframes fadeOutUp{0%{opacity:1}to{opacity:0;-webkit-transform:translate3d(0,-100%,0);transform:translate3d(0,-100%,0)}}@keyframes fadeOutUp{0%{opacity:1}to{opacity:0;-webkit-transform:translate3d(0,-100%,0);transform:translate3d(0,-100%,0)}}@-webkit-keyframes fadeIn{0%{opacity:0}to{opacity:1}}@keyframes fadeIn{0%{opacity:0}to{opacity:1}}@-webkit-keyframes fadeOut{0%{opacity:1}to{opacity:0}}@keyframes fadeOut{0%{opacity:1}to{opacity:0}}.animated{-webkit-animation-duration:1s;animation-duration:1s;-webkit-animation-fill-mode:backwards;animation-fill-mode:backwards}@media screen and (prefers-reduced-motion:reduce){.animated{-webkit-animation:unset!important;animation:unset!important}}.animateIn{-webkit-animation-name:fadeIn;animation-name:fadeIn;-webkit-animation-duration:.5s;animation-duration:.5s}@media (max-width:480px){.animateIn{-webkit-animation-name:slideInUp;animation-name:slideInUp}}.animateOut{-webkit-animation-name:fadeOut;animation-name:fadeOut;-webkit-animation-duration:.2s;animation-duration:.2s}@media (max-width:480px){.animateOut{-webkit-animation-name:fadeOutUp;animation-name:fadeOutUp}}
</style>
    <div class="timepicker-container">
        <label class="pe-textLabelInput__label" for="timePickerInput">Select time (HH:MM AM/PM)</label>
        <div class="timepicker">
            <input type="text" id="timePickerInput" class="pe-textInput--basic" role="combobox" aria-haspopup="true" aria-expanded="false" aria-controls="itemList" aria-owns="itemList" aria-autocomplete="none">
            <span class="pe-icon-wrapper">
				        ${clockIcon}
            </span> 
        </div>
        <p id="inputAriaId" class="pe-input--error_message">
	         ${warningIcon}
            Enter a valid time.
        </p>
    </div>
 `;

  if (w.ShadyCSS) w.ShadyCSS.prepareTemplate(template, 'pearson-timepicker');

  function removeIcons(node) {
    const icons = node.querySelectorAll('.pe-icon-wrapper');
    return Array.prototype.forEach.call(icons, icon => {
      icon.style.display = 'none';
    });
  }

  function filterSelected(node, value) {
    return node.querySelector(`[data-time^='${value}']`);
  }

  function setSelectedFalse(node) {
    const items = node.querySelectorAll('#itemList li');
    return Array.prototype.forEach.call(items, item => {
      item.classList.remove('in-view');
      item.setAttribute('aria-selected', false);
    });
  }

  function getFocusableElements(node) {
    return node.querySelectorAll('[role^="option"]');
  }

  function calculate(increment) {
    const endTime = moment().add('h', 24),
      timeStops = [],
      startTime = moment().add(
        'm',
        increment - (moment().minute() % increment)
      );
    while (startTime < endTime) {
      timeStops.push(new moment(startTime));
      startTime.add('m', increment).format('LLL');
    }
    return timeStops;
  }

  function format(type) {
    if (type === '12') {
      return 'h:mm A';
    } else {
      return 'HH:mm';
    }
  }

  function buildTimes(time, index) {
    const li = timeItem.content.cloneNode(true),
      item = li.querySelector('li'),
      timeEl = li.querySelector('.time');
    item.setAttribute('data-time', time);
    item.setAttribute('data-index', index);
    timeEl.innerHTML = time;
    return li;
  }

  class TimePicker extends HTMLElement {
    static get observedAttributes() {
      return [
        'hours',
        'increments',
        'selected',
        'open',
        'valid',
        'readonly',
        'value',
        'disabled'
      ];
    }

    get disabled() {
      return this.hasAttribute('disabled');
    }

    get readOnlyValue() {
      return this.getAttribute('value');
    }

    get readOnly() {
      return this.hasAttribute('readonly');
    }

    get selected() {
      return this.getAttribute('selected');
    }

    get open() {
      return this.getAttribute('open');
    }

    get hours() {
      return this.getAttribute('hours');
    }

    get increment() {
      return this.getAttribute('increments');
    }

    get valid() {
      return this.getAttribute('valid');
    }

    set disabledState(bool) {
      this.input.setAttribute('disabled', bool);
      this.readOnlyValueState = this.readOnlyValue;
    }

    set labelState(text) {
      this.label.innerHTML = text;
    }

    set readOnlyState(bool) {
      this.input.setAttribute('readonly', bool);
      this.input.classList.remove('pe-textInput--basic');
      this.input.classList.add('pe-textInput--input_readonly');
      this.readOnlyValueState = this.readOnlyValue;
    }

    set readOnlyValueState(value) {
      this.input.value = value;
    }

    set openState(open) {
      this.setAttribute('open', open);
    }

    set selectedState(selected) {
      this.setAttribute('selected', selected);
    }

    set validState(valid) {
      this.setAttribute('valid', valid);
    }

    closeMenu() {
      this.openState = 'false';
      this.list.innerHTML = '';
    }
    selectTime(node, list) {
      const icon = node.querySelector('.pe-icon-wrapper');
      removeIcons(list);
      setSelectedFalse(this.list);
      this.selectedState = node.getAttribute('data-time');
      this.input.value = node.getAttribute('data-time');
      icon.style.display = 'block';
      node.setAttribute('aria-selected', true);
      node.classList.add('in-view');
      this.closeMenu();
      this.validateTime();
      this.input.focus();
    }

    hoverTime(match) {
      setSelectedFalse(this.list);
      if (match !== null) {
        match.classList.add('in-view');
        match.scrollIntoView();
      }
    }

    validateTime() {
      function isValids(_this) {
        const type = _this.hours;
        let isValid;
        if (type === '24') {
          isValid = /^([01]\d|2[0-3]):?([0-5]\d)$/.test(_this.input.value);
          return isValid;
        } else {
          isValid = /^([0-1][0-2]|\d):[0-5][0-9]\s(PM|AM|am|pm)$/.test(
            _this.input.value
          );
          return isValid;
        }
      }
      this.validState = isValids(this);
    }

    focusListItem() {
      const focusableElements = getFocusableElements(this.list),
        firstFocusableElement = focusableElements[0],
        selected = this.list.querySelector(`[data-time='${this.selected}']`);
      if (selected === null) {
        firstFocusableElement.focus();
        this.container.classList.remove('error');
      } else {
        selected.focus();
      }
    }

    onDocClick(event) {
      event.stopImmediatePropagation();
      if (this.list.childNodes.length > 1) {
        if (event.target !== this) {
          this.closeMenu();
        }
      }
    }

    onMouseDown(event) {
      event.stopImmediatePropagation();
      const nextItem = parseInt(event.target.getAttribute('data-index')) + 1,
        prevItem = parseInt(event.target.getAttribute('data-index')) - 1,
        focusableElements = getFocusableElements(this.list),
        firstFocusableElement = focusableElements[0],
        lastFocusableElement = focusableElements[focusableElements.length - 1];

      if (event.currentTarget.tagName === 'INPUT') {
        this.hoverTime(filterSelected(this.list, this.input.value));
        switch (event.keyCode) {
          case 27:
            if (this.open === 'true') {
              this.openState = 'false';
              this.input.focus();
            }
            break;
          case 8:
            this.container.classList.add();
            removeIcons(this.list);
            break;
          case 13:
            if (this.open === 'true') {
              if (filterSelected(this.list, this.input.value) === null) {
                this.container.classList.add('error');
                removeIcons(this.list);
              } else {
                filterSelected(this.list, this.input.value).click();
              }
            } else {
              this.validateTime();
              if (this.valid === 'true') {
                this.selectedState = this.input.value;
              } else {
                return false;
              }
            }
            break;
          case 40:
            event.preventDefault();
            if (this.open === 'true') {
              this.focusListItem();
            } else if (this.open === 'false') {
              this.openState = 'true';
            }
            break;
        }
      } else {
        switch (event.keyCode) {
          case 27:
            if (this.open === 'true') {
              this.openState = 'false';
              this.input.focus();
            }
            break;
          case 9:
            this.input.focus();
            this.openState = 'false';
            break;
          case 40:
            if (this.shadowRoot.activeElement === lastFocusableElement) {
              firstFocusableElement.focus();
            } else {
              if (focusableElements[nextItem] !== undefined) {
                focusableElements[nextItem].focus();
              } else {
                return;
              }
            }
            break;
          case 38:
            if (this.shadowRoot.activeElement === firstFocusableElement) {
              lastFocusableElement.focus();
            } else {
              if (focusableElements[prevItem] !== undefined) {
                focusableElements[prevItem].focus();
              } else {
                return;
              }
            }
            break;
          case 32:
            event.target.click();
            break;
          case 13:
            event.target.click();
            event.preventDefault();
            event.stopImmediatePropagation();
            break;
          case 36:
            firstFocusableElement.focus();
            break;
          case 35:
            lastFocusableElement.focus();
            break;
        }
      }
    }

    onInputBlur(event) {
      if (event.relatedTarget === null && !isIE11) {
        if (!this.readOnly) {
          this.validateTime();
          if (this.valid === 'true') {
            if (filterSelected(this.list, this.input.value) !== null) {
              filterSelected(this.list, this.input.value).click();
            }
          }
        } else if (isIE11) {
          this.validateTime();
        }
      }
    }

    onInputClick() {
      if (!this.readOnly) {
        this.openState = 'true';
      }
    }
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      const clone = template.content.cloneNode(true),
        dropdownTemplate = dropdown.content.cloneNode(true);

      this.input = clone.querySelector('input');
      this.label = clone.querySelector('label');
      this.container = clone.querySelector('.timepicker-container');
      this.list = dropdownTemplate.querySelector('ul');
      this.dropdown = dropdownTemplate.querySelector('#dropDown');
      this.shadowRoot.appendChild(clone);
      this.selectTime = this.selectTime.bind(this);
      this.hoverTime = this.hoverTime.bind(this);
      this.validateTime = this.validateTime.bind(this);
      this.closeMenu = this.closeMenu.bind(this);
      this.onMouseDown = this.onMouseDown.bind(this);
      this.onDocClick = this.onDocClick.bind(this);
      this.onInputBlur = this.onInputBlur.bind(this);
      this.onInputClick = this.onInputClick.bind(this);
    }

    connectedCallback() {
      if (this.hours === '12') {
        this.labelState = 'Select time (HH:MM AM/PM)';
      } else {
        this.labelState = 'Select time (HH:MM)';
      }

      if (this.disabled) {
        this.disabledState = true;
      }

      if (this.readOnly) {
        this.readOnlyState = true;
      }

      this.input.addEventListener('click', this.onInputClick);
      this.input.addEventListener('keydown', this.onMouseDown);
      this.input.addEventListener('blur', this.onInputBlur);

      this.list.addEventListener('keydown', this.onMouseDown);
      this.list.addEventListener('click', event => {
        event.stopImmediatePropagation();
        this.selectTime(event.target, this.list);
      });

      doc.addEventListener('click', this.onDocClick);
      doc.addEventListener('keydown', this.onMouseDown);
    }

    attributeChangedCallback(name, oldValue, newValue) {
      this.timesToRender = calculate(this.increment);
      this.format = format(this.hours);
      if (name === 'valid') {
        if (oldValue !== newValue) {
          if (newValue === 'true') {
            this.container.classList.remove('error');
          } else {
            this.container.classList.add('error');
          }
        }
      }
      if (name === 'open') {
        if (oldValue !== newValue) {
          if (newValue === 'true') {
            this.timesToRender.forEach((time, index) => {
              const text = time.format(this.format);
              let li = buildTimes(text, index);
              this.list.appendChild(li);
            });
            this.container.appendChild(this.dropdown);
            const selectedNode = this.dropdown.querySelector(
              `[data-time='${this.selected}']`
            );
            if (selectedNode !== null) {
              const selectedIcon = selectedNode.querySelector(
                '.pe-icon-wrapper'
              );
              selectedNode.scrollIntoView();
              selectedNode.classList.add('in-view');
              selectedNode.setAttribute('aria-selected', true);
              selectedIcon.style.display = 'block';
            }
          }
          if (newValue === 'false') {
            this.dropdown.remove();
          }
        }
      }
    }
  }
  customElements.define('pearson-timepicker', TimePicker);
})(window, document);
