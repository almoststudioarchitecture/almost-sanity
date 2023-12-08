'use client'

import Image from "next/image";
import Link from "next/link";
import LogoGif from "../../icons/almost-favicon-1.gif";
import InfoIcon from "../../icons/info-icon.png";
import ProjectsBtn from "../ProjectsBtn";
import { usePathname } from 'next/navigation';
import styles from '../../css/Navbar.module.css';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState, useRef } from 'react';


export default function Navbar() {
    // const [currentPath, setCurrentPath] = useState('');
    // const [previousPath, setPreviousPath] = useState('');
    // const pathname = usePathname(); // Use usePathname hook
    // const initialLoadRef = useRef(true);

    const [currentPath, setCurrentPath] = useState('');
    const [previousPath, setPreviousPath] = useState('');
    const [activeLinkIndex, setActiveLinkIndex] = useState(-1); // New state to track active link index
    const pathname = usePathname();
    const initialLoadRef = useRef(true);

    useEffect(() => {
        if (typeof window !== "undefined") { // Check if running on the client side
            // Update the current and previous path states
            const formattedPath = pathname.replace(/\//g, '');
            if (currentPath !== pathname) {
                document.body.classList.remove(`path-${currentPath}`);
                document.body.classList.add(`path-${formattedPath}`);
                setPreviousPath(currentPath);
                setCurrentPath(formattedPath);

                if (initialLoadRef.current) {
                    initialLoadRef.current = false;
                }
            }
        }
    }, [pathname, currentPath]);

    useEffect(() => {
        // Update activeLinkIndex based on pathname
        switch (pathname) {
            case '/':
                setActiveLinkIndex(1);
                break;
            case '/projects':
                setActiveLinkIndex(2);
                break;
            case '/profile':
                setActiveLinkIndex(3);
                break;
            default:
                setActiveLinkIndex(-1);
        }
    }, [pathname]);

    // Function to be called when Projects tab is clicked
    const onProjectsClick = () => {
        if (previousPath === '' /* replace with the path of your home tab */) {
            // Code to execute when navigating from Home to Projects
            console.log("Navigated from Home to Projects");
            document.body.classList.add("gridded");
            document.body.classList.add("path-projects");
            document.body.classList.remove("path-");
            let activeNavTab = document.querySelector("nav a.active");
            if (activeNavTab){
                activeNavTab.classList.remove("active")
            }
            const canvases = document.querySelectorAll<HTMLElement>(".canvas-container");
            
            canvases.forEach(canvas => {
                let orderStr = canvas.getAttribute("data-order") as string;
                let order = parseInt(orderStr);
                let canvasElement = canvas.querySelector("canvas");
                let imgElement = canvas.querySelector("img");
                let canvasesElem = document.querySelector<HTMLElement>(".canvases");

                console.log(canvas);

                // Apply styles for reordered state
                canvas.style.left = order % 2 === 0 ? window.innerWidth / 2 - 1 + "px" : "-1px";
                canvas.style.display = "block";
                // canvas.style.backgroundImage = `url(${canvas.getAttribute("data-href")})`
                
                if (canvasElement) {
                    canvasElement.style.width = window.innerWidth / 2 + "px";
                    canvasElement.style.height = window.innerHeight / 2 + "px";
                }

                if (imgElement){
                    imgElement.style.display = "block";
                    setTimeout(function(){
                        imgElement!.style.opacity = "1";
                    },5)
                }

                let topValue = Math.floor(order / 2) * window.innerHeight / 2 - 1;
                console.log("top value " + topValue)
                canvas.style.top = topValue + "px";

                if (canvasesElem){
                    canvasesElem.classList.add("gridded");
                }
                
                // const canvasesElem = document.querySelector(".canvases");
                // if (canvasesElem !== null) {
                //     canvasesElem.classList.add("gridded");
                // }
            });


        }
        setActiveLinkIndex(2);
    };

    // const getActiveClass = (path: string) => {
    //     // return pathname === path ? `${styles.active}` : '';
    //     return pathname === path ? `active` : '';
    // };

    // const getActiveClass = (path: string, index: number) => {
    //     const isActive = pathname === path;
    //     if (isActive) {
    //         setActiveLinkIndex(index); // Update active link index
    //     }
    //     return isActive ? `active` : '';
    // };

    const getActiveClass = (path: string) => {
        return pathname === path ? 'active' : '';
    };

    // const navClass = activeLinkIndex !== -1 ? `active-${activeLinkIndex}` : '';

    // Calculate class for <nav> based on active link index
    const navClass = activeLinkIndex !== -1 ? `active-${activeLinkIndex}` : '';

    return (
        <nav className={`${styles.nav} ${navClass} ${initialLoadRef.current ? 'initial-load' : ''}`} data-hide-cursor='true'>
        <ul className={styles.list}>
            <li className={styles.listItem}>
                {/* <Link href="/" className={`${styles.link} ${getActiveClass('/')}`}> */}
                <Link href="/" className={`${styles.link}`}>
                    <span>A</span><span>l</span><span>m</span><span>o</span><span>s</span><span>t</span><span> </span><span>S</span><span>t</span><span>u</span><span>d</span><span>i</span><span>o</span>
                    <Image 
                        className={`${styles.icon} ${styles.iconDraw}`}
                        src="/images/draw-icon.gif"
                        width={25} 
                        height={25} 
                        alt="logo" 
                    />
                </Link>
            </li>
            <li className={styles.listItem}>
                    {/* <Link href="/projects" className={`${styles.link} ${getActiveClass('/projects')}`} > */}
                    {/* <button className={`${styles.link} ${getActiveClass('/projects')}`} onClick={onProjectsClick}> */}
                    <button className={`${styles.link}`} onClick={onProjectsClick}>
                            <span>P</span><span>r</span><span>o</span><span>j</span><span>e</span><span>c</span><span>t</span><span>s</span>
                            <span className={`${styles.icon} ${styles.iconGrid}`}></span>
                    </button>
                    {/* </Link> */}
            </li>
            <li className={styles.listItem}>
                {/* <Link href="/profile" className={`${styles.link} ${getActiveClass('/profile')}`}> */}
                <Link href="/profile" className={`${styles.link}`}>
                <span>P</span><span>r</span><span>o</span><span>f</span><span>i</span><span>l</span><span>e</span>                        <span id="icon-grid" className={styles.icon}></span>
                </Link>
            </li>
        </ul>
    </nav>
    );
}
