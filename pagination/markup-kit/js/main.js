(function() {
  'use strict';
  // handle some button clicks on the pagination
  const init = function(){
    // set up the current page and type
    this.activePage = parseInt(this.getAttribute("data-active-page"))
    this.type = this.getAttribute("data-type")
    this.totalPages = parseInt(this.getAttribute("data-pages-total"))
    this.label = this.getAttribute("data-label")
    this.plural = this.getAttribute("data-label-plural")

    // set up eventing
    setupEvents.bind(this)()

    // set up the data model for non-compact
    if(this.type !== "compact"){
      this.maxButtons = parseInt(this.getAttribute("data-max-buttons"))
      buildModel.bind(this)()
    }

    // render appropriately
    render.bind(this)()

    // check actives during setup
    checkActive.bind(this)()
  }

  const buildModel = function(){
    this.model = []
    // like this: [firstPage,1,2,3,4,5,lastPage] where numbered buttons
    // change to be either a button or an ellipsis based on the rules

    // if the maxButtons is >= totalPages, display all pages
    if(this.maxButtons >= this.totalPages){
      for(let i=1;i<=this.totalPages;i++){
        this.model.push({
          active : this.activePage == i ? true : false,
          page : i
        })
      }
    } else {
      // always push the first page
      this.model.push({
        active : this.activePage == 1 ? true : false,
        page : 1
      })

      var start = this.activePage < this.maxButtons ? 1 : this.activePage > this.totalPages-(this.maxButtons-2) ? this.totalPages - this.maxButtons : this.activePage - 2
      for(let i=0;i<this.maxButtons;i++){
        // if the activePage > maxButtons, ellipis goes first
        if(this.activePage >= this.maxButtons && i === 0){
          this.model.push({
            ellipsis : true
          })
        }
        // if the activePage <= totalPages, ellipsis goes last
        else if(this.activePage < this.totalPages-3 && i === this.maxButtons-1){
          this.model.push({
            ellipsis : true
          })
        } else {
          start += 1
          this.model.push({
            page : start,
            active : this.activePage == start ? true : false
          })
        }
      }
      // always push the last page, because maxButtons < totalPages
      this.model.push({
        active : this.activePage == this.totalPages ? true : false,
        page : this.totalPages
      })
    }
  }

  const setupEvents = function(){
    // this = nav group
    const prevBtn = this.querySelector("button:first-child"),
          nextBtn = this.querySelector("button:last-child")

    // set up labels
    prevBtn.setAttribute("aria-label", "Previous "+this.label)
    nextBtn.setAttribute("aria-label", "Next "+this.label)

    prevBtn.addEventListener("click", e => {
      e.preventDefault()
      this.clicked = e.currentTarget
      this.changeButton = false
      move.bind(this)(e, "prev")
    })
    nextBtn.addEventListener("click", e => {
      e.preventDefault()
      this.clicked = e.currentTarget
      this.changeButton = false
      move.bind(this)(e, "next")
    })
  }

  const render = function(){
    if(this.type !== "compact"){
      // use the model to render the buttons
      // take off old buttons first and then re-insert all into the DOM
      const oldButtons = this.querySelectorAll("button, a")
      // TODO: this seems like a memory leak... should remove old buttons better
      this.innerHTML = ""
      // insert first button
      this.appendChild(oldButtons[0])
      this.model.forEach((item,i) => {
        oldButtons[i+1].remove()
        let newButton = document.createElement("a")
        newButton.setAttribute("href", "#")
        if(item.ellipsis){
          newButton.innerHTML = '<svg focusable="false" role="img"><use xlink:href="#ellipsis-18"></use></svg>'
          newButton.setAttribute("disabled", "disabled")
          newButton.setAttribute("aria-label", "Additional "+this.plural)
        } else {
          let span = document.createElement("span")
          span.textContent = item.page
          newButton.appendChild(span)
          if(item.active){
            newButton.setAttribute("aria-current", this.label)
          }
          newButton.setAttribute("aria-label", this.label+" "+item.page)
          newButton.addEventListener("click", e => {
            console.log("clicked")
            e.preventDefault()
            this.activePage = parseInt(e.currentTarget.querySelector("span").textContent)
            this.clicked = e.currentTarget
            this.changeButton = true
            buildModel.bind(this)()
            render.bind(this)()
          })
        }
        this.appendChild(newButton)
      })
      // insert last button
      this.appendChild(oldButtons[oldButtons.length - 1])
    } else {
      this.querySelector(".current-page").textContent = this.activePage
      this.querySelector(".total-pages").textContent = this.totalPages
    }

    // re-insert focus on the target
    if(this.clicked){
      var Button = this.clicked
      if(this.changeButton){
        const buttons = this.querySelectorAll("button, a")
        buttons.forEach((button, i) => {
          if(button.querySelector("span") && this.activePage == button.querySelector("span").textContent){
            Button = button
          }
        })
      }
      Button.focus()
    }

  }

  const move = function(e, way){
    const newPage = way == "next" ? this.activePage + 1 : this.activePage - 1
    this.activePage = newPage
    if(this.type !== "compact"){
      // rebuild the model
      buildModel.bind(this)()
    }
    render.bind(this)()
    checkActive.bind(this)()
  }

  const checkActive = function(){
    // check the active buttons
    const prevBtn = this.querySelector("button:first-child"),
          nextBtn = this.querySelector("button:last-child")

    // check previous
    if(prevBtn.getAttribute("disabled") !== null && this.activePage !== 1){
      prevBtn.removeAttribute("disabled")
    } else if(this.activePage === 1) {
      prevBtn.setAttribute("disabled", "disabled")
    }

    // check next
    if(nextBtn.getAttribute("disabled") !== null && this.activePage !== this.totalPages){
      nextBtn.removeAttribute("disabled")
    } else if(this.activePage === this.totalPages) {
      nextBtn.setAttribute("disabled", "disabled")
    }
  }

  // grab the pagination containers and then containerize based on each nav
  const groups = document.querySelectorAll("nav.pagination")

  groups.forEach(function(item){
    // where item == a nav group
    // bind item to have "this" represent the nav
    // in the web component, this should happen more naturally
    init.bind(item)()
  })

})();
