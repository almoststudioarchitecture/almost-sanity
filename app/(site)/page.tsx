import { getProfile } from "@/sanity/sanity.query";
import type { ProfileType } from "@/types";
import HeroSvg from "./icons/HeroSvg";
// import Job from "./components/Job";
import { getProjects } from "@/sanity/sanity.query";
import type { ProjectType } from "@/types";

export default async function Home() {
  const projects: ProjectType[] = await getProjects();

  return (
    <main className="px-3 py-2">
      <div id="cursor"></div>
      <div id="cursorPrompt" className="py-2">Drag to Draw</div>
          <div id="svgContainer">
            {projects &&
              projects.map((project, index) => (
                  <div key={index} className="svgWrapper" data-href="/project" data-thumb="/img/project0.jpg" data-slug="project-name-0">
                      <svg width="100%" height="100%" id="svg0">
                          <mask id="mask0">
                              <rect x="0" y="0" width="100%" height="100%" fill="black"></rect>
                              <defs>
                                  <pattern id="img0" patternUnits="userSpaceOnUse" width="100%" height="100%">
                                      <image href="/img/project0.jpg" x="0" y="0" width="100%" height="100%" preserveAspectRatio="xMinYMin slice"></image>
                                  </pattern>
                              </defs>
                              <path d=""></path>
                          </mask>  
                          <rect className="rect" x="0" y="0" width="100%" height="100%" mask="url(#mask0)" fill="url(#img0)"></rect>
                          <g className="shadow" filter="url(#shadowFilter)">
                              <path d=""></path>
                          </g>
                      </svg>
                      <a className="info" href="/project">
                          <h1>{project.name}</h1>
                          {/* <h2>New York</h2> */}
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
      <svg className="defs">
            <defs>
                <filter id="shadowFilter" x="0" y="0" width="1319" height="865" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                    <feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood>
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
    </main>
  );
}
