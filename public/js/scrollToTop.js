window.onload = function() {
  window.scrollTo(0, 0);
  console.log("scrolled");
  let projectInnerElem = document.querySelector(".projectInner");
  if (projectInnerElem != null){
    projectInnerElem.scrollTo(0, 0);
  }
  };

  console.log("test");

  window.scrollTo(0, 0);
  console.log("scrolled");
  let projectInnerElem = document.querySelector(".projectInner");
  if (projectInnerElem != null){
    projectInnerElem.scrollTo(0, 0);

    document.addEventListener("scroll", function(){
      // console.log("scrolling inside document")
      // console.log(window.scrollY, projectInnerElem, projectInnerElem.scrollTop)
    })
    projectInnerElem.addEventListener("scroll", function(){
      // console.log("scrolling inside project inner")
      // console.log(projectInnerElem, projectInnerElem.scrollTop);
    })
  }

