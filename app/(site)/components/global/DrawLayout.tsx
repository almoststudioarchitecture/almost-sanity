// components/Layout.js
'use client';

import React, { useEffect, useState, ReactNode } from 'react';
import { getProjects } from "@/sanity/sanity.query";
import type { ProjectType } from "@/types";
import Script from 'next/script';
import DrawCursor from '../DrawCursor';
import ProjectListItem from "../ProjectListItem";
import styles from '../../css/Home.module.css';
import p5 from 'p5';


type DrawLayoutProps = {
    children: ReactNode; // This allows any valid React element as children
  };

const DrawLayout = ({ children }: DrawLayoutProps) => {
    const [projects, setProjects] = useState<ProjectType[]>([]);
    
    useEffect(() => {
        const fetchProjects = async () => {
          try {
            const fetchedProjects = await getProjects();
            shuffleArray(fetchedProjects);
            setProjects(fetchedProjects);
          } catch (error) {
            console.error('Error fetching projects:', error);
          }
        };
    
        fetchProjects();
      }, []); // 

    // Function to shuffle an array
    function shuffleArray(array: ProjectType[]): void {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
    }
  
    // Shuffle the projects array for display
    const shuffledProjects = [...projects]; // Clone the projects array
    shuffleArray(shuffledProjects);
    

  return (
    <>
      <main>
        {/* Your persistent p5 canvases go here */}
        <div className="canvases">
          {shuffledProjects.slice(0, 8).map((project, index) => {
            // Find the original index of the project
            const originalIndex = projects.findIndex(p => p.slug === project.slug);

              return (
                <div key={index} className="canvas-container" id={`container${originalIndex}`} data-slug={project.slug} data-order={originalIndex} data-href={project.coverImage.image}>
                  <img src={project.coverImage.image}></img>
                  {/* <canvas className={`canvas${originalIndex}`}></canvas> */}
                </div>
              );
            })}
          </div>
          <div className="list-container">
                <ul className={`home--projectLinks ${styles.projectLinks} ${styles.lined}`}>
                  {projects && projects.map((project, index) => (
                      <ProjectListItem key={index} project={project} index={index} />
                  ))}
                </ul>
                <ul className={`home--projectLinks ${styles.projectLinks}`} id="projectLinks">
                  {projects && projects.map((project, index) => (
                      <ProjectListItem key={index} project={project} index={index} />
                  ))}
                </ul>
          </div>
          <DrawCursor />
          {/* <Script
            // type="module" 
            // async
            src="https://cdn.jsdelivr.net/npm/p5@1.7.0/lib/p5.js"
            /> */}
            <script
            // type="module" 
            // async 
            // strategy='lazyOnload'
            src="/js/sketch.js"
            />
            

        {/* Placeholder for page-specific content */}
        {/* {children} */}
      </main>
    </>
  );
};

export default DrawLayout;