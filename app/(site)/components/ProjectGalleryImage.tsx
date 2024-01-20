'use client'

import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import imageUrlBuilder from '@sanity/image-url';
import {getImageDimensions} from '@sanity/asset-utils'

// import imageUrlBuilder from '@sanity/image-url';
// import client from "./sanity.client";

interface ProjectGalleryImageProps {
  image: string;
  alt: string;
  fit?: 'cover' | 'contain';
}

function ProjectGalleryImage({ image, alt, fit }: ProjectGalleryImageProps) {

  
  // State to store the current window width
  const [windowWidth, setWindowWidth] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState<boolean>(false); // New state for load status

  // const [w, h] = image.match(/(\d{1,})(?=\.|\x)/g);
  // console.log(w, h);

  useEffect(() => {
    // Function to update the window width
    const handleResize = () => {
      setWindowWidth(window.innerWidth * window.devicePixelRatio); // Adjust for device pixel ratio
    };

    // Set the initial width
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // const imageAspectRatio = w / h; // Use provided width and height
  // const browserAspectRatio = window.innerWidth / window.innerHeight;

  // Determine style based on aspect ratio
  // let imageStyle = {};
  // let objFit = 'contain';
  // if (!fit) {
  //   if (w > h) {
  //     objFit = 'cover'
  //   } else {
  //     objFit = 'contain'
  //   }
  //   if (imageAspectRatio > browserAspectRatio) {
  //     imageStyle = { width: '100vw', height: 'auto', borderTop: "4px solid white", borderBottom: "4px solid white" };
  //   } else {
  //     imageStyle = { width: 'auto', height: '100%', borderLeft: "4px solid white", borderRight: "4px solid white" };
  //   }
  // }


  const handleLoadingComplete = (img: HTMLImageElement) => {
    // set the default styles for the images if the "fit" property wasn't indicated in the CMS
    // vertical is contain, horizontal is cover
    setIsLoaded(true); // Set loaded state to true when image is loaded

    if (!fit) {
      // console.log("no fit");
      if (img.naturalWidth > img.naturalHeight) {
        img.style.objectFit = "cover";
      } else {
        img.style.objectFit = "contain";

        const imageAspectRatio = img.naturalWidth / img.naturalHeight;
        const browserAspectRatio = document.documentElement.clientWidth / document.documentElement.clientHeight;

        img.style.left = "50%";
        img.style.top = "50%";
        img.style.transform = "translate(-50%, -50%)";

        if (imageAspectRatio > browserAspectRatio) {
          // Image is wider than the browser
          img.style.width = "100vw";
          img.style.height = "auto";
          img.style.borderTop = "4px solid white";
          img.style.borderBottom = "4px solid white";

        } else {
          // Image is taller than the browser
          img.style.width = "auto";
          img.style.height = "100%";
          img.style.borderLeft = "4px solid white";
          img.style.borderRight = "4px solid white";
        }
      }
    } else {
      // console.log(fit);
    }
  };

  const builder = imageUrlBuilder({
    projectId: "oogp23sh",
    dataset: "production",
  });
  
  
  function urlFor(source: string) {
    return builder.image(source);
  }


  const optimizedSrc = urlFor(image)
  .width(windowWidth)  // Set desired width
  .auto('format') // Automatic format selection (e.g., WebP)
  .quality(100)
  .url();

  // console.log(image);

  return (
    <Image 
      src={optimizedSrc}
      alt={alt}
      fill
      sizes="100vw"
      objectFit={fit || 'contain'}
      onLoadingComplete={handleLoadingComplete}
      style={{
        opacity: isLoaded ? 1 : 0, // CSS for opacity transition
        transition: 'opacity 0.5s ease-in-out' // Transition effect
      }}
    />
  );
}

export default ProjectGalleryImage;

    