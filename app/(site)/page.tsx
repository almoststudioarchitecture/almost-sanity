'use client';

import { getProfile } from "@/sanity/sanity.query";
import type { ProfileType } from "@/types";
import DrawCursorSvg from "./icons/DrawCursorSvg";
import ArrowTopRight from "./icons/ArrowTopRight";
// import Job from "./components/Job";
import { getProjects } from "@/sanity/sanity.query";
import type { ProjectType } from "@/types";
import Script from 'next/script';
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
    // <main className="px-3 py-2">
    <main>
      <div id="cursor"></div>
      <div className="lines">
        <div className="horizontal" id="line-h1"></div>
        <div className="horizontal" id="line-h2"></div>
        <div className="vertical" id="line-v1"></div>
        <div className="vertical" id="line-v2"></div>
      </div>
      <ul id="projectLinks">
        
      {projects &&
              projects.map((project, index) => (
                <li key={index} data-slug={project.slug}>
                  <a className="px-3 py-2 border-b border-t border-r" href={`/projects/${project.slug}`}>{project.name} <ArrowTopRight /></a>
                </li>
        ))}
      </ul>
      <div id="cursorPrompt" className="py-2 px-3">Drag to Draw</div>
          <div id="svgContainer">
            {projects &&
              projects.map((project, index) => (
                
                  <div key={index} className="svgWrapper" data-href={`/projects/${project.slug}`} data-slug={project.slug} data-thumb={project.coverImage.image}>
                      <svg width="100%" height="100%" id={`svg${index}`}>
                          <mask id={`mask${index}`}>
                              <rect x="0" y="0" width="100%" height="100%" fill="black"></rect>
                              <defs>
                                  <pattern id={`img${index}`} patternUnits="userSpaceOnUse" width="100%" height="100%">
                                      <image href={project.coverImage.image} x="0" y="0" width="100%" height="100%" preserveAspectRatio="xMinYMin slice"></image>
                                  </pattern>
                              </defs>
                              <path d=""></path>
                          </mask>  
                          <rect className="rect" x="0" y="0" width="100%" height="100%" mask={`url(#mask${index})`} fill={`url(#img${index})`}></rect>
                          <g className="shadow" filter="url(#shadowFilter)">
                              <path d=""></path>
                          </g>
                      </svg>
                      <a className="thumbnail-link" href={`/projects/${project.slug}`}>
                          <h1>{project.name}</h1>
                      </a>
                  </div>
              ))}
            </div>
    
      {/* <section className="flex xl:flex-row flex-col xl:items-center items-start xl:justify-center justify-between gap-x-12 lg:mt-32 mt-20 mb-16">
        {profile &&
          profile.map((data) => (
            <div key={data._id} className="lg:max-w-2xl max-w-2xl">
              <h1 className="text-3xl font-bold tracking-tight sm:text-5xl mb-6 lg:leading-[3.7rem] leading-tight lg:min-w-[700px] min-w-full">
                {data.headline}
              </h1>
              <p className="text-base text-zinc-400 leading-relaxed">
                {data.shortBio}
              </p>
              <ul className="flex items-center gap-x-6 my-10">
                {Object.entries(data.socialLinks)
                  .sort()
                  .map(([key, value], id) => (
                    <li key={id}>
                      <a
                        href={value}
                        rel="noreferer noopener"
                        className="flex items-center gap-x-3 mb-5 hover:text-purple-400 duration-300"
                      >
                        {key[0].toUpperCase() + key.toLowerCase().slice(1)}
                      </a>
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        <HeroSvg />
      </section>
      <Job /> */}
      <DrawCursorSvg />
      {/* <svg className="defs">
            <defs>
                <filter id="shadowFilter" x="0" y="0" width="1319" height="865" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend>
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"></feColorMatrix>
                    <feOffset dy="4"></feOffset>
                    <feGaussianBlur stdDeviation="2"></feGaussianBlur>
                    <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"></feComposite>
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"></feColorMatrix>
                    <feBlend mode="normal" in2="shape" result="effect1_innerShadow_68_42"></feBlend>
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"></feColorMatrix>
                    <feOffset dy="-4"></feOffset>
                    <feGaussianBlur stdDeviation="5"></feGaussianBlur>
                    <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"></feComposite>
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"></feColorMatrix>
                    <feBlend mode="normal" in2="effect1_innerShadow_68_42" result="effect2_innerShadow_68_42"></feBlend>
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"></feColorMatrix>
                    <feOffset dy="4"></feOffset>
                    <feGaussianBlur stdDeviation="3"></feGaussianBlur>
                    <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"></feComposite>
                    <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"></feColorMatrix>
                    <feBlend mode="normal" in2="effect2_innerShadow_68_42" result="effect3_innerShadow_68_42"></feBlend>
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"></feColorMatrix>
                    <feOffset dy="-4"></feOffset>
                    <feGaussianBlur stdDeviation="3"></feGaussianBlur>
                    <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"></feComposite>
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.4 0"></feColorMatrix>
                    <feBlend mode="normal" in2="effect3_innerShadow_68_42" result="effect4_innerShadow_68_42"></feBlend>
                </filter>
            </defs>
        </svg> */}
        <Script
        src="/js/home.js"
        strategy="lazyOnload"
        onLoad={() =>
          console.log(`script loaded correctly, window.FB has been populated`)
        }
        />
    </main>
  );
}
