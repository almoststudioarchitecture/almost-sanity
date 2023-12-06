// 'use client';

import * as sanityQuery from "@/sanity/sanity.query";
import type { ProfileType } from "@/types";
import ShadowFilter from "./icons/ShadowFilter";
import ArrowTopRight from "./icons/ArrowTopRight";
import Draw from "./components/Draw";
// import Job from "./components/Job";
import { getProjects } from "@/sanity/sanity.query";
import Layout, { siteTitle } from './layout';
import Head from 'next/head';
import type { ProjectType } from "@/types";
import Script from 'next/script';
import DrawCursor from './components/DrawCursor';
import styles from './css/Home.module.css';
// import React from 'react'
// import myConfiguredSanityClient from './sanityClient'
// import client from './sanityClient'
// import imageUrlBuilder from '@sanity/image-url'

// const builder = imageUrlBuilder(myConfiguredSanityClient)

// function urlFor(source) {
//   return builder.image(source)
// }

export default async function Home() {
  const projects: ProjectType[] = await getProjects();

  return (
    <Layout>
        <Head>
          <title>{siteTitle}</title>
          {/* <script src="../scripts/draw.js"></script> */}
        </Head>
        <Draw />
        <div className="list-container">
              <ul className={`${styles.projectLinks} ${styles.lined}`}>
                {projects && projects.map((project, index) => (
                    <li key={index} data-slug={project.slug} className={styles.li} data-hide-cursor='true'>
                      <a href={`/projects/${project.slug}`} className={`${styles.a}`}><span>{project.name}</span><ArrowTopRight /></a>
                    </li>
                ))}
              </ul>
              <ul className={styles.projectLinks} id="projectLinks">
                {projects && projects.map((project, index) => (
                    <li key={index} data-slug={project.slug} className={styles.li} data-hide-cursor='true'>
                      <a href={`/projects/${project.slug}`} className={`${styles.a}`}><span>{project.name}</span><ArrowTopRight /></a>
                    </li>
                ))}
              </ul>
        </div>
        
        <Script
          // type="module" 
          src="/js/home.js"
          strategy="lazyOnload"
        />
      </Layout>
  )

  // return (
  //   <main className="px-3 py-2">
  //   <main className="page-draw">
  //     <div className="lines">
  //       <div className="horizontal" id="line-h1"></div>
  //       <div className="horizontal" id="line-h2"></div>
  //       <div className="vertical" id="line-v1"></div>
  //       <div className="vertical" id="line-v2"></div>
  //     </div>
  //     <ul id="projectLinks">
        
  //     {projects &&
  //             projects.map((project, index) => (
  //               <li key={index} data-slug={project.slug}>
  //                 <a className="px-2 py-2 border-b border-t border-r" data-type="page-transition" href={`/projects/${project.slug}`}>{project.name} <ArrowTopRight /></a>
  //               </li>
  //       ))}
  //     </ul>
  //     <div id="cursorPrompt" className="py-2 px-2">Drag to Draw</div>
  //     <div id="drawInHere">
  //         {projects &&
  //             projects.slice(0, 8).map((project, index) => (
  //               <div key={index} className="svgWrapper" data-href={`/projects/${project.slug}`} data-slug={project.slug} data-thumb={project.coverImage.image}>
  //                   <svg className="drawnSvg" width="100%" height="100%" id={`svg${index}`}>
  //                       <mask id={`mask${index}`}>
  //                           <rect x="0" y="0" width="100%" height="100%" fill="black"></rect>
  //                           <defs>
  //                               <pattern id={`img${index}`} patternUnits="userSpaceOnUse" width="100%" height="100%">
  //                                   {/* <image href={project.coverImage.image} x="0" y="0" width="100%" height="100%" preserveAspectRatio="xMinYMin slice"></image> */}
  //                                   {project.coverImage.focalpoint ? (
  //                                     <>
  //                                       <image href={project.coverImage.image} data-focalpoint={project.coverImage.focalpoint.y} x="0" y="0" width="100%" height="100%" preserveAspectRatio={`${project.coverImage.focalpoint.x}${project.coverImage.focalpoint.y.charAt(0).toUpperCase() + project.coverImage.focalpoint.y.slice(1)} slice`}></image>
  //                                     </>
  //                                   ) : (
  //                                     <image href={project.coverImage.image} x="0" y="0" width="100%" height="100%" preserveAspectRatio="xMidYMid slice"></image>
  //                                   )}
  //                               </pattern>
  //                           </defs>
  //                           <path d=""></path>
  //                       </mask>  
  //                       <rect className="rect" x="0" y="0" width="100%" height="100%" mask={`url(#mask${index})`} fill={`url(#img${index})`}></rect>
  //                       <g className="shadow" filter="url(#shadowFilter)">
  //                           <path d=""></path>
  //                       </g>
  //                   </svg>
  //                   <a className="thumbnail-link py-2 px-2" data-type="page-transition" href={`/projects/${project.slug}`}>
  //                       <h1>{project.name}<span className="location">{project.location?.trim().length > 0 ? ` ${project.location}` : ''}</span><ArrowTopRight /></h1>
  //                   </a>
  //               </div>
  //             ))}
  //         {/* {projects && projects.slice(0, 8).length % 3 === 1 && (
  //             <>
  //                 <div className="svgWrapper extra-div"></div>
  //                 <div className="svgWrapper extra-div"></div>
  //             </>
  //         )} */}
  //         {projects && projects.slice(0, 8).length % 2 === 1 && (
  //             <div className="svgWrapper extra-div">
  //               <svg className="drawnSvg" width="100%" height="100%">
  //                       <mask>
  //                           <rect x="0" y="0" width="100%" height="100%" fill="black"></rect>
  //                           <defs>
   
  //                           </defs>
  //                           <path d=""></path>
  //                       </mask>  
  //                       <rect className="rect" x="0" y="0" width="100%" height="100%" mask={`url(#maskExtra)`} fill={`url(#imgExtra)`}></rect>
  //                       <g className="shadow" filter="url(#shadowFilter)">
  //                           <path d=""></path>
  //                       </g>
  //                   </svg>
  //             </div>
  //             // {console.log('Added 1 extra divs')}
  //         )}
  //     </div>
  //     {/* <div id="cursor"></div> */}

  //       <DrawCursor />
  //       <DrawCursorSvg />

  //       <Script
  //       src="/js/home.js"
  //       strategy="lazyOnload"
  //       />

  //   </main>
  // );
}
