// 'use client';

import Image from "next/image";
// import Script from 'next/script';
import { Metadata } from "next";
import { getSingleProject } from "@/sanity/sanity.query";
import type { ProjectType } from "@/types";
import { PortableText } from "@portabletext/react";
// import fallBackImage from "@/public/project.png";
import AboutScript from "./ProjectScript";
import imageUrlBuilder from '@sanity/image-url';
import ProjectGalleryImage from "../../components/ProjectGalleryImage";
import ProjectInfoModule from "../../components/ProjectInfoModule";
import InteractiveLogo from "../../components/global/InteractiveLogo";
import ProjectScrollSnap from "../../components/ProjectScrollSnap";


// import { Dimensions } from 'react-native';
import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal, PromiseLikeOfReactNode, Key } from "react";
import './project.css'
import { useRef, useEffect } from 'react';

// const projectInnerRef = useRef(null);


type Props = {
  params: {
    project: string;
  };
};

// const win = Dimensions.get('window');

// Dynamic metadata for SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = params.project;
  const project: ProjectType = await getSingleProject(slug);
  

  // console.log(project);

  return {
    title: `Almost Studio – ${project.name}`,
    description: project.name,
    openGraph: {
      images:
        project.coverImage?.image ||
        "https://res.cloudinary.com/victoreke/image/upload/v1689892912/docs/project.png",
      title: project.name,
      description: project.name,
    },
  };
}

export default async function Project({ params }: Props) {
  const slug = params.project;
  const project: ProjectType = await getSingleProject(slug);

  const builder = imageUrlBuilder({
    projectId: "oogp23sh",
    dataset: "production",
  });
  
  
  function urlFor(source: string) {
    return builder.image(source);
  }

  return (
    <>
    <main>
                    <div className="section hero fixed">
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
            </div>
      <ProjectScrollSnap project={project} />
      {/* <InteractiveLogo /> */}
    </main>
    
    </>
  );
}
