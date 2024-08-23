'use client'

import { Image } from '@unpic/react';
import React, { useEffect, useState } from 'react';
import { GalleryImage } from '@/types';
import { objectPositionFromHotspot, RESOLUTIONS } from '../lib/image';

function ProjectGalleryImage({ item }: {item: GalleryImage}) {
    const [windowAspectRatio, setWindowAspectRatio] = useState<number>(1);

  useEffect(() => {
    const handleResize = () => {
      setWindowAspectRatio(window.innerWidth / window.innerHeight);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  let fallbackFit: "contain" | "cover" = "contain";
  if (windowAspectRatio > 1 && item.dimensions.aspectRatio > 1) {
    fallbackFit = "cover";
  }
  if (windowAspectRatio < 1 && item.dimensions.aspectRatio < 1) {
    fallbackFit = "cover";
  }
  const fit = item.fit ?? fallbackFit;

  return (
      <Image
          layout='fullWidth'
          objectFit={fit}
          src={item.image}
          alt={item.alt}
          sizes={fit === "contain" ? `(min-aspect-ratio: ${item.dimensions.aspectRatio}) ${100 * item.dimensions.aspectRatio}vh, 100vw` : `(min-aspect-ratio: ${item.dimensions.aspectRatio}) 100vw, ${100 * item.dimensions.aspectRatio}vh`}
          // @ts-ignore
          style={{
              width: "100%",
              height: "100%",
              position: "relative",
              objectPosition: fit === "contain" ? undefined : objectPositionFromHotspot(item.hotspot),
          }}
          breakpoints={RESOLUTIONS}
      />
  );
}

export default ProjectGalleryImage;

    