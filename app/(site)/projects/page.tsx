'use client'; 

// import * as sanityQuery from "@/sanity/sanity.query";
// import type { ProfileType } from "@/types";
// import ShadowFilter from "../icons/ShadowFilter";
import ArrowTopRight from "../icons/ArrowTopRight";
import { getProjects } from "@/sanity/sanity.query";
import type { ProjectType } from "@/types";
// import Script from 'next/script';
import Head from 'next/head';
import Link from 'next/link';
import DrawCursor from '../components/DrawCursor';
import GalleryItem from '../components/GalleryItem';
// import styles from '../css/Home.module.css';
// import ProjectListItem from "../components/ProjectListItem";
// import { Sketch } from '../components/sketches/DrawProjects';
import imageUrlBuilder from '@sanity/image-url';


import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic'


const DynamicApp = dynamic(() => import('../components/sketches/DrawProjects').then((mod) => mod.Sketch), {
  ssr: false, // This will disable server-side rendering for this component
});


const builder = imageUrlBuilder({
  projectId: "oogp23sh",
  dataset: "production",
});

function urlFor(source: string) {
  return builder.image(source);
}


export default function Projects() {
  const [projects, setProjects] = useState<ProjectType[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [mouseIsMoving, setIsMoving] = useState(false);
  const [mouseIsDown, setIsDown] = useState(false);

  const [windowWidth, setWindowWidth] = useState(0);

  // Function to update the window width
  const updateWindowWidth = () => {
    // if (window.devicePixelRatio < 1.9){
    //   setWindowWidth(window.innerWidth);
    // } else if (window.devicePixelRatio < 2.9){
    //   setWindowWidth(window.innerWidth*2);
    // } else if (window.devicePixelRatio == 3){
    //   setWindowWidth(window.innerWidth*3);
    // } else {
      setWindowWidth(window.innerWidth);
    // }
  };


  useEffect(() => {
    // Set initial size
    updateWindowWidth();

    // Add resize event listener
    window.addEventListener('resize', updateWindowWidth);

    // Cleanup function
    return () => window.removeEventListener('resize', updateWindowWidth);
  }, []);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setDragStart({ x: e.clientX, y: e.clientY });
    setIsDragging(false);
    setIsDown(true);
  };
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (mouseIsDown) {
      const dx = e.clientX - dragStart.x;
      const dy = e.clientY - dragStart.y;
      if (Math.sqrt(dx * dx + dy * dy) > 10) { // Threshold for dragging
        setIsDragging(true);
      }
    }
  };
  
  const handleMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(false);
    setIsDown(false);
  };


      // New state for tracking hover
      const [isHoveringProjectName, setIsHoveringProjectName] = useState(false);

      // Event handler for mouse enter
      const handleMouseEnter = () => {
          setIsHoveringProjectName(true);
      };
  
      // Event handler for mouse leave
      const handleMouseLeave = () => {
          setIsHoveringProjectName(false);
      };

  useEffect(() => {
    async function fetchProjects() {
      const fetchedProjects = await getProjects();
      setProjects(fetchedProjects);
      // shuffleArray(fetchedProjects); // Uncomment if you want to shuffle
    }
    fetchProjects();
  }, []); // Empty dependency array means this effect runs once on mount

 
  useEffect(() => {
    let counter = 1;
    const interval = setInterval(function(){
      // console.log(isDragging, counter);
      counter++;
    }, 50);
  
    // Cleanup function
    return () => clearInterval(interval);
  }, [isDragging]); // Add dependencies if necessary


    return (
      <>
          <Head>
            <title>PROJECTS – ALMOST STUDIO</title>
          </Head>
          
        <main>
            <div className="verticalLine"></div>
            
            <div  className="canvases gridded" 
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
            >
            {/* <Sketch cursorRadius={40} /> */}
            {projects.map((project, index) => {


              // Find the original index of the project
              const originalIndex = projects.findIndex(p => p.slug === project.slug);


                
              let sizeX = Math.ceil(windowWidth/2*window.devicePixelRatio);
              if (windowWidth < 450){
                sizeX = Math.ceil(windowWidth*window.devicePixelRatio);
              }

              // console.log(sizeX);

                // Generate optimized image URL
                const optimizedSrc = urlFor(project.coverImage.image)
                .width(sizeX)  // Set desired width
                .auto('format')
                .quality(100) // Automatic format selection (e.g., WebP)
                .url();

                // const srcSet = `
                //   ${urlFor(project.coverImage.image).width(400).url()} 400w, 
                //   ${urlFor(project.coverImage.image).width(800).url()} 800w,
                //   ${urlFor(project.coverImage.image).width(1200).url()} 1200w,
                //   ${urlFor(project.coverImage.image).width(1600).url()} 1600w,
                // `;

                // console.log(project.coverImage.alt);

                return (
                  <div key={index} className="canvas-container" id={`container${originalIndex}`} data-slug={project.slug} data-order={originalIndex} data-href={project.coverImage.image}>
                    
                    <GalleryItem optimizedSrc={optimizedSrc} project={project} altText={project.coverImage.alt ?? ''}></GalleryItem>
                  </div>
                );




              })}
            </div>

            {/* {!isHoveringProjectName && <DrawCursor cursorSize={30} />}  */}

            </main>         
        </>
    )
}
