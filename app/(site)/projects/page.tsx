import * as sanityQuery from "@/sanity/sanity.query";
import type { ProfileType } from "@/types";
import ShadowFilter from "../icons/ShadowFilter";
import ArrowTopRight from "../icons/ArrowTopRight";
import { getProjects } from "@/sanity/sanity.query";
import type { ProjectType } from "@/types";
import Script from 'next/script';
import Head from 'next/head';
import DrawCursor from '../components/DrawCursor';
import styles from '../css/Home.module.css';
import ProjectListItem from "../components/ProjectListItem";



export default async function Projects() {
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
            <title>PROJECTS – ALMOST STUDIO</title>
          </Head>
          
        <main>
            <div className="canvases gridded">
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

          <Script
            // type="module" 
            async
            src="https://cdn.jsdelivr.net/npm/p5@1.7.0/lib/p5.js"
            />
            <Script
            // type="module" 
            async 
            strategy='lazyOnload'
            src="/js/sketch.js"
            />
            </main>         
        </>
    )
}
