'use client';

// import React from 'react';
import React, { useEffect } from 'react';
import ArrowTopRight from '../icons/ArrowTopRight';
import styles from '../css/Home.module.css';
import type { ProjectType } from "@/types";

type ProjectListItemProps = {
    project: ProjectType;
    index: number;
};

const ProjectListItem: React.FC<ProjectListItemProps> = ({ project, index }) => {
    const handleMouseEnter = (e: React.MouseEvent<HTMLLIElement>) => {
        // Additional mouse enter logic here
        let correspondingCanvas = document.querySelector<HTMLElement>(`.canvases [data-slug='${project.slug}']`)
        if (correspondingCanvas){
            correspondingCanvas.style.transform = "scale(1.08)";
            correspondingCanvas.style.zIndex = "99";
            correspondingCanvas.style.pointerEvents = "none";
        }
        let correspondingLinkSvg = document.querySelector<HTMLElement>(`li[data-slug='${project.slug}'] svg`);
        if (correspondingLinkSvg){
            correspondingLinkSvg.style.display = "inline-block";
        }
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLLIElement>) => {
        // console.log("Mouse left", project.slug);
        // Additional mouse leave logic here
        let correspondingCanvas = document.querySelector<HTMLElement>(`.canvases [data-slug='${project.slug}']`)
        if (correspondingCanvas){
            correspondingCanvas.style.transform = "scale(1)";
            correspondingCanvas.style.zIndex = "0";
            correspondingCanvas.style.pointerEvents = "inherit";
        }
        let correspondingLinkSvg = document.querySelector<HTMLElement>(`li[data-slug='${project.slug}'] svg`);
        if (correspondingLinkSvg){
            correspondingLinkSvg.style.display = "none";
        }
    };

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const x = e.clientX;
            const y = e.clientY;
            const elementsAtPoint = document.elementsFromPoint(x, y);
            let isOverListItem = false;

            // console.log(elementsAtPoint);

            for (const element of elementsAtPoint) {
                if (element.matches('li') && element.classList.contains('home--visible')) {
                    isOverListItem = true;
                    // console.log("is over list item");
                    // let linksContainer = document.querySelector<HTMLElement>(".list-container");
                    // if (linksContainer) {
                    //     linksContainer.style.pointerEvents = "inherit";
                    // }
                    let targetLink = element.querySelector<HTMLElement>("a");
                    if (targetLink) {
                        targetLink.style.pointerEvents = "inherit";
                    }
                    break;
                }
            }

            if (!isOverListItem) {
                // let linksContainer = document.querySelector<HTMLElement>(".list-container");
                // if (linksContainer) {
                //     linksContainer.style.pointerEvents = "none";
                // }
                // let targetLink = element.querySelector<HTMLElement>("a");
                // if (targetLink) {
                //     targetLink.style.pointerEvents = "none";
                // }
            }
        };

        document.addEventListener('mousemove', handleMouseMove);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
        };
    }, [project.slug]);

    return (
        <li 
            key={index} 
            data-slug={project.slug} 
            className={styles.li} 
            data-hide-cursor='true'
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <a href={`/projects/${project.slug}`} className={`${styles.a}`}>
                <ArrowTopRight />
                <span>{project.name}</span>
            </a>
        </li>
    );
};

export default ProjectListItem;
