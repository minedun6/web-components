'use strict';

class Footer extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    const currentDoc = document.querySelector('link[href$="footer.html"]').import;
    const template = currentDoc.querySelector('#template');
    const clone = document.importNode(template.content, true);
    this._renderFooter(clone);
    this.shadowRoot.appendChild(clone);
  }

  _renderFooter(parentNode){
    let nologo = true,
        footerLinks, styleTemplate, styleClone,
        liNode = [],
        aNode = [];

    const urlArray = this.getAttribute('url').split(','),
          textArray = this.getAttribute('text').split(',');
    const arrayLength = urlArray.length<textArray.length?urlArray.length:textArray.length;

    const footerBody = parentNode.querySelector('.pe-footer');

    const currentDoc = document.querySelector('link[href$="footer.html"]').import;

    if (this.hasAttribute('type')) {
      const footerType = this.getAttribute('type');  

      switch(footerType) {
        case 'glp':
          footerBody.classList.add('pe-footer--glp');
          styleTemplate = currentDoc.querySelector('#glpStyles');
          break;
        case 'lightText':
          footerBody.classList.add('pe-footer--light');
          styleTemplate = currentDoc.querySelector('#lightStyles');
          break;
        case 'logo':
          nologo = false;
          styleTemplate = currentDoc.querySelector('#logoStyles');
          break;
        default:
          return;
      }
      styleClone = document.importNode(styleTemplate.content, true);
      footerBody.parentNode.insertBefore(styleClone, footerBody.nextSibling);
    } 

    const selector = nologo?'#noLogo':'#withLogo';
    const innerTemplate = currentDoc.querySelector(selector);
    const innerClone = document.importNode(innerTemplate.content, true);
    footerBody.appendChild(innerClone);

    footerLinks = footerBody.querySelector('ul');
    for (let i = 0; i < arrayLength; i ++) {
      aNode[i] = document.createElement("A");
      aNode[i].innerHTML = textArray[i];
      aNode[i].setAttribute('href', urlArray[i]);
      aNode[i].setAttribute('target', '_blank');
      liNode[i] = document.createElement("LI");
      liNode[i].appendChild(aNode[i]);
      footerLinks.appendChild(liNode[i]);
    }
  }
}

customElements.define('pearson-footer', Footer);