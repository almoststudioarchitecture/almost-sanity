let grid = document.body.classList.contains("grid") ? true : false;

let drawingCount = 0;
// let visibleDrawings = 0;
let startPathWeight = window.innerWidth * 0.1;
let drawPathWeight = startPathWeight;
let gridPathWeight = 30;
let pathWeight;
if (grid){
  pathWeight = gridPathWeight;
} else {
  pathWeight = drawPathWeight;
}
let maxPathCount = 4; //8

// variables for simplifying path
const inputTolerance = 200;
const inputPrecision = 0;
function round(value) {
  return value.toFixed(inputPrecision.valueAsNumber)
}
function pointsToPath(points) {
  return 'M' + points.map(function (p) { return round(p.x || p[0] || 0) + ',' + round(p.y || p[1] || 0) }).join('L')
}
const pastPoints = [];
let points;
let originalPath;
let simplifySvgPathPath;
let x, y, prevX, prevY;
let dragging = false;
let mouseIsDown = false;

let newProjectDragCreated = false;

//Cursor
const cursor = document.getElementById("cursor");
document.addEventListener("mousemove", function(e){
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
})


// Make sure it's always left click not right click
var rightMouseClicked = false;

function handleMouseDown(e) {
  //e.button describes the mouse button that was clicked
  // 0 is left, 1 is middle, 2 is right
  if (e.button === 2) {
    rightMouseClicked = true;
  } 
}

function handleMouseUp(e) {
  if (e.button === 2) {
    rightMouseClicked = false;
  }
  // console.log(rightMouseClicked);
}


// document.body.addEventListener("load", function(){
//   console.log("loaded");
// })


document.addEventListener('mousedown', handleMouseDown);
document.addEventListener('mouseup', handleMouseUp);
// document.addEventListener('contextmenu', function(e) {
//     // e.preventDefault();
// });


// Create the SVG element and set its attributes
const svgContainer = document.getElementById('svgContainer');

// shuffle the svg elements
shuffleNodes(svgContainer);

const svgWrappers = document.querySelectorAll('#svgContainer > div:not(.extra-div)');
const projectCount = svgWrappers.length;
const links = document.querySelectorAll('#projectLinks li');


// hover function
for (let link of links){
  link.addEventListener("mouseenter", function(){
    cursor.classList.add("hidden");
    let projectSlug = link.getAttribute("data-slug");
    svgContainer.querySelector(`[data-slug="${projectSlug}"]`).classList.add("hover");
  })
  link.addEventListener("mouseleave", function(){
    cursor.classList.remove("hidden");
    let projectSlug = link.getAttribute("data-slug");
    svgContainer.querySelector(`[data-slug="${projectSlug}"]`).classList.remove("hover");
  })
}

// reading cookie data
// for (let svgWrapper of svgWrappers){
//   let slug = svgWrapper.getAttribute("data-slug");
//   let dVal = getCookie(slug);
//   for (let path of svgWrapper.querySelectorAll("path")){
//     path.setAttribute("d", dVal)
//   }
// }

// Save model SVG
const svgNS = 'http://www.w3.org/2000/svg';

// I don't think we need this but keeping just in case it bugs:
// const modelSvg = document.getElementById('modelSvg');
// modelSvg.setAttribute('width', window.innerWidth);
// modelSvg.setAttribute('height', window.innerHeight);

// change the size of the shadow to the full width of the browser
const shadowFilter = document.getElementById('shadowFilter');
shadowFilter.setAttribute('width', window.innerWidth);
shadowFilter.setAttribute('height', window.innerHeight);

// Variable to create new svgs from
let newSvg, paths, currentSvgWrapper;

// Variable to store the path data
let pathData = '';
let cookieData = '';
let cookieLength = 0;
let cookieProjectNames = [];

// Event listeners for mouse events
// svgContainer.addEventListener('mousedown', startDrawing);
// svgContainer.addEventListener('mousemove', draw);

assignNewSvg();

svgContainer.addEventListener('mousedown', function(){
  if (!rightMouseClicked){
    mouseIsDown = true;
  }
});

svgContainer.addEventListener('mousemove', function(event){
  if (mouseIsDown){
    dragging = true;
    if (!newProjectDragCreated){startDrawing(event)}
    draw(event);
  }
});

svgContainer.addEventListener('mouseup', function(event){
  mouseIsDown = false;
  dragging = false;
  
  if (newProjectDragCreated){
    newProjectDragCreated = false;
    stopDrawing()
  } else if (grid){
    console.log(event.target);
    transition_GridToProject(event.target, event.clientY);
  }
});

// Function to start the drawing
function startDrawing(event) {

  if (grid){
    currentSvgWrapper = event.target.closest(".svgWrapper");
  }

  // currentSvgWrapper = event.target.closest(".svgWrapper");
  if (currentSvgWrapper){
    
    currentSvgWrapper.classList.add("drawing-in-here");
    currentSvgWrapper.classList.remove("hidden");
  }

      // make sure cursor is targeting right areas
      const targetTag = event.target.tagName;
      if (targetTag != 'H1' && targetTag != 'H2' && targetTag != 'A'){
          if (!grid){

              // if user has reached the max number of path, start over
              console.log(drawingCount, maxPathCount);
              if (drawingCount%maxPathCount == 0){
                console.log("max path count reached");
                resetSvgs();
              }

              else {
                currentSvgWrapper.classList.remove("hidden");
              }

              // if it's the first time user is drawing, change the nav
              // if(drawingCount==0){
              //     nav.classList.remove("pre-drawing");
              // }

              // for each of the two paths in each svg
              for (let path of paths){
                path.setAttribute("d", "");
                path.style.strokeWidth = pathWeight + "px";
              }

              // used for drawing
              pathData = `M${event.offsetX},${event.offsetY}`;
              
              // used for simplifying at the end
              points = [[event.offsetX, event.offsetY]]
              // pastPoints.push(points);

              // draw(event);

          } else {

              // everything is a third the size
              pathWeight = gridPathWeight*3.333;
              
              newSvg = currentSvgWrapper.querySelector("svg");
              paths = newSvg.querySelectorAll('path');
              for (let path of paths){
                path.setAttribute("d", "");
                path.style.strokeWidth = pathWeight + "px";
              }
              pathData = `M${event.offsetX*3.333},${event.offsetY*3.333}`;

              points = [[event.offsetX*3.333, event.offsetY*3.333]]
              // pastPoints.push(points);

              // if it's click or draw
              // console.log("click");

          }
      }
    // draw(event); // Call draw initially to start drawing from the mouse's current position
  // }
  newProjectDragCreated = true;

}

// Function to draw on the SVG
function draw(event) {

  dragging = true;

  cursorPrompt.style.display = "none";
  svgContainer.classList.add("drawing");

  if (!pathData) return;

  if (x != event.clientX && x%5 == 0){
    prevX = x;
  }

  if (y != event.clientY && y%5 == 0){
    prevY = y;
  }

    if (x != event.offsetX && y != event.offsetY){
        x = event.offsetX;
        y = event.offsetY;
    
        if (!grid){
          pathData += ` L${x},${y}`;
          
          if (x%2 == 0){
            points.push([x, y])
          }
          
        } else {
          pathData += ` L${x*3.333},${y*3.333}`;

          if (x%2 == 0){
            points.push([x*3.333, y*3.333])
          }
        }
    }

    for (let path of paths){
      path.setAttribute('d', pathData);
    }

}


const projectNamesElem = document.getElementById("projectLinks")

// Function to stop the drawing
function stopDrawing(event) {


  // console.log("stop drawing: ")
  // console.log(currentSvgWrapper);


  svgContainer.classList.remove("drawing");
  document.querySelector(".drawing-in-here").classList.remove("drawing-in-here")
  currentSvgWrapper.classList.add("complete");

  if (projectNamesElem.querySelector(".most-recent")!= null){
    // console.log("something with most recent exists")
    projectNamesElem.querySelector(".most-recent").classList.remove("most-recent");
  }
  let nameElem = projectNamesElem.querySelector(`[data-slug="${currentSvgWrapper.getAttribute("data-slug")}"]`);
  projectNamesElem.classList.add("visible");
  projectNamesElem.style.top = `calc(var(--navHeight) * ${drawingCount%maxPathCount+2} + ${drawingCount%maxPathCount+2}px)`
  nameElem.classList.add("most-recent");
  nameElem.style.order = 1 - drawingCount;
  nameElem.classList.add("visible");
  nameElem.style.zIndex = drawingCount;
  console.log(nameElem);
  console.log("changed z index, " + drawingCount);
  nameElem.style.animationDelay = 150 * drawingCount + "ms";
//   let simplifiedPath = simplifySvgPath(points, { tolerance: inputTolerance, precision: inputPrecision });
//   cookieLength += simplifiedPath.length;

  cookieProjectNames.push(currentSvgWrapper.getAttribute("data-slug"));

  while (document.cookie.length > 4090){
    // deleteCookie(cookieProjectNames[0]);
    cookieProjectNames.shift();
  }

  drawingCount++;
  // visibleDrawings++;
  // if (!grid){
    drawPathWeight *= 0.85;
  // }

  if (drawingCount%maxPathCount == 0){
    // visibleDrawings = 0;
    drawPathWeight = startPathWeight;
  }
  if (!grid){
    pathWeight = drawPathWeight;
  }

    assignNewSvg();

}

function resetSvgs(){
  for (let div of document.querySelectorAll(".complete")){
    div.classList.add("hidden");
    div.classList.remove("complete");
  }
  for (let li of document.querySelectorAll("#projectLinks li.visible")){
    li.classList.remove("visible");
    li.removeAttribute("style");
  }
  projectNamesElem.style.top = `calc(var(--navHeight) * ${drawingCount%maxPathCount+2} + ${drawingCount%maxPathCount+2}px)`
}

function assignNewSvg(){

  if (!grid){
    currentSvgWrapper = svgWrappers[drawingCount%projectCount];
    currentSvgWrapper.style.zIndex = drawingCount;
    // console.log("new current svg wrapper")
    // console.log(currentSvgWrapper)
    // currentSvgWrapper.classList.remove("hidden");
    currentSvgWrapper.classList.remove("complete");

   

    newSvg = currentSvgWrapper.querySelector("svg");

    console.log(currentSvgWrapper, newSvg)

    paths = newSvg.querySelectorAll('path');
    for (let path of paths){
      path.style.strokeWidth = pathWeight * 1.4 + "px";
    }

  } else {
    pathWeight = gridPathWeight;
  }

  cursor.style.width = pathWeight + "px";
  cursor.style.height = pathWeight + "px";

  pathData = ''; // Reset the path data

}


const projectsButton = document.getElementById("navLink_projects");
projectsButton.addEventListener("click", function(e){
    e.preventDefault();
    makeGrid();
})

const drawButton = document.getElementById("navLink_draw");
drawButton.addEventListener("click", function(e){
    e.preventDefault();
    makeDraw();
})


function makeGrid(){
    document.body.classList.add("grid");
    // turn this back on
    window.history.pushState({"pageTitle":"Projects"},"", "/projects/");
    grid = true;

    pathWeight = gridPathWeight;
    cursor.style.width = pathWeight + "px";
    cursor.style.height = pathWeight + "px";

    for (let image of document.querySelectorAll("image")){
      image.setAttribute("width", window.innerWidth/3 + "px");
      image.setAttribute("height", window.innerHeight/3 + "px");
    }
}

if (document.querySelector("main.page-projects")){
  makeGrid();
}

function makeDraw(){
    document.body.classList.remove("grid");
    window.history.pushState({"pageTitle":"Home"},"", "/");
    grid = false;

    pathWeight = drawPathWeight;
    cursor.style.width = pathWeight + "px";
    cursor.style.height = pathWeight + "px";

    for (let image of document.querySelectorAll("image")){
      image.setAttribute("width", window.innerWidth + "px");
      image.setAttribute("height", window.innerHeight + "px");
    }
}

function showFullImage(){
    svgContainer.classList.toggle("fullImages");
    document.body.classList.toggle("showingFullImages");
}

function transition_GridToProject(targetElement, cursorY) {
  console.log("transition to project");
  let items = document.querySelectorAll('.svgWrapper');
  let index = Array.from(items).indexOf(targetElement);

  // If the target element is not a grid-item, return
  if (index === -1) return;

  let column = (index % 3) + 1; // Assuming you have 3 columns
  console.log('This item is in column ' + column);

  document.body.classList.add("transition-to-project");

  targetElement.classList.add("transfer-target-thumb");

  // Check the row in relation to the horizontal lines
  let line1Top = document.getElementById('line-h1').getBoundingClientRect().top;
  let line2Top = document.getElementById('line-h2').getBoundingClientRect().top;

  setTimeout(function(){
    
    if (column == 1){
      document.getElementById("line-v1").style.right = "-1px";
      document.getElementById("line-v2").style.right = "-1px";
    } else if (column == 2){
      document.getElementById("line-v1").style.right = "100vw";
      document.getElementById("line-v2").style.right = "-1px";
    } else if (column == 3){
      document.getElementById("line-v1").style.right = "100vw";
      document.getElementById("line-v2").style.right = "100vw";
    }

    if (cursorY < line1Top) {
        console.log('Cursor is above the first line');
        document.getElementById("line-h1").style.bottom = "-1px";
        document.getElementById("line-h2").style.bottom = "-1px";
    } else if (cursorY < line2Top) {
        console.log('Cursor is between the two lines');
        document.getElementById("line-h1").style.bottom = "100vh";
        document.getElementById("line-h2").style.bottom = "-1px";
    } else {
        console.log('Cursor is below the second line');
        document.getElementById("line-h1").style.bottom = "100vh";
        document.getElementById("line-h2").style.bottom = "100vh";
    }

  }, 400)

  setTimeout(function(){
    let urlExtension = targetElement.getAttribute("data-href"); // This is just a placeholder; replace with your actual URL extension
        // Ensure there's no trailing slash
    // let currentPath = window.location.pathname;
    // if (currentPath.endsWith('/')) {
    //     currentPath = currentPath.slice(0, -1);
    // }

    // console.log(window.location.origin, currentPath, urlExtension);

    window.location.href = window.location.origin + urlExtension;
  },1000)

  

  

// If the target element is not a grid-item, return
if (index === -1) return;
  
  
  // ... any other transition code you have
}


//////////////////////////////////////
// TRANSITION TO PROJECT USING AJAX //
//////////////////////////////////////

// let isAnimating = false;

// document.addEventListener('click', function(event) {
//   if (event.target.getAttribute('data-type') === 'page-transition') {
//      event.preventDefault();
//      // detect which page has been selected
//      var newPage = event.target.getAttribute('href');
//      // if the page is not animating - trigger animation
//      if (!isAnimating) changePage(newPage, true);
//   }
// });

// function changePage(url, bool) {
//   isAnimating = true;
//   // trigger page animation
//   document.body.classList.add('page-is-changing');
//   // ...
//   loadNewContent(url, bool);
//   // ...
// }

// function loadNewContent(url, bool) {
//   var newSectionName = 'cd-' + url.replace('.html', '');
//   // var newSectionName = 'main'
//   var temp = document.createElement('div');
//   // temp.className = 'cd-main-content ' + newSectionName;

//   var xhr = new XMLHttpRequest();
//   xhr.open('GET', url, true);
//   xhr.onreadystatechange = function() {
//      if (xhr.readyState === 4 && xhr.status === 200) {
//         // load new content and replace <main> content with the new one
//         temp.innerHTML = xhr.responseText;
        
//         temp.querySelector('.section.hero').style.visibility="hidden";
        
//         setTimeout(function(){
//           const styleElems = temp.querySelectorAll('link[rel="stylesheet"]')
//           for (let styleElem of styleElems){
//             document.head.appendChild(styleElem);
//           }
//           document.querySelector('main').innerHTML = temp.querySelector('main').innerHTML;
//           // ...
//           document.body.classList.remove('page-is-changing');
//           // ...
  
//           if (url !== window.location) {
//              // add the new page to the window.history
//              window.history.pushState({ path: url }, '', url);
//           }
//         },1200)
        
//      }
//   };
//   xhr.send();
// }

// window.addEventListener('popstate', function() {
//   var newPageArray = location.pathname.split('/');
//   // this is the url of the page to be loaded 
//   var newPage = newPageArray[newPageArray.length - 1];
//   if (!isAnimating) changePage(newPage);
// });












//////////////////////////
//   HELPER FUNCTIONS   //
//////////////////////////

function shuffleNodes(parentElem){
    var nodeList = parentElem.childNodes;
    var itemsArr = [];
    for (var i in nodeList) {
        if (nodeList[i].nodeType == 1) { // get rid of the whitespace text nodes
            itemsArr.push(nodeList[i]);
        }
    }

    shuffle(itemsArr);

    for (i = 0; i < itemsArr.length; ++i) {
      parentElem.appendChild(itemsArr[i]);
    }
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
      [array[i], array[j]] = [array[j], array[i]];
    }
}
