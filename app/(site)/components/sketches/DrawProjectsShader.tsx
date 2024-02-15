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

  let dragged = false;


  let maskShader: any;


  let maskVert = `
  attribute vec3 aPosition;
  attribute vec2 aTexCoord;
  
  uniform mat4 uProjectionMatrix;
  uniform mat4 uModelViewMatrix;
  
  varying vec2 vTexCoord;
  
  void main() {
    vec4 positionVec4 = vec4(aPosition, 1.0);
    gl_Position = uProjectionMatrix * uModelViewMatrix * positionVec4;
    vTexCoord = aTexCoord;
  }
  `;
  
  let maskFrag = `
  precision highp float;
  
  varying vec2 vTexCoord;
  uniform sampler2D maskTex;
  uniform sampler2D imageTex;
  
  void main(){
    vec4 mask = texture2D(maskTex, vTexCoord);
    vec4 image = texture2D(imageTex, vTexCoord);
  
    // use the alpha to mask between the images
    // or another color channel if you want...
    gl_FragColor = vec4(image.rgb, mask.a);
  }`
  
 
  
  p.setup = () => {
    cnv = p.createCanvas(window.innerWidth/2, window.innerHeight/2, p.WEBGL);

    maskShader = p.createShader(maskVert, maskFrag);

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

        // console.log(determiner);
        p.push();
        p.translate(-p.width/2, -p.height/2);

        if (determiner < 0.1){
            const gap = 30;
            for (let x=0;x<p.width*2;x+=gap){
                p.line(x, 0, x, p.height*2)
            }
        } else if (determiner < 0.2){
            const gap = 30;
            for (let x=0;x<p.width*2;x+=gap){
                p.line(x, 0, x, p.height*2)
            }
            for (let y=0;y<p.height*2;y+=gap){
              p.line(0, y, p.height*2, y)
          }
        } else if (determiner < 0.3){
          const gap = 30;
          for (let x = 0; x <= p.width; x += gap) {
            p.line(x, 0, 0, x);
          }
        } else if (determiner < 0.4){
          const gap = 30;
          for (let x = 0; x <= p.width*2; x += gap) {
            p.line(x, 0, 0, x);
          }
          for (let y = 0; y <= p.height*2; y += gap) {
            p.line(0, y, y, 0);
          }
        } else if (determiner < 0.5){
          const gap = 60;
            for (let x=0;x<p.width*2;x+=gap){
                p.line(x, 0, x, p.height*2)
            }
        } else if (determiner < 0.6){
          const gap = 20;
          for (let y=0;y<p.height*2;y+=gap){
            p.line(0, y, p.height*2, y)
          }
        } else if (determiner < 0.7){
          for (let y = 0; y <= p.height*2; y += 10) {
            p.line(0, y, y, 0);
          }
        } else if (determiner < 0.8){
          const gap = 30;
          const diagonalLength = Math.sqrt(p.width * p.width + p.height * p.height);

          // 60-degree lines
          // for (let x = 0; x <= diagonalLength; x += gap) {
          //     // Calculate the y-coordinate for the 60-degree angle
          //     let y60 = x * Math.tan(Math.PI / 3); // 60 degrees in radians

          //     // Draw the line from (x, 0) to (0, p.height - y60)
          //     p.line(x, 0, 0, p.height - y60);
          // }

          // -60-degree lines
          for (let x = 0; x <= diagonalLength; x += gap) {
              // Calculate the y-coordinate for the -60-degree angle
              let yMinus60 = x * Math.tan(-Math.PI / 3); // -60 degrees in radians

              // Draw the line from (x, p.height) to (0, yMinus60)
              p.line(x, p.height, 0, yMinus60);
          }

        } else if (determiner < 0.9){
          const gap = 16;
          for (let x=0;x<p.width;x+=gap){
              p.line(x, 0, x, p.height)
          }
          for (let y=0;y<p.height;y+=gap){
            p.line(0, y, p.height, y)
          }
        } else {
          const gap = 30;
          for (let x=0;x<p.width;x+=gap){
              p.line(x, 0, x, p.height)
          }
          for (let y=0;y<p.height;y+=gap){
            p.line(0, y, p.height, y)
          }

        } 

        p.pop();



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
                let maskImage: p5.Image = p.createImage(p.width/2, p.height/2);
                maskImage.copy(maskGraphics, 0, 0, maskGraphics.width, maskGraphics.height, 0, 0, p.width/2, p.height/2); 
                // maskImage.copy(maskGraphics, 0, 0, p.width, p.height, 0, 0, maskImage.width, maskImage.height); 
                // maskImage.resize(p.width*4, p.height*4);

                // // Apply the mask to displayImage
                // displayImage.mask(maskImage);

                // Draw the masked image
                // p.image(displayImage, 0, 0, p.width, p.height);
                shaderMask(displayImage, maskGraphics);

        p.push();
        p.blendMode(p.MULTIPLY);
        p.image(maskGraphics, -p.width/2, -p.height/2, p.width, p.height);
        p.pop();
    }
    // p.ellipse(100,100,60,60)
  };

  function shaderMask(image: p5.Image, mask: any): void {
    p.push();
    p.noStroke();
    p.shader(maskShader);
    // p.translate(p.width/2, p.height/2);
    maskShader.setUniform('maskTex', mask);
    maskShader.setUniform('imageTex', image);
    p.plane(p.width, p.height);
    p.pop();
  }


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
        drawNonLinearShadows(graphics, path, weight, shadowHeightLight, 255, 80, -1);
        drawNonLinearShadows(graphics, path, weight, shadowHeightDark, 255, 80, 1);
        drawPathWithOffset(graphics, path, weight, 255, 0);
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
