console.log("it works");

let scrolled = false;

const infoElem = document.querySelector(".info");
const heroElem = document.querySelector(".hero")

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


document.addEventListener("scroll", function(){
    scrolled = true;
})