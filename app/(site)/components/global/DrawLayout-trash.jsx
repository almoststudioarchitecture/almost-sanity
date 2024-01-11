'use client'

import React, { useEffect, useState, ReactNode } from 'react';
import p5 from 'p5'; // Assuming you've installed p5 as a module
import { getProjects } from "@/sanity/sanity.query";
// import type { ProjectType } from "@/types";
import Script from 'next/script';
import DrawCursor from '../DrawCursor';
import ProjectListItem from "../ProjectListItem";
import styles from '../../css/Home.module.css';

const DrawLayout = ({ children }) => {
  // ... existing state and functions
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const fetchedProjects = await getProjects();
        shuffleArray(fetchedProjects);
        setProjects(fetchedProjects);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, []); // 

// Function to shuffle an array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Shuffle the projects array for display
const shuffledProjects = [...projects]; // Clone the projects array
shuffleArray(shuffledProjects);



  useEffect(() => {


    if (projects.length > 0) {
    // document.addEventListener('DOMContentLoaded', () => {
const canvases = document.querySelectorAll(".canvas-container");
console.log(canvases);
const cursorElement = document.getElementById("cursor");
let shuffledIndices = shuffleIndices(canvases);
console.log(shuffledIndices);
let sketches = [];

console.log('hello');

let canvasCounter = 0;
let strokeCounter = 0;
let currentSketch = null;
let startWeight = 300;
let weightDiff = 60;
let gridWeight = 80;
let shadowHeightDark = 8;
let shadowHeightLight = 10;

const maxSketches = 8;

console.log(window.location.href);




// Iterate through shuffled indices and initialize sketches
// Iterate through shuffled indices and initialize sketches
shuffledIndices.forEach((index, idx) => {
    let container = canvases[index];

    // Assign zIndex based on the position in the shuffled array.
    // If you want the first canvas in the shuffled order to have the highest zIndex,
    // you can subtract the position from the total length of the array.
    // console.log(container);
    // container.style.zIndex = idx;
    // container.setAttribute("data-idx", idx)
    // console.log(container)

    let newSketch = new p5((p) => initializeSketch(p, container));
    sketches.push(newSketch);
});


canvases.forEach(canvas => {
    canvas.style.display = 'none';
});
// Display only the first canvas in the shuffled order
if (shuffledIndices.length > 0) {
    canvases[shuffledIndices[0]].style.display = 'block';
}

function initializeSketch(p, container) {
        // console.log(container)
        // container.style.zIndex = container.getAttribute("data-idx");

        let path = [];
        let mousePressedOverCanvas = false;
            // let path;
            let currentWeight = startWeight;
            const strokeShrinkStart = 3;
            let strokeShrink = strokeShrinkStart;

            let img;
            // let imageUrl = canvases[shuffledIndices[canvasCounter]].getAttribute("data-href");

            let maskGraphics;
            let imageDrawn = false;
            let cnvImage;
        // let sketch = function(p) {


            // cursorElement.style.width = currentWeight + "px";
            // cursorElement.style.height = currentWeight + "px";
            

            p.preload = function() {
                // Load the image for this particular sketch
                let imageUrl = container.getAttribute("data-href");
                img = p.loadImage(imageUrl);
            };

            p.setup = function() {
                // let targetCanvasElement = container.querySelector(canvas);
                var cnv = p.createCanvas(p.windowWidth, p.windowHeight);
                // resizeCanvas
                cnv.parent(container.id);
                console.log(container.id);
                maskGraphics = p.createGraphics(p.windowWidth, p.windowHeight);
                maskGraphics.clear();
                p.strokeJoin(p.ROUND);


                path = []; // Initialize a new empty path for this sketch instance
                imageDrawn = false; // Reset the imageDrawn flag for each new canvas

                // Add event listeners after the canvas has been created
                p.canvas.addEventListener("mousedown", function(event) {
                    // Check if the mouse is over the canvas
                    if (event.target === p.canvas || p.canvas.contains(event.target)) {
                        mousePressedOverCanvas = true;
                        p.loop();

                        // add drawing class to body
                        document.body.classList.add("mousedown")
                    }
                });

                p.noLoop();
                p.canvas.p5instance = p;

            };

            p.draw = function() {
                // console.log("drawing");
                if (p !== currentSketch) {
                    return; // Only draw if this is the current sketch
                }
                if (!mousePressedOverCanvas) {
                    p.noLoop(); // Optional: Additional safety to ensure noLoop is called if mouse is not pressed
                }
                if (!imageDrawn) {
                    drawImageCover(img, p.width, p.height);
                    cnvImage = p.get();
                    cnvImage.loadPixels();
            
                    if (cnvImage.pixels.length > 0) {
                        imageDrawn = true;
                    }
                }
            
                if (imageDrawn) {
                    p.clear();
                    if (mousePressedOverCanvas) {
                        updateStrokeProperties();
                        addPointToPath(p.mouseX, p.mouseY);
                    }
            
                    drawPathsOnMask(maskGraphics, path, currentWeight);
            
                    if (!isReordered){
                        let displayImage = cnvImage.get();
                        displayImage.mask(maskGraphics);
                        p.image(displayImage, 0, 0, p.width, p.height);
                    } else {
                        p.background('white');
                        let whiteImage = p.get();
                        p.clear();
                        whiteImage.mask(maskGraphics);
                        p.image(whiteImage, 0, 0, p.width, p.height);
                    }
            
                    p.push();
                    p.blendMode(p.HARD_LIGHT);
                    p.image(maskGraphics, 0, 0, p.width, p.height);
                    p.pop();
                }
            };

            document.addEventListener("mouseup", function(event) {
                mousePressedOverCanvas = false;

                // remove drawing class to body
                document.body.classList.remove("mousedown")

                
            
                if (p.canvas && (event.target === p.canvas || p.canvas.contains(event.target))) {
                    if (p === currentSketch) {
                        let slug = container.getAttribute("data-slug");

                        let corresponding_lis = document.querySelectorAll(`.list-container [data-slug="${slug}"]`)
                        // console.log(corresponding_lis);
                        for (mostRecent of document.querySelectorAll(".home--mostRecent")){
                            mostRecent.classList.remove("home--mostRecent");
                        }
                        for (li of corresponding_lis){
                            li.classList.add("home--visible");
                            li.classList.add("home--mostRecent");
                            li.style.order = 99999 - canvasCounter;
                        }

                        p.canvas.style.pointerEvents = 'none';
                        // startWeight -= 20;
                        startWeight *= 0.86;
                
                        if (canvasCounter < canvases.length - 1) {
                            // Proceed to the next canvas
                            canvasCounter++;
                            strokeCounter++;
                            currentSketch = sketches[shuffledIndices[canvasCounter]];
                            canvases[shuffledIndices[canvasCounter]].style.display = 'block';
                        } else {
                            // Reset and start over
                            console.log('No more canvases left. Resetting...');
                            if (!isReordered){
                                canvasCounter = 0;
                                // shuffledIndices = shuffleIndices(canvases);
                                // shuffledIndices.forEach((index, idx) => {
                                //     let container = canvases[index];
                                //     container.style.zIndex = strokeCounter + idx;
                                // });
                                
                                currentSketch = sketches[shuffledIndices[canvasCounter]];
                                // currentSketch = sketches[shuffledIndices[canvasCounter]];
                                canvases[shuffledIndices[canvasCounter]].style.display = 'block';


                            }
                        }
                    }
                }
            
                if (currentSketch) {
                    p.noLoop();
                }
            });



            
            p.mousePressed = function() {
                if (mousePressedOverCanvas) {
                    path = []; // Clear the existing path and start a new one
                    currentWeight = startWeight;
                    strokeShrink = strokeShrinkStart;
                }
            };

            function drawPathsOnMask(graphics, path, weight) {
                graphics.clear();
                drawNonLinearShadows(graphics, path, weight, shadowHeightLight, 127, 235, -1);
                drawNonLinearShadows(graphics, path, weight, shadowHeightDark, 127, 80, 1);
                drawPathWithOffset(graphics, path, weight, 127, 0);
            }

            function drawNonLinearShadows(graphics, path, weight, shadowHeight, startColor, endColor, yOffsetMultiplier) {
                for (let i = shadowHeight; i >= 0; i--) {
                    let ratio = i / shadowHeight;
                    let nonLinearRatio = p.pow(ratio, shadowHeight === shadowHeightLight ? 1.6 : 2);
                    let colorValue = p.map(nonLinearRatio, 0, 1, startColor, endColor);
                    drawPathWithOffset(graphics, path, weight, colorValue, i * yOffsetMultiplier);
                }
            }

            function drawPathWithOffset(graphics, path, weight, c, yOffset) {
                graphics.stroke(c, c, c);
                graphics.strokeWeight(weight);
                graphics.noFill();

                if (path.length > 1) {
                    graphics.beginShape();
                    graphics.curveVertex(path[0].x, path[0].y + yOffset); 
                    for (let point of path) {
                        graphics.curveVertex(point.x, point.y + yOffset);
                    }
                    graphics.curveVertex(path[path.length - 1].x, path[path.length - 1].y + yOffset);
                    graphics.endShape();
                }
            }

            function addPointToPath(x, y) {
                const point = { x, y };
                if (path.length === 0 || p.dist(x, y, path[path.length - 1].x, path[path.length - 1].y) >= 3) {
                    path.push(point);
                }
            }

            function updateStrokeProperties() {
                strokeShrink = p.max(strokeShrink - 0.1, 0);
                if (isReordered){
                    currentWeight = gridWeight;
                } else {
                    currentWeight = p.max(currentWeight - strokeShrink, startWeight - weightDiff);
                }
                // cursorElement.style.width = currentWeight + "px";
                // cursorElement.style.height = currentWeight + "px";
            }

            function drawImageCover(theImg, canvasWidth, canvasHeight) {
                let canvasRatio = canvasWidth / canvasHeight;
                let imageRatio = theImg.width / theImg.height;
                let drawWidth, drawHeight, drawX, drawY;

                if (canvasRatio > imageRatio) {
                    drawWidth = canvasWidth;
                    drawHeight = theImg.height * (canvasWidth / theImg.width);
                    drawX = 0;
                    drawY = (canvasHeight - drawHeight) / 2;
                } else {
                    drawHeight = canvasHeight;
                    drawWidth = theImg.width * (canvasHeight / theImg.height);
                    drawX = (canvasWidth - drawWidth) / 2;
                    drawY = 0;
                }

                p.image(theImg, drawX, drawY, drawWidth, drawHeight);
            }
        // };





}


function shuffleIndices(canvases) {
    // Create an array of indices from 1 to canvases.length
    const indices = Array.from({ length: canvases.length }, (_, i) => i);

    return indices;
}


document.addEventListener("mousedown", function(event) {
    // Check if the event target is any of the canvas elements
    // console.log(canvasCounter);
    // restart
    if (canvasCounter % maxSketches == 0 && !isReordered){
        for (let canvas of canvases){
            canvas.style.display="none";
            canvases[shuffledIndices[canvasCounter]].style.display = 'block';
        }
        startWeight = 200;
        weightDiff = 60;
    }
    for (let i = 0; i < sketches.length; i++) {
        if (event.target === sketches[i].canvas) {
            currentSketch = sketches[i]; // Set the current sketch
            break;
        }
    }
});






// REGULAR VANILLA JS for the REST of the PAGE

// let btn = document.getElementById("btn");
let projectsBtn = document.getElementById("projectsBtn");
console.log("projects button: " + projectsBtn)
let isReordered = false; // Flag to track the state

const canvasesElem = document.querySelector(".canvases");

if (projectsBtn){
    projectsBtn.addEventListener("click", function(e) {
        // e.preventDefault();
        // console.log("test test test");
        // isReordered = !isReordered; // Toggle the state
        // reorderCanvases();
    });
}

function reorderCanvases(){
    for (let canvas of canvases){
        console.log(canvas);
        console.log("reoder canvases")
        let order = parseInt(canvas.getAttribute("data-order")); // Parse the order as an integer
        let canvasElement = canvas.querySelector("canvas");
        let imgElement = canvas.querySelector("img");
        let p5Instance = canvasElement ? canvasElement.p5instance : null;
        // console.log(p5Instance);

        if (isReordered) {

            weightDiff = 30;
            shadowHeightDark = 16;
            shadowHeightLight = 20;



            // Make the canvases drawable again
            if (p5Instance) {
                // console.log("p5instance found")
                // p5Instance.loop();
                canvasElement.style.pointerEvents = 'auto';
            }


            // Apply styles for reordered state
            canvas.style.left = order % 2 === 0 ? window.innerWidth / 2 - 1 + "px" : "-1px";
            canvas.style.display = "block";
            // canvas.style.backgroundImage = `url(${canvas.getAttribute("data-href")})`
            
            // if (canvasElement) {
            //     canvasElement.style.width = window.innerWidth / 2 + "px";
            //     canvasElement.style.height = window.innerHeight / 2 + "px";
            // }

            if (imgElement){
                imgElement.style.display = "block";
                setTimeout(function(){
                    imgElement.style.opacity = "1";
                },5)
            }

            let topValue = Math.floor(order / 2) * window.innerHeight / 2 - 1;
            canvas.style.top = topValue + "px";
            
            canvasesElem.classList.add("gridded");
        } else {
            
            weightDiff = 60;
            shadowHeightDark = 8;
            shadowHeightLight = 10;

            // Make the canvases non-interactive as before
            if (p5Instance && p5Instance === currentSketch) {
                p5Instance.noLoop();
                canvasElement.style.pointerEvents = 'none';
            }

            // Reset styles for original state
            canvas.style.left = "-1px";
            canvas.style.top = "0px";

            if (canvasElement) {
                // Reset the width and height of the canvas
                canvasElement.style.width = window.innerWidth + "px";
                canvasElement.style.height = window.innerHeight + "px";
            }

            if (imgElement){
                imgElement.style.display = "none";
                imgElement.style.opacity = "0";
            }

            canvasesElem.classList.remove("gridded");
        }
    }
}

// });
    }

  }, [projects]); // Empty dependency array ensures this runs once after initial render

  // ... rest of the component

  return (
    <>
      <main>
        {/* Your persistent p5 canvases go here */}
        <div className="canvases">
          {shuffledProjects.slice(0, 8).map((project, index) => {
            // Find the original index of the project
            const originalIndex = projects.findIndex(p => p.slug === project.slug);

              return (
                <div key={index} className="canvas-container" id={`container${originalIndex}`} data-slug={project.slug} data-order={originalIndex} data-href={project.coverImage.image}>
                  <img src={project.coverImage.image}></img>
                  {/* <canvas className={`canvas${originalIndex}`}></canvas> */}
                </div>
              );
            })}
          </div>
          <div className="list-container">
                <ul className={`home--projectLinks ${styles.projectLinks} ${styles.lined}`}>
                  {projects && projects.map((project, index) => (
                      <ProjectListItem key={index} project={project} index={index} />
                  ))}
                </ul>
                <ul className={`home--projectLinks ${styles.projectLinks}`} id="projectLinks">
                  {projects && projects.map((project, index) => (
                      <ProjectListItem key={index} project={project} index={index} />
                  ))}
                </ul>
          </div>
          {/* <DrawCursor /> */}

      </main>
    </>
  );

};

export default DrawLayout;
