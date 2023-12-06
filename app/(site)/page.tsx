// 'use client'; 

import * as sanityQuery from "@/sanity/sanity.query";
import type { ProfileType } from "@/types";
import ShadowFilter from "./icons/ShadowFilter";
import ArrowTopRight from "./icons/ArrowTopRight";
import Draw from "./components/Draw";
// import Job from "./components/Job";
import { getProjects } from "@/sanity/sanity.query";
// import Layout, { siteTitle } from './layout';
import Head from 'next/head';
import type { ProjectType } from "@/types";
import Script from 'next/script';
import DrawCursor from './components/DrawCursor';
import styles from './css/Home.module.css';
// import { useEffect } from 'react';
import ProjectListItem from "./components/ProjectListItem";


export default async function Home() {
  const projects: ProjectType[] = await getProjects();

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
          <Head>
            <title>ALMOST STUDIO</title>
            {/* <script src="../scripts/draw.js"></script> */}
          </Head>
          

          <div className="canvases">
          {shuffledProjects.slice(0, 8).map((project, index) => {
            // Find the original index of the project
            const originalIndex = projects.findIndex(p => p.slug === project.slug);

              return (
                <div key={index} className="canvas-container" id={`container${originalIndex}`} data-slug={project.slug} data-order={originalIndex} data-href={project.coverImage.image}>
                  <img src={project.coverImage.image}></img>
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
          

          <script
            // type="module" 
            src="https://cdn.jsdelivr.net/npm/p5@1.7.0/lib/p5.js"
            />
            <script
            // type="module" 
            // async 
            src="/js/sketch.js"
            />
        </>
    )
}
