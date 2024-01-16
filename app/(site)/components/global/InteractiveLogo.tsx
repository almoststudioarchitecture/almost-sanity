'use client';

import React, { useEffect, useState } from 'react';
import styles from '../../css/InteractiveLogo.module.css';

export default function InteractiveLogo() {
  const [isClient, setIsClient] = useState(false);

  
  // const startLogoHeight = window.innerWidth/49*4+4;

  useEffect(() => {
    // Set isClient to true as this code will only run on the client side
    setIsClient(true);

    const startLogoHeight = window.innerWidth / 49 * 4 + 4;

    const handleScroll = () => {
      if (!isClient) return;

      const logoElements = document.querySelectorAll(`.interactiveLogo > div`);
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

          console.log(elementTop,
            window.innerHeight-startLogoHeight,
            window.innerHeight,
            startLogoHeight,
            stretchAmt)

          let newHeight = map(
            elementTop,
            window.innerHeight-startLogoHeight,
            0,
            startLogoHeight,
            stretchAmt
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

      }
        
    };
    // };

    function map(value: number, low1: number, high1: number, low2: number, high2: number): number {
      return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
    }

    // if (isClient) {
    //   window.addEventListener('scroll', handleScroll);
    // }

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


  return (

<div id={styles.logo} className="interactiveLogo">
    <div className={styles.a}>
        <div></div>
        <div className={styles.bottom}></div>
    </div>
    <div className={styles.l}>
        <div className={`${styles.top} ${styles.right}`}></div>
    </div>
    <div className={styles.m}>
        <div className={styles.bottom}></div>
        <div className={styles.bottom}></div>
    </div>
    <div className={styles.o}>
        <div className={styles.center}></div>
    </div>
    <div className={styles.s}>
        <div className={styles.right}></div>
        <div className={styles.left}></div>
    </div>
    <div className={`${styles.t} ${styles.end}`}>
        <div className={`${styles.bottom} ${styles.left}`}></div>
        <div className={`${styles.bottom} ${styles.right}`}></div>
    </div>
    <div className={styles.gap}></div>

    <div className={styles.s}>
        <div className={styles.right}></div>
        <div className={styles.left}></div>
    </div>
    <div className={styles.t}>
        <div className={`${styles.bottom} ${styles.left}`}></div>
        <div className={`${styles.bottom} ${styles.right}`}></div>
    </div>
    <div className={styles.u}>
        <div className={styles.top}></div>
    </div>
    <div className={styles.d}>
        <div className={`${styles.right} ${styles.top}`}></div>
        <div className={`${styles.right} ${styles.bottom}`}></div>
        <div></div>
    </div>
    <div className={styles.i}>
        <div className={styles.left}></div>
        <div className={styles.right}></div>
    </div>
    <div className={styles.o}>
        <div className={styles.center}></div>
    </div>
</div>


  );
}
