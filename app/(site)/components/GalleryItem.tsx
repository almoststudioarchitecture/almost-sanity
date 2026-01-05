'use client';

import ArrowTopRight from '../icons/ArrowTopRight';
import Link from 'next/link';
import type { ProjectType } from "@/types";
import { Image } from "@unpic/react"
import React, { useEffect, useState, useRef, RefObject } from 'react';
import dynamic from 'next/dynamic'
import { objectPositionFromHotspot, RESOLUTIONS } from '../lib/image';

export function useElementOnScreen(options: IntersectionObserverInit): [RefObject<HTMLDivElement>, boolean] {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    }, options);

    if (containerRef.current) observer.observe(containerRef.current);

    return () => {
      if (containerRef.current) observer.unobserve(containerRef.current);
    };
  }, [options]);

  return [containerRef, isVisible];
}

const DynamicApp = dynamic(() => import('../components/sketches/DrawProjects').then((mod) => mod.Sketch), {
  ssr: false,
});

type GalleryItemProps = {
  project: ProjectType;
  src: string;
  altText: string;
};

const GalleryItem: React.FC<GalleryItemProps> = ({ project, src, altText }) => {
  const [isTouchScreen, setIsTouchScreen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const touchScreenQuery = window.matchMedia('(hover: none)');
    setIsTouchScreen(touchScreenQuery.matches);
  }, []);

  return (
    <div
      className="galleryItemWrapper"
      onMouseEnter={() => !isTouchScreen && setIsHovered(true)}
      // onMouseLeave={() => !isTouchScreen && setIsHovered(false)}
      style={{ position: 'relative', width: '100%', height: '100%' }}
    >
      <Link href={`/projects/${project.slug}`} style={{ display: 'block', width: '100%', height: '100%' }}>
        <Image
          layout='fullWidth'
          objectFit={project.coverImage?.white ? "contain" : "cover"}
          src={project.coverImage?.image}
          alt={project.coverImage?.alt || project.name}
          background={project.coverImage?.white ? "white" : undefined}
          sizes="(max-width: 450px) 100vw, 50vw"
          // @ts-ignore
          style={{
            width: "100%",
            height: "100%",
            objectPosition: project.coverImage?.white ? undefined : objectPositionFromHotspot(project.coverImage?.hotspot),
          }}
          breakpoints={RESOLUTIONS}
        />

        <div className="projectInfo">
          <div className="projectName">
            {project.name}<ArrowTopRight />
          </div>
          {project.location && <div className="projectLocation">{project.location}</div>}
        </div>
      </Link>

      {!isTouchScreen && isHovered && (
        <div
          className="sketchOverlay"
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 10,           // Ensure it's above the link
            pointerEvents: 'none' // Allows clicks to pass through TO the link if the canvas is empty
          }}
        >
          {/* We set pointerEvents to 'auto' on the actual drawing container */}
          <div style={{ pointerEvents: 'auto', width: '100%', height: '100%' }}>
            <DynamicApp
              imageUrl={project.coverImage.image}
              cursorRadius={30}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryItem;