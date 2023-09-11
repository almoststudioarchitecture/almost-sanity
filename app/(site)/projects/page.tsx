// 'use client';

import * as sanityQuery from "@/sanity/sanity.query";
import type { ProfileType } from "@/types";
// import DrawCursorSvg from "./icons/DrawCursorSvg";
import ArrowTopRight from "../icons/ArrowTopRight";
// import Job from "./components/Job";
import { getProjects } from "@/sanity/sanity.query";
import type { ProjectType } from "@/types";
import Script from 'next/script';

export default async function Home() {
  const projects: ProjectType[] = await getProjects();

  return (
    <main className="page-projects">
      <div className="lines">
        {/* <div className="horizontal" id="line-h1"></div> */}
        {/* <div className="horizontal" id="line-h2"></div> */}
        <div className="vertical" id="line-v1"></div>
        <div className="vertical" id="line-v2"></div>
      </div>
      <ul id="projectLinks">
        
      {projects &&
              projects.map((project, index) => (
                <li key={index} data-slug={project.slug}>
                  <a className="px-2 py-2 border-b border-t border-r" data-type="page-transition" href={`/projects/${project.slug}`}>{project.name} <ArrowTopRight /></a>
                </li>
        ))}
      </ul>
      <div id="cursorPrompt" className="py-2 px-2">Drag to Draw</div>
      <div id="svgContainer">
          {projects &&
              projects.map((project, index) => (
                <div key={index} className="svgWrapper" data-href={`/projects/${project.slug}`} data-slug={project.slug} data-thumb={project.coverImage.image}>
                    <svg className="drawnSvg" width="100%" height="100%" id={`svg${index}`}>
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
                    <a className="thumbnail-link py-2 px-2" data-type="page-transition" href={`/projects/${project.slug}`}>
                        <h1>{project.name}<ArrowTopRight /></h1>
                    </a>
                </div>
              ))}

          {/* Additional divs to make total count divisible by three */}
          {projects && projects.length % 3 === 1 && (
              <>
                  <div className="svgWrapper extra-div"></div>
                  <div className="svgWrapper extra-div"></div>
              </>
          )}
          {projects && projects.length % 3 === 2 && (
              <div className="svgWrapper extra-div"></div>
          )}
      </div>
      <svg className="defs">
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
        </svg>
      <div id="cursor"></div>
        <Script
        src="/js/home.js"
        strategy="lazyOnload"
        />
        <Script
        src="/js/load.js"
        strategy="lazyOnload"
        />
    </main>
  );
}







// import Image from "next/image";
// import Link from "next/link";
// import { getProjects } from "@/sanity/sanity.query";
// import type { ProjectType } from "@/types";

// export default async function Project() {
//   const projects: ProjectType[] = await getProjects();

//   return (
//     <main className="max-w-7xl mx-auto md:px-16 px-6">
//       {/* <section className="max-w-2xl mb-16">
//         <h1 className="text-3xl font-bold tracking-tight sm:text-5xl mb-6 lg:leading-[3.7rem] leading-tight">
//           Featured projects I&apos;ve built over the years
//         </h1>
//         <p className="text-base text-zinc-400 leading-relaxed">
//           I&apos;ve worked on tons of little projects over the years but these
//           are the ones that I&apos;m most proud of. Many of them are
//           open-source, so if you see something that piques your interest, check
//           out the code and contribute if you have ideas for how it can be
//           improved.
//         </p>
//       </section>

//       <section className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 mb-12">
//         {projects.map((project) => (
//           <Link
//             href={`/projects/${project.slug}`}
//             key={project._id}
//             className="flex items-center gap-x-4 bg-[#1d1d20] border border-transparent hover:border-zinc-700 p-4 rounded-lg ease-in-out"
//           >
//             <Image
//               src={project.logo}
//               width={60}
//               height={60}
//               alt={project.name}
//               className="bg-zinc-800 rounded-md p-2"
//             />
//             <div>
//               <h2 className="font-semibold mb-1">{project.name}</h2>
//               <div className="text-sm text-zinc-400">{project.tagline}</div>
//             </div>
//           </Link>
//         ))}
//       </section> */}
//     </main>
//   );
// }
