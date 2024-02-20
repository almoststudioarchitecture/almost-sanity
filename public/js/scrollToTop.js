window.onload = function() {
    window.scrollTo(0, 27);
    console.log("scrolled");
    let projectInnerElem = document.querySelector(".projectInner");
    if (projectInnerElem != null){
      projectInnerElem.scrollTo(0, 0);
    }
  };