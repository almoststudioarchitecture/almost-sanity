let grid = document.body.classList.contains("grid") ? true : false;

let drawingCount = 0;
let visibleDrawings = 0;
let startPathWeight = window.innerWidth * 0.1;
let pathWeight = startPathWeight;
let maxPathCount = 8;

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

//Cursor
const cursor = document.getElementById("cursor");
document.addEventListener("mousemove", function(e){
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
})

// Create the SVG element and set its attributes
const svgContainer = document.getElementById('svgContainer');

// shuffle the svg elements
shuffleNodes(svgContainer);

const svgWrappers = document.querySelectorAll('#svgContainer > div');
const projectCount = svgWrappers.length;
const links = document.querySelectorAll('#projectLinks li');


// hover function
for (let link of links){
  link.addEventListener("mouseenter", function(){
    cursor.classList.add("hidden");
    console.log(link);
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
svgContainer.addEventListener('mousedown', startDrawing);
svgContainer.addEventListener('mousemove', draw);
svgContainer.addEventListener('mouseup', stopDrawing);

assignNewSvg();

// Function to start the drawing
function startDrawing(event) {
  // make sure cursor is targeting right areas
  const targetTag = event.target.tagName;
  if (targetTag != 'H1' && targetTag != 'H2' && targetTag != 'A'){
    if (!grid){

        // if user has reached the max number of path, start over
        if (drawingCount%maxPathCount == 0){
          resetSvgs();
        }

        // if it's the first time user is drawing, change the nav
        if(drawingCount==0){
            nav.classList.remove("pre-drawing");
        }

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

    } else {

        // everything is a third the size
        pathWeight = 30*3.333;
        currentSvgWrapper = event.target.closest(".svgWrapper");
        newSvg = currentSvgWrapper.querySelector("svg");
        paths = newSvg.querySelectorAll('path');
        for (let path of paths){
          path.setAttribute("d", "");
          path.style.strokeWidth = pathWeight + "px";
        }
        pathData = `M${event.offsetX*3.333},${event.offsetY*3.333}`;

        points = [[event.offsetX*3.333, event.offsetY*3.333]]
        // pastPoints.push(points);

    }

    cursorPrompt.style.display = "none";
    svgContainer.classList.add("drawing");
    draw(event); // Call draw initially to start drawing from the mouse's current position

  }
}

// Function to draw on the SVG
function draw(event) {

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
  svgContainer.classList.remove("drawing");
  currentSvgWrapper.classList.add("complete");

  console.log(currentSvgWrapper);
  if (projectNamesElem.querySelector(".most-recent")!= null){
    projectNamesElem.querySelector(".most-recent").classList.remove("most-recent");
  }

  let nameElem = projectNamesElem.querySelector(`[data-slug="${currentSvgWrapper.getAttribute("data-slug")}"]`);
  projectNamesElem.classList.add("visible");
  projectNamesElem.style.bottom = `calc(var(--navHeight) * ${drawingCount+1})`
  nameElem.classList.add("most-recent");
  nameElem.style.order = drawingCount;
//   let simplifiedPath = simplifySvgPath(points, { tolerance: inputTolerance, precision: inputPrecision });
//   cookieLength += simplifiedPath.length;

  cookieProjectNames.push(currentSvgWrapper.getAttribute("data-slug"));

  while (document.cookie.length > 4090){
    // deleteCookie(cookieProjectNames[0]);
    cookieProjectNames.shift();
  }

  drawingCount++;
  visibleDrawings++;
  if (!grid){
    pathWeight *= 0.85;
  }

  if (drawingCount%maxPathCount == 0){
    visibleDrawings = 0;
    pathWeight = startPathWeight;
  }

    assignNewSvg();

  
}

function resetSvgs(){
  for (let div of document.querySelectorAll(".complete")){
    div.classList.add("hidden");
  }
}

function assignNewSvg(){

  if (!grid){

    currentSvgWrapper = svgWrappers[drawingCount%projectCount];
    currentSvgWrapper.classList.remove("hidden");
    currentSvgWrapper.classList.remove("complete");

    newSvg = currentSvgWrapper.querySelector("svg");

    paths = newSvg.querySelectorAll('path');
    for (let path of paths){
      path.style.strokeWidth = pathWeight * 1.4 + "px";
    }

  } else {
    pathWeight = 30;
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


function makeGrid(){
    document.body.classList.add("grid");
    window.history.pushState({"pageTitle":"Projects"},"", "/projects/");
    grid = true;

    pathWeight = 30;
    cursor.style.width = pathWeight + "px";
    cursor.style.height = pathWeight + "px";

    for (let image of document.querySelectorAll("image")){
      image.setAttribute("width", window.innerWidth/3 + "px");
      image.setAttribute("height", window.innerHeight/3 + "px");
    }
}

function makeDraw(){
    document.body.classList.remove("grid");
    grid = false;
    for (let image of document.querySelectorAll("image")){
      image.setAttribute("width", window.innerWidth + "px");
      image.setAttribute("height", window.innerHeight + "px");
    }
}

function showFullImage(){
    svgContainer.classList.toggle("fullImages");
    document.body.classList.toggle("showingFullImages");
}





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
