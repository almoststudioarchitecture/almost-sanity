import * as React from "react";
import { P5CanvasInstance, ReactP5Wrapper } from "@p5-wrapper/react";
import p5, { Image, Element, Framebuffer } from "p5";

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
  
  p.setup = () => {
    cnv = p.createCanvas(window.innerWidth/2, window.innerHeight/2);

    maskGraphics = p.createGraphics(p.width, p.height);
    maskGraphics.width = p.width;
    maskGraphics.height = p.height;
    maskGraphics.clear();
    p.strokeJoin(p.ROUND);

    p.noLoop();

   
    // maskGraphics.pixelDensity(2);
    // p.pixelDensity(2); 
    maskGraphics.pixelDensity(1);
    p.pixelDensity(1); 

  }

  function handleCanvasInteraction(event: MouseEvent | TouchEvent) {
    // Assuming 'cnv' is your canvas element or p5.js canvas object
    const target = 'target' in event ? event.target : null; // Extract target based on event type
    if (target === cnv || cnv.canvas === target) {
        mousePressedOverCanvas = true;
        p.loop();
  
        // Add drawing class to body
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


    if (!imageDrawn) {
        p.background('#F8F8F8');
        p.stroke('black');
        p.strokeWeight(1);

        const gap = 30;
        for (let x=0;x<p.width;x+=gap){
            p.line(x, 0, x, p.height)
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
                
                // Create a new p5.Image from maskGraphics
                let maskImage: p5.Image = p.createImage(p.width, p.height);
                maskImage.copy(maskGraphics, 0, 0, p.width, p.height, 0, 0, p.width, p.height); 

                // // Apply the mask to displayImage
                displayImage.mask(maskImage);

                // Draw the masked image
                // p.image(displayImage, 0, 0, p.width*2, p.height*2);
                p.image(displayImage, 0, 0, p.width, p.height);
                // p.pop();

        p.push();
        p.blendMode(p.HARD_LIGHT);
        p.image(maskGraphics, 0, 0, p.width, p.height);
        p.pop();
    }
    // p.ellipse(100,100,60,60)
  };
  p.mouseReleased = function(){
    p.noLoop();
    document.body.classList.remove("mousedown");
  }

  p.touchEnded = function(){
    p.noLoop();
    document.body.classList.remove("mousedown");
  }

  interface Point {
    x: number;
    y: number;
  }
  
    function drawPathsOnMask(graphics: p5.Graphics, path: Point[], weight: number) {
        graphics.clear();
        drawNonLinearShadows(graphics, path, weight, shadowHeightLight, 127, 80, -1);
        drawNonLinearShadows(graphics, path, weight, shadowHeightDark, 127, 80, 1);
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