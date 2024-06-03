import * as React from "react";
// import { P5CanvasInstance, ReactP5Wrapper } from "@p5-wrapper/react";
import p5, { Image, Element, Framebuffer } from "p5";
import { ReactP5Wrapper, P5CanvasInstance } from 'react-p5-wrapper';

// Define an interface for the props
interface SketchProps {
    imageUrl?: string;  // make it optional if it's not always required
    cursorRadius: number;
}

function sketch(p: P5CanvasInstance, cursorRadius: number) {
  let pos: { x: number; y: number; };
  let img: p5.Image;
//   let maskGraphics: Image | Element | Framebuffer;
  let maskGraphics: p5.Graphics;
  let path: Point[] = [];
  let imageDrawn = false;
  let mousePressedOverCanvas = false;
  let cnvImage: Image;
  let shadowHeightDark = 8;
  let shadowHeightLight = 10;
  let isReordered = false;
  let cnv: any;
  let cnvParent: HTMLElement;
  let slug: any;
  const cursorElement = document.getElementById("cursor");

  let dragged = false;

 
  
  p.setup = () => {
    cnv = p.createCanvas(window.innerWidth/2, window.innerHeight/2);

    cnvParent = cnv.elt;

    maskGraphics = p.createGraphics(window.innerWidth/2, window.innerHeight/2);
    maskGraphics.width = p.width;
    maskGraphics.height = p.height;
    maskGraphics.clear();
    p.strokeJoin(p.ROUND);

    p.noLoop();

    // p.pixelDensity(1);

   
    // maskGraphics.pixelDensity(2);
    // p.pixelDensity(2); 
    // maskGraphics.pixelDensity(window.devicePixelRatio);
    // p.pixelDensity(window.devicePixelRatio); 

  }

  function disableLink(element: { closest: (arg0: string) => any; }) {
    // Find the closest parent <a> tag
    let parentLink = element.closest('a');
    if (parentLink) {
        // Disable the link
        parentLink.style.pointerEvents = 'none';
    }
    // console.log("disabled");
    return parentLink;
}

function enableLink(element: HTMLElement) {
  let parentLink = element.closest('a');
    if (parentLink) {
        // Disable the link
        parentLink.style.pointerEvents = '';
    }
  // console.log("enabled")
    // if (linkElement) {
    //   console.log("enabled")
    //     // Re-enable the link
    //     console.log(linkElement);
    //     linkElement.style.pointerEvents = 'inherit';
    // }
}

  function handleCanvasInteraction(event: MouseEvent | TouchEvent) {
    const target = 'target' in event ? event.target : null;
    if (target === cnv || cnv.canvas === target) {
        mousePressedOverCanvas = true;
        p.loop();

        path = [];
        
        // Get the actual DOM element of the canvas
        // let canvasDomElement = cnv.elt;

        enableLink(cnvParent);
        document.body.classList.add("mousedown");
    }
  }

  
  p.mousePressed = function(event: MouseEvent) {
    handleCanvasInteraction(event);
  }
  
  p.touchStarted = function(event: TouchEvent) {
    handleCanvasInteraction(event);
  }

  p.draw = () => {
    if (!mousePressedOverCanvas) {
        p.noLoop(); // Optional: Additional safety to ensure noLoop is called if mouse is not pressed
    }

    // console.log(dragged);


    if (!imageDrawn) {
        p.background('#F8F8F8');
        p.stroke('black');
        p.strokeWeight(1);

        let determiner = p.random();
        // let determiner = 0.999

        

        if (determiner < 0.1){
            const gap = 30;
            for (let x=0;x<p.width;x+=gap){
                p.line(x, 0, x, p.height)
            }
            // p.text("type 1", 50,50);
        } else if (determiner < 0.2){
            const gap = 30;
            for (let x=0;x<p.width*p.height;x+=gap){
                p.line(x, 0, x, p.height)
            }
            for (let y=0;y<p.width*p.height;y+=gap){
              p.line(0, y, p.width, y)
          }
          // p.text("type 2", 50,50);
        } else if (determiner < 0.3){
          const gap = 30;
          for (let x = 0; x <= p.width * p.height; x += gap) {
            p.line(x, 0, 0, x);
          }
          // p.text("type 3", 50,50);
        } else if (determiner < 0.4){
          const gap = 30;
          for (let x = 0; x <= p.width*p.height; x += gap) {
            p.line(x, 0, 0, x);
          }
          for (let y = 0; y <= p.height*p.width; y += gap) {
            p.line(0, y, y, 0);
          }
          // p.text("type 4", 50,50);
        } else if (determiner < 0.5){
          const gap = 60;
            for (let x=0;x<p.width;x+=gap){
                p.line(x, 0, x, p.height)
            }
            // p.text("type 5", 50,50);
        } else if (determiner < 0.6){
          const gap = 20;
          for (let y=0;y<p.height;y+=gap){
            p.line(0, y, p.width, y)
          }
          // p.text("type 6", 50,50);
        } else if (determiner < 0.7){
          for (let y = 0; y <= p.height*p.width; y += 10) {
            p.line(0, y, y, 0);
          }
          // p.text("type 7", 50,50);
        } else if (determiner < 0.8){
          const gap = 30;
          const diagonalLength = Math.sqrt(p.width * p.width + p.height * p.height);

          for (let x = 0; x <= diagonalLength; x += gap) {
            // Calculate the y-coordinate for the -60-degree angle
            let yMinus60 = x * Math.tan(-Math.PI / 3); // -60 degrees in radians
    
            // Draw the line from (x, height) to (x - diagonalLength * cos(PI / 3), height - diagonalLength * sin(PI / 3))
            p.line(x, p.height, x - diagonalLength * Math.cos(Math.PI / 3), p.height - diagonalLength * Math.sin(Math.PI / 3));
        }
          // p.text("type 8", 50,50);

        } else if (determiner < 0.9){
          const gap = 16;
          for (let x=0;x<p.width*p.height;x+=gap){
              p.line(x, 0, x, p.height)
          }
          for (let y=0;y<p.height*p.width;y+=gap){
            p.line(0, y, p.width, y)
          }
          // p.text("type 9");
          // p.text("type 9", 50,50);
        } else {
          const gap = 30;
          for (let x=0;x<p.width*p.height;x+=gap){
              p.line(x, 0, x, p.height)
          }
          for (let y=0;y<p.height*p.width;y+=gap){
            p.line(0, y, p.width, y)
          }
          // p.text("type 10", 50,50);

        } 




        cnvImage = p.get();
        
        cnvImage.loadPixels();
        

        if (cnvImage.pixels.length > 0) {
            imageDrawn = true;
        }
    }

    
    if (imageDrawn) {
        p.clear();
        if (mousePressedOverCanvas) {
            // updateStrokeProperties();
            addPointToPath(p.mouseX, p.mouseY);
        }

        drawPathsOnMask(maskGraphics, path, cursorRadius);
        // p.push();
                let displayImage: p5.Image = cnvImage.get();
                
                p.push();
                // Create a new p5.Image from maskGraphics
                let maskImage: p5.Image = p.createImage(p.width, p.height);
                maskImage.copy(maskGraphics, 0, 0, maskGraphics.width, maskGraphics.height, 0, 0, p.width, p.height); 
                // maskImage.copy(maskGraphics, 0, 0, p.width, p.height, 0, 0, maskImage.width, maskImage.height); 
                // maskImage.resize(p.width*4, p.height*4);

                // // Apply the mask to displayImage
                displayImage.mask(maskImage);
                p.pop();

                // Draw the masked image
                p.image(displayImage, 0, 0, p.width, p.height);

        p.push();
        p.blendMode(p.HARD_LIGHT);
        p.image(maskGraphics, 0, 0, p.width, p.height);
        p.pop();
    }
    // p.ellipse(100,100,60,60)
  };
  p.mouseDragged = function() {
    dragged = true;
    // Disable the link
    // console.log("dragging");
    disableLink(cnvParent);
  }
  p.mouseReleased = function() {
    p.noLoop();
    document.body.classList.remove("mousedown");
    // dragged = false;

    // Re-enable the link
    enableLink(cnvParent);
    
}

p.touchEnded = function() {
  p.noLoop();
  document.body.classList.remove("mousedown");

  // Re-enable the link
  // enableLink(cnvParent);
}
  interface Point {
    x: number;
    y: number;
  }
  
    function drawPathsOnMask(graphics: p5.Graphics, path: Point[], weight: number) {
        graphics.clear();
        drawNonLinearShadows(graphics, path, weight, shadowHeightLight/2, 127, 80, -1);
        drawNonLinearShadows(graphics, path, weight, shadowHeightDark/2, 127, 80, 1);
        drawPathWithOffset(graphics, path, weight, 127, 0);
    }

    function drawNonLinearShadows(graphics: p5.Graphics, path: Point[], weight: number, shadowHeight: number, startColor: number, endColor: number, yOffsetMultiplier: number) {
        for (let i = shadowHeight; i >= 0; i--) {
            let ratio = i / shadowHeight;
            let nonLinearRatio = p.pow(ratio, shadowHeight === shadowHeightLight ? 1.6 : 2);
            let colorValue = p.map(nonLinearRatio, 0, 1, startColor, endColor);
            drawPathWithOffset(graphics, path, weight, colorValue, i * yOffsetMultiplier);
        }
    }

    function drawPathWithOffset(graphics: p5.Graphics, path: Point[], weight: number, c: number, yOffset: number) {
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

    function addPointToPath(x: number, y: number) {
        const point = { x, y };
        if (path.length === 0 || p.dist(x, y, path[path.length - 1].x, path[path.length - 1].y) >= 3) {
            path.push(point);
        }
    }


}



const Sketch = React.memo(({ cursorRadius }: SketchProps) => {
    return <ReactP5Wrapper sketch={(p) => sketch(p, cursorRadius)} />;
});
Sketch.displayName = 'App'; // Assigning a display name

export { Sketch };


// drag is false
// cursor down, enable the element
// if mouse is moved after cursor is down (dragging), "dragging" is true
// on mouse up if dragging is true, disable the element
