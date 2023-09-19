console.log("it works");

let scrolled = false;

const galleryImages = document.querySelectorAll(".section.gallery img")


const infoElem = document.querySelector(".info");
const heroElem = document.querySelector(".hero")
const mainElem = document.querySelector("main")

infoElem.addEventListener("mouseenter", function(){
    if (!scrolled){    
        heroElem.style.marginTop = "-20px"; 
    }
})

heroElem.addEventListener("mouseenter", function(){
    if (!scrolled){    
        heroElem.style.marginTop = "0px";
    }
})


mainElem.addEventListener("scroll", function(){
    scrolled = true;

    // console.log(mainElem.scrollTop, infoElem.offsetTop, infoElem.offsetHeight)
    if (infoElem.offsetTop + infoElem.offsetHeight - 100 < mainElem.scrollTop){
        document.body.classList.add("inverted")
    } else {
        document.body.classList.remove("inverted")
    }
})




const scrollContainer = document.querySelector('main');
const targetElement = document.querySelector('.info');

scrollContainer.addEventListener('scroll', function() {
  // Get position of the element relative to the viewport
//   console.log("scrolling");
  const rect = targetElement.getBoundingClientRect();
  
  // If the element is at the top of the viewport (with some tolerance for floating point inaccuracies)
  if (Math.abs(rect.top) < 35) {
    // Element is snapped to the top, enable its internal scrolling
    targetElement.style.overflowY = 'scroll';
  } else {
    // Element is not at the top, disable its internal scrolling
    targetElement.style.overflowY = 'hidden';
  }
});

const rect = targetElement.getBoundingClientRect();
  // If the element is at the top of the viewport (with some tolerance for floating point inaccuracies)
  if (Math.abs(rect.top) < 35) {
    // Element is snapped to the top, enable its internal scrolling
    targetElement.style.overflowY = 'scroll';
  } else {
    // Element is not at the top, disable its internal scrolling
    targetElement.style.overflowY = 'hidden';
  }