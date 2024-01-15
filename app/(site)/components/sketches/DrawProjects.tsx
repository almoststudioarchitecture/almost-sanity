import * as React from "react";
import { P5CanvasInstance, ReactP5Wrapper } from "@p5-wrapper/react";
import imageUrlBuilder from '@sanity/image-url';
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
  let path: { y: number; }[] | { x: any; y: any; }[] = [];
  let imageDrawn = false;
  let mousePressedOverCanvas = false;
  let cnvImage: Image;
  let shadowHeightDark = 8;
  let shadowHeightLight = 10;

  const cursorElement = document.getElementById("cursor");

  const builder = imageUrlBuilder({
    projectId: "oogp23sh",
    dataset: "production",
  });

  p.preload = function() {
    // if (imageUrl) {
    //     img = p.loadImage(imageUrl);
    //   }
  };
  
  p.setup = () => {
    p.createCanvas(p.windowWidth/2, p.windowHeight/2);

    maskGraphics = p.createGraphics(p.windowWidth/2, p.windowHeight/2);
    maskGraphics.clear();
    p.strokeJoin(p.ROUND);

    // Add event listeners after the canvas has been created

    p.noLoop();

  }

  p.draw = () => {
    // p.background('#F8F8F8');
    // p.stroke('black');

    // const gap = 30;
    // for (let x=0;x<p.width;x+=gap){
    //     p.line(x, 0, x, p.height)
    // }
    if (!mousePressedOverCanvas) {
        p.noLoop(); // Optional: Additional safety to ensure noLoop is called if mouse is not pressed
    }
    if (!imageDrawn) {
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
            // addPointToPath(p.mouseX, p.mouseY);
        }

        // drawPathsOnMask(maskGraphics, path, cursorRadius);


        // let stringified = JSON.stringify(path);
        // localStorage.setItem(imageUrl, stringified);

        // if (!isReordered){
            
            let displayImage = cnvImage.get();
            // displayImage.mask(maskGraphics);

            p.image(displayImage, 0, 0, p.width, p.height);
            // console.log(displayImage)

        p.push();
        p.blendMode(p.HARD_LIGHT);
        p.image(maskGraphics, 0, 0, p.width, p.height);
        p.pop();
    }
    p.ellipse(100,100,60,60)
  };
  p.mouseReleased = function(){
    p.noLoop();
  }

  interface Point {
    x: number;
    y: number;
  }
  
  function drawPathsOnMask(graphics: p5.Graphics, path: Point[], weight: number) {
      graphics.clear();
      drawNonLinearShadows(graphics, path, weight, shadowHeightLight, 127, 235, -1);
      drawNonLinearShadows(graphics, path, weight, shadowHeightDark, 127, 80, 1);
    //   drawPathWithOffset(graphics, path, weight, 127, 0);
  }

  function drawNonLinearShadows(graphics: p5.Graphics, path: Point[], weight: number, shadowHeight: number, startColor: number, endColor: number, yOffsetMultiplier: number) {
    for (let i = shadowHeight; i >= 0; i--) {
        let ratio = i / shadowHeight;
        let nonLinearRatio = p.pow(ratio, shadowHeight === shadowHeightLight ? 1.6 : 2);
        let colorValue = p.map(nonLinearRatio, 0, 1, startColor, endColor);
        // drawPathWithOffset(graphics, path, weight, colorValue, i * yOffsetMultiplier);
    }
}

    // function drawPathWithOffset(graphics, path, weight, c, yOffset) {
    //     graphics.stroke(c, c, c);
    //     graphics.strokeWeight(weight);
    //     graphics.noFill();

    //     if (path.length > 1) {
    //         graphics.beginShape();
    //         graphics.curveVertex(path[0].x, path[0].y + yOffset); 
    //         for (let point of path) {
    //             graphics.curveVertex(point.x, point.y + yOffset);
    //         }
    //         graphics.curveVertex(path[path.length - 1].x, path[path.length - 1].y + yOffset);
    //         graphics.endShape();
    //     }
    // }

    // function addPointToPath(x: number, y: number) {
    //     const point = { x, y };
    //     if (path.length === 0 || p.dist(x, y, path[path.length - 1].x, path[path.length - 1].y) >= 3) {
    //         path.push(point);
    //     }
    // }

    function updateStrokeProperties() {
        // cursorElement.style.width = cursorRadius + "px";
        // cursorElement.style.height = cursorRadius + "px";
        // strokeShrink = p.max(strokeShrink - 0.1, 0);
        // if (isReordered){
        //     cursorRadius = gridWeight;
        // } else {
        //     cursorRadius = p.max(cursorRadius - strokeShrink, startWeight - weightDiff);
        // }
        

    }

    // function drawImageCover(theImg, canvasWidth, canvasHeight) {
    //     let canvasRatio = canvasWidth / canvasHeight;
    //     let imageRatio = theImg.width / theImg.height;
    //     let drawWidth, drawHeight, drawX, drawY;

    //     if (canvasRatio > imageRatio) {
    //         drawWidth = canvasWidth;
    //         drawHeight = theImg.height * (canvasWidth / theImg.width);
    //         drawX = 0;
    //         drawY = (canvasHeight - drawHeight) / 2;
    //     } else {
    //         drawHeight = canvasHeight;
    //         drawWidth = theImg.width * (canvasHeight / theImg.height);
    //         drawX = (canvasWidth - drawWidth) / 2;
    //         drawY = 0;
    //     }

    //     p.image(theImg, drawX, drawY, drawWidth, drawHeight);
    // }


}



const Sketch = React.memo(({ cursorRadius }: SketchProps) => {
    return <ReactP5Wrapper sketch={(p) => sketch(p, cursorRadius)} />;
});
Sketch.displayName = 'App'; // Assigning a display name

export { Sketch };