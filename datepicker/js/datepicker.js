(function(w, doc) {
  'use strict';
  w['moment-range'].extendMoment(moment);
  // Create a template element
  const datepicker = doc.createElement('template'),
    calendar = doc.createElement('template'),
    row = doc.createElement('template'),
    dateTemplate = doc.createElement('template'),
    calendarIcon = 'data:image/svg+xml;charset=UTF-8,%3csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 18 18\' width=\'18\' height=\'18\' fill=\'%236a7070\'%3e%3cpath d=\'M4 3L5 3 5 1 4 1 4 3zM13 3L14 3 14 1 13 1 13 3zM18 5L18 1.5C18 1.224 17.776 1 17.5 1L15 1 15 .5C15 .224 14.776 0 14.5 0L12.5 0C12.224 0 12 .224 12 .5L12 1 6 1 6 .5C6 .224 5.776 0 5.5 0L3.5 0C3.224 0 3 .224 3 .5L3 1 .5 1C.224 1 0 1.224 0 1.5L0 5 18 5zM14.0762 15L10.8262 15C10.5502 15 10.3262 14.776 10.3262 14.5 10.3262 14.224 10.5502 14 10.8262 14L12.0002 14 12.0002 9.707 11.3752 10.331C11.1802 10.526 10.8632 10.526 10.6682 10.331 10.4722 10.136 10.4722 9.819 10.6682 9.624L12.1462 8.146C12.2892 8.003 12.5062 7.96 12.6912 8.038 12.8782 8.116 13.0002 8.298 13.0002 8.5L13.0002 14 14.0762 14C14.3522 14 14.5762 14.224 14.5762 14.5 14.5762 14.776 14.3522 15 14.0762 15L14.0762 15zM9.0002 14.5C9.0002 14.776 8.7762 15 8.5002 15L4.5002 15C4.2232 15 4.0002 14.776 4.0002 14.5L4.0002 13.5C4.0002 13.224 4.2232 13 4.5002 13 4.7762 13 5.0002 13.224 5.0002 13.5L5.0002 14 8.0002 14 8.0002 12 5.6992 12C5.4232 12 5.1992 11.776 5.1992 11.5 5.1992 11.224 5.4232 11 5.6992 11L8.0002 11 8.0002 9 5.0002 9 5.0002 9.5C5.0002 9.776 4.7762 10 4.5002 10 4.2232 10 4.0002 9.776 4.0002 9.5L4.0002 8.5C4.0002 8.224 4.2232 8 4.5002 8L8.5002 8C8.7762 8 9.0002 8.224 9.0002 8.5L9.0002 14.5zM.0002 6L.0002 17.5C.0002 17.776.2232 18 .5002 18L17.5002 18C17.7762 18 18.0002 17.776 18.0002 17.5L18.0002 6 .0002 6z\'/%3e%3c/svg%3e',
    prevArrowIcon = 'data:image/svg+xml;charset=UTF-8,%3csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 18 18\' width=\'18\' height=\'18\' fill=\'%236a7070\'%3e%3cpath d=\'M13.749,17.6606035 C14.112,17.2486035 14.076,16.6116035 13.662,16.2436035 L5.509,8.9996035 L13.662,1.7566035 C14.077,1.3896035 14.113,0.752603504 13.749,0.339603504 C13.383,-0.0763964961 12.751,-0.115396496 12.338,0.252603504 L3.338,8.2476035 C3.123,8.4376035 3,8.7126035 3,8.9996035 C3,9.2876035 3.123,9.5616035 3.338,9.7526035 L12.338,17.7476035 C12.751,18.1156035 13.383,18.0766035 13.749,17.6606035\'%3e%3c/path%3e%3c/svg%3e',
    nextArrowIcon = 'data:image/svg+xml;charset=UTF-8,%3csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 18 18\' width=\'18\' height=\'18\' fill=\'%236a7070\'%3e%3cpath d=\'M4.2506,17.6606035 C3.8876,17.2486035 3.9236,16.6116035 4.3376,16.2436035 L12.4906,8.9996035 L4.3376,1.7566035 C3.9226,1.3896035 3.8866,0.752603504 4.2506,0.339603504 C4.6166,-0.0763964961 5.2486,-0.115396496 5.6616,0.252603504 L14.6616,8.2476035 C14.8766,8.4376035 14.9996,8.7126035 14.9996,8.9996035 C14.9996,9.2876035 14.8766,9.5616035 14.6616,9.7526035 L5.6616,17.7476035 C5.2486,18.1156035 4.6166,18.0766035 4.2506,17.6606035\'%3e%3c/path%3e%3c/svg%3e',
  warningIcon = `   
  <svg     
    aria-hidden="true"
    focusable="false" 
    style="width:18px;height:18px;fill:currentColor"  
  >  
    <path d="M9.99994044,10.5 C9.99994044,10.776 9.77594044,11 9.49994044,11 L8.49994044,11 C8.22394044,11 7.99994044,10.776 7.99994044,10.5 L7.99994044,7.5 C7.99994044,7.224 8.22394044,7 8.49994044,7 L9.49994044,7 C9.77594044,7 9.99994044,7.224 9.99994044,7.5 L9.99994044,10.5 Z M9.99994044,13.5 C9.99994044,13.776 9.77594044,14 9.49994044,14 L8.49994044,14 C8.22394044,14 7.99994044,13.776 7.99994044,13.5 L7.99994044,12.5 C7.99994044,12.224 8.22394044,12 8.49994044,12 L9.49994044,12 C9.77594044,12 9.99994044,12.224 9.99994044,12.5 L9.99994044,13.5 Z M15.9460591,15.275 L9.44500379,2.276 C9.26100222,1.908 8.73899778,1.908 8.55499621,2.276 L2.05394089,15.275 C1.88693947,15.607 2.12794152,16 2.49894468,16 L15.5010553,16 C15.8720585,16 16.1130605,15.607 15.9460591,15.275 Z"/>
</svg>`;


  datepicker.innerHTML = ` 
    <style>
/*! normalize.css v5.0.0 | MIT License | github.com/necolas/normalize.css */*,:after,:before{-webkit-box-sizing:inherit;box-sizing:inherit}html{font-family:sans-serif;line-height:1.15;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%}body{margin:0}article,aside,footer,header,nav,section{display:block}h1{font-size:2em;margin:.67em 0}figcaption,figure,main{display:block}figure{margin:1em 40px}hr{-webkit-box-sizing:content-box;box-sizing:content-box;height:0;overflow:visible}pre{font-family:monospace,monospace;font-size:1em}a{background-color:transparent;-webkit-text-decoration-skip:objects}a:active,a:hover{outline-width:0}abbr[title]{border-bottom:none;text-decoration:underline;-webkit-text-decoration:underline dotted;text-decoration:underline dotted}b,strong{font-weight:inherit;font-weight:bolder}code,kbd,samp{font-family:monospace,monospace;font-size:1em}dfn{font-style:italic}mark{background-color:#ff0;color:#000}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-.25em}sup{top:-.5em}audio,video{display:inline-block}audio:not([controls]){display:none;height:0}img{border-style:none}svg:not(:root){overflow:hidden}button,input,optgroup,select,textarea{font-family:Open Sans,Calibri,Tahoma,sans-serif;font-size:100%;line-height:1.15;margin:0}button,input{overflow:visible}button,select{text-transform:none}[type=reset],[type=submit],button,html [type=button]{-webkit-appearance:button}[type=button]::-moz-focus-inner,[type=reset]::-moz-focus-inner,[type=submit]::-moz-focus-inner,button::-moz-focus-inner{border-style:none;padding:0}[type=button]:-moz-focusring,[type=reset]:-moz-focusring,[type=submit]:-moz-focusring,button:-moz-focusring{outline:1px dotted ButtonText}fieldset{border:1px solid silver;margin:0 2px;padding:.35em .625em .75em}legend{-webkit-box-sizing:border-box;box-sizing:border-box;color:inherit;display:table;max-width:100%;padding:0;white-space:normal}progress{display:inline-block;vertical-align:baseline}textarea{overflow:auto}[type=checkbox],[type=radio]{-webkit-box-sizing:border-box;box-sizing:border-box;padding:0}[type=number]::-webkit-inner-spin-button,[type=number]::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}[type=search]::-webkit-search-cancel-button,[type=search]::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}details,menu{display:block}summary{display:list-item}canvas{display:inline-block}template{display:none}[hidden]{display:none}.pe-base-fontsize{font-size:.875rem}.pe-fontstack{font-family:Open Sans,Calibri,Tahoma,sans-serif}.pe-copy{font-size:1rem;line-height:1.57143rem;color:#252525}.pe-copy--secondary,.pe-label--secondary{color:#6a7070}.pe-copy--small{font-size:.85714rem;line-height:1.42857rem;color:#252525}.pe-copy--large,.pe-heading-level6,h6,header h5+.subtitle{font-size:1.14286rem;line-height:1.71429rem;color:#252525}.pe-paragraph,p{font-size:1rem;line-height:1.57143rem;margin-bottom:.85714rem;margin-top:0;color:#252525}.pe-paragraph--last{margin-bottom:0;color:#252525}.pe-lead{font-size:1.42857rem;line-height:2rem}.pe-lead,.pe-page-title{font-weight:lighter;color:#252525}.pe-page-title{font-size:2.71429rem;line-height:3.71429rem}.pe-heading-level1,.pe-page-title--small,h1{font-size:2rem;line-height:2.71429rem;font-weight:lighter;color:#252525}.pe-heading-level3,.pe-heading-level4,.pe-title,h3,h4,header h2+.subtitle,header h3+.subtitle{font-size:1.42857rem;line-height:1.85714rem;font-weight:400;color:#252525}.pe-heading-level5,.pe-title--small,h5,header h4+.subtitle{font-size:1.28571rem;line-height:1.57143rem;font-weight:400;color:#252525}.pe-heading-level2,.pe-title--large,h2,header h1+.subtitle{font-size:1.71429rem;line-height:2rem;font-weight:400;color:#252525}.pe-page-title--secondary,.pe-title--secondary{color:#6a7070}.pe-label{font-size:1rem;line-height:1.28571rem}.pe-label.pe-label--inverse{color:#fff}.pe-label--secondary.pe-label--inverse{color:#f5f5f5}.pe-label--small{font-size:.85714rem;line-height:1.14286rem}.pe-label--large{font-size:1.14286rem;line-height:1.42857rem}.pe-bold,.pe-label--bold{font-weight:600}.pe-list{margin:12px 0;padding-left:1.85714rem}.pe-list li{font-size:1rem;line-height:1.57143rem;margin-bottom:.42857rem}.pe-list li>ol,.pe-list li>ul{margin-top:.42857rem}.pe-list.pe-styled-lists--ordered{list-style-type:decimal}.pe-list.pe-styled-lists--ordered ol{list-style-type:lower-alpha;padding-left:1.85714rem}.pe-list.pe-styled-lists--ordered ol ol{list-style-type:lower-roman}.pe-list.pe-styled-lists--unordered{list-style-type:disc}.pe-list.pe-styled-lists--unordered ul{list-style-type:circle;padding-left:1.85714rem}.pe-list.pe-styled-lists--unordered ul ul{list-style-type:square}.pe-list.pe-styled-lists-heading--ordered{list-style-type:decimal;margin-top:0}.pe-list.pe-styled-lists-heading--ordered ol{list-style-type:lower-alpha;padding-left:1.85714rem}.pe-list.pe-styled-lists-heading--ordered ol ol{list-style-type:lower-roman}.pe-list.pe-styled-lists-heading--unordered{list-style-type:disc;margin-top:0}.pe-list.pe-styled-lists-heading--unordered ul{list-style-type:circle;padding-left:1.85714rem}.pe-list.pe-styled-lists-heading--unordered ul ul{list-style-type:square}.pe-list--unstyled{list-style:none;padding-left:0}.pe-list--unstyled ul{padding-left:1.85714rem}.pe-heading-level1,h1{margin-bottom:6px}.pe-heading-level2,h2,header h1+.subtitle{margin-bottom:6px}.pe-heading-level3,h3,header h2+.subtitle{font-weight:700;margin-bottom:6px}.pe-heading-level4,h4,header h3+.subtitle{margin-bottom:6px}.pe-heading-level5,h5,header h4+.subtitle{margin-bottom:6px}.pe-heading-level6,h6,header h5+.subtitle{margin-bottom:6px}*+[class^=pe-heading-level]{margin-top:20px}.pe-code{color:#f5f5f5;font-size:1rem;line-height:1.42857rem;background:#005a70;padding:30px 50px}.pe-code,.pe-code-inline,.pe-kbd{font-family:Monaco,Lucida Console,monospace}.pe-code-inline,.pe-kbd{background:#e9e9e9;padding:0 4px}html{font-size:.875rem}body{font-family:Open Sans,Calibri,Tahoma,sans-serif;color:#252525}h1,h2,h3,h4,h5,h6{margin-top:0;margin-bottom:0}*+h1,*+h2,*+h3,*+h4,*+h5,*+h6{margin-top:20px}h1+h2{margin-top:40px}h2+h3,h3+h4,h4+h5,h5+h6{margin-top:6px}header{margin-bottom:20px}header h1+.subtitle{margin-top:34px}aside h1{font-size:1.25rem}aside h2{font-size:1.1rem}aside h3{font-size:1rem}aside h4,aside h5,aside h6{font-size:.8rem}table{width:100%;max-width:100%;margin-bottom:35px;border-collapse:collapse}table td,table th{padding:8px;line-height:1.42857143;vertical-align:top;text-align:left}table thead th{vertical-align:bottom;border-top:0}a{color:#047a9c;text-decoration:underline}a.active,a:active,a:hover{color:#005a70;text-decoration:none}a:focus{color:#005a70;text-decoration:none;-webkit-box-shadow:none;box-shadow:none;outline:2px solid #0b73da;outline-offset:4px}abbr,abbr[title]{text-decoration:none}ins:before{content:"+"}ins:after{content:"+"}mark{background:#ffb81c}small{font-size:.85714rem;line-height:1.14286rem}sub,sup{font-size:90%}sub{top:.2rem}sup{top:-.2rem}pre{max-width:100%;overflow-x:auto}code,kbd,pre{font-family:Monaco,Lucida Console,monospace}:focus{-webkit-box-shadow:none;box-shadow:none;outline:2px solid #0b73da;outline-offset:4px}.pe-selectInput--fancy,.pe-selectInput-fancy-disabled,.pe-selectInput-fancy-error,.pe-selectInput-fancy-readonly,.pe-textInput,.pe-textInput--input_error,.pe-textInput--input_readonly{padding:8px 0 10px;font-size:14px;color:#252525;width:100%;border:none;line-height:18px}.pe-textInput{border-bottom:1px;border-bottom-style:solid;border-bottom-color:#6a7070}.pe-textInput::-webkit-input-placeholder{font-size:14px;color:#c7c7c7}.pe-textInput:-moz-placeholder,.pe-textInput::-moz-placeholder{font-size:14px;color:#c7c7c7}.pe-textInput:-ms-input-placeholder{font-size:14px;color:#c7c7c7}.pe-textInput:focus{outline:none}.pe-input_underline{background-color:#047a9c;display:block;height:4px;-webkit-transform:scaleX(0);transform:scaleX(0);-webkit-transition:all .2s ease;transition:all .2s ease;width:100%;margin-top:-3px}input:focus+.pe-input_underline{-webkit-transform:scale(1);transform:scale(1)}.pe-textLabelInput__label,.pe-textLabelInput__label--label-disabled,.pe-textLabelInput__label--label_error,.pe-textLabelInput__label--label_focus{font-size:12px;line-height:16px;display:block}.pe-textLabelInput__label{color:#6a7070}.pe-textLabelInput__label--label_focus{color:#047a9c}.pe-textLabelInput__label--label_error{color:#db0020}.pe-textLabelInput__label--label-disabled{color:#c7c7c7}input:focus+.pe-inputError_underline{-webkit-transform:scale(1);transform:scale(1)}.pe-inputError_underline{background-color:#db0020;display:block;height:4px;-webkit-transform:scaleX(0);transform:scaleX(0);-webkit-transition:all .2s ease;transition:all .2s ease;width:100%;margin-top:-3px}.pe-textInput--input_error{border-bottom:1px;border-bottom-style:solid;border-bottom-color:#db0020}.pe-textInput--input_error::-webkit-input-placeholder{font-size:14px;color:#c7c7c7}.pe-textInput--input_error:-moz-placeholder,.pe-textInput--input_error::-moz-placeholder{font-size:14px;color:#c7c7c7}.pe-textInput--input_error:-ms-input-placeholder{font-size:14px;color:#c7c7c7}.pe-textInput--input_error:focus{outline:none}.pe-input-wrapper{min-height:52px}.pe-textInput--input_readonly{border-bottom:0;background-color:transparent;font-size:14px;color:#252525;-webkit-appearance:none}.pe-textInput--input_readonly::-webkit-input-placeholder{font-size:14px}.pe-textInput--input_readonly:-moz-placeholder,.pe-textInput--input_readonly::-moz-placeholder{font-size:14px}.pe-textInput--input_readonly:-ms-input-placeholder{font-size:14px}.pe-textInput--input_readonly:focus{outline:none}.pe-input_underline-readonly{background-color:#c7c7c7;display:block;height:4px;-webkit-transform:scaleX(0);transform:scaleX(0);-webkit-transition:all .2s ease;transition:all .2s ease;width:100%;margin-top:-3px}input:focus+.pe-input_underline-readonly{-webkit-transform:scale(1);transform:scale(1)}.pe-textInput-disabled,.pe-textInput:disabled{color:#c7c7c7;font-size:14px;background-color:#fff;border-bottom:4px;border-bottom-style:solid;border-bottom-color:#c7c7c7}.pe-textInput--basic{border:1px solid #c7c7c7;margin-top:6px}.pe-textInput--basic::-webkit-input-placeholder{font-size:14px;color:#c7c7c7}.pe-textInput--basic:-moz-placeholder,.pe-textInput--basic::-moz-placeholder{font-size:14px;color:#c7c7c7}.pe-textInput--basic:-ms-input-placeholder{font-size:14px;color:#c7c7c7}.pe-textInput--basic:focus{border:1px solid #047a9c;-webkit-box-shadow:none;box-shadow:none;outline:2px solid #0b73da;outline-offset:4px}.pe-textInput--basic_error{border:1px solid #db0020;margin-top:6px}.pe-textInput--basic_error::-webkit-input-placeholder{font-size:14px;color:#c7c7c7}.pe-textInput--basic_error:-moz-placeholder,.pe-textInput--basic_error::-moz-placeholder{font-size:14px;color:#c7c7c7}.pe-textInput--basic_error:-ms-input-placeholder{font-size:14px;color:#c7c7c7}.pe-textInput--basic_error:focus{-webkit-box-shadow:none;box-shadow:none;outline:2px solid #0b73da;outline-offset:4px}.pe-textInput--basic:disabled{background-color:#e9e9e9;margin-top:6px}.pe-textInput--basic_readonly{border:0;margin-top:6px}.pe-textInput--basic_readonly::-webkit-input-placeholder{font-size:14px;color:#c7c7c7}.pe-textInput--basic_readonly:-moz-placeholder,.pe-textInput--basic_readonly::-moz-placeholder{font-size:14px;color:#c7c7c7}.pe-textInput--basic_readonly:-ms-input-placeholder{font-size:14px;color:#c7c7c7}.pe-textInput--basic_readonly:focus{-webkit-box-shadow:none;box-shadow:none;outline:2px solid #0b73da;outline-offset:4px}.pe-select-container,.pe-select-container--fancy,.pe-select-container-disabled,.pe-select-container-error,.pe-select-container-fancy-disabled,.pe-select-container-fancy-error,.pe-select-container-fancy-error-focus,.pe-select-container-fancy-focus,.pe-select-container-fancy-readonly,.pe-select-container-focus,.pe-select-container-focus-error,.pe-select-container-readonly{position:relative;display:block;min-width:250px;padding:0}.pe-select-container--fancy svg,.pe-select-container-disabled svg,.pe-select-container-error svg,.pe-select-container-fancy-disabled svg,.pe-select-container-fancy-error-focus svg,.pe-select-container-fancy-error svg,.pe-select-container-fancy-focus svg,.pe-select-container-fancy-readonly svg,.pe-select-container-focus-error svg,.pe-select-container-focus svg,.pe-select-container-readonly svg,.pe-select-container svg{position:absolute;top:5px;bottom:8px;right:14px;pointer-events:none}.pe-select-container--fancy select,.pe-select-container-disabled select,.pe-select-container-error select,.pe-select-container-fancy-disabled select,.pe-select-container-fancy-error-focus select,.pe-select-container-fancy-error select,.pe-select-container-fancy-focus select,.pe-select-container-fancy-readonly select,.pe-select-container-focus-error select,.pe-select-container-focus select,.pe-select-container-readonly select,.pe-select-container select{-webkit-box-sizing:border-box;box-sizing:border-box;width:100%;min-height:34px;margin:0;padding:0 14px;outline:none}.pe-select--basic_error,.pe-selectInput--basic{-webkit-appearance:none;-moz-appearance:none;appearance:none;background-color:#fff;border:1px solid transparent;padding-top:8px}.pe-select-container,.pe-select-container--fancy,.pe-select-container-disabled,.pe-select-container-error,.pe-select-container-fancy-disabled,.pe-select-container-fancy-error,.pe-select-container-fancy-error-focus,.pe-select-container-fancy-focus,.pe-select-container-fancy-readonly,.pe-select-container-focus,.pe-select-container-focus-error,.pe-select-container-readonly,.pe-textInput--basic,.pe-textInput--basic_error,.pe-textInput--basic_readonly{padding:0 14px;height:36px;width:100%;-webkit-box-sizing:border-box;box-sizing:border-box;display:block;border-radius:3px;font-size:14px;line-height:18px;background-color:#fff;color:#252525}.pe-select-container{border:1px solid #c7c7c7;padding:0;margin-top:6px}.pe-select-container select{padding:0 14px}.pe-select-container select:focus{border:1px solid #047a9c;-webkit-box-shadow:none;box-shadow:none;outline:2px solid #0b73da;outline-offset:4px}.pe-select-container select:focus::-ms-value{background:transparent;color:#222}.pe-select-container select::-ms-expand{opacity:0}.pe-selectInput--basic:-moz-focusring{color:transparent;text-shadow:0 0 0 #000}.pe-select-container-focus{border:1px solid transparent;padding:0;margin-top:6px}.pe-select-container-focus select{padding:.3em .3em .3em 14px}.pe-select-container-focus select:focus{border:1px solid #047a9c;-webkit-box-shadow:none;box-shadow:none;outline:2px solid #0b73da;outline-offset:4px}.pe-select-container-focus select:focus::-ms-value{background:transparent;color:#222}.pe-select-container-focus select:focus::-ms-expand{opacity:0}.pe-select-container-error{border:1px solid #db0020;padding:0;margin-top:6px}.pe-select-container-error select{padding:.3em .3em .3em 14px}.pe-select-container-error select:focus{border:1px solid #db0020;-webkit-box-shadow:none;box-shadow:none;outline:2px solid #0b73da;outline-offset:4px}.pe-select-container-error select:focus::-ms-value{background:transparent;color:#222}.pe-select-container-error select::-ms-expand{opacity:0}.pe-select-container-focus-error{border:1px solid transparent;padding:0;margin-top:6px}.pe-select-container-focus-error select{padding:.3em .3em .3em 14px}.pe-select-container-focus-error select:focus{border:1px solid #db0020;-webkit-box-shadow:none;box-shadow:none;outline:2px solid #0b73da;outline-offset:4px}.pe-select-container-focus-error select:focus::-ms-value{background:transparent;color:#222}.pe-select-container-focus-error select::-ms-expand{opacity:0}.pe-select--basic_error{-webkit-appearance:none}.pe-select--basic_error::-webkit-input-placeholder{font-size:14px;color:#c7c7c7}.pe-select--basic_error:-moz-placeholder,.pe-select--basic_error::-moz-placeholder{font-size:14px;color:#c7c7c7}.pe-select--basic_error:-ms-input-placeholder{font-size:14px;color:#c7c7c7}.pe-select--basic_error:focus{outline:none;-webkit-box-shadow:0 0 4px 0 #db0020;box-shadow:0 0 4px 0 #db0020}.pe-select--basic_error:-moz-focusring{color:transparent;text-shadow:0 0 0 #000}.pe-select-container-disabled{outline:none;padding:0;color:#c7c7c7!important;background-color:#e9e9e9!important;-webkit-appearance:none;-moz-appearance:none;appearance:none;margin-top:6px}.pe-select-container-disabled svg{fill:#c7c7c7}.pe-select-container-disabled select{border:1px solid #c7c7c7}.pe-select-container-disabled select:focus{border:1px solid #db0020;-webkit-box-shadow:none;box-shadow:none;outline:2px solid #0b73da;outline-offset:4px}.pe-select-container-disabled select:focus::-ms-value{background:transparent;color:#222}.pe-select-container-disabled select::-ms-expand{opacity:0}.pe-select-container-readonly{padding:0;border:none;-webkit-appearance:none;-moz-appearance:none;appearance:none;margin-top:6px}.pe-select-container-readonly svg{right:8px}.pe-select-container-readonly select{padding:.3em .3em .3em 14px}.pe-select-container-readonly select:focus{border:0;-webkit-box-shadow:none;box-shadow:none;outline:2px solid #0b73da;outline-offset:4px}.pe-select-container-readonly select:focus::-ms-value{background:transparent;color:#222}.pe-select-container-readonly select::-ms-expand{opacity:0}.pe-select-container--fancy{-webkit-appearance:none;-moz-appearance:none;padding:0;border:none}.pe-select-container--fancy svg{right:0;outline:none}.pe-select-container--fancy select{padding:8px 0 10px;outline:none;-webkit-box-shadow:none;box-shadow:none}.pe-select-container--fancy select:focus{outline:none;-webkit-box-shadow:none;box-shadow:none}.pe-select-container--fancy select:focus::-ms-value{background:transparent;color:#222}.pe-select-container--fancy select::-ms-expand{opacity:0}.pe-selectInput--fancy{-webkit-appearance:none;-moz-appearance:none;appearance:none;outline:none;background-color:transparent;padding-top:8px;border-bottom:1px;border-bottom-style:solid;border-bottom-color:#6a7070;border-radius:0}.pe-selectInput--fancy:-moz-focusring{color:transparent;text-shadow:0 0 0 #000}select:focus+.pe-input_underline{-webkit-transform:scale(1);transform:scale(1)}.pe-select-container-fancy-focus{border:none;padding:0}.pe-select-container-fancy-focus svg{right:0}.pe-select-container-fancy-focus select{padding:8px 0 10px;border:none}.pe-select-container-fancy-focus select:focus{outline:none}.pe-select-container-fancy-focus select:focus::-ms-value{background:transparent;color:#222}.pe-select-container-fancy-focus select:focus::-ms-expand{opacity:0}.pe-select-container-fancy-error{background-color:transparent;-webkit-appearance:none;-moz-appearance:none;padding:0}.pe-select-container-fancy-error svg{right:0}.pe-select-container-fancy-error select{padding:8px 0 10px}.pe-select-container-fancy-error select:focus{outline:none;-webkit-box-shadow:none;box-shadow:none}.pe-select-container-fancy-error select:focus::-ms-value{background:transparent;color:#222}.pe-select-container-fancy-error select::-ms-expand{opacity:0}.pe-selectInput-fancy-error{-webkit-appearance:none;-moz-appearance:none;appearance:none;background-color:transparent;padding-top:8px;border-bottom:1px;border-bottom-style:solid;border-bottom-color:#db0020;border-radius:0}.pe-selectInput-fancy-error:-moz-focusring{color:transparent;text-shadow:0 0 0 #000}select:focus+.pe-inputError_underline{-webkit-transform:scale(1);transform:scale(1)}.pe-select-container-fancy-error-focus{border:none;padding:0}.pe-select-container-fancy-error-focus svg{right:0}.pe-select-container-fancy-error-focus select{padding:8px 0 10px}.pe-select-container-fancy-error-focus select:focus{outline:none}.pe-select-container-fancy-error-focus select:focus::-ms-value{background:transparent;color:#222}.pe-select-container-fancy-error-focus select:focus::-ms-expand{opacity:0}.pe-select-container-fancy-disabled{background-color:transparent;-webkit-appearance:none;-moz-appearance:none;appearance:none;padding:0}.pe-select-container-fancy-disabled svg{right:0;fill:#c7c7c7}.pe-select-container-fancy-disabled select{padding:8px 0 10px;color:#c7c7c7;border-bottom:4px;border-bottom-style:solid;border-bottom-color:#c7c7c7}.pe-select-container-fancy-disabled select::-ms-expand{opacity:0}.pe-selectInput-fancy-disabled{padding-top:8px;border:none;border-radius:0}.pe-select-container-fancy-readonly,.pe-selectInput-fancy-disabled{-webkit-appearance:none;-moz-appearance:none;appearance:none;background-color:transparent}.pe-select-container-fancy-readonly{padding:0}.pe-select-container-fancy-readonly svg{right:0}.pe-select-container-fancy-readonly select{padding:8px 0 10px;-webkit-appearance:none;-moz-appearance:none;appearance:none}.pe-select-container-fancy-readonly select::-ms-expand{opacity:0}.pe-selectInput-fancy-readonly{-webkit-appearance:none;-moz-appearance:none;appearance:none;background-color:transparent;padding-top:8px;border:none;border-radius:0}select:focus+.pe-input_underline-readonly{-webkit-transform:scale(1);transform:scale(1)}.pe-multiLineText,.pe-multiLineText--disabled,.pe-multiLineText--error,.pe-multiLineText--readOnly{border:1px solid #c7c7c7;border-radius:3px;font-size:14px;color:#252525;margin-top:6px;line-height:18px;padding:9px 14px;resize:none;width:100%;-webkit-box-sizing:border-box;box-sizing:border-box}.pe-multiLineText--disabled::-webkit-input-placeholder,.pe-multiLineText--error::-webkit-input-placeholder,.pe-multiLineText--readOnly::-webkit-input-placeholder,.pe-multiLineText::-webkit-input-placeholder{font-size:14px;color:#c7c7c7;line-height:18px}.pe-multiLineText--disabled:-moz-placeholder,.pe-multiLineText--disabled::-moz-placeholder,.pe-multiLineText--error:-moz-placeholder,.pe-multiLineText--error::-moz-placeholder,.pe-multiLineText--readOnly:-moz-placeholder,.pe-multiLineText--readOnly::-moz-placeholder,.pe-multiLineText:-moz-placeholder,.pe-multiLineText::-moz-placeholder{font-size:14px;color:#c7c7c7;line-height:18px}.pe-multiLineText--disabled:-ms-input-placeholder,.pe-multiLineText--error:-ms-input-placeholder,.pe-multiLineText--readOnly:-ms-input-placeholder,.pe-multiLineText:-ms-input-placeholder{font-size:14px;color:#c7c7c7;line-height:18px}.pe-multiLineText,.pe-multiLineText--error{background-color:#fff}.pe-multiLineText--error:focus,.pe-multiLineText:focus{-webkit-box-shadow:none;box-shadow:none;outline:2px solid #0b73da;outline-offset:4px;border:1px solid #047a9c;resize:both;overflow:auto}.pe-multiLineText--error{background-color:#fff;border:1px solid #db0020}.pe-multiLineText--error:focus{-webkit-box-shadow:none;box-shadow:none;outline:2px solid #0b73da;outline-offset:4px;resize:both;overflow:auto;border:1px solid #db0020}.pe-multiLineText--disabled{outline:none;color:#e9e9e9;background-color:#e9e9e9}.pe-multiLineText--readOnly{background-color:#fff;border:none}.pe-multiLineText--readOnly:focus{-webkit-box-shadow:none;box-shadow:none;outline:2px solid #0b73da;outline-offset:4px}.pe-input--error_message,.pe-input--info_message{display:block;padding-top:3px;font-size:12px;line-height:16px;margin-bottom:0}.pe-input--error_message{color:#db0020}.pe-input--info_message{color:#6a7070}.pe-checkbox{position:relative;min-height:16px;margin-bottom:14px}.pe-checkbox:last-child{margin-bottom:0}input[type=checkbox]{opacity:0;position:absolute}input[type=checkbox]~span{left:0;top:0;position:absolute;z-index:0;height:16px;width:16px;border:1px solid #c7c7c7;border-radius:2px}input[type=checkbox]~span svg{opacity:0;height:16px;width:16px}input[type=checkbox]:checked~span svg{opacity:1}input[type=checkbox]:focus~span{border:1px solid #047a9c;border-radius:2px;-webkit-box-shadow:none;box-shadow:none;outline:2px solid #0b73da;outline-offset:4px}input[type=checkbox]:disabled~span{background-color:#e9e9e9}input[type=checkbox]:disabled~span svg{fill:#c7c7c7}input[type=checkbox]~label{min-height:18px;display:inline-block;padding-left:28px;line-height:18px;position:relative;z-index:2}.pe-radio{position:relative;min-height:16px;margin-bottom:14px}.pe-radio:last-child{margin-bottom:0}input[type=radio]{opacity:0;position:absolute}input[type=radio]+label{display:inline-block;padding-left:28px;line-height:18px}input[type=radio]~span{display:block;-webkit-box-sizing:content-box;box-sizing:content-box;position:absolute;left:0;top:0;height:5px;width:5px;padding:3px 6px 6px 3px;color:#6a7070;border:1px solid #c7c7c7;border-radius:50%;pointer-events:none}input[type=radio]:focus~span{color:#6a7070;border:1px solid #047a9c;border-radius:50%;-webkit-box-shadow:none;box-shadow:none;outline:2px solid #0b73da;outline-offset:4px}input[type=radio]:disabled~span{color:#c7c7c7;background-color:#e9e9e9}input[type=radio]~span svg{opacity:0;height:8px;width:8px}input[type=radio]:checked~span svg{opacity:1}.pe-textInput__showButton,.pe-textInput__showButton--disabled,.pe-textInput__showButton--error,.pe-textInput__showButton-basic,.pe-textInput__showButton-basic--disabled{position:relative;background-color:none;text-decoration:none;float:right;padding:2px;border:0;color:#047a9c;background:#fff}.pe-textInput__showButton--disabled:focus,.pe-textInput__showButton--error:focus,.pe-textInput__showButton-basic--disabled:focus,.pe-textInput__showButton-basic:focus,.pe-textInput__showButton:focus{text-decoration:underline}.pe-textInput__showButton,.pe-textInput__showButton--error{margin-top:-28px}.pe-textInput__showButton--disabled{margin-top:-35px;color:#c7c7c7}.pe-textInput__showButton-basic{margin-right:14px;margin-top:-28px}.pe-textInput__showButton-basic--disabled{margin-right:14px;margin-top:-28px;color:#c7c7c7;background-color:#e9e9e9}.pe-fieldset{border:none}.pe-legend{opacity:0}::-ms-reveal{display:none}#pe-icons-sprite{display:none}svg[class^=pe-icon--]{display:inline-block;vertical-align:top;fill:currentColor}[class^=pe-btn] svg[class$="-18"],[class^=pe-btn] svg[class$="-24"]{vertical-align:middle;margin-left:.5em;margin-bottom:.3em}svg[class$="-18"]{width:18px;height:18px}svg[class$="-24"]{width:24px;height:24px}svg[class$=font-setting-18]{width:24px;height:18px}svg[class$=font-setting-24]{width:32px;height:24px}svg[class$=new-notification-9]{vertical-align:middle;width:10px;height:10px}@-webkit-keyframes slideInUp{0%{-webkit-transform:translate3d(0,100%,0);transform:translate3d(0,100%,0);visibility:visible}to{-webkit-transform:translateZ(0);transform:translateZ(0)}}@keyframes slideInUp{0%{-webkit-transform:translate3d(0,100%,0);transform:translate3d(0,100%,0);visibility:visible}to{-webkit-transform:translateZ(0);transform:translateZ(0)}}@-webkit-keyframes fadeOutUp{0%{opacity:1}to{opacity:0;-webkit-transform:translate3d(0,-100%,0);transform:translate3d(0,-100%,0)}}@keyframes fadeOutUp{0%{opacity:1}to{opacity:0;-webkit-transform:translate3d(0,-100%,0);transform:translate3d(0,-100%,0)}}@-webkit-keyframes fadeIn{0%{opacity:0}to{opacity:1}}@keyframes fadeIn{0%{opacity:0}to{opacity:1}}@-webkit-keyframes fadeOut{0%{opacity:1}to{opacity:0}}@keyframes fadeOut{0%{opacity:1}to{opacity:0}}.animated{-webkit-animation-duration:1s;animation-duration:1s;-webkit-animation-fill-mode:backwards;animation-fill-mode:backwards}@media screen and (prefers-reduced-motion:reduce){.animated{-webkit-animation:unset!important;animation:unset!important}}.animateIn{-webkit-animation-name:fadeIn;animation-name:fadeIn;-webkit-animation-duration:.5s;animation-duration:.5s}@media (max-width:480px){.animateIn{-webkit-animation-name:slideInUp;animation-name:slideInUp}}.animateOut{-webkit-animation-name:fadeOut;animation-name:fadeOut;-webkit-animation-duration:.2s;animation-duration:.2s}@media (max-width:480px){.animateOut{-webkit-animation-name:fadeOutUp;animation-name:fadeOutUp}}.datepicker-container{position:relative;min-width:150px;width:322px;font-family:Open Sans,Calibri,Tahoma,sans-serif}@media (-ms-high-contrast:none){.datepicker-container{max-width:350px}}.datepicker-container .datepicker{position:relative}.datepicker-container .datepicker .pe-icon-wrapper{bottom:-webkit-calc(50% - 11px);bottom:calc(50% - 11px);color:#6a7070;position:absolute;right:14px}.datepicker-container .datepicker .pe-icon-wrapper button img{top:2px;position:relative}.datepicker-container .calendar-container{margin-top:2px}#inputAriaId{display:none}.error #inputAriaId{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center}.error input{border:1px solid #db0020}.error .pe-textLabelInput__label{color:#db0020}.pe-calendar{-webkit-box-sizing:content-box;box-sizing:content-box;width:280px;min-height:284px;color:#252525;padding:16px 20px 20px;z-index:1;border:1px solid #c7c7c7;background-color:#fff;font-size:14px}@media (-ms-high-contrast:none){.pe-calendar{width:308px}}.pe-calendar fieldset{margin:0;border:0;padding:0}.pe-calendar .pe-cal-actions{display:-webkit-inline-box;display:-webkit-inline-flex;display:-ms-inline-flexbox;display:inline-flex;width:80px}.pe-calendar .pe-cal-title{padding:8px;text-align:left;margin-bottom:8px;width:-webkit-calc(100% - 84px);width:calc(100% - 84px);display:inline-block;float:left;font-size:18px}.pe-calendar .pe-arrowIcons{cursor:pointer;height:40px;color:#6a7070;text-align:center;width:40px;display:inline}.pe-calendar .pe-arrowIcons:hover{color:#252525}.pe-calendar .pe-arrowIcons:focus{color:#252525;outline:none}.pe-calendar .pe-arrowIcons:focus:after{border:2px solid #0b73da;content:"";position:absolute;border-radius:0;width:-webkit-calc(100% + -4px);width:calc(100% + -4px);height:-webkit-calc(100% + -4px);height:calc(100% + -4px);top:0;left:0;z-index:1}.pe-calendar .pe-cal-weekdays div{height:40px;color:#6a7070;line-height:40px;font-size:12px}.pe-calendar .pe-cal-row{display:grid;grid-template-columns:repeat(7,40px);clear:both}.pe-calendar .pe-cal-cell{display:inline-block;vertical-align:top;text-align:center;width:40px}.pe-calendar .pe-cal-cell button{padding:0;border:0;position:relative;cursor:pointer;display:block}.pe-calendar .pe-cal-cell button.currentDate-box{width:36px;height:36px;margin:1px;line-height:36px;border-radius:0;padding:0;border:1px solid #c7c7c7;background:transparent}.pe-calendar .pe-cal-cell button.currentDate-box .pe-cal-cell-square{margin:2px}.pe-calendar .pe-cal-cell button.pe-cal-selected .pe-cal-cell-square{font-weight:600;color:#fff;background-color:#6a7070}.pe-calendar .pe-cal-cell-square{height:32px;width:32px;margin:4px;line-height:32px;border-radius:16px}.pe-calendar .pe-cal-date.pe-cal-past{height:40px;line-height:38px}.pe-calendar .pe-cal-past .pe-cal-cell-square{color:#c7c7c7;cursor:not-allowed}.pe-calendar .secondary-date{border:1px solid #c7c7c7}.pe-calendar.inverse{color:#fff;background-color:#005a70;border:1px solid #005a70}.pe-calendar.inverse .pe-arrowIcons,.pe-calendar.inverse .pe-cal-cell-square,.pe-calendar.inverse .pe-cal-title,.pe-calendar.inverse .pe-cal-weekdays div{color:#fff}.pe-calendar.inverse .pe-arrowIcons:focus,.pe-calendar.inverse .pe-arrowIcons:hover{color:#c7c7c7}.pe-calendar.inverse .pe-cal-date .pe-cal-selected .pe-cal-cell-square{color:#252525;background-color:#fff}.pe-calendar.inverse .pe-cal-past .pe-cal-cell-square{color:#047a9c;cursor:not-allowed}.pe-icon--btn{padding:0;background-color:transparent;border:0;position:relative}.pe-icon-wrapper button{color:#6a7070;cursor:pointer}@media (-ms-high-contrast:none){.pe-icon-wrapper{bottom:-webkit-calc(50% - 12px)!important;bottom:calc(50% - 12px)!important}}.date-selector{background:none}.date-selector:hover{background-color:#e9e9e9;color:#252525;cursor:pointer}.date-selector.selected{background-color:#6a7070;color:#fff}.currentDate-box{border:1px solid #c7c7c7} :host {width:322px;}
</style>      
    <div class="datepicker-container">
        <label class="pe-textLabelInput__label" for="datepicker">Select date (mm/dd/yyyy)</label> 
        <div class="datepicker">
            <input type="text" class="pe-textInput--basic" id="datepicker" aria-expanded="false">
            <span class="pe-icon-wrapper">
                <button class="pe-icon--btn open-calendar" aria-label="open calendar">
				               <img src="${calendarIcon}" aria-hidden="true"/>
                </button>
            </span>
        </div> 
        <p id="inputAriaId" class="pe-input--error_message">${warningIcon} Enter a valid date.</p>
    </div>
`;

  calendar.innerHTML = `
        <section class="calendar-container animated animateIn">
            <div class="pe-calendar ">
                <fieldset class="pe-inner">
                    <legend class="pe-cal-title pe-title--small" id="pe-cal-month"></legend>
                    <div class="pe-cal-actions">
                        <button class="pe-arrowIcons pe-icon--btn previous" aria-label="Previous month">
                           <img src="${prevArrowIcon}" aria-hidden="true"/>
                        </button>
                        <button class="pe-arrowIcons pe-icon--btn next" aria-label="Next month">
                            <img src="${nextArrowIcon}" aria-hidden="true"/>
                        </button>
                    </div>
                    <div class="pe-cal-row pe-cal-weekdays">
                        <div class="pe-cal-cell pe-label--small pe-cal-cell-dayNames ">
                            <abbr title="Sunday">S</abbr>
                        </div>
                        <div class="pe-cal-cell pe-label--small pe-cal-cell-dayNames ">
                            <abbr title="Monday">M</abbr>
                        </div>
                        <div class="pe-cal-cell pe-label--small pe-cal-cell-dayNames ">
                            <abbr title="Tuesday">T</abbr>
                        </div>
                        <div class="pe-cal-cell pe-label--small pe-cal-cell-dayNames ">
                            <abbr title="Wednesday">W</abbr>
                        </div>
                        <div class="pe-cal-cell pe-label--small pe-cal-cell-dayNames ">
                            <abbr title="Thursday">T</abbr>
                        </div>
                        <div class="pe-cal-cell pe-label--small pe-cal-cell-dayNames ">
                            <abbr title="Friday">F</abbr>
                        </div>
                        <div class="pe-cal-cell pe-label--small pe-cal-cell-dayNames ">
                            <abbr title="Saturday">S</abbr>
                        </div>
                    </div>
                    <div class="pe-cal-dates"></div>
                </fieldset>
            </div>
        </section>
`

  row.innerHTML = `
<div class="pe-cal-row"></div>
`

  dateTemplate.innerHTML = `
 <div class="pe-cal-cell pe-cal-date">
      <button class="date-selector pe-cal-cell-square start" data-date="11/01/2018" aria-label="" aria-pressed="false">1</button>
  </div>
  `

  if (w.ShadyCSS) w.ShadyCSS.prepareTemplate(datepicker, 'pearson-datepicker');

  function getFocusableElements(node) {
    const buttons = node.querySelectorAll('button:not(:disabled)'),
      data = {};
    data.elements = buttons;
    data.firstElement = data.elements[0];
    data.lastElement = data.elements[data.elements.length - 1];
    return data;
  }

  function validateDate(testdate) {
    var date_regex = /^\d{2}\/\d{2}\/\d{4}$/ ;
    return date_regex.test(testdate);
  }

  // helpers
  class Datepicker extends HTMLElement {
    static get observedAttributes() {
      return ['open', 'year', 'month', 'day', 'value'];
    }

    get open() {
      return this.getAttribute('open');
    }

    get year() {
      return this.getAttribute('year');
    }

    get month() {
      return this.getAttribute('month');
    }

    get day() {
      return this.getAttribute('day');
    }

    get selected() {
      return this.getAttribute('value');
    }

    set monthYearState(str) {
      this.shadowRoot.querySelector('legend').innerHTML = str
    }
    set openState(bool) {
      this.setAttribute('open', bool)
    }

    set invalid(bool) {
      const datepicker = this.shadowRoot.querySelector('.datepicker-container'),
        input = datepicker.querySelector('input');
      if (bool === false) {
        datepicker.classList.add('error');
      } else {
        this.selectedState = input.value;
        this.data.month = parseInt(input.value.substring(0,2) - 1,10)
        this.data.year = parseInt(input.value.substring(6,10), 10)
        this.data.day = input.value.substring(3,5)
        console.log(this.data)
        datepicker.classList.remove('error')
      }

    }

    set selectedState(selected) {
      if (selected !== null) {
        const input = this.shadowRoot.querySelector('input');
        this.setAttribute('value', selected)
        input.value = this.selected
        this.data.month = parseInt(this.selected.substring(0,2) - 1,10)
        this.data.year = parseInt(this.selected.substring(6,10), 10)
        this.data.day = this.selected.substring(3,5)
      }
    }

    // this data is fed to the calendar data function and is used to build the calendar object
    returnDateData(date, type) {
      // return the year to populate calendar
      if (this.year !== null && type === undefined) {
        date.year = parseInt(this.year, 10);
      } else if (type !== undefined) {
        date.year = date.year;
      } else {
        date.year = parseInt(moment().format('Y'), 10);
      }

      // return the month to populate calendar
      if (this.month !== null && type === undefined) {
        date.month = parseInt(this.month - 1, 10);
      } else if (type !== undefined) {
        if (type === 'add') {
          date.month = date.month + 1
          if (date.month === 12) {
            date.month = 0
            date.year = date.year + 1;
          }
        } else if (type === 'subtract') {
          // date.month = moment().subtract(date.month, 'month').month();
          date.month = date.month -1
          if (date.month === -1) {
            date.month = 11
            date.year = date.year - 1;
          }
        }
      } else {
        date.month = moment().month();
      }

      // return the day to populate calendar
      if (this.day !== null) {
        date.day = this.day;
      } else {
        date.day = moment().format('D');
      }
      return date
    }

    // builds the calendar object to power the UI
    returnCalendarData(returnData) {
      let data = returnData,
        date = moment([data.year, data.month]),
        firstDay = moment(date).startOf('M').day('Sunday'),
        endDay = moment(date).endOf('M').day('Saturday'),
        monthRange = moment.range(firstDay, endDay),
        weeks = [],
        calendar = [],
        build = [],
        calendarData = {};

      for (let day of monthRange.by('days')) {
        let number;
        if (weeks.indexOf(day.week()) === -1 && weeks.indexOf(53) === -1) {
          if (data.month === 11 && day.week() === 1) {
            number = 53
          } else {
            number = day.week();
          }
          weeks.push(number);
        }
      }

      weeks.forEach((week, index) => {
        const weeknumber = weeks[index];
        let firstWeekDay = moment(firstDay).week(weeknumber).day('Sunday');
        if (firstWeekDay.isBefore(firstDay)) {
          firstWeekDay = firstDay;
        }
        let lastWeekDay = moment(endDay).year(data.year).week(weeknumber).day('Saturday');
        if (lastWeekDay.isAfter(endDay)) {
          lastWeekDay = endDay;
        }
        let weekRange = moment.range(firstWeekDay, lastWeekDay);
        calendar.push(weekRange)
      });

      calendar.forEach(range => {
        const weeks = [];
        for (let day of range.by('days')) {
          weeks.push(day)
        }
        build.push(weeks);
      });
      calendarData.month = moment(date).startOf('M').format("MMMM");
      calendarData.year = data.year;
      calendarData.weeks = build;
      return calendarData
    }

    // builds and renders next month
    nextMonth() {
      this.data = this.returnDateData(this.data, 'add');
      this.renderCalendar(this.data);
    }

    // builds and renders previous month
    prevMonth() {
      this.data = this.returnDateData(this.data, 'subtract');
      this.renderCalendar(this.data);
    }

    // opens the calendar
    openCalendar() {
      this.openState = 'true'
      this.renderCalendar(this.data);
      this.focusOnOpen();
    }

    // closes the calendar
    closeCalendar() {
      this.openState = 'false'
      this.openBtn.focus();
    }

    // builds the calendar template
    buildCalendarContainer() {
      const calendarTemplate = calendar.content.cloneNode(true),
        nextBtn = calendarTemplate.querySelector('.next'),
        prevBtn = calendarTemplate.querySelector('.previous');

      nextBtn.addEventListener('click', this.nextMonth, false);
      prevBtn.addEventListener('click', this.prevMonth, false);

      return calendarTemplate;
    }

    // populates and renders the calendar
    renderCalendar(dateData) {
      const data = this.returnCalendarData(dateData),
        rowTarget = this.shadowRoot.querySelector('.pe-cal-dates');

      rowTarget.innerHTML = ''

      data.weeks.forEach((week, index2) => {
        const rowTemplate = row.content.cloneNode(true),
          rows = rowTemplate.querySelector('.pe-cal-row');

        week.forEach((days, index) => {
          const cellTemplate = dateTemplate.content.cloneNode(true),
            button = cellTemplate.querySelector('button');
          if (days.format('MMMM') === data.month) {
            button.innerHTML = days.format('D');
            button.setAttribute('aria-label', days.format('dddd, MMMM Do YYYY'))
            button.setAttribute('data-date', days.format('L'))
            button.setAttribute('data-index', days.format('D'));
            button.addEventListener('click', event => {
              const prevSelected = rowTarget.getElementsByClassName('selected')[0];
              if (prevSelected !== undefined) {
                prevSelected.classList.remove('selected');
                prevSelected.setAttribute('aria-pressed', false);
              }
              this.selectedState = event.target.getAttribute('data-date');
              event.target.setAttribute('aria-pressed', true);
              event.target.classList.add('selected');
              this.invalid = validateDate(this.input.value);
              this.closeCalendar();
            })
          } else {
            button.remove();
          }

          if (days.format('MMMM') === moment().format('MMMM') && moment().format('D') === days.format('D') && days.format('YYYY') === moment().format('YYYY')) {
            button.parentNode.classList.add('currentDate-box')
            button.setAttribute('aria-label', 'Today ' + days.format('dddd, MMMM Do YYYY'))
          }
          rows.appendChild(cellTemplate)
        });
        rowTarget.appendChild(rowTemplate)
      });
      this.monthYearState = data.month + ' ' + data.year
      const selectedNode = this.shadowRoot.querySelector(`[data-date="${this.selected}"]`);
      if (selectedNode !== null) {
        selectedNode.classList.add('selected');
      }
    }

    // focus management when calendar is opened
    focusOnOpen() {
      if (this.selected === null) {
        const currentNode = this.shadowRoot.querySelector('.currentDate-box button');
        if (currentNode !== null) {
          currentNode.focus();
          currentNode.setAttribute('aria-pressed', true)
        }
      } else {
        const selectedNode = this.shadowRoot.querySelector(`[data-date="${this.selected}"]`);
        if (selectedNode !== null) {
          selectedNode.classList.add('selected');
          selectedNode.focus();
          selectedNode.setAttribute('aria-pressed', true)

        }
      }
    }

    constructor() {
      super();
      this.attachShadow({
        mode: 'open'
      });
      const clone = datepicker.content.cloneNode(true);
      this.openBtn = clone.querySelector('.open-calendar');
      this.datepicker = clone.querySelector('.datepicker-container');
      this.input = clone.querySelector('input');
      this.data = {};
      /** After all this, we can append our clone to the shadowRoot */
      this.shadowRoot.appendChild(clone);

      this.returnDateData = this.returnDateData.bind(this);
      this.buildCalendarContainer = this.buildCalendarContainer.bind(this);
      this.returnCalendarData = this.returnCalendarData.bind(this);
      this.nextMonth = this.nextMonth.bind(this);
      this.prevMonth = this.prevMonth.bind(this);
      this.renderCalendar = this.renderCalendar.bind(this);
      this.closeCalendar = this.closeCalendar.bind(this);
      this.openCalendar = this.openCalendar.bind(this);
      this.focusOnOpen = this.focusOnOpen.bind(this);
    }

    connectedCallback() {
      this.setAttribute('open', false)
      this.data = this.returnDateData(this.data);
      this.selectedState = this.selected
      // opens calendar when down arrow is pushed
      this.input.addEventListener('keydown', event => {
        switch (event.keyCode) {
          case 40:
            if (this.open === 'false') {
              this.openCalendar();
            }
            break
        }
      });

      this.input.addEventListener('blur', event => {
        if (this.input.value.length > 0) {
          this.invalid = validateDate(this.input.value);
        }
      });

      // opens calendar when button is pressed
      this.openBtn.addEventListener('click', event => {
        if (this.open === 'false') {
          this.openCalendar();
        } else {
          this.closeCalendar();
        }
      });

      doc.body.addEventListener('click', event => {
        console.log(event.target)
      })

    }

    attributeChangedCallback(name, oldValue, newValue) {
      const calendarContainer = this.datepicker.querySelector('.calendar-container'),
        input = this.datepicker.querySelector('input');
      if (name === 'open') {
        if (oldValue !== newValue) {
          if (newValue === 'true') {
            input.setAttribute('aria-expanded', true)
            let calendarTemplate = this.buildCalendarContainer();
            const dates = calendarTemplate.querySelector('.pe-cal-dates');
            this.datepicker.appendChild(calendarTemplate);
            this.monthYearState = moment().month(this.data.month).format('MMMM') + ' ' + this.data.year

            // closes the calendar if outside the calendar target
            doc.addEventListener('click', event => {
                if (this.open === 'true') {
                  let target = event.target;
                  do {
                    if (target === this) {
                      return;
                    }
                    target = target.parentNode;
                  } while (target);
                  this.closeCalendar();
                } else {
                return false
                }
            }, true);

            // closes the calendar on escape
            doc.addEventListener('keydown', event => {
              switch (event.keyCode) {
                case 27:
                  this.closeCalendar();
                  break;
              }
            });

            // keyboard navigation for accessibility
            dates.addEventListener('keydown', event => {
              const nextItem = parseInt(event.target.getAttribute('data-index')),
                prevItem = parseInt(event.target.getAttribute('data-index')) - 2,
                nextWeek = parseInt(event.target.getAttribute('data-index')) + 6,
                prevWeek = parseInt(event.target.getAttribute('data-index')) - 8,
                previousMonth = this.datepicker.querySelector('.previous');

              event.preventDefault();
              event.stopImmediatePropagation();
              switch (event.keyCode) {
                case 39: // right arrow
                  if (this.shadowRoot.activeElement === getFocusableElements(dates).lastElement) {
                    this.nextMonth();
                    getFocusableElements(dates).firstElement.focus();
                  } else {
                    if (getFocusableElements(dates).elements[nextItem] !== undefined) {
                      getFocusableElements(dates).elements[nextItem].focus();
                    } else {
                      return
                    }
                  }
                  break;
                case 37: // left arrow
                  if (this.shadowRoot.activeElement === getFocusableElements(dates).firstElement) {
                    this.prevMonth();
                    getFocusableElements(dates).lastElement.focus();

                  } else {
                    if (getFocusableElements(dates).elements[prevItem] !== undefined) {
                      getFocusableElements(dates).elements[prevItem].focus();
                    } else {
                      return
                    }
                  }
                  break;
                case 40: //arrow down
                  if (getFocusableElements(dates).elements[nextWeek] !== undefined) {
                    getFocusableElements(dates).elements[nextWeek].focus();
                  } else {
                    this.nextMonth();
                    getFocusableElements(dates).firstElement.focus();
                  }
                  break;
                case 38: // arrow up
                  if (getFocusableElements(dates).elements[prevWeek] !== undefined) {
                    getFocusableElements(dates).elements[prevWeek].focus();
                  } else {
                    this.prevMonth();
                    getFocusableElements(dates).lastElement.focus();
                  }
                  break;
                case 13: // enter
                  event.target.click();
                  break;
                case 32: // space
                  event.target.click();
                  break;
                case 33:
                  this.prevMonth();
                  getFocusableElements(dates).lastElement.focus();
                  break;
                case 34:
                  this.nextMonth();
                  getFocusableElements(dates).firstElement.focus();
                  break;
                case 35:
                  getFocusableElements(dates).lastElement.focus();
                  break;
                case 36:
                  getFocusableElements(dates).firstElement.focus();
                  break;
                case 27:
                  this.closeCalendar();
                  break;
                case 9:
                  previousMonth.focus();
                  break;
              }
            })
          }
          if (newValue === 'false' && calendarContainer !== null) {
            calendarContainer.remove();
            input.setAttribute('aria-expanded', false)
          }
        }
      }
    }


  }
  customElements.define('pearson-datepicker', Datepicker);
})(window, document);
