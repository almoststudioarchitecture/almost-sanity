'use client';

import React from 'react';
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
        console.log("Mouse left", project.slug);
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
