// import React from "react";
// import { type Sketch } from "@p5-wrapper/react";
// import { NextReactP5Wrapper } from "@p5-wrapper/next";
// import p5 from 'p5'

// const sketch: Sketch = (p) => {
//     const canvases = document.querySelectorAll(".canvas-container");
//     console.log(canvases);
//     const cursorElement = document.getElementById("cursor");
//     let shuffledIndices = shuffleIndices(canvases);
//     console.log(shuffledIndices);
//     let sketches: any[] = [];
    
//     console.log('hello');
    
//     let canvasCounter = 0;
//     let strokeCounter = 0;
//     let currentSketch: null = null;
//     let startWeight = 300;
//     let weightDiff = 60;
//     let gridWeight = 80;
//     let shadowHeightDark = 8;
//     let shadowHeightLight = 10;
    
//     const maxSketches = 8;
    
    
//     // Iterate through shuffled indices and initialize sketches
//     // Iterate through shuffled indices and initialize sketches
//     shuffledIndices.forEach((index, idx) => {
//         let container = canvases[index];
    
//         // Assign zIndex based on the position in the shuffled array.
//         // If you want the first canvas in the shuffled order to have the highest zIndex,
//         // you can subtract the position from the total length of the array.
//         // console.log(container);
//         // container.style.zIndex = idx;
//         // container.setAttribute("data-idx", idx)
//         // console.log(container)
    
//         let newSketch = new p.p5((p: any) => initializeSketch(p, container));
//         sketches.push(newSketch);
//     });
    
    
    
    
//     // canvases.forEach(canvas => {
//     //     canvas.style.display = 'none';
//     // });
//     // // Display only the first canvas in the shuffled order
//     // if (shuffledIndices.length > 0) {
//     //     canvases[shuffledIndices[0]].style.display = 'block';
//     // }
    
//     function initializeSketch(p: { preload: () => void; loadImage: (arg0: any) => any; setup: () => void; createCanvas: (arg0: any, arg1: any) => any; windowWidth: any; windowHeight: any; createGraphics: (arg0: any, arg1: any) => any; strokeJoin: (arg0: any) => void; ROUND: any; canvas: EventTarget | null; loop: () => void; noLoop: () => void; draw: () => void; width: any; height: any; get: () => any; clear: () => void; mouseX: any; mouseY: any; image: (arg0: any, arg1: number, arg2: number, arg3: any, arg4: any) => void; background: (arg0: string) => void; push: () => void; blendMode: (arg0: any) => void; HARD_LIGHT: any; pop: () => void; mousePressed: () => void; mouseReleased: () => void; pow: (arg0: number, arg1: number) => any; map: (arg0: any, arg1: number, arg2: number, arg3: any, arg4: any) => any; dist: (arg0: any, arg1: any, arg2: any, arg3: any) => number; max: (arg0: number, arg1: number) => number; }, container: Element) {
//             // console.log(container)
//             // container.style.zIndex = container.getAttribute("data-idx");
    
//             let path: { y: any; }[] = [];
//             let mousePressedOverCanvas = false;
//                 // let path;
//                 let currentWeight = startWeight;
//                 const strokeShrinkStart = 3;
//                 let strokeShrink = strokeShrinkStart;
    
//                 let img: any;
//                 // let imageUrl = canvases[shuffledIndices[canvasCounter]].getAttribute("data-href");
    
//                 let maskGraphics: { clear: () => void; };
//                 let imageDrawn = false;
//                 let cnvImage: { loadPixels: () => void; pixels: string | any[]; get: () => any; };
//             // let sketch = function(p) {
    
    
//                 // cursorElement.style.width = startWeight + "px";
//                 // cursorElement.style.height = startWeight + "px";
                
    
//                 p.preload = function() {
//                     // Load the image for this particular sketch
//                     let imageUrl = container.getAttribute("data-href");
//                     img = p.loadImage(imageUrl);
//                 };
    
//                 p.setup = function() {
//                     // let targetCanvasElement = container.querySelector(canvas);
//                     var cnv = p.createCanvas(p.windowWidth, p.windowHeight);
//                     console.log("canvas created");
//                     // resizeCanvas
//                     cnv.parent(container.id);
//                     // console.log(container.id);
//                     maskGraphics = p.createGraphics(p.windowWidth, p.windowHeight);
//                     maskGraphics.clear();
//                     p.strokeJoin(p.ROUND);
    
    
//                     path = []; // Initialize a new empty path for this sketch instance
//                     imageDrawn = false; // Reset the imageDrawn flag for each new canvas
    
//                     // Add event listeners after the canvas has been created
//                     p.canvas.addEventListener("mousedown", function(event: { target: any; }) {
//                         // Check if the mouse is over the canvas
//                         if (event.target === p.canvas || p.canvas.contains(event.target)) {
//                             mousePressedOverCanvas = true;
//                             p.loop();
    
//                             // add drawing class to body
//                             document.body.classList.add("mousedown")
//                         }
//                     });
    
//                     p.noLoop();
//                     p.canvas.p5instance = p;
    
//                 };
    
//                 p.draw = function() {
//                     // console.log("drawing");
//                     // console.log("start weight: " + startWeight);
//                     if (p !== currentSketch) {
//                         return; // Only draw if this is the current sketch
//                     }
//                     if (!mousePressedOverCanvas) {
//                         p.noLoop(); // Optional: Additional safety to ensure noLoop is called if mouse is not pressed
//                     }
//                     if (!imageDrawn) {
//                         drawImageCover(img, p.width, p.height);
//                         cnvImage = p.get();
//                         cnvImage.loadPixels();
                
//                         if (cnvImage.pixels.length > 0) {
//                             imageDrawn = true;
//                         }
//                     }
                
//                     if (imageDrawn) {
//                         p.clear();
//                         if (mousePressedOverCanvas) {
//                             updateStrokeProperties();
//                             addPointToPath(p.mouseX, p.mouseY);
//                         }
                
//                         drawPathsOnMask(maskGraphics, path, currentWeight);
                
//                         if (!isReordered){
//                             let displayImage = cnvImage.get();
//                             displayImage.mask(maskGraphics);
//                             p.image(displayImage, 0, 0, p.width, p.height);
//                         } else {
//                             p.background('white');
//                             let whiteImage = p.get();
//                             p.clear();
//                             whiteImage.mask(maskGraphics);
//                             p.image(whiteImage, 0, 0, p.width, p.height);
//                         }
                
//                         p.push();
//                         p.blendMode(p.HARD_LIGHT);
//                         p.image(maskGraphics, 0, 0, p.width, p.height);
//                         p.pop();
//                     }
//                 };
    
//                 document.addEventListener("mouseup", function(event) {
//                     mousePressedOverCanvas = false;
    
//                     // remove drawing class to body
//                     document.body.classList.remove("mousedown")
    
                    
    
                    
                
//                     if (p.canvas && (event.target === p.canvas || p.canvas.contains(event.target))) {
//                         if (p === currentSketch) {
//                             let slug = container.getAttribute("data-slug");
    
//                             let stringified = JSON.stringify(path);
//                             localStorage.setItem(slug, stringified);
    
//                             let corresponding_lis = document.querySelectorAll(`.list-container [data-slug="${slug}"]`)
//                             // console.log(corresponding_lis);
//                             for (mostRecent of document.querySelectorAll(".home--mostRecent")){
//                                 mostRecent.classList.remove("home--mostRecent");
//                             }
//                             for (li of corresponding_lis){
//                                 li.classList.add("home--visible");
//                                 li.classList.add("home--mostRecent");
//                                 li.style.order = 99999 - canvasCounter;
//                             }
    
//                             p.canvas.style.pointerEvents = 'none';
//                             // startWeight -= 20;
//                             startWeight *= 0.86;
                    
//                             if (canvasCounter < canvases.length - 1) {
//                                 // Proceed to the next canvas
//                                 canvasCounter++;
//                                 strokeCounter++;
//                                 currentSketch = sketches[shuffledIndices[canvasCounter]];
//                                 canvases[shuffledIndices[canvasCounter]].style.display = 'block';
//                             } else {
//                                 // Reset and start over
//                                 console.log('No more canvases left. Resetting...');
//                                 if (!isReordered){
//                                     canvasCounter = 0;
//                                     // shuffledIndices = shuffleIndices(canvases);
//                                     // shuffledIndices.forEach((index, idx) => {
//                                     //     let container = canvases[index];
//                                     //     container.style.zIndex = strokeCounter + idx;
//                                     // });
                                    
//                                     currentSketch = sketches[shuffledIndices[canvasCounter]];
//                                     // currentSketch = sketches[shuffledIndices[canvasCounter]];
//                                     canvases[shuffledIndices[canvasCounter]].style.display = 'block';
    
    
//                                 }
//                             }
//                         }
//                     }
                
//                     if (currentSketch) {
//                         p.noLoop();
//                     }
//                 });
    
    
    
                
//                 p.mousePressed = function() {
//                     if (mousePressedOverCanvas) {
//                         path = []; // Clear the existing path and start a new one
//                         currentWeight = startWeight;
//                         strokeShrink = strokeShrinkStart;
//                     }
//                 };
    
//                 p.mouseReleased = function(){
//                     console.log("mouse was released");
    
//                     // cursorElement.style.width = startWeight*0.86+strokeShrink + "px";
//                     // cursorElement.style.height = startWeight*0.86+strokeShrink + "px";
//                 }
    
//                 function drawPathsOnMask(graphics: { clear: () => void; }, path: any[], weight: number) {
//                     graphics.clear();
//                     drawNonLinearShadows(graphics, path, weight, shadowHeightLight, 127, 235, -1);
//                     drawNonLinearShadows(graphics, path, weight, shadowHeightDark, 127, 80, 1);
//                     drawPathWithOffset(graphics, path, weight, 127, 0);
//                 }
    
//                 function drawNonLinearShadows(graphics: any, path: any, weight: any, shadowHeight: number, startColor: number, endColor: number, yOffsetMultiplier: number) {
//                     for (let i = shadowHeight; i >= 0; i--) {
//                         let ratio = i / shadowHeight;
//                         let nonLinearRatio = p.pow(ratio, shadowHeight === shadowHeightLight ? 1.6 : 2);
//                         let colorValue = p.map(nonLinearRatio, 0, 1, startColor, endColor);
//                         drawPathWithOffset(graphics, path, weight, colorValue, i * yOffsetMultiplier);
//                     }
//                 }
    
//                 function drawPathWithOffset(graphics: { stroke: (arg0: any, arg1: any, arg2: any) => void; strokeWeight: (arg0: any) => void; noFill: () => void; beginShape: () => void; curveVertex: (arg0: any, arg1: any) => void; endShape: () => void; }, path: string | any[], weight: any, c: number, yOffset: number) {
//                     graphics.stroke(c, c, c);
//                     graphics.strokeWeight(weight);
//                     graphics.noFill();
    
//                     if (path.length > 1) {
//                         graphics.beginShape();
//                         graphics.curveVertex(path[0].x, path[0].y + yOffset); 
//                         for (let point of path) {
//                             graphics.curveVertex(point.x, point.y + yOffset);
//                         }
//                         graphics.curveVertex(path[path.length - 1].x, path[path.length - 1].y + yOffset);
//                         graphics.endShape();
//                     }
//                 }
    
//                 function addPointToPath(x: any, y: any) {
//                     const point = { x, y };
//                     if (path.length === 0 || p.dist(x, y, path[path.length - 1].x, path[path.length - 1].y) >= 3) {
//                         path.push(point);
//                     }
//                 }
    
//                 function updateStrokeProperties() {
//                     cursorElement.style.width = currentWeight + "px";
//                     cursorElement.style.height = currentWeight + "px";
//                     strokeShrink = p.max(strokeShrink - 0.1, 0);
//                     if (isReordered){
//                         currentWeight = gridWeight;
//                     } else {
//                         currentWeight = p.max(currentWeight - strokeShrink, startWeight - weightDiff);
//                     }
    
//                 }
    
//                 function drawImageCover(theImg: { width: number; height: number; }, canvasWidth: number, canvasHeight: number) {
//                     let canvasRatio = canvasWidth / canvasHeight;
//                     let imageRatio = theImg.width / theImg.height;
//                     let drawWidth, drawHeight, drawX, drawY;
    
//                     if (canvasRatio > imageRatio) {
//                         drawWidth = canvasWidth;
//                         drawHeight = theImg.height * (canvasWidth / theImg.width);
//                         drawX = 0;
//                         drawY = (canvasHeight - drawHeight) / 2;
//                     } else {
//                         drawHeight = canvasHeight;
//                         drawWidth = theImg.width * (canvasHeight / theImg.height);
//                         drawX = (canvasWidth - drawWidth) / 2;
//                         drawY = 0;
//                     }
    
//                     p.image(theImg, drawX, drawY, drawWidth, drawHeight);
//                 }
//             // };
    
    
    
    
    
//     }
    
    
//     // function shuffleIndices(canvases) {
//     //     // Create an array of indices from 0 to canvases.length - 1
//     //     const indices = Array.from(Array(canvases.length).keys());
    
//     //     // Fisher-Yates (Durstenfeld) Shuffle algorithm for indices
//     //     for (let i = indices.length - 1; i > 0; i--) {
//     //         // Generate a random index
//     //         const j = Math.floor(Math.random() * (i + 1));
    
//     //         // Swap elements i and j in the indices array
//     //         [indices[i], indices[j]] = [indices[j], indices[i]];
//     //     }
    
//     //     return indices;
//     // }
    
//     function shuffleIndices(canvases: string | any[] | NodeListOf<Element>) {
//         // Create an array of indices from 1 to canvases.length
//         const indices = Array.from({ length: canvases.length }, (_, i) => i);
    
//         return indices;
//     }
    
    
//     document.addEventListener("mousedown", function(event) {
//         // Check if the event target is any of the canvas elements
//         // console.log(canvasCounter);
//         // restart
    
//         if (canvasCounter % maxSketches == 0 && !isReordered){
//             for (let canvas of canvases){
//                 canvas.style.display="none";
//                 canvases[shuffledIndices[canvasCounter]].style.display = 'block';
//             }
//             startWeight = 200;
//             weightDiff = 60;
//         }
//         for (let i = 0; i < sketches.length; i++) {
//             if (event.target === sketches[i].canvas) {
//                 currentSketch = sketches[i]; // Set the current sketch
//                 break;
//             }
//         }
//     });
    
    
    
    
    
    
//     // REGULAR VANILLA JS for the REST of the PAGE
    
//     // let btn = document.getElementById("btn");
//     let projectsBtn = document.getElementById("projectsBtn");
//     console.log("projects button: " + projectsBtn)
//     let isReordered = false; // Flag to track the state
    
//     const canvasesElem = document.querySelector(".canvases");
    
//     if (projectsBtn){
//         projectsBtn.addEventListener("click", function(e) {
//             // e.preventDefault();
//             // console.log("test test test");
//             // isReordered = !isReordered; // Toggle the state
//             // reorderCanvases();
//         });
//     }
    
//     // window.onpopstate = function(event) {
//     //     console.log("URL changed!");
//     //     // You can access the new URL using window.location.href
//     //     console.log("New URL:", window.location.href);
//     // };
    
//     function reorderCanvases(){
//         for (let canvas of canvases){
//             console.log(canvas);
//             console.log("reoder canvases")
//             let order = parseInt(canvas.getAttribute("data-order")); // Parse the order as an integer
//             let canvasElement = canvas.querySelector("canvas");
//             let imgElement = canvas.querySelector("img");
//             let p5Instance = canvasElement ? canvasElement.p5instance : null;
//             // console.log(p5Instance);
    
//             if (isReordered) {
    
//                 weightDiff = 30;
//                 shadowHeightDark = 16;
//                 shadowHeightLight = 20;
    
    
    
//                 // Make the canvases drawable again
//                 if (p5Instance) {
//                     // console.log("p5instance found")
//                     // p5Instance.loop();
//                     canvasElement.style.pointerEvents = 'auto';
//                 }
    
    
//                 // Apply styles for reordered state
//                 canvas.style.left = order % 2 === 0 ? window.innerWidth / 2 - 1 + "px" : "-1px";
//                 canvas.style.display = "block";
//                 // canvas.style.backgroundImage = `url(${canvas.getAttribute("data-href")})`
                
//                 // if (canvasElement) {
//                 //     canvasElement.style.width = window.innerWidth / 2 + "px";
//                 //     canvasElement.style.height = window.innerHeight / 2 + "px";
//                 // }
    
//                 if (imgElement){
//                     imgElement.style.display = "block";
//                     setTimeout(function(){
//                         imgElement.style.opacity = "1";
//                     },5)
//                 }
    
//                 let topValue = Math.floor(order / 2) * window.innerHeight / 2 - 1;
//                 canvas.style.top = topValue + "px";
                
//                 canvasesElem.classList.add("gridded");
//             } else {
                
//                 weightDiff = 60;
//                 shadowHeightDark = 8;
//                 shadowHeightLight = 10;
    
//                 // Make the canvases non-interactive as before
//                 if (p5Instance && p5Instance === currentSketch) {
//                     p5Instance.noLoop();
//                     canvasElement.style.pointerEvents = 'none';
//                 }
    
//                 // Reset styles for original state
//                 canvas.style.left = "-1px";
//                 canvas.style.top = "0px";
    
//                 if (canvasElement) {
//                     // Reset the width and height of the canvas
//                     canvasElement.style.width = window.innerWidth + "px";
//                     canvasElement.style.height = window.innerHeight + "px";
//                 }
    
//                 if (imgElement){
//                     imgElement.style.display = "none";
//                     imgElement.style.opacity = "0";
//                 }
    
//                 canvasesElem.classList.remove("gridded");
//             }
//         }
//     }
    
//     // });
// }

// export default function Sketch() {
//     return <NextReactP5Wrapper sketch={sketch} />;
// }