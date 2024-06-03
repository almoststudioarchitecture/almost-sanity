'use client'; 

// import * as sanityQuery from "@/sanity/sanity.query";
// import type { ProfileType } from "@/types";
// import ShadowFilter from "./icons/ShadowFilter";
// import ArrowTopRight from "./icons/ArrowTopRight";
// import Draw from "./components/Draw";
// import Job from "./components/Job";
import { getProjects } from "@/sanity/sanity.query";
import Head from 'next/head';
import type { ProjectType } from "@/types";
import DrawCursor from './components/DrawCursor';
import styles from './css/Home.module.css';
import ProjectListItem from "./components/ProjectListItem";
import { useEffect, useState, useRef } from 'react';
import imageUrlBuilder from '@sanity/image-url';
import Link from 'next/link';
import Script from 'next/script';




export default function Home() {

  const [projects, setProjects] = useState<ProjectType[]>([]);
  const [displayedProjects, setDisplayedProjects] = useState<ProjectType[]>([]);
  // const [loading, setLoading] = useState(true);
  const [displayedIndices, setDisplayedIndices] = useState(new Set());

  const [showDrawCursor, setShowDrawCursor] = useState(false);


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

  // console.log(getStoredProjects());

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

        // console.log(sessionStorage);

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

useEffect(() => {
  const checkIfOverCanvas = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    setShowDrawCursor(target.tagName === 'CANVAS');
  };

  if (typeof window !== 'undefined') {
    window.addEventListener('mousemove', checkIfOverCanvas);
    
    return () => {
      window.removeEventListener('mousemove', checkIfOverCanvas);
    };
  }
}, []);

const [linkHref, setLinkHref] = useState('');
  const [projectName, setProjectName] = useState('');
  const [projectLocation, setProjectLocation] = useState('');


const iframeRef = useRef<HTMLIFrameElement>(null);
  // Function to add the "drawing" class to the body
  const startDrawing = () => {
    document.body.classList.add("drawing");
  };

  // Function to remove the "drawing" class from the body
  const stopDrawing = () => {
    document.body.classList.remove("drawing");
    // document.body.classList.add("drawn");
  };
  useEffect(() => {
    // Handler for messages from the iframe
    // const handleMessage = (event: { source: any; data: string; }) => {
    //   // Check if the message is from the expected iframe
    //   if (iframeRef.current && event.source === iframeRef.current.contentWindow) {
    //     console.log(event);
    //     if (event.data === 'mousedown') {
    //       startDrawing();
    //     } else if (event.data.type === 'mouseup') {
    //       stopDrawing();

    //       // Update the elements with the received data
    //       const projectLinkElem = document.getElementById('projectLink') as HTMLAnchorElement;
    //       const projectNameElem = document.getElementById('projectName');
    //       const projectLocationElem = document.getElementById('projectLocation');

    //       // console.log(event);

    //       if (projectLinkElem) projectLinkElem.href = `/projects/${event.data.data.slug}`;
    //       if (projectNameElem) projectNameElem.innerHTML = event.data.data.title;
    //       if (projectLocationElem) projectLocationElem.innerHTML = `, ${event.data.data.location}`;
          
    //     }
    //   }
    // };

    interface MessageEventData {
      type: string;
      data: {
        slug: string;
        title: string;
        location: string;
      };
    }

    const handleMessage = (event: { source: any; data: MessageEventData | string }) => {
      if (iframeRef.current && event.source === iframeRef.current.contentWindow) {
        const eventData = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;

        if (eventData.type === 'mouseup') {
          stopDrawing();

            // Step 2: Update state instead of direct DOM manipulation
            if (eventData.data != null){
              
            const newHref = `/projects/${eventData.data.slug}`;
            const newName = eventData.data.title;
            const newLocation = `, ${eventData.data.location}`;

            setLinkHref(newHref);
            setProjectName(newName);
            setProjectLocation(newLocation);
          }
        } else if (eventData.type === 'mousedown') {
          startDrawing();
        } 
      }
    };

  // Add event listeners for mouse and touch events
  // Add event listeners for window and message events
  if (typeof window !== 'undefined') {
    window.addEventListener('message', handleMessage, false);
  }

  // Return a cleanup function to remove the event listeners
  return () => {
    if (typeof window !== 'undefined') {
      window.removeEventListener('message', handleMessage, false);
    }
  };
}, []); // Empty dependency array means this effect runs once on mount and cleanup on unmount




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

  const renderAdditionalLines = () => {
    const additionalLines = [];
    for (let i = 0; i < 20; i++) {
        additionalLines.push(<div key={i} className={styles.additionalLine}></div>);
    }
    return additionalLines;
  };


    return (
      <>
          <Head>
            <title>ALMOST STUDIO</title>
          </Head>
          <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-K8S3973D6Y"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-K8S3973D6Y');
          `}
        </Script>
          
          <main>
          <div className="verticalLine"></div>
          <div className="canvases">

          <iframe 
            ref={iframeRef}
            id="myIFrame"
            src="https://almost-studio-coming-soon.netlify.app/instagram/" 
            style={{width: '100vw', height: '100vh', position: 'fixed', top: 0, left: 0}} 
            title="Draw Tool Almost Studio">
          </iframe>
            
          </div>

          <div className={`draw_name ${projectName ? 'visible' : ''}`}>
            <h2>
              <Link id="projectLink" href={linkHref}>
                    <span id="projectName">{projectName}</span><span id="projectLocation">{projectLocation}</span>
                    <svg width="12" height="12" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M23.1717 4H9V0H30V21H26V6.82858L2.82843 30.0002H0V27.1717L23.1717 4Z" fill="#FF0000"></path></svg>
                </Link>
            </h2>
          </div>
          
          
          </main>
          
        </>
    )
}
