'use client'

import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import imageUrlBuilder from '@sanity/image-url';
import {getImageDimensions} from '@sanity/asset-utils'
// import { getImageDimensions } from '@sanity/asset-utils';

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
  const [windowHeight, setWindowHeight] = useState<number>(0);
  const [windowDevicePixelRatio, setDevicePixelRatio] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  // const [w, h] = image.match(/(\d{1,})(?=\.|\x)/g);
  // console.log(w, h);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
      setDevicePixelRatio(window.devicePixelRatio*0.5);
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
  //     imageStyle = { width: '100dvw', height: 'auto', borderTop: "4px solid white", borderBottom: "4px solid white" };
  //   } else {
  //     imageStyle = { width: 'auto', height: '100%', borderLeft: "4px solid white", borderRight: "4px solid white" };
  //   }
  // }


  const handleLoadingComplete = (img: HTMLImageElement) => {
    // set the default styles for the images if the "fit" property wasn't indicated in the CMS
    // vertical is contain, horizontal is cover
    setIsLoaded(true); // Set loaded state to true when image is loaded

    // if (!fit && windowWidth > 450) {
    //   if (img.naturalWidth > img.naturalHeight) {
    //     img.style.objectFit = "cover";
    //   } else {
    //     img.style.objectFit = "contain";

    //     const imageAspectRatio = img.naturalWidth / img.naturalHeight;
    //     const browserAspectRatio = document.documentElement.clientWidth / document.documentElement.clientHeight;

    //     img.style.left = "50%";
    //     img.style.top = "50%";
    //     img.style.transform = "translate(-50%, -50%)";

    //     if (imageAspectRatio > browserAspectRatio) {
    //       // Image is wider than the browser
    //       img.style.width = "100dvw";
    //       img.style.height = "auto";
    //       img.style.borderTop = "4px solid white";
    //       img.style.borderBottom = "4px solid white";

    //     } else {
    //       // Image is taller than the browser
    //       img.style.width = "auto";
    //       img.style.height = "100%";
    //       img.style.borderLeft = "4px solid white";
    //       img.style.borderRight = "4px solid white";
    //     }
    //   }
    // } else {
    //       img.style.width = "100dvw";
    //       img.style.height = "auto";
    //       img.style.borderTop = "4px solid white";
    //       img.style.borderBottom = "4px solid white";
    // }
  };

  const builder = imageUrlBuilder({
    projectId: "oogp23sh",
    dataset: "production",
  });
  
  
  function urlFor(source: string) {
    return builder.image(source);
  }


  // console.log(urlFor(image));



  // Calculate image dimensions
  const { width: naturalWidth, height: naturalHeight } = getImageDimensions(image);
  
  const targetWidth = Math.round(windowWidth * windowDevicePixelRatio*1.5);
  const targetHeight = Math.round((windowHeight - 21) * windowDevicePixelRatio*1.5);
  let width = naturalWidth;
  let height = naturalHeight;
  let borderX = '0px'; // Default values
  let borderY = '0px'; // Default values
  let assignedFit = 'inherit'; 

  console.log(targetWidth,targetHeight);

  let optimizedSrc = urlFor(image)
  // .width(width)  // Set desired width
  .auto('format') // Automatic format selection (e.g., WebP)
  .quality(100)
  .url();

  let newOptimizedSrc = urlFor(image)
    .auto('format')
    .quality(100);

  if (fit || (!fit && (naturalWidth < naturalHeight)) || windowWidth < 450) {
    const imageAspectRatio = naturalWidth / naturalHeight;
    const browserAspectRatio = windowWidth / (windowHeight - 21);

    // console.log("image is set to fit")

    if (imageAspectRatio > browserAspectRatio) {
      // Image is wider than browser
      // console.log("image is wider than the browser")
      width = windowWidth;
      height = (naturalHeight / naturalWidth) * windowWidth;
      borderY = '3px solid white';
      // console.log(width, height);
      // console.log("image is wider than the browser")
      newOptimizedSrc = newOptimizedSrc.width(targetWidth);
    } else {
      // Image is taller than browser
      // console.log("image is taller than the browser")
      height = (windowHeight - 21);
      width = (naturalWidth / naturalHeight) * (windowHeight - 21);
      borderX = '3px solid white';
      // console.log(width, height);
      // console.log("image is taller than the browser")
      newOptimizedSrc = newOptimizedSrc.height(targetHeight);
    }
  } else {
    // console.log("image aspect ratio smaller than browser aspect ratio")
    width = windowWidth;
    height = (windowHeight - 21);    
    newOptimizedSrc = newOptimizedSrc.width(targetWidth);
  }

  // console.log(width, height)

  // console.log(newOptimizedSrc.url());

  // let optimizedSrc = urlFor(image)
  // .width(width)  // Set desired width
  // .auto('format') // Automatic format selection (e.g., WebP)
  // .quality(100)
  // .url();

  return (
      <Image 
        src={newOptimizedSrc.url()}
        alt={alt}
        width={Math.round(width)}
        height={Math.round(height)}
        quality={90}
        // height='0'
        // height={100}
        // fill
        // sizes="100dvw"
        // objectFit='contain'
        // objectFit={fit || 'contain'}
        onLoadingComplete={handleLoadingComplete}
        priority={true}
        style={{
          // opacity: isLoaded ? 1 : 0, // CSS for opacity transition
          opacity: 1, // CSS for opacity transition
          transition: 'opacity 0.5s ease-in-out', // Transition effect
          transform: 'translate(-50%, -50%)',
          position:'absolute',
          left: '50%',
          top: '50%',
          borderLeft: borderX,
          borderRight: borderX,
          borderTop: borderY,
          borderBottom: borderY,
          // objectFit: assignedFit
        }}
      />
  );
}

export default ProjectGalleryImage;

    