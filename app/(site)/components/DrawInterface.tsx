'use client';

import { getProjects } from "@/sanity/sanity.query";
import type { ProjectType } from "@/types";
import DrawCursor from '../components/DrawCursor';
import styles from '../css/Home.module.css';
import React, { useCallback, useEffect, useState, useMemo } from 'react';
import imageUrlBuilder from '@sanity/image-url';
import dynamic from 'next/dynamic';
import ProjectListItem from "../components/ProjectListItem";

const DynamicApp = dynamic(() => import('../components/sketches/DrawHome').then((mod) => mod.App), {
    ssr: false,
});

const minRadius = 30;
const initialRadius = 200;
const radiusChange = 20;

function shuffleArray<T>(array: T[]): T[] {
    let currentIndex = array.length, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
}

export default function DrawInterface() {
    const [projects, setProjects] = useState<ProjectType[]>([]);
    const [displayedProjects, setDisplayedProjects] = useState<ProjectType[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showDrawCursor, setShowDrawCursor] = useState(false);
    const [cursorRadius, setCursorRadius] = useState(200);
    const [isMobile, setIsMobile] = useState<boolean | null>(null);
    const [hasMounted, setHasMounted] = useState(false);

    const builder = imageUrlBuilder({
        projectId: "oogp23sh",
        dataset: "production",
    });

    useEffect(() => {
        setHasMounted(true);
        const handleResize = () => setIsMobile(window.innerWidth < 768);
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
                    setProjects(shuffledProjects);
                    setDisplayedProjects([shuffledProjects[0]]);
                }
            } catch (error) {
                console.error('Failed to load projects:', error);
            }
        }
        loadProjects();
    }, []);

    const addRandomProject = useCallback(() => {
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

    // Optimized Handler: Handles the logic when the user finishes a "draw" action
    const handleInteractionEnd = useCallback(() => {
        addRandomProject();

        if (displayedProjects.length > 0) {
            const lastProject = displayedProjects[displayedProjects.length - 1];
            const lastProjectSlug = lastProject.slug;

            const corresponding_lis = document.querySelectorAll(`.list-container [data-slug="${lastProjectSlug}"]`);
            document.querySelectorAll(".home--mostRecent").forEach(el => el.classList.remove("home--mostRecent"));

            corresponding_lis.forEach(li => {
                if (li instanceof HTMLElement) {
                    li.classList.add("home--visible", "home--mostRecent");
                    li.style.order = (99999 - currentIndex).toString();
                }
            });
        }

        document.body.classList.remove("mousedown");
        setCursorRadius(prev => (prev - radiusChange >= minRadius ? prev - radiusChange : initialRadius));
    }, [addRandomProject, currentIndex, displayedProjects]);

    // Prevent canvases from re-rendering unless a new project is added to the stack
    const memoizedCanvases = useMemo(() => {
        return displayedProjects.map((project) => {
            const imageUrl = builder.image(project.coverImage.image)
                .width(1500)
                .height(Math.floor((9 / 16) * 1200))
                .fit("crop")
                .auto("format")
                .url();

            return (
                <div key={project.slug} className="canvas-container" id={`container-${project.slug}`}>
                    <DynamicApp imageUrl={imageUrl} cursorRadius={cursorRadius} />
                </div>
            );
        });
    }, [displayedProjects]); // cursorRadius is intentionally excluded to prevent p5 restart on movement

    if (!hasMounted || isMobile === null) return null;

    return (
        <main
            onMouseEnter={() => setShowDrawCursor(true)}
            onMouseLeave={() => setShowDrawCursor(false)}
        >
            <div className="verticalLine"></div>

            <div
                className="canvases"
                style={{ cursor: 'none' }}
                onMouseUp={handleInteractionEnd}
                onTouchEnd={handleInteractionEnd}
            >
                {memoizedCanvases}
            </div>

            <div className="list-container">
                <ul className={`home--projectLinks ${styles.projectLinks} ${styles.lined}`}>
                    {projects.map((project, index) => (
                        <ProjectListItem key={project.slug || index} project={project} index={index} />
                    ))}
                </ul>
            </div>

            {!isMobile && showDrawCursor && <DrawCursor cursorSize={cursorRadius} />}
        </main>
    );
}