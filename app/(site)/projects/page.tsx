'use client';

import ArrowTopRight from "../icons/ArrowTopRight";
import { getProjects } from "@/sanity/sanity.query";
import type { ProjectType } from "@/types";
import Head from 'next/head';
import Link from 'next/link';
import DrawCursor from '../components/DrawCursor';
import GalleryItem from '../components/GalleryItem';
import imageUrlBuilder from '@sanity/image-url';
import Script from 'next/script';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';

const builder = imageUrlBuilder({
  projectId: "oogp23sh",
  dataset: "production",
});

function urlFor(source: string) {
  return builder.image(source);
}

const TRANSITION_SPEED: number = 400;

export default function Projects() {
  const [projects, setProjects] = useState<ProjectType[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [mouseIsDown, setIsDown] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);
  const [isHoveringProjectName, setIsHoveringProjectName] = useState(false);

  const router = useRouter();

  const handleProjectClick = (e: React.MouseEvent<HTMLDivElement>, projectSlug: string) => {
    if (isDragging) {
      e.preventDefault();
      setIsDragging(false);
      setIsDown(false);
    } else {
      document.body.classList.add("transitioning");
      setTimeout(() => {
        document.body.classList.remove("transitioning");
        router.push(`/projects/${projectSlug}`);
      }, TRANSITION_SPEED);
    }
  };

  const updateWindowWidth = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    updateWindowWidth();
    window.addEventListener('resize', updateWindowWidth);
    return () => window.removeEventListener('resize', updateWindowWidth);
  }, []);

  useEffect(() => {
    async function fetchProjects() {
      const fetchedProjects = await getProjects();
      setProjects(fetchedProjects);
    }
    fetchProjects();
  }, []);

  useEffect(() => {
    let counter = 1;
    const interval = setInterval(() => {
      counter++;
    }, 50);
    return () => clearInterval(interval);
  }, [isDragging]);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setDragStart({ x: e.clientX, y: e.clientY });
    setIsDragging(false);
    setIsDown(true);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (mouseIsDown) {
      const dx = e.clientX - dragStart.x;
      const dy = e.clientY - dragStart.y;
      if (Math.sqrt(dx * dx + dy * dy) > 10) {
        setIsDragging(true);
      }
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setIsDown(false);
  };

  const handleMouseEnter = () => {
    setIsHoveringProjectName(true);
  };

  const handleMouseLeave = () => {
    setIsHoveringProjectName(false);
  };

  return (
    <>
      <Head>
        <title>PROJECTS – ALMOST STUDIO</title>
      </Head>
      <main>
        <div className="verticalLine"></div>

        <div className="canvases gridded">
          {projects.map((project, index) => {
            const originalIndex = projects.findIndex(p => p.slug === project.slug);
            let sizeX = Math.ceil(windowWidth / 2 * window.devicePixelRatio);
            if (windowWidth < 450) {
              sizeX = Math.ceil(windowWidth * window.devicePixelRatio);
            }
            const optimizedSrc = urlFor(project.coverImage.image)
              .width(sizeX)
              .auto('format')
              .quality(100)
              .url();

            return (
              <div
                key={index}
                className="canvas-container"
                id={`container${originalIndex}`}
                data-slug={project.slug}
                data-order={originalIndex}
                data-href={project.coverImage.image}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                // onMouseUp={handleMouseUp}
                onClick={(e) => handleProjectClick(e, project.slug)}
              >
                <GalleryItem
                  optimizedSrc={optimizedSrc}
                  project={project}
                  altText={project.coverImage.alt ?? ''}
                />
              </div>
            );
          })}
        </div>

        {!isHoveringProjectName && <DrawCursor cursorSize={30} />}
      </main>
    </>
  );
}
