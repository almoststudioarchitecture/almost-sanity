'use client';

import React, { useEffect, useState } from 'react';
import styles from '../../css/InteractiveLogo.module.css';
import { getProjects } from "@/sanity/sanity.query";
import type { ProjectType } from "@/types";
import Link from 'next/link';
import { Image } from "@unpic/react";

function LogoImage({project}: {project: ProjectType}){
  return (
    <Image
      className={styles.heroImage}
      layout="fullWidth"
      src={project.coverImage.image}
      alt={project.name}
      background="white"
      // @ts-ignore
      style={{
          width: "100%",
          height: "100%",
      }}
    />
  )
}

export default function InteractiveLogo() {
  // const [isClient, setIsClient] = useState(false);
  // const [projects, setProjects] = useState<ProjectType[]>([]);
  // const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);


  const [isClient, setIsClient] = useState(false);
  const [projects, setProjects] = useState<ProjectType[]>([]);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);
  const [openedLinkId, setOpenedLinkId] = useState<string | null>(null);
  // const router = useRouter();


  // Detect if device has coarse pointer (touch screen)
  const hasCoarsePointer = () => {
    return window.matchMedia('(pointer: coarse)').matches;
  };
  
  // const startLogoHeight = window.innerWidth/49*4+4;

  useEffect(() => {
      // Set isClient to true as this code will only run on the client side
      setIsClient(true);

    
      // Fetch projects from Sanity
      const loadProjects = async () => {
        const fetchedProjects = await getProjects();
        // Shuffle the projects array for random assignment
        const shuffledProjects = fetchedProjects.sort(() => 0.5 - Math.random());
        setProjects(shuffledProjects);
      };
  
      if (isClient) {
        loadProjects();
      }

      // Add click event listener to .interactiveLogo divs
      const addPreviewClass = (event: MouseEvent): void => {
        const target = event.target as HTMLElement;

        // console.log("add preview class")
        // const target = event.target; // The clicked div
        if (!target.closest('.letter')) return; // Ignore clicks outside .interactiveLogo divs

        const letters = document.querySelectorAll('.letter');
        // console.log(letters);
        letters.forEach(div => {
          // console.log("removed preview class")
          div.classList.remove(styles.preview); // Remove preview class from all divs
        });
        // console.log("add preview class")
        // console.log(target);
        let thisLetter = target.closest('.letter');
        if (thisLetter){
          thisLetter.classList.add(styles.preview); // Add preview class to clicked div
        }
      };

      

          

      const startLogoHeight = window.innerWidth / 49 * 4 + 4;
      const startLogoHeightSm = Math.floor(((window.innerWidth / 30 * 4 * 2) - 1)/2);

    const handleScroll = () => {
      // if (!isClient) return;

      // console.log("hello world")

      const letters = document.querySelectorAll(".letter")
      const logoElements = document.querySelectorAll(`.interactiveLogo > *`);
      const logoElementContainers = document.querySelectorAll(`.interactiveLogo`);
      const logoElement = document.querySelector<HTMLElement>('.logoElement');
      const isProjectPage = document.querySelector('.projectInner') ? true : false;
      // console.log(isProjectPage);
      const viewportBottom = window.scrollY + window.innerHeight;
      const pageHeight = Math.max(
        document.body.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.clientHeight,
        document.documentElement.scrollHeight,
        document.documentElement.offsetHeight
      );
      const stretchAmt = window.innerHeight;


      // const logoElements = document.querySelectorAll('.interactiveLogo > *');
      
      letters.forEach((letter: Element) => {
        if (letter instanceof HTMLElement) {
          // if (hasCoarsePointer){
            letter.addEventListener('click', addPreviewClass);
            // logo.addEventListener('touchstart', addPreviewClass);
          // }
        }
      });



      if (logoElement){
        
        const rect = logoElement.getBoundingClientRect();
        const elementTop = rect.top;
        

        if (windowWidth > 700){

          // if (!isProjectPage){
            // if (1 == 1){
            // this is not the project page
              if (elementTop < window.innerHeight-startLogoHeight){

                let newHeight = Math.min(
                    map(
                      elementTop,
                      window.innerHeight-startLogoHeight,
                      0,
                      startLogoHeight,
                      stretchAmt
                    ), 
                    window.innerHeight-27
                );
      
      
                logoElements.forEach(element => {
                  if (element instanceof HTMLElement) {
                    element.style.height = newHeight + "px";
                  }
                });
      
              } else {
                  logoElements.forEach(element => {
                    if (element instanceof HTMLElement) {
                      element.style.height = startLogoHeight + "px";
                    }
                  })
              }
        } else {
          // console.log(elementTop, window.innerHeight-startLogoHeightSm*2, startLogoHeightSm);
          if (elementTop <= (window.innerHeight-startLogoHeightSm*2)){
            // console.log("do the thing");
            let newHeight = Math.min(
                map(
                  elementTop,
                  window.innerHeight-startLogoHeightSm*2,
                  27,
                  startLogoHeightSm,
                  (stretchAmt - 27)/2
                ), 
                (window.innerHeight-27)/2 - 1
            );

            // console.log(newHeight);
  
            logoElements.forEach(element => {
              if (element instanceof HTMLElement) {
                element.style.height = newHeight + "px";
              }
            });
  
          } else {
              logoElements.forEach(element => {
                if (element instanceof HTMLElement) {
                  element.style.height = startLogoHeightSm + "px";
                }
              })
          }
        }
        

      }

      const handleResize = () => {
        setWindowWidth(window.innerWidth);
      };
  
      if (isClient) {
        window.addEventListener('resize', handleResize);
        handleResize(); // Initial check
      }
  
      return () => {
        if (isClient) {
          window.removeEventListener('resize', handleResize);
        }
      };
      

    };
    // };

    function map(value: number, low1: number, high1: number, low2: number, high2: number): number {
      return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
    }

    const projectInnerElem = document.querySelector(".projectInner");
    if (typeof window !== undefined && !projectInnerElem) {
      window.addEventListener('scroll', handleScroll);
    } else if (typeof window !== undefined && projectInnerElem){
      window.addEventListener('scroll', handleScroll);
      projectInnerElem.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (isClient) {
        window.removeEventListener('scroll', handleScroll);
      }
    };
  }, [isClient]); // Dependency on isClient ensures proper setup and cleanup

  // Render nothing on the server
  if (!isClient) {
    return null;
  }


  // Render nothing on the server
  if (!isClient || projects.length === 0) {
    return null;
  }




  

  return (
    <div>
      {windowWidth > 700 ? (
        // JSX for window width greater than 700px
        
            <div id={styles.logo} className="interactiveLogo logoElement">
                  <Link href={`/projects/${projects[0].slug}`} className={styles.a}>
                      <div></div>
                      <div className={styles.bottom}></div>
                      <LogoImage
                        project={projects[0]}
                      />
                  </Link>
                  <Link href={`/projects/${projects[1].slug}`} className={styles.l}>
                      <div className={`${styles.top} ${styles.right}`}></div>
                      <LogoImage
                        project={projects[1]}
                      />
                  </Link>
                  <Link href={`/projects/${projects[2].slug}`} className={styles.m}>
                      <div className={styles.bottom}></div>
                      <div className={styles.bottom}></div>
                      <LogoImage
                        project={projects[2]}
                      />
                  </Link>
                  <Link href={`/projects/${projects[3].slug}`} className={styles.o}>
                      <div className={styles.center}></div>
                      <LogoImage
                        project={projects[3]}
                      />
                  </Link>
                  <Link href={`/projects/${projects[4].slug}`} className={styles.s}>
                      <div className={styles.right}></div>
                      <div className={styles.left}></div>
                      <LogoImage
                        project={projects[4]}
                      />
                  </Link>
                  <Link href={`/projects/${projects[5].slug}`} className={`${styles.t} ${styles.end}`}>
                      <div className={`${styles.bottom} ${styles.left}`}></div>
                      <div className={`${styles.bottom} ${styles.right}`}></div>
                      <LogoImage
                        project={projects[5]}
                      />
                  </Link>
                  <div className={styles.gap}></div>

                  <Link href={`/projects/${projects[6].slug}`} className={styles.s}>
                      <div className={styles.right}></div>
                      <div className={styles.left}></div>
                      <LogoImage
                        project={projects[6]}
                      />
                  </Link>
                  <Link href={`/projects/${projects[7].slug}`} className={styles.t}>
                      <div className={`${styles.bottom} ${styles.left}`}></div>
                      <div className={`${styles.bottom} ${styles.right}`}></div>
                      <LogoImage
                        project={projects[7]}
                      />
                  </Link>
                  <Link href={`/projects/${projects[8].slug}`} className={styles.u}>
                      <div className={styles.top}></div>
                      <LogoImage
                        project={projects[8]}
                      />
                  </Link>
                  <Link href={`/projects/${projects[9].slug}`} className={styles.d}>
                      <div className={`${styles.right} ${styles.top}`}></div>
                      <div className={`${styles.right} ${styles.bottom}`}></div>
                      <LogoImage
                        project={projects[9]}
                      />
                      <div></div>
                  </Link>
                  <Link href={`/projects/${projects[10].slug}`} className={styles.i}>
                      <div className={styles.left}></div>
                      <div className={styles.right}></div>
                      <LogoImage
                        project={projects[10]}
                      />
                  </Link>
                  <Link href={`/projects/${projects[11].slug}`} className={styles.o}>
                      <div className={styles.center}></div>
                      <LogoImage
                        project={projects[11]}
                      />
                  </Link>
              </div>

      ) : (
        // JSX for window width less than 700px
        <div id={styles.logoContainerSm} className="logoElement">
          <div className={`${styles.logoInner} interactiveLogo`}>
                <div className={`letter ${styles.a}`}>
                    <div></div>
                    <div className={styles.bottom}></div>
                    <LogoImage
                        project={projects[0]}
                      />
                    <Link href={`/projects/${projects[0].slug}`}></Link>
                </div>
                <div className={`letter ${styles.l}`}>
                    <div className={`${styles.top} ${styles.right}`}></div>
                    <LogoImage
                        project={projects[1]}
                      />
                    <Link href={`/projects/${projects[1].slug}`}></Link>
                </div>
                <div className={`letter ${styles.m}`}>
                    <div className={styles.bottom}></div>
                    <div className={styles.bottom}></div>
                    <LogoImage
                        project={projects[2]}
                      />
                    <Link href={`/projects/${projects[2].slug}`}></Link>
                </div>
                <div className={`letter ${styles.o}`}>
                    <div className={styles.center}></div>
                    <LogoImage
                        project={projects[3]}
                      />
                    <Link href={`/projects/${projects[3].slug}`}></Link>
                </div>
                <div className={`letter ${styles.s}`}>
                    <div className={styles.right}></div>
                    <div className={styles.left}></div>
                    <LogoImage
                        project={projects[4]}
                      />
                    <Link href={`/projects/${projects[4].slug}`}></Link>
                </div>
                <div className={`letter ${styles.t} ${styles.end}`}>
                    <div className={`${styles.bottom} ${styles.left}`}></div>
                    <div className={`${styles.bottom} ${styles.right}`}></div>
                    <LogoImage
                        project={projects[5]}
                      />
                    <Link href={`/projects/${projects[5].slug}`}></Link>
                </div>
            </div>
            <div className={`${styles.logoInner} interactiveLogo`}>

              <div className={`letter ${styles.s}`}>
                  <div className={styles.right}></div>
                  <div className={styles.left}></div>
                  <LogoImage
                        project={projects[6]}
                      />
                  <Link href={`/projects/${projects[6].slug}`}></Link>
              </div>
              <div className={`letter ${styles.t}`}>
                  <div className={`${styles.bottom} ${styles.left}`}></div>
                  <div className={`${styles.bottom} ${styles.right}`}></div>
                  <LogoImage
                        project={projects[7]}
                      />
                  <Link href={`/projects/${projects[7].slug}`} ></Link>
              </div>
              <div className={`letter ${styles.u}`}>
                  <div className={styles.top}></div>
                  <LogoImage
                      project={projects[8]}
                    />
                  <Link href={`/projects/${projects[8].slug}`} ></Link>
              </div>
              <div className={`letter ${styles.d}`}>
                  <div className={`${styles.right} ${styles.top}`}></div>
                  <div className={`${styles.right} ${styles.bottom}`}></div>
                  <div className={`${styles.center}`}></div>
                  <LogoImage
                      project={projects[9]}
                    />
                  <Link href={`/projects/${projects[9].slug}`} ></Link>
              </div>
              <div className={`letter ${styles.i}`}>
                  <div className={styles.left}></div>
                  <div className={styles.right}></div>
                  <LogoImage
                    project={projects[10]}
                  />
                  <Link href={`/projects/${projects[10].slug}`} ></Link>
              </div>
             <div className={`letter ${styles.o}`}>
                  <div className={styles.center}></div>
                  <LogoImage
                    project={projects[11]}
                  />
                  <Link href={`/projects/${projects[11].slug}`} ></Link>
              </div>
          </div>
        </div>
      )}
    </div>
  );
}
