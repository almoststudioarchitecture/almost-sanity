'use client';

// import React from 'react';
// import React, { useEffect } from 'react';
import ArrowTopRight from '../icons/ArrowTopRight';
import styles from '../css/Home.module.css';
import Link from 'next/link';
import type { ProjectType } from "@/types";
import ProjectGalleryImage from "./ProjectGalleryImage";
import ProjectInfoModule from "./ProjectInfoModule";
import InteractiveLogo from "./global/InteractiveLogo";
import Image from "next/image";
import React, { useRef, useEffect, useState } from 'react';



const ProjectScrollSnap = ({ project }: { project: ProjectType }) => {
   
    const projectInnerRef = useRef<HTMLDivElement>(null);
    const [isAtTop, setIsAtTop] = useState(true);

    // const handleScroll = () => {
    //     if (projectInnerRef.current) {
    //         const rect = projectInnerRef.current.getBoundingClientRect();
    //         setIsAtTop(rect.top <= 25);
    //     }
    // };

    const handleScroll = () => {
        if (projectInnerRef.current) {
            const rect = projectInnerRef.current.getBoundingClientRect();
            // Determine if the div is at the top of the page
            const atTop = rect.top <= 28; // You might adjust this value to 0 or a small positive number if needed

            setIsAtTop(atTop);

            // Add or remove "scrollable" class based on the position
            if (atTop) {
                projectInnerRef.current.classList.add('scrollable');
            } else {
                projectInnerRef.current.classList.remove('scrollable');
            }
        }
    };

    useEffect(() => {
        // Attach scroll event listener to both projectInner element and window
        const projectInnerElement = projectInnerRef.current;
        if (projectInnerElement) {
            projectInnerElement.addEventListener('scroll', handleScroll, { passive: true });
        }
        window.addEventListener('scroll', handleScroll, { passive: true });

        // Initial check to set the correct state/class
        handleScroll();

        // Cleanup function
        return () => {
            if (projectInnerElement) {
                projectInnerElement.removeEventListener('scroll', handleScroll);
            }
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);


    // Style object to conditionally apply styles based on the isAtTop state
    const scrollStyle: React.CSSProperties = isAtTop
        // ? { pointerEvents: "none" }
        ? { pointerEvents: "inherit" }
        : { pointerEvents: "inherit" };

    return (
        <div className="projectInner" ref={projectInnerRef} style={scrollStyle}>
                    <div id="after"></div>
            {/* <div className="section hero relative">
                {project.coverImage?.white ?
                    <Image
                    className="hero-image WHITE"
                    width='0'
                    height='0'
                    sizes='100dvw'
                    src={project.coverImage?.image}
                    alt={project.coverImage?.alt || project.name}
                    style={{ background: 'white', objectFit: 'contain', width: '100%', height: '100%' }}
                    priority
                    />
                    :
                    <Image
                    className="hero-image"
                    layout='fill'
                    objectFit='cover'
                    src={project.coverImage?.image}
                    alt={project.coverImage?.alt || project.name}
                    priority
                    />
                }
                <svg width="100%" height="100%" id="svg">
                    <mask id="mask">
                        <rect x="0" y="0" width="100%" height="100%" fill="black" />
                        
                        <defs>
                            <pattern id="img" patternUnits="userSpaceOnUse" width="100%" height="100%">
                                <image href="#" x="0" y="0" width="100%" height="100%" preserveAspectRatio="xMinYMin slice"/>
                            </pattern>
                        </defs>
                        <path></path>
                    </mask>  
                    <defs>
                        <filter id="shadowFilter" x="0" y="0" width="100%" height="100%" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                            <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                            <feOffset dy="4"/>
                            <feGaussianBlur stdDeviation="2"/>
                            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
                            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"/>
                            <feBlend mode="normal" in2="shape" result="effect1_innerShadow_68_42"/>
                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                            <feOffset dy="-4"/>
                            <feGaussianBlur stdDeviation="5"/>
                            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
                            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"/>
                            <feBlend mode="normal" in2="effect1_innerShadow_68_42" result="effect2_innerShadow_68_42"/>
                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                            <feOffset dy="4"/>
                            <feGaussianBlur stdDeviation="3"/>
                            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
                            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
                            <feBlend mode="normal" in2="effect2_innerShadow_68_42" result="effect3_innerShadow_68_42"/>
                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                            <feOffset dy="-4"/>
                            <feGaussianBlur stdDeviation="3"/>
                            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
                            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.4 0"/>
                            <feBlend mode="normal" in2="effect3_innerShadow_68_42" result="effect4_innerShadow_68_42"/>
                        </filter>
                    </defs>
                    <rect className="rect" x="0" y="0" width="100%" height="100%" mask="url(#mask)" fill="url(#img)"/>
                    <g className="shadow" filter="url(#shadowFilter)">
                        <path></path>
                    </g>
                </svg>
            </div> */}
                <ProjectInfoModule 
                name={project.name} 
                metadata={project.metadata} 
                description={project.description} 
                />

                    {project.gallery && project.gallery.map((item, index) => {
                    const randomStyleNumber = Math.floor(Math.random() * 11) + 1;

                    

                    if (item._type === 'image'){
                        

                        if (item.caption){
                        
                            return (
                            <div key={index} className="image-container-outer relative">
                                <div className={`image-container-inner relative style${randomStyleNumber}`} data-width="500" data-height="100">
                                <ProjectGalleryImage
                                    key={index}
                                    // src={optimizedSrc} 
                                    image={item.image} 
                                    alt={item.alt || project.name}
                                    fit={item.fit}
                                />
                                </div>
                                <div className="caption">
                                    {item.caption}
                                </div>
                            </div>
                            );
                        } else {
                            return (
                            <div key={index} className="image-container-outer relative">
                                <div className={`image-container-inner relative style${randomStyleNumber}`}>
                                { item.image &&  
                                <ProjectGalleryImage
                                    key={index}
                                    // src={optimizedSrc} 
                                    image={item.image} 
                                    alt={item.alt || project.name}
                                />
                                }
                                </div>
                            </div>
                            );
                        }

                    } else if (item._type === 'vimeoVideoLink') {
                            return (
                            <div key={index}>
                                <iframe
                                src={item.vimeo}
                                title={item.title}
                                width="640"
                                height="360"
                                frameBorder="0"
                                allowFullScreen
                                ></iframe>
                                <h1>THIS IS A VIMEO VIDEO</h1>
                            </div>
                            );
                    } 
                    return null;
                    })}


      <InteractiveLogo />
        </div>
    );
};

export default ProjectScrollSnap;
