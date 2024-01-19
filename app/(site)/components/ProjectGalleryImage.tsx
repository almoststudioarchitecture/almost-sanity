'use client'

import Image from 'next/image';
import React from 'react';
// import imageUrlBuilder from '@sanity/image-url';
// import client from "./sanity.client";

interface ProjectGalleryImageProps {
  src: string;
  alt: string;
  fit?: 'cover' | 'contain';
}

function ProjectGalleryImage({ src, alt, fit }: ProjectGalleryImageProps) {


  const handleLoadingComplete = (img: HTMLImageElement) => {
    // set the default styles for the images if the "fit" property wasn't indicated in the CMS
    // vertical is contain, horizontal is cover
    if (!fit) {
      console.log("no fit");
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
          img.style.borderTop = "2px solid white";
          img.style.borderBottom = "2px solid white";

        } else {
          // Image is taller than the browser
          img.style.width = "auto";
          img.style.height = "100%";
          img.style.borderLeft = "2px solid white";
          img.style.borderRight = "2px solid white";
        }
      }
    } else {
      console.log(fit);
    }
  };

  return (
    <Image 
      src={src}
      alt={alt}
      fill
      sizes="100vw"
      objectFit={fit || 'contain'}
      onLoadingComplete={fit ? undefined : handleLoadingComplete}
    />
  );
}

export default ProjectGalleryImage;

    