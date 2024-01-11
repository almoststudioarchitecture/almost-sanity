import * as React from "react";
import { P5CanvasInstance, ReactP5Wrapper } from "@p5-wrapper/react";

function sketch(p5: P5CanvasInstance) {
  
  let pos: { x: any; y: any; };
    
  p5.setup = () => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight);
    pos = {x: p5.random(p5.width), y: p5.random(p5.height)}
  }

  p5.draw = () => {
    p5.clear();
    p5.push();
    p5.translate(pos.x,pos.y);
    p5.rotate(p5.frameCount * 0.01);
    p5.rect(0,0, 100, 100);
    p5.pop();
  };
}

export function App() {
  return <ReactP5Wrapper sketch={sketch} />;
}