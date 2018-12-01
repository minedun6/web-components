(function(w, doc) {
  'use strict';

  /**
   * Wraps an element inside another.
   * @param {HTMLElement} el The element to wrap
   * @param {HTMLElement} wrapper The element to be wrapped
   */
  function wrap(el, wrapper) {
    el.parentNode.insertBefore(wrapper, el);
    wrapper.appendChild(el);
  }

  /**
   * Determine if animations should run.
   * Checks for `prefers-reduced-motion media query`,
   * as well as `data-prefers-reduced-motion` attribute on the html element.
   */
  function animationEnabled() {
    return !(
      w.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      doc.documentElement.hasAttribute('data-prefers-reduced-motion')
    );
  }

  const template = doc.createElement('template');
  template.innerHTML = `
  <div id="coachmark" class="coachmark" data-dismiss-type="">
			<div class="coachmark-content">
				<h2>Hello</h2>
				<p>Lorem ipsum</p>
				<button type="button" id="dismiss"></button>
			</div>
		</div>
  `;
  const CLOSE_IMG_ICON = `
  <img
    src="data:image/svg+xml;utf8,%3Csvg xmlns=&quot;http://www.w3.org/2000/svg&quot; viewBox=&quot;0 0 18 18&quot;%3E%3Cpath d=&quot;M10.4066,9 L13.7086,5.698 C14.0976,5.31 14.0976,4.68 13.7086,4.291 C13.3196,3.903 12.6906,3.903 12.3016,4.291 L8.9996,7.593 L5.6976,4.291 C5.3096,3.903 4.6796,3.903 4.2916,4.291 C3.9026,4.68 3.9026,5.31 4.2916,5.698 L7.5936,9 L4.2916,12.302 C3.9026,12.69 3.9026,13.32 4.2916,13.709 C4.4856,13.903 4.7406,14 4.9946,14 C5.2496,14 5.5036,13.903 5.6976,13.709 L8.9996,10.407 L12.3016,13.709 C12.4966,13.903 12.7506,14 13.0056,14 C13.2596,14 13.5146,13.903 13.7086,13.709 C14.0976,13.32 14.0976,12.69 13.7086,12.302 L10.4066,9 Z&quot;%3E%3C/path%3E%3C/svg%3E" 
    aria-hidden="true"
    class="pe-icon--remove-sm-18"
  >`;


  /**
   * @property {HTMLElement} mainEl The root coachmark element
   * @property {HTMLElement} dismissBtn The button that closes the coachmark 
   * @property {HTMLElement} trigger The element that opened the coachmark
   * @property {Boolean} isAnimated Whether transitions animate
   */
  const coachmark = {
    mainEl: undefined,
    dismissBtn: undefined,
    trigger: undefined,
    isAnimated: undefined
  };

  function setPosition(el, anchor) {

    // TODO: Handle complex position scenarios
    const anchorRect = anchor.getBoundingClientRect();
    const coachPosition = {
      top: anchorRect.top + w.pageYOffset,
      left: anchorRect.left + w.pageXOffset,
      bottom: anchorRect.bottom + w.pageYOffset,
      right: anchorRect.right + w.pageXOffset,
      get computedTop() {
        return this.top - el.scrollHeight;
      }
    };

    el.style.left = coachPosition.left + 'px';
    el.style.top = coachPosition.computedTop + 'px';
  }

  function renderCoachmark(template, opts) {
    const clone = template.content.cloneNode(true);
    const type = opts.type;

    coachmark.mainEl = clone.firstElementChild;
    coachmark.dismissBtn = clone.querySelector('#dismiss');
    coachmark.isAnimated = opts.animated && animationEnabled();

    coachmark.mainEl.setAttribute('data-dismiss-type', type);

    if (type === 'link') {
      const pseudoFloatWrapper = doc.createElement('div');
      pseudoFloatWrapper.style.textAlign = 'right';

      coachmark.dismissBtn.classList.add('dismiss-link');
      coachmark.dismissBtn.textContent = 'Dismiss';

      wrap(coachmark.dismissBtn, pseudoFloatWrapper);
    }
    if (type === 'button') {
      // TODO: change to input type=image

      coachmark.dismissBtn.setAttribute('aria-label', 'Close coachmark');
      coachmark.dismissBtn.classList.add('pe-icon--btn');
      coachmark.dismissBtn.innerHTML = CLOSE_IMG_ICON;
    }

    if (coachmark.isAnimated) {
      coachmark.mainEl.classList.add('coachmark.isAnimated');
      coachmark.mainEl.classList.add('fadeInFast');

      coachmark.mainEl.addEventListener('animationend', handleAnimationEnd);
    }

    coachmark.dismissBtn.addEventListener('click', handleDismissClick);

    doc.body.appendChild(clone);
    setPosition(coachmark.mainEl, coachmark.trigger);

    if (!coachmark.isAnimated) {
      coachmark.dismissBtn.focus();
    }
  }

  function destroyCoachmark() {
    coachmark.mainEl.remove();
    coachmark.trigger.focus();
  }

  function handleTriggerClick(e) {
    coachmark.trigger = e.target;

    const { type, animated } = e.target.dataset;
    const opts = {
      type,
      animated: animated !== undefined
    };

    renderCoachmark(template, opts);
  }

  function handleDismissClick() {
    coachmark.mainEl.classList.add('fadeOutFast');

    if (!coachmark.isAnimated) {
      destroyCoachmark();
    }
  }

  function handleAnimationEnd(e) {
    if (e.animationName === 'fadeInFast') {
      coachmark.dismissBtn.focus();
    }
    if (e.animationName === 'fadeOutFast') {
      destroyCoachmark();
    }
  }

  doc.addEventListener('DOMContentLoaded', function() {
    const triggers = doc.querySelectorAll('button[data-type]');

    triggers.forEach(function(trigger) {
      trigger.addEventListener('click', handleTriggerClick);
    });
  });
})(window, document);
