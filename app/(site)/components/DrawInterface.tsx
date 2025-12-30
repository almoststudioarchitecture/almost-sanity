'use client';

import { getProjects } from "@/sanity/sanity.query";
import type { ProjectType } from "@/types";
import DrawCursor from '../components/DrawCursor';
import styles from '../css/Home.module.css';
import { useCallback, useEffect, useState } from 'react';
import imageUrlBuilder from '@sanity/image-url';
import dynamic from 'next/dynamic';
import ProjectListItem from "../components/ProjectListItem";

const DynamicApp = dynamic(() => import('../components/sketches/DrawHome').then((mod) => mod.App), {
    ssr: false,
});

const minRadius = 30;
const initialRadius = 200;
const radiusChange = 20;

// Move shuffleArray outside to keep component clean
function shuffleArray<T>(array: T[]): T[] {
    let currentIndex = array.length, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
}

export default function Draw() {
    const [projects, setProjects] = useState<ProjectType[]>([]);
    const [displayedProjects, setDisplayedProjects] = useState<ProjectType[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showDrawCursor, setShowDrawCursor] = useState(false);
    const [cursorRadius, setCursorRadius] = useState(200);

    // 1. Mobile & Hydration States
    const [isMobile, setIsMobile] = useState<boolean | null>(null);
    const [hasMounted, setHasMounted] = useState(false);

    const builder = imageUrlBuilder({
        projectId: "oogp23sh",
        dataset: "production",
    });

    // 2. Handle Resize & Mounting
    useEffect(() => {
        setHasMounted(true); // Signal that we are now on the client
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        async function loadProjects() {
            try {
                const loadedProjects = await getProjects();
                if (loadedProjects && loadedProjects.length > 0) {
                    const shuffledProjects = shuffleArray([...loadedProjects]);
                    // Set both states at once to prevent multiple re-renders
                    setProjects(shuffledProjects);
                    setDisplayedProjects([shuffledProjects[0]]); // Start with the first one
                }
            } catch (error) {
                console.error('Failed to load projects:', error);
            }
        }
        loadProjects();
    }, []); // Runs once on mount

    const addRandomProject = useCallback(() => {
        console.log('Adding random project');
        if (currentIndex < projects.length - 1) {
            setDisplayedProjects(prev => [...prev, projects[currentIndex + 1]]);
            setCurrentIndex(prev => prev + 1);
        } else {
            const reshuffledProjects = shuffleArray([...projects]);
            setProjects(reshuffledProjects);
            setDisplayedProjects([reshuffledProjects[0]]);
            setCurrentIndex(0);
        }
    }, [currentIndex, projects]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const handleMouseUp = () => {
                // 1. Trigger the state update for the next project
                addRandomProject();

                // 2. Original Logic: Reveal the project in the list
                if (displayedProjects.length > 0) {
                    const lastProject = displayedProjects[displayedProjects.length - 1];
                    const lastProjectSlug = lastProject.slug;

                    // Find the specific list items matching this slug
                    let corresponding_lis = document.querySelectorAll(`.list-container [data-slug="${lastProjectSlug}"]`);

                    // Remove 'mostRecent' from others
                    document.querySelectorAll(".home--mostRecent").forEach(mostRecent => {
                        if (mostRecent instanceof HTMLElement) {
                            mostRecent.classList.remove("home--mostRecent");
                        }
                    });

                    // Add visibility and order to the current project
                    corresponding_lis.forEach(li => {
                        if (li instanceof HTMLElement) {
                            li.classList.add("home--visible");
                            li.classList.add("home--mostRecent");
                            // This forces the newest drawn items to the top of the list visually
                            li.style.order = (99999 - currentIndex).toString();
                        }
                    });
                }

                // 3. Clean up body classes and update cursor
                document.body.classList.remove("mousedown");

                setCursorRadius(prevRadius => {
                    if (prevRadius - radiusChange >= minRadius) {
                        return prevRadius - radiusChange;
                    }
                    return initialRadius;
                });
            };

            const canvasesElem = document.querySelector(".canvases");
            if (canvasesElem) {
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
    }, [currentIndex, displayedProjects, projects, addRandomProject]);

    // 3. The Hydration Guard
    // On the server and the very first client render, hasMounted is false.
    // We return a "neutral" shell to keep React happy.
    if (!hasMounted || isMobile === null) {
        return null;
    }

    return (
        <>
            <main onMouseEnter={() => setShowDrawCursor(true)} onMouseLeave={() => setShowDrawCursor(false)}>
                <div className="verticalLine"></div>

                {/* Ensure the canvases div is always present so the event listener finds it */}
                <div className="canvases" style={{ cursor: 'none' }}>
                    {displayedProjects.map((project) => {
                        const imageUrl = builder.image(project.coverImage.image)
                            .width(1500)
                            .height(Math.floor((9 / 16) * 1200))
                            .fit("crop")
                            .auto("format")
                            .url()
                        return (
                            <div key={project.slug} className="canvas-container" id={`container-${project.slug}`}>
                                <DynamicApp imageUrl={imageUrl} cursorRadius={cursorRadius} />
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
                </div>

                {/* Logic to show cursor on Desktop */}
                {!isMobile && showDrawCursor && <DrawCursor cursorSize={cursorRadius} />}
            </main>
        </>
    );
}