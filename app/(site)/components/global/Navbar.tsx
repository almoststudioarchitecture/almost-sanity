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


const TRANSITION_SPEED = 1000;


export default function Navbar() {

    const [currentPath, setCurrentPath] = useState('');
    const [previousPath, setPreviousPath] = useState('');
    const [activeLinkIndex, setActiveLinkIndex] = useState(-1); // New state to track active link index
    const pathname = usePathname();
    const initialLoadRef = useRef(true);

    const router = useRouter(); // Initialize the router


    const [isNavOpen, setIsNavOpen] = useState(false); // New state to track the toggle of the first nav item

    // Function to close the nav
    const closeNav = () => {
        setIsNavOpen(false);
    };

    useEffect(() => {
        // Add the 'loading' class on initial load
        document.body.classList.add('loading');

        // Set a timeout to remove the 'loading' class
        const timer = setTimeout(() => {
            document.body.classList.remove('loading');
        }, 2000);

        // Cleanup function to clear the timer if the component unmounts
        return () => clearTimeout(timer);
    }, []);



    useEffect(() => {
        // Format the path by removing the leading slash
        const formattedPath = pathname.replace(/\//g, '');
    
        // Check if the path is one of the specified paths
        const isSpecifiedPath = formattedPath === "" || formattedPath === "projects" || formattedPath === "profile";
    
        // Set 'other' if it's not one of the specified paths
        const pathToUse = isSpecifiedPath ? formattedPath : "other";
    
        if (currentPath !== pathname) {
            document.body.classList.remove(`path-${currentPath}`);
            document.body.classList.add(`path-${pathToUse}`);
            setPreviousPath(currentPath);
            setCurrentPath(pathToUse);
    
            if (initialLoadRef.current) {
                initialLoadRef.current = false;
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
                setActiveLinkIndex(4);
        }
    }, [pathname]);

    

    // Function to add 'hoveringOthers' class to <nav> when hovering over non-active nav items
    const handleMouseEnter = (event: MouseEvent) => {
        const navElement = document.querySelector(`.${styles.nav}`) as HTMLElement;
        const activeIndex = navElement.className.match(/active-(\d+)/);
        const hoveredIndex = Array.from(navElement.querySelectorAll('ul li')).indexOf(event.currentTarget as Element) + 1;

        if (activeIndex && activeIndex[1] !== hoveredIndex.toString()) {
            navElement.classList.add("hoveringOthers");
        }
    };

    // Function to remove 'hoveringOthers' class from <nav>
    const handleMouseLeave = () => {
        const navElement = document.querySelector(`.${styles.nav}`);
        if (navElement) {
            navElement.classList.remove("hoveringOthers");
        }
    };

    // Attaching event listeners to nav items
    useEffect(() => {
        // Ensure the selected items are HTML elements
        const navItems = document.querySelectorAll(`.${styles.nav} ul li`) as NodeListOf<HTMLElement>;
    
        navItems.forEach(item => {
            item.addEventListener('mouseenter', handleMouseEnter as EventListener);
            item.addEventListener('mouseleave', handleMouseLeave as EventListener);
        });
    
        // Cleanup function to remove event listeners
        return () => {
            navItems.forEach(item => {
                item.removeEventListener('mouseenter', handleMouseEnter as EventListener);
                item.removeEventListener('mouseleave', handleMouseLeave as EventListener);
            });
        };
    }, []);

    // Function to handle navigation click
    const handleNavClick = (newPath: string) => {
            if (newPath === currentPath || (currentPath == 'other' && !isNavOpen)) {
                // If the clicked link is for the current page, toggle the open state
                if (document.documentElement.clientWidth < 450) {
                    setIsNavOpen(!isNavOpen);
                    
                }
            } else {
                // If the clicked link is for a different page, close the nav and navigate
                closeNav();
                navigateTo(newPath);
            }
    };

    // Navigation logic abstracted into a function for reusability
    const navigateTo = (newPath: React.SetStateAction<string>) => {
        let url = '/';
        switch (newPath) {
            case 'home':
                url = '/';
                break;
            case 'projects':
                url = '/projects';
                break;
            case 'profile':
                url = '/profile';
                break;
            // Add cases for other paths as needed
        }

        router.push(url);
        setPreviousPath(currentPath);
        setCurrentPath(newPath);
    };

    

    // Function to be called when Projects tab is clicked
    const onProjectsClick = () => {
        setActiveLinkIndex(2);
    };

    const onProfileClick = () => {
        setActiveLinkIndex(3);
    }
    const getActiveClass = (path: string) => {
        return pathname === path ? 'active' : '';
    };

    // const navClass = activeLinkIndex !== -1 ? `active-${activeLinkIndex}` : '';

    // Calculate class for <nav> based on active link index
    const navClass = activeLinkIndex !== -1 ? `active-${activeLinkIndex}` : '';

    return (
        <nav className={`${styles.nav} ${navClass} ${initialLoadRef.current ? 'initial-load' : ''}`} data-hide-cursor='true'>
        <ul className={styles.list}>
            <li className={`${styles.listItem} ${isNavOpen ? styles.open : ''}`}> {/* Toggle class here */}
                <button className={`${styles.link}`} onClick={() => handleNavClick('')}>
                    <div className={styles.inner}><span>A</span><span>l</span><span>m</span><span>o</span><span>s</span><span>t</span><span> </span><span>S</span><span>t</span><span>u</span><span>d</span><span>i</span><span>o</span></div>
                    <Image 
                        className={`${styles.icon} ${styles.iconDraw}`}
                        src="/img/draw-icon.gif"
                        width={25} 
                        height={25} 
                        alt="logo" 
                    />
                </button>
            </li>
            <li className={styles.listItem}>
                    {/* <button className={`${styles.link}`} onClick={onProjectsClick}> */}
                    <button className={`${styles.link}`} onClick={() => handleNavClick('projects')}>
                            <div className={styles.inner}><span>P</span><span>r</span><span>o</span><span>j</span><span>e</span><span>c</span><span>t</span><span>s</span></div>
                            <span className={`${styles.icon} ${styles.iconGrid}`}></span>
                    </button>
                    {/* </Link> */}
            </li>
            <li className={styles.listItem}>
                <button className={`${styles.link}`} onClick={() => handleNavClick('profile')}>
                <div className={styles.inner}>
                    <span>P</span><span>r</span><span>o</span><span>f</span><span>i</span><span>l</span><span>e</span>
                </div>
                <span className={`${styles.icon} ${styles.iconInfo}`}>i</span>
                </button>
            </li>
        </ul>
    </nav>
    );
}
