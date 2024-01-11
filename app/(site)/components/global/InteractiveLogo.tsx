'use client';

import React, { useEffect, useRef } from 'react';
import styles from '../../css/InteractiveLogo.module.css';

export default function InteractiveLogo() {
  const logoRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const element = document.querySelector(`.interactiveLogo > div`);
      const logoElements = document.querySelectorAll(`.interactiveLogo > div`);
      const viewportBottom = window.scrollY + window.innerHeight;

      const pageHeight = Math.max( document.body.scrollHeight, document.body.offsetHeight, 
                       document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight );

        const stretchAmt = window.innerHeight/2;

        // Select the element with the #logo ID
const logoElement = document.getElementById('logo');


    //   for (let element of elements) {
        if (element) {
            const rect = element.getBoundingClientRect();
            const elementBottom = rect.top + window.scrollY + rect.height;
            console.log(window.scrollY, pageHeight);
        
            if (elementBottom <= viewportBottom) {
                console.log('Element touched the bottom');
        
                if (logoElements) {
                    let newHeight = map(window.scrollY, pageHeight - stretchAmt - window.innerWidth, pageHeight - window.innerWidth, 0, stretchAmt);
                    console.log(window.scrollY, pageHeight - stretchAmt - window.innerWidth, pageHeight - window.innerWidth);
                    console.log(newHeight)
                    
                    // Ensure each logoElement is an HTMLElement to access the style property
                    logoElements.forEach((logoElement) => {
                        const htmlLogoElement = logoElement as HTMLElement;
                        htmlLogoElement.style.height = newHeight + "px";
                    });
                }
            }
        }
        
      }
    // };

    function map(value:number, low1:number, high1:number, low2:number, high2:number) {
        return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
    }

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    <div className={styles.t}>
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
