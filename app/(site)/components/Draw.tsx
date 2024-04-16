import ShadowFilter from "../icons/ShadowFilter";
import ArrowTopRight from "../icons/ArrowTopRight";
import { getProjects } from "@/sanity/sanity.query";
import type { ProjectType } from "@/types";
import Script from 'next/script';
import DrawCursor from '../components/DrawCursor';
// import styles from '../css/Home.module.css';
// import styles from '../css/Draw.module.css';


export default async function Home() {
    const projects: ProjectType[] = await getProjects();

return (
    <>
    <div id="drawInHere" className="drawInHere">
         {projects &&
              projects.slice(0, 8).map((project, index) => (
                <div key={index} className="svgWrapper" data-href={`/projects/${project.slug}`} data-slug={project.slug} data-thumb={project.coverImage.image}>
                    <svg className="drawnSvg" width="100%" height="100%" id={`svg${index}`}>
                        <mask id={`mask${index}`}>
                            <rect x="0" y="0" width="100%" height="100%" fill="black"></rect>
                            <defs>
                                <pattern id={`img${index}`} patternUnits="userSpaceOnUse" width="100%" height="100%">
                                    {/* <image href={project.coverImage.image} x="0" y="0" width="100%" height="100%" preserveAspectRatio="xMinYMin slice"></image> */}
                                    {project.coverImage.focalpoint ? (
                                      <>
                                        <image href={project.coverImage.image} data-focalpoint={project.coverImage.focalpoint.y} x="0" y="0" width="100%" height="100%" preserveAspectRatio={`${project.coverImage.focalpoint.x}${project.coverImage.focalpoint.y.charAt(0).toUpperCase() + project.coverImage.focalpoint.y.slice(1)} slice`}></image>
                                      </>
                                    ) : (
                                      <image href={project.coverImage.image} x="0" y="0" width="100%" height="100%" preserveAspectRatio="xMidYMid slice"></image>
                                    )}
                                    {/* <image href={project.coverImage.image} x="0" y="0" width="100%" height="100%" preserveAspectRatio="xMidYMid slice"></image> */}
                                </pattern>
                            </defs>
                            <path d=""></path>
                        </mask>  
                        <rect className="rect" x="0" y="0" width="100%" height="100%" mask={`url(#mask${index})`} fill={`url(#img${index})`}></rect>
                        <g className="shadow" filter="url(#shadowFilter)">
                            <path d=""></path>
                        </g>
                    </svg>
                    {/* <a className="thumbnail-link py-2 px-2" data-type="page-transition" href={`/projects/${project.slug}`}>
                        <h1>{project.name}<span className="location">{project.location?.trim().length > 0 ? ` ${project.location}` : ''}</span><ArrowTopRight /></h1>
                    </a> */}
                </div>
              ))}

          {/* if there are an odd number of projects, add an extra div for cushion */}
          {projects && projects.slice(0, 8).length % 2 === 1 && (
              <div className="svgWrapper extra-div">
                <svg className="drawnSvg" width="100%" height="100%">
                        <mask>
                            <rect x="0" y="0" width="100%" height="100%" fill="black"></rect>
                            <defs>
   
                            </defs>
                            <path d=""></path>
                        </mask>  
                        <rect className="rect" x="0" y="0" width="100%" height="100%" mask={`url(#maskExtra)`} fill={`url(#imgExtra)`}></rect>
                        <g className="shadow" filter="url(#shadowFilter)">
                            <path d=""></path>
                        </g>
                    </svg>
              </div>
          )}
      </div>
      {/* <DrawCursor /> */}
      <ShadowFilter />
      </>

    )
}