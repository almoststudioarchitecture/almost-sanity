import * as sanityQuery from "@/sanity/sanity.query";
import type { ProfileType } from "@/types";
import DrawCursorSvg from "../icons/DrawCursorSvg";
import ArrowTopRight from "../icons/ArrowTopRight";
import { getProjects } from "@/sanity/sanity.query";
import type { ProjectType } from "@/types";
import Script from 'next/script';

export default async function Home() {
  const projects: ProjectType[] = await getProjects();

  return (
    <main className="page-projects">
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
                  <a className="px-2 py-2 border-b border-t border-r" data-type="page-transition" href={`/projects/${project.slug}`}>{project.name} <ArrowTopRight /></a>
                </li>
        ))}
      </ul>
      <div id="svgContainer">
          {projects &&
              projects.slice(0, 15).map((project, index) => {
        
                const randomStyleNumber = Math.floor(Math.random() * 10) + 1;

        
        
        return      (
            
                





                // 
                // stroke only, white, "screen"
                // image on bottom
                <div>

                <div className="svg-group">
                    


                        <svg className="drawnSvg shadowSvg" width="100%" height="100%">
                            <mask>
                                <rect x="0" y="0" width="100%" height="100%" fill="black"></rect>
                                <defs>
    
                                </defs>
                                <path d=""></path>
                            </mask>  
                            <rect className="rect" x="0" y="0" width="100%" height="100%" fill='grey'></rect>
                            <g className="shadow" filter="url(#shadowFilter)">
                                <path stroke="grey" d=""></path>
                            </g>
                        </svg>

                        <div key={index} className="svgWrapper" data-href={`/projects/${project.slug}`} data-slug={project.slug} data-thumb={project.coverImage.image}>

                        <svg className="drawnSvg patternSvg" width="100%" height="100%">
                            <mask>
                                <rect x="0" y="0" width="100%" height="100%" fill="black"></rect>
                                <defs>
    
                                </defs>
                                <path d=""></path>
                            </mask>  
                            <rect className="rect" x="0" y="0" width="100%" height="100%" fill='white'></rect>
                            <g className="" >
                                <path d=""></path>
                            </g>
                        </svg>

                        {/* <svg className="drawnSvg" width="100%" height="100%" id={`svg${index}`}>
                            <rect width="100%" height="100%" fill="white"/>
                            <path d="M718,462 L718,462 L730,378 L734,356 L736,362 L738,374 L740,380 L742,392 L744,398 L746,412 L744,446 L738,450 L734,454 L726,460 L716,464 L706,468 L696,472 L684,474 L674,476 L662,478 L634,476 L632,474 L630,472 L632,390 L660,394 L668,398 L674,404 L682,412 L684,416 L688,420 L690,426 L692,430 L690,444 L688,446 L686,448 L670,446 L668,444 L666,442" style={{strokeWidth: '60px', stroke: 'black'}}></path>
                        </svg> */}


                        <div className={`stripey-style style${randomStyleNumber}`}></div>

                    </div>

                    <svg className="drawnSvg whiteSvg" width="100%" height="100%">
                        {/* <mask>
                            <rect x="0" y="0" width="100%" height="100%" fill="black"></rect>
                            <defs>
   
                            </defs> */}
                            <path d=""></path>
                        {/* </mask>   */}
                        {/* <rect className="rect" x="0" y="0" width="100%" height="100%" mask={`url(#maskExtra)`} fill={`url(#imgExtra)`}></rect> */}
                        {/* <rect className="rect" x="0" y="0" width="100%" height="100%" fill='white'></rect> */}
                        {/* <g className="shadow" filter="url(#shadowFilter)">
                            <path d="M718,462 L718,462 L730,378 L734,356 L736,362 L738,374 L740,380 L742,392 L744,398 L746,412 L744,446 L738,450 L734,454 L726,460 L716,464 L706,468 L696,472 L684,474 L674,476 L662,478 L634,476 L632,474 L630,472 L632,390 L660,394 L668,398 L674,404 L682,412 L684,416 L688,420 L690,426 L692,430 L690,444 L688,446 L686,448 L670,446 L668,444 L666,442"></path>
                        </g> */}
                    </svg>

                    <img className={`cover ${project.coverImage.white ? 'white' : ''}`} src={project.coverImage.image} alt="Project Cover" />


                    
                    
                    </div>
                    <div className="project-title">
                        <h2>{project.name}{project.location?.trim().length > 0 ? ` — ${project.location}` : ''}<ArrowTopRight /></h2>
                        {/* <h3>{project.location}</h3> */}
                    </div>
                  </div>
              )})}

            {/* add in an extra div if there aren't enough divs */}
            {projects && projects.slice(0, 15).length % 2 === 1 && (
                <div className="svgWrapper extra-div">
                    {/* <svg className="drawnSvg" width="100%" height="100%">
                            <mask>
                                <rect x="0" y="0" width="100%" height="100%" fill="black"></rect>
                                <defs>
    
                                </defs>
                                <path d=""></path>
                            </mask>  
                            <rect className="rect" x="0" y="0" width="100%" height="100%" fill='white'></rect>
                            <g className="shadow" filter="url(#shadowFilter)">
                                <path d=""></path>
                            </g>
                        </svg> */}
                        <div className="style1"></div>
                </div>
            )}
      </div>
      <div id="cursor"></div>
      <DrawCursorSvg />
        <Script
        src="/js/home.js"
        strategy="lazyOnload"
        />
    </main>
  );
}


