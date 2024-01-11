import * as React from "react";
import { P5CanvasInstance, ReactP5Wrapper } from "@p5-wrapper/react";
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
  let maskGraphics: Image | Element | Framebuffer;
  let path: { y: number; }[] | { x: any; y: any; }[] = [];
  let imageDrawn = false;
  let mousePressedOverCanvas = false;
  let cnvImage: Image;
  let shadowHeightDark = 8;
  let shadowHeightLight = 10;
  let isReordered = false;

  const cursorElement = document.getElementById("cursor");

  const builder = imageUrlBuilder({
    projectId: "oogp23sh",
    dataset: "production",
  });

//   const imageUrl = urlFor(project.coverImage.image)
//                    .height(200) // set the height to 200px
//                    .url(); // get the URL

  p.preload = function() {
    // if (projectData && projectData.coverImage && projectData.coverImage.image) {
    //   img = p.loadImage(projectData.coverImage.image);
    // }
    if (imageUrl) {
        img = p.loadImage(imageUrl);
      }
    console.log(imageUrl);
    // console.log("preloading");
  };
  
  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);
    // pos = {x: p.random(p.width), y: p.random(p.height)};
    // Ensure img is defined before using it
    // if (img) {
    //     if (img.height<img.width){
    //         img.resize(0, p.height); 
    //     } else {
    //         img.resize(p.width, 0); 
    //     }
    //     // img.resize(p.width, 0); // Example, resize if needed
    // }
    maskGraphics = p.createGraphics(p.width, p.height);
    maskGraphics.clear();
    p.strokeJoin(p.ROUND);

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

  }

  p.draw = () => {
    // console.log(imageDrawn);
    if (!mousePressedOverCanvas) {
        p.noLoop(); // Optional: Additional safety to ensure noLoop is called if mouse is not pressed
    }
    if (!imageDrawn) {
        // console.log
        drawImageCover(img, p.width/2, p.height/2);
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
            addPointToPath(p.mouseX, p.mouseY);
        }

        drawPathsOnMask(maskGraphics, path, cursorRadius);

        if (!isReordered){
            
            let displayImage = cnvImage.get();
            displayImage.mask(maskGraphics);

            p.image(displayImage, 0, 0, p.width*2, p.height*2);
            // console.log(displayImage)
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
    // p.clear();
    // if (img) {
    //   p.image(img, pos.x, pos.y);
    // }
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
        // cursorElement.style.width = cursorRadius + "px";
        // cursorElement.style.height = cursorRadius + "px";
        // strokeShrink = p.max(strokeShrink - 0.1, 0);
        // if (isReordered){
        //     cursorRadius = gridWeight;
        // } else {
        //     cursorRadius = p.max(cursorRadius - strokeShrink, startWeight - weightDiff);
        // }
        

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


}



// const App = React.memo(({ projectData, cursorRadius }) => {
//     return <ReactP5Wrapper sketch={(p) => sketch(p, projectData, cursorRadius)} />;
// }, (prevProps, nextProps) => {
//     // This function determines if the props are equal, if they are, it won't re-render
//     return prevProps.projectData.slug === nextProps.projectData.slug;
// });

const App = React.memo(({ imageUrl, cursorRadius }: AppProps) => {
    return <ReactP5Wrapper sketch={(p) => sketch(p, imageUrl, cursorRadius)} />;
}, (prevProps, nextProps) => {
    return prevProps.imageUrl === nextProps.imageUrl;
});

export { App };