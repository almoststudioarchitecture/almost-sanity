'use client'

import Image from 'next/image';
import React from 'react';

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
        const browserAspectRatio = window.innerWidth / window.innerHeight;

        img.style.left = "50%";
        img.style.top = "50%";
        img.style.transform = "translate(-50%, -50%)";

        if (imageAspectRatio > browserAspectRatio) {
          // Image is wider than the browser
          // setLayout('responsive');
          // setObjectFit('contain');
          img.style.width = "100vw";
          img.style.height = "auto";
          img.style.borderTop = "1px solid white";
          img.style.borderBottom = "1px solid white";

        } else {
          // Image is taller than the browser
          img.style.width = "auto";
          img.style.height = "100%";
          img.style.borderLeft = "1px solid white";
          img.style.borderRight = "1px solid white";
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
      objectFit={fit || 'contain'}
      onLoadingComplete={fit ? undefined : handleLoadingComplete}
    />
  );
}

export default ProjectGalleryImage;

     



// 'use client'

// import Image from 'next/image';
// import React, { useEffect, useState } from 'react';

// interface ProjectGalleryImageProps {
//   src: string;
//   alt: string;
//   fit?: 'cover' | 'contain';
// }

// function ProjectGalleryImage({ src, alt, fit }: ProjectGalleryImageProps) {
//   const [layout, setLayout] = useState<'fill' | 'responsive'>('responsive');
//   const [objectFit, setObjectFit] = useState<'cover' | 'contain'>('contain');


//   const handleLoadingComplete = (img: HTMLImageElement) => {
//     if (!fit) {
//         const imageAspectRatio = img.naturalWidth / img.naturalHeight;
//         const browserAspectRatio = window.innerWidth / window.innerHeight;

//         img.style.left = "50%";
//         img.style.top = "50%";
//         img.style.transform = "translate(-50%, -50%)";

//         if (imageAspectRatio > browserAspectRatio) {
//           // Image is wider than the browser
//           // setLayout('responsive');
//           // setObjectFit('contain');
//           img.style.width = "100vw";
//           img.style.height = "auto";
//           img.style.borderTop = "1px solid white";
//           img.style.borderBottom = "1px solid white";

//         } else {
//           // Image is taller than the browser
//           img.style.width = "auto";
//           img.style.height = "100%";
//           img.style.borderLeft = "1px solid white";
//           img.style.borderRight = "1px solid white";
//         }
//       // } else if (fit === 'cover') {
//       //   setLayout('fill');
//       //   setObjectFit('cover');
//       // } else {
//       //   setLayout('responsive');
//       //   setObjectFit('contain');
//       }
//   };


//   //   if (!fit) {
      
//   //     if (img.naturalWidth > img.naturalHeight) {
//   //       img.style.objectFit = "cover";
//   //     } else {
//   //       img.style.objectFit = "contain";
//   //     }
//   //   }
//   // };

//   return (
//     <Image 
//       src={src}
//       alt={alt}
//       fill
//       objectFit={fit || 'contain'}
//       onLoadingComplete={fit ? undefined : handleLoadingComplete}
//     />
//   );
// }

// export default ProjectGalleryImage;
