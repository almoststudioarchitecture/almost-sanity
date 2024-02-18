'use client';

// import React from 'react';
// import React, { useEffect } from 'react';
import ArrowTopRight from '../icons/ArrowTopRight';
import styles from '../css/Home.module.css';
import Link from 'next/link';
import type { ProjectType } from "@/types";
import ProjectGalleryImage from "./ProjectGalleryImage";
import ProjectInfoModule from "./ProjectInfoModule";
import Image from "next/image";
import React, { useRef, useEffect, useState } from 'react';
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router';

import imageUrlBuilder from '@sanity/image-url';


const builder = imageUrlBuilder({
  projectId: "oogp23sh",
  dataset: "production",
});

function urlFor(source: string) {
  return builder.image(source);
}



const DynamicApp = dynamic(() => import('../components/sketches/DrawProjects').then((mod) => mod.Sketch), {
    ssr: false, // This will disable server-side rendering for this component
});

type GalleryItemProps = {
    // src: string;
    project: ProjectType;
    optimizedSrc: string;
    altText: string;
};

const GalleryItem: React.FC<GalleryItemProps> = ({ project, optimizedSrc, altText }) => {

    // console.log("GalleryItem Props:", { project, optimizedSrc, srcSet });

    // const router = useRouter();
    const [isDragging, setIsDragging] = useState(false);

    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
    const [mouseIsMoving, setIsMoving] = useState(false);
    const [mouseIsDown, setIsDown] = useState(false);

    const [isTouchScreen, setIsTouchScreen] = useState(false);


    useEffect(() => {
        // Check if the device is a touch screen
        const touchScreenQuery = window.matchMedia('(hover: none)');
        setIsTouchScreen(touchScreenQuery.matches);

        // console.log(isTouchScreen);

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
        let counter = 1;
        const interval = setInterval(function(){
          // console.log(isDragging, counter);
          counter++;
        }, 50);
      
        // Cleanup function
        return () => clearInterval(interval);
      }, [isDragging]); // Add dependencies if necessary

      
      // {console.log(optimizedSrc)}
  
      
  
    //   console.log(project);

    return (
        <Link 
            href={`/projects/${project.slug}`} 
            // onClick={(e) => {
            //     console.log(isDragging);
            //     e.preventDefault();
            // }}
            >
            <Image 
                // src={optimizedSrc} 
                src={optimizedSrc} 
                // srcSet={srcSet}
                width="0"
                height="0"
                alt={altText}
                // style={{width: '50dvw', height:'50vh'}}
                sizes="(max-width: 450px) 100dvw, 50dvw"
                className={project.coverImage.white ? 'white' : ''}>
            </Image>
            {/* {!isTouchScreen && <DynamicApp cursorRadius={30} />} */}
            <div className="projectInfo">
            <div className="projectName" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                {project.name}<ArrowTopRight></ArrowTopRight>
            </div>
            {project.location && <div className="projectLocation">{project.location}</div>}
            </div>
        </Link>
    );
};

export default GalleryItem;
