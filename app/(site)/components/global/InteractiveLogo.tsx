'use client';

import React, { useEffect, useState } from 'react';
import styles from '../../css/InteractiveLogo.module.css';

export default function InteractiveLogo() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Set isClient to true as this code will only run on the client side
    setIsClient(true);

    const handleScroll = () => {
      if (!isClient) return;

      const logoElements = document.querySelectorAll(`.interactiveLogo > div`);
      const viewportBottom = window.scrollY + window.innerHeight;
      const pageHeight = Math.max(
        document.body.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.clientHeight,
        document.documentElement.scrollHeight,
        document.documentElement.offsetHeight
      );
      const stretchAmt = window.innerHeight / 2;

      logoElements.forEach(element => {
        const rect = element.getBoundingClientRect();
        const elementBottom = rect.top + window.scrollY + rect.height;

        if (elementBottom <= viewportBottom) {
          let newHeight = map(
            window.scrollY,
            pageHeight - stretchAmt - window.innerWidth,
            pageHeight - window.innerWidth,
            0,
            stretchAmt
          );

          if (element instanceof HTMLElement) {
            element.style.height = newHeight + "px";
          }
        }
      });
    };

    function map(value: number, low1: number, high1: number, low2: number, high2: number): number {
      return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
    }

    if (isClient) {
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
