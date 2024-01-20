'use client';

import React, { useEffect, useState } from 'react';
import styles from '../../css/InteractiveLogo.module.css';
import { getProjects } from "@/sanity/sanity.query";
import type { ProjectType } from "@/types";
import Link from 'next/link';
import Image from 'next/image';

export default function InteractiveLogo() {
  const [isClient, setIsClient] = useState(false);
  const [projects, setProjects] = useState<ProjectType[]>([]);

  
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
          

    const startLogoHeight = window.innerWidth / 49 * 4 + 4;

    const handleScroll = () => {
      // if (!isClient) return;

      // console.log("hello world")

      const logoElements = document.querySelectorAll(`.interactiveLogo > *`);
      const logoElement = document.querySelector('.interactiveLogo');
      const viewportBottom = window.scrollY + window.innerHeight;
      const pageHeight = Math.max(
        document.body.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.clientHeight,
        document.documentElement.scrollHeight,
        document.documentElement.offsetHeight
      );
      const stretchAmt = window.innerHeight;

      // logoElements.forEach(element => {
      if (logoElement){
        
        const rect = logoElement.getBoundingClientRect();
        const elementTop = rect.top;

        // console.log(elementTop, window.innerHeight-startLogoHeight);

        if (elementTop < window.innerHeight-startLogoHeight){

          // console.log(elementTop,
          //   window.innerHeight-startLogoHeight,
          //   window.innerHeight,
          //   startLogoHeight,
          //   stretchAmt)

          let newHeight = map(
            elementTop,
            window.innerHeight-startLogoHeight,
            0,
            startLogoHeight,
            stretchAmt
          );

          // console.log(newHeight)

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

      }

    };
    // };

    function map(value: number, low1: number, high1: number, low2: number, high2: number): number {
      return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
    }

    if (typeof window !== undefined) {
      window.addEventListener('scroll', handleScroll);
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

<div id={styles.logo} className="interactiveLogo">
    <Link href={`/projects/${projects[0].slug}`} className={styles.a}>
        <div></div>
        <div className={styles.bottom}></div>
        <Image
                className={styles.heroImage}
                width='0'
                height='0'
                sizes='100vw'
                src={projects[0].coverImage.image}
                alt='gay'
                style={{ background: 'white', objectFit: 'cover', width: '100%', height: '100%' }}
         />
    </Link>
    <Link href={`/projects/${projects[0].slug}`} className={styles.l}>
        <div className={`${styles.top} ${styles.right}`}></div>
        <Image
                className={styles.heroImage}
                width='0'
                height='0'
                sizes='100vw'
                src={projects[1].coverImage.image}
                alt='gay'
                style={{ background: 'white', objectFit: 'cover', width: '100%', height: '100%' }}
         />
    </Link>
    <Link href={`/projects/${projects[0].slug}`} className={styles.m}>
        <div className={styles.bottom}></div>
        <div className={styles.bottom}></div>
        <Image
                className={styles.heroImage}
                width='0'
                height='0'
                sizes='100vw'
                src={projects[2].coverImage.image}
                alt='gay'
                style={{ background: 'white', objectFit: 'cover', width: '100%', height: '100%' }}
         />
    </Link>
    <Link href={`/projects/${projects[0].slug}`} className={styles.o}>
        <div className={styles.center}></div>
        <Image
                className={styles.heroImage}
                width='0'
                height='0'
                sizes='100vw'
                src={projects[3].coverImage.image}
                alt='gay'
                style={{ background: 'white', objectFit: 'cover', width: '100%', height: '100%' }}
         />
    </Link>
    <Link href={`/projects/${projects[0].slug}`} className={styles.s}>
        <div className={styles.right}></div>
        <div className={styles.left}></div>
        <Image
                className={styles.heroImage}
                width='0'
                height='0'
                sizes='100vw'
                src={projects[4].coverImage.image}
                alt='gay'
                style={{ background: 'white', objectFit: 'cover', width: '100%', height: '100%' }}
         />
    </Link>
    <Link href={`/projects/${projects[0].slug}`} className={`${styles.t} ${styles.end}`}>
        <div className={`${styles.bottom} ${styles.left}`}></div>
        <div className={`${styles.bottom} ${styles.right}`}></div>
        <Image
                className={styles.heroImage}
                width='0'
                height='0'
                sizes='100vw'
                src={projects[5].coverImage.image}
                alt='gay'
                style={{ background: 'white', objectFit: 'cover', width: '100%', height: '100%' }}
         />
    </Link>
    <div className={styles.gap}></div>

    <Link href={`/projects/${projects[0].slug}`} className={styles.s}>
        <div className={styles.right}></div>
        <div className={styles.left}></div>
        <Image
                className={styles.heroImage}
                width='0'
                height='0'
                sizes='100vw'
                src={projects[6].coverImage.image}
                alt='gay'
                style={{ background: 'white', objectFit: 'cover', width: '100%', height: '100%' }}
         />
    </Link>
    <Link href={`/projects/${projects[0].slug}`} className={styles.t}>
        <div className={`${styles.bottom} ${styles.left}`}></div>
        <div className={`${styles.bottom} ${styles.right}`}></div>
        <Image
                className={styles.heroImage}
                width='0'
                height='0'
                sizes='100vw'
                src={projects[7].coverImage.image}
                alt='gay'
                style={{ background: 'white', objectFit: 'cover', width: '100%', height: '100%' }}
         />
    </Link>
    <Link href={`/projects/${projects[0].slug}`} className={styles.u}>
        <div className={styles.top}></div>
        <Image
                className={styles.heroImage}
                width='0'
                height='0'
                sizes='100vw'
                src={projects[8].coverImage.image}
                alt='gay'
                style={{ background: 'white', objectFit: 'cover', width: '100%', height: '100%' }}
         />
    </Link>
    <Link href={`/projects/${projects[0].slug}`} className={styles.d}>
        <div className={`${styles.right} ${styles.top}`}></div>
        <div className={`${styles.right} ${styles.bottom}`}></div>
        <Image
                className={styles.heroImage}
                width='0'
                height='0'
                sizes='100vw'
                src={projects[9].coverImage.image}
                alt='gay'
                style={{ background: 'white', objectFit: 'cover', width: '100%', height: '100%' }}
         />
        <div></div>
    </Link>
    <Link href={`/projects/${projects[0].slug}`} className={styles.i}>
        <div className={styles.left}></div>
        <div className={styles.right}></div>
        <Image
                className={styles.heroImage}
                width='0'
                height='0'
                sizes='100vw'
                src={projects[10].coverImage.image}
                alt='gay'
                style={{ background: 'white', objectFit: 'cover', width: '100%', height: '100%' }}
         />
    </Link>
    <Link href={`/projects/${projects[0].slug}`} className={styles.o}>
        <div className={styles.center}></div>
        <Image
                className={styles.heroImage}
                width='0'
                height='0'
                sizes='100vw'
                src={projects[11].coverImage.image}
                alt='gay'
                style={{ background: 'white', objectFit: 'cover', width: '100%', height: '100%' }}
         />
    </Link>
</div>


  );
}
