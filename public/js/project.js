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

    console.log(mainElem.scrollTop, infoElem.offsetTop, infoElem.offsetHeight)
    if (infoElem.offsetTop + infoElem.offsetHeight - 100 < mainElem.scrollTop){
        document.body.classList.add("inverted")
    } else {
        document.body.classList.remove("inverted")
    }
})


