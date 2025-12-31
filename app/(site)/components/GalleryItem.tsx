'use client';

import ArrowTopRight from '../icons/ArrowTopRight';
import Link from 'next/link';
import type { ProjectType } from "@/types";
import { Image } from "@unpic/react"
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic'
import { objectPositionFromHotspot, RESOLUTIONS } from '../lib/image';

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
  const [isHovered, setIsHovered] = useState(false); // Controls the sketch boot-up
  const [isHoveringProjectName, setIsHoveringProjectName] = useState(false);

  useEffect(() => {
    const touchScreenQuery = window.matchMedia('(hover: none)');
    setIsTouchScreen(touchScreenQuery.matches);
  }, []);

  return (
    <div
      className="galleryItemWrapper"
      onMouseEnter={() => !isTouchScreen && setIsHovered(true)}
      onMouseLeave={() => !isTouchScreen && setIsHovered(false)}
      style={{ position: 'relative', width: '100%', height: '100%' }}
    >
      <Link href={`/projects/${project.slug}`}>
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

        {!isTouchScreen && isHovered && (
          <div className="sketchOverlay" style={{ position: 'absolute', inset: 0 }}>
            <DynamicApp
              imageUrl={project.coverImage.image}
              cursorRadius={30}
            />
          </div>
        )}

        <div className="projectInfo">
          <div
            className="projectName"
            onMouseEnter={() => setIsHoveringProjectName(true)}
            onMouseLeave={() => setIsHoveringProjectName(false)}
          >
            {project.name}<ArrowTopRight />
          </div>
          {project.location && <div className="projectLocation">{project.location}</div>}
        </div>
      </Link>
    </div>
  );
};

export default GalleryItem;