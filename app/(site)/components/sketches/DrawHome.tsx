import * as React from "react";
import { ReactP5Wrapper } from "@p5-wrapper/react";
import { P5CanvasInstance } from "@p5-wrapper/react";
import imageUrlBuilder from '@sanity/image-url';
import p5, { Image, Element, Framebuffer } from "p5";

// Define an interface for the props
interface AppProps {
    imageUrl: string;
    cursorRadius: number;
  }

function sketch(p: P5CanvasInstance, imageUrl: string, cursorRadius: number) {
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


  let cursorWeightDifference = 15;
  let cursorWeightChange = 0;
  const cursorWeightChangeDuration = 10; // Duration over which the cursor weight changes
  let framesSinceMousePressed = 0;



  const builder = imageUrlBuilder({
    projectId: "oogp23sh",
    dataset: "production",
  });

  p.preload = function() {
    if (imageUrl) {
        img = p.loadImage(imageUrl);
      }
    // console.log(imageUrl);
  };
  
  p.setup = () => {
    if (typeof window !== "undefined" && typeof document !== "undefined") {
      cnv = p.createCanvas(p.windowWidth, p.windowHeight);

      cnvParent = cnv.canvas.closest(".canvas-container");
      if (cnvParent){
        slug = cnvParent.getAttribute("data-slug");
      }

    //   console.log(cnvParent);

      // maskGraphics = p.createGraphics(p.width * window.devicePixelRatio, p.height * window.devicePixelRatio);
      // maskGraphics.pixelDensity(p.pixelDensity());
      maskGraphics = p.createGraphics(p.width, p.height);
      maskGraphics.clear();
      p.strokeJoin(p.ROUND);

      p.noLoop();
      p.rectMode(p.CENTER)

      console.log(p.VERSION);

      // p.pixelDensity(1);

      // p.pixelDensity(window.devicePixelRatio);

      // maskGraphics.pixelDensity(window.devicePixelRatio);

      // console.log(window.devicePixelRatio)

      // maskGraphics.pixelDensity(window.devicePixelRatio/2);
      // p.pixelDensity(window.devicePixelRatio); 

      // console.log(p.pixelDensity());
      // console.log(maskGraphics.pixelDensity())
      // document.querySelector(".verticalLine").innerHTML= p.pixelDensity() + ", " + maskGraphics.pixelDensity() + ", " + window.devicePixelRatio
    }

  }

  p.windowResized = function(){
    p.resizeCanvas(p.windowWidth, p.windowHeight);
    maskGraphics.resizeCanvas(p.windowWidth, p.windowHeight);
  }
  

  function handleCanvasInteraction(event: MouseEvent | TouchEvent) {
    if (typeof window !== "undefined" && typeof document !== "undefined") {
      // Assuming 'cnv' is your canvas element or p5.js canvas object
      const target = 'target' in event ? event.target : null; // Extract target based on event type
      if (cnv && (target === cnv || cnv.canvas === target)) {
          mousePressedOverCanvas = true;
          p.loop();
    
          // Add drawing class to body
          document.body.classList.add("mousedown");
      }
    }
  }
  
  // p.mousePressed = function(event: MouseEvent) {
  //   console.log("mouse pressed")
  //   handleCanvasInteraction(event);
  // }

  p.mousePressed = function(event: MouseEvent) {
    // console.log("mouse pressed")
    cursorWeightChange = cursorWeightDifference; // Increase the cursor weight by 20 pixels
    framesSinceMousePressed = 0; // Reset the frame count
    handleCanvasInteraction(event);
  }
  
  p.touchStarted = function(event: TouchEvent) {
    handleCanvasInteraction(event);
    // console.log("device pixel ratio:" + window.devicePixelRatio);
  }



  // Function to handle touch events
  function touchHandler(event: TouchEvent, type: string) {
    if (type === 'start' || type === 'move') {
        // If the touch is within the canvas
        if (p.mouseX >= 0 && p.mouseX <= p.width && p.mouseY >= 0 && p.mouseY <= p.height) {
            mousePressedOverCanvas = true;
            p.loop();
        }
    } else if (type === 'end') {
        mousePressedOverCanvas = false;
        p.noLoop();
    }
    event.preventDefault(); // Prevent default touch behavior
}

  p.draw = () => {
    // console.log(imageDrawn);
    if (!mousePressedOverCanvas) {
        p.noLoop(); // Optional: Additional safety to ensure noLoop is called if mouse is not pressed
    }

    // console.log(path);

    if (!imageDrawn) {
        // console.log
        drawImageCover(img, p.width, p.height);
        // p.image(img, 0,0,p.width, p.height)
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
            if (path.length==0){
              addPointToPath(p.mouseX-2, p.mouseY-2);
              addPointToPath(p.mouseX+2, p.mouseY-2);
            } else {
              if (p.frameCount%3<0.5){
                addPointToPath(p.mouseX, p.mouseY);
              }
            }
            // addPointToPath(p.mouseX, p.mouseY);
        }

        drawPathsOnMask(maskGraphics, path, cursorRadius, 1);

        p.image(maskGraphics,0,0,p.width,p.height);


        let stringified = JSON.stringify(path);
        localStorage.setItem(slug, stringified);
        // console.log(localStorage);

          
        // p.push();
            let displayImage: p5.Image = cnvImage.get();
            
            // // Create a new p5.Image from maskGraphics
            // let maskImage: p5.Image = p.createImage(p.width, p.height);
            let maskImage: p5.Image = p.createImage(p.width, p.height);
            
            maskImage.loadPixels();
            maskImage.copy(maskGraphics, 0, 0, p.width, p.height, 0, 0, maskImage.width, maskImage.height); 

            // // Apply the mask to displayImage
            displayImage.mask(maskImage);

            // // // Draw the masked image
            p.image(displayImage, 0, 0, p.width, p.height);

        p.push();
        p.blendMode(p.HARD_LIGHT);
        p.image(maskGraphics, 0, 0, p.width, p.height);
        p.pop();
    }
    // p.clear();
    // if (img) {
    //   p.image(img, pos.x, pos.y);
    // }
  };
  p.mouseReleased = function(){
    p.noLoop();
  }

  p.touchEnded = function(){
    p.noLoop();
  }

  interface Point {
    x: number;
    y: number;
  }
  
  function drawPathsOnMask(graphics: p5.Graphics, path: Point[], weight: number, scale:number) {
      graphics.clear();
      const dynamicWeight = weight + cursorWeightChange;
      drawNonLinearShadows(graphics, path, dynamicWeight, shadowHeightLight, 127, 235, -1, scale);
      drawNonLinearShadows(graphics, path, dynamicWeight, shadowHeightDark, 127, 80, 1, scale);
      drawPathWithOffset(graphics, path, dynamicWeight, 127, 0, scale);
  }

  function drawNonLinearShadows(graphics: p5.Graphics, path: Point[], weight: number, shadowHeight: number, startColor: number, endColor: number, yOffsetMultiplier: number, scale:number) {
    for (let i = shadowHeight; i >= 0; i--) {
        let ratio = i / shadowHeight;
        let nonLinearRatio = p.pow(ratio, shadowHeight === shadowHeightLight ? 1.6 : 2);
        let colorValue = p.map(nonLinearRatio, 0, 1, startColor, endColor);
        drawPathWithOffset(graphics, path, weight, colorValue, i * yOffsetMultiplier, scale);
    }
}

    function drawPathWithOffset(graphics: p5.Graphics, path: Point[], weight: number, c: number, yOffset: number, scale:number) {

        graphics.stroke(c, c, c);
        graphics.strokeWeight(weight*scale);
        graphics.noFill();

        if (path.length > 1) {
            graphics.beginShape();
            graphics.curveVertex(path[0].x*scale, (path[0].y + yOffset)*scale); 
            for (let point of path) {
                graphics.curveVertex(point.x*scale, (point.y + yOffset)*scale);
            }
            graphics.curveVertex(path[path.length - 1].x*scale, (path[path.length - 1].y + yOffset)*scale);
            graphics.endShape();
        }
    }
    

    function addPointToPath(x: number, y: number) {
        const point: Point = { x, y };
        if (path.length === 0 || p.dist(x, y, path[path.length - 1].x, path[path.length - 1].y) >= 3) {
            path.push(point);
        }
    }

    function updateStrokeProperties() {
      if (framesSinceMousePressed < cursorWeightChangeDuration) {
          framesSinceMousePressed++;
          // Gradually increase the cursor weight change over 30 frames
          cursorWeightChange = (cursorWeightDifference * framesSinceMousePressed) / cursorWeightChangeDuration;
      } else {
          // Maintain the cursor weight change at the maximum after 30 frames
          cursorWeightChange = cursorWeightDifference;
      }
  }
    function drawImageCover(theImg: p5.Image, canvasWidth: number, canvasHeight: number) {

        let canvasRatio = canvasWidth / canvasHeight;
        let imageRatio = theImg.width / theImg.height;
        let drawWidth, drawHeight, drawX, drawY;

        if (canvasRatio > imageRatio) {
            // Wider canvas, image needs to cover width-wise
            drawWidth = canvasWidth;
            drawHeight = theImg.height * (canvasWidth / theImg.width);
            drawX = 0;
            drawY = (canvasHeight - drawHeight) / 2; // Center vertically
        } else {
            // Taller canvas, image needs to cover height-wise
            drawHeight = canvasHeight;
            drawWidth = theImg.width * (canvasHeight / theImg.height);
            drawX = (canvasWidth - drawWidth) / 2; // Center horizontally
            drawY = 0;
        }

        p.image(theImg, drawX, drawY, drawWidth, drawHeight);
    }


}



// const App = React.memo(({ projectData, cursorRadius }) => {
//     return <ReactP5Wrapper sketch={(p) => sketch(p, projectData, cursorRadius)} />;
// }, (prevProps, nextProps) => {
//     // This function determines if the props are equal, if they are, it won't re-render
//     return prevProps.projectData.slug === nextProps.projectData.slug;
// });

const App = React.memo(({ imageUrl, cursorRadius }: AppProps) => {
  // Use useState and useEffect to determine if the component is being rendered on the client
  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true); // Update the state to true when the component mounts
  }, []);

  if (!isClient) {
    // Render nothing or a placeholder on the server
    return null;
  }

  return <ReactP5Wrapper sketch={(p) => sketch(p, imageUrl, cursorRadius)} />;
}, (prevProps, nextProps) => {
  // Memoization condition based on imageUrl
  return prevProps.imageUrl === nextProps.imageUrl;
});

App.displayName = 'App'; // Assigning a display name

export { App };