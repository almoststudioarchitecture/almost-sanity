'use client'; 

// import * as sanityQuery from "@/sanity/sanity.query";
// import type { ProfileType } from "@/types";
// import ShadowFilter from "./icons/ShadowFilter";
// import ArrowTopRight from "./icons/ArrowTopRight";
// import Draw from "./components/Draw";
// import Job from "./components/Job";
import { getProjects } from "@/sanity/sanity.query";
// import Layout, { siteTitle } from './layout';
import Head from 'next/head';
import type { ProjectType } from "@/types";
// import Script from 'next/script';
import DrawCursor from './components/DrawCursor';
import styles from './css/Home.module.css';
// import { useEffect } from 'react';
import ProjectListItem from "./components/ProjectListItem";
// import DrawLayout from './components/global/DrawLayout'; // Adjust the path as needed
import { useEffect, useState } from 'react';
// import P5Wrapper from 'p5-wrapper';
// import p5 from 'p5'
// import { P5CanvasInstance, ReactP5Wrapper } from "@p5-wrapper/react";
// import { App } from './components/sketches/DrawHome';
import imageUrlBuilder from '@sanity/image-url';
import dynamic from 'next/dynamic'

const DynamicApp = dynamic(() => import('./components/sketches/DrawHome').then((mod) => mod.App), {
  ssr: false, // This will disable server-side rendering for this component
});


export default function Home() {

  const [projects, setProjects] = useState<ProjectType[]>([]);
  const [displayedProjects, setDisplayedProjects] = useState<ProjectType[]>([]);
  // const [loading, setLoading] = useState(true);
  const [displayedIndices, setDisplayedIndices] = useState(new Set());

  // State for managing cursor radius
  // const [cursorRadius, setCursorRadius] = useState(getInitialCursorRadius());
  const minRadius = 30; // Set the minimum radius size
  const initialRadius = 200; // Set the minimum radius size
  const radiusChange = 20; // The change in radius per mouseup event
  const [currentIndex, setCurrentIndex] = useState(0);

  const builder = imageUrlBuilder({
    projectId: "oogp23sh",
    dataset: "production",
  });

  const getStoredProjects = () => {
    const storedProjects: ProjectType[] = [];
    projects.forEach(project => {
      const storedProjectData = sessionStorage.getItem(project.slug);
      if (storedProjectData) {
        storedProjects.push(project);
      }
    });
    return storedProjects;
  };

  console.log(getStoredProjects());

  useEffect(() => {
    // Your existing code that runs on component mount
    
    // Your new window.onload functionality
    if (typeof window !== "undefined") {
        window.onload = function() {
          if (window.location.href === sessionStorage.getItem("origin")) {
            sessionStorage.clear();
          }
        };


        window.onbeforeunload = function() {
          sessionStorage.setItem("origin", window.location.href);
        }

        console.log(sessionStorage);

        // Return a cleanup function to remove event listeners
        return () => {
          // Clean up your event listeners if any
        };
      }
  }, []);


  // Initialize cursorRadius with a default value
  const [cursorRadius, setCursorRadius] = useState(200); // default value

  // Update the cursor radius based on the client width after component mounts
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const updateCursorRadius = () => {
        const newRadius = document.documentElement.clientWidth >= 500 ? 200 : 150;
        setCursorRadius(newRadius);
      };

      updateCursorRadius();

      // Also update on resize
      window.addEventListener('resize', updateCursorRadius);

      return () => {
        window.removeEventListener('resize', updateCursorRadius);
      };
    };
  }, []);

  // function urlFor(source) {
  //   return builder.image(source);
  // }

  // Asynchronously load projects from Sanity and shuffle them
useEffect(() => {
  async function loadProjects() {
    try {
      const loadedProjects = await getProjects();
      if (loadedProjects.length > 0) {
        const shuffledProjects = shuffleArray([...loadedProjects]);
        setProjects(shuffledProjects);
        // Initially display the first project in the shuffled list
        setDisplayedProjects([shuffledProjects[currentIndex]]);
      }
    } catch (error) {
      console.error('Failed to load projects:', error);
    }
  }

  loadProjects();
}, []);



function shuffleArray<T>(array: T[]): T[] {
    let currentIndex = array.length, randomIndex;
  
    // While there remain elements to shuffle...
    while (currentIndex !== 0) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }

 // Function to add a random project from the shuffled list
const addRandomProject = () => {
  // If we haven't shown all projects yet
  if (currentIndex < projects.length - 1) {
    // Show the next project
    setDisplayedProjects([...displayedProjects, projects[currentIndex + 1]]);
    // Increment the index
    setCurrentIndex(currentIndex + 1);
  } else {
    // If all projects have been shown, reshuffle and start over
    const reshuffledProjects = shuffleArray([...projects]);
    setProjects(reshuffledProjects);
    // Reset the displayed projects and index
    setDisplayedProjects([reshuffledProjects[0]]);
    setCurrentIndex(0);
  }
};

  // Event listener for adding a random project and changing the cursor size on mouseup
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleMouseUp = () => {
        
          addRandomProject();

          if (displayedProjects.length > 0) {
            const lastProject = displayedProjects[displayedProjects.length - 1];
            const lastProjectSlug = lastProject.slug; // Get the slug of the last project
          
            let corresponding_lis = document.querySelectorAll(`.list-container [data-slug="${lastProjectSlug}"]`);
            document.querySelectorAll(".home--mostRecent").forEach(mostRecent => {
              if (mostRecent instanceof HTMLElement) {
                mostRecent.classList.remove("home--mostRecent");
              }
            });
            corresponding_lis.forEach(li => {
              if (li instanceof HTMLElement) {
                li.classList.add("home--visible");
                li.classList.add("home--mostRecent");
                li.style.order = (99999 - currentIndex).toString();
              }
            });
            // Perform any actions needed with lastProjectSlug
            // console.log("Last picked project slug:", lastProjectSlug);
          }

          document.body.classList.remove("mousedown");
          // Update the cursor radius
          setCursorRadius(prevRadius => {
            // Check if the radius is greater than the minimum size
            if (prevRadius - radiusChange >= minRadius) {
              return prevRadius - radiusChange; // Decrease radius
            }
            return initialRadius; // Reset to initial size when it reaches the minimum
          });
      };


      // Attach the event listener
      const canvasesElem = document.querySelector(".canvases")
      if (canvasesElem){
        
        canvasesElem.addEventListener('mouseup', handleMouseUp);
        canvasesElem.addEventListener('touchend', handleMouseUp);
        canvasesElem.addEventListener('touchcancel', handleMouseUp);
        return () => {
          canvasesElem.removeEventListener('mouseup', handleMouseUp);
          canvasesElem.removeEventListener('touchend', handleMouseUp);
          canvasesElem.removeEventListener('touchcancel', handleMouseUp);
        };
      }
    }

}, [currentIndex, displayedProjects]); // Now dependent on currentIndex and displayedProjects
  // }, [projects]);


    return (
      <>
          <Head>
            <title>ALMOST STUDIO</title>
          </Head>
          
          <main>
          <div className="verticalLine"></div>
          <div className="canvases">

          {displayedProjects.map((project) => {
            // Using the slug as a key since it should be unique
            const imageUrl = builder.image(project.coverImage.image)
                .width(1200)
                .height(Math.floor((9 / 16) * 1200))
                .fit("crop")
                .auto("format")
                .url()
                   
            return (
              <div key={project.slug} className="canvas-container" id={`container-${project.slug}`} data-slug={project.slug} data-order={projects.findIndex(p => p.slug === project.slug)} data-href={imageUrl}>
                {typeof window !== 'undefined' && (
                  <DynamicApp imageUrl={imageUrl} cursorRadius={cursorRadius} />
                  // <App imageUrl={imageUrl} cursorRadius={cursorRadius} />
                )}
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
          
          {typeof window !== 'undefined' && (
            <DrawCursor cursorSize={cursorRadius} />
          )}
          
          </main>
          
        </>
    )
}
