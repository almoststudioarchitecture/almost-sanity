// 'use client';

import Image from "next/image";
// import Script from 'next/script';
import { Metadata } from "next";
import { getSingleProject } from "@/sanity/sanity.query";
import type { ProjectType } from "@/types";
import { PortableText } from "@portabletext/react";
import fallBackImage from "@/public/project.png";
import AboutScript from "./ProjectScript";
// import { Dimensions } from 'react-native';
import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal, PromiseLikeOfReactNode, Key } from "react";
import './project.css'

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

  console.log(project);

  return {
    title: `${project.name} | Project`,
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

  return (
    <main>
      <div id="before"></div>
      <div id="after"></div>
      <div className="section hero relative">
            <Image
                className="hero-image"
                layout='fill'
                objectFit='cover'
                src={project.coverImage?.image || fallBackImage}
                alt={project.coverImage?.alt || project.name}
              />
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
        <div className="section info">
            <div className="info--header">
                <h1>{project.name}</h1>
                <div className="meta-data">
                {project.metadata && project.metadata.map((d, index) => (
                    <h2 key={index}>{d}</h2>
                  ))}
                </div>
            </div>
            <div className="info--description">
              <PortableText value={project.description} />
            </div>
        </div>
        <div className="section gallery">


        {/* {project.gallery && project.gallery.map((item, index) => {
          if (item._type === 'image') {
            console.log(item.image);
            return (
              <Image
              width={900}
              height={460}
              src={item.image.url}
              alt={item.image.alt || project.name}
            />
            );
          } else if (item._type === 'vimeoVideoLink') {
            return (
              <h1> video </h1>
            );
          }
          return null;
        })} */}

{project.gallery && project.gallery.map((item, index) => {
  if (item._type === 'image') {
    return (
      <div key={index}>
        <Image
          src={item.image.url}
          alt={item.image.alt || project.name}
          width={900}
          height={450}
          objectFit='contain'
        />
      </div>
    );
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
      </div>
    );
  }
  return null;
})}





        {/* {project.gallery && project.gallery.map((image, index) => (
          <div key={index}>
            <Image
              className="rounded-xl border border-zinc-800"
              width={900}
              height={460}
              src={image.image.url || fallBackImage}
              alt={image.image.alt || project.name}
            />
          </div>
        ))} */}

        

        {/* {project.gallery.images && project.gallery.images.map((image, index) => (
          <div key={index}>
            <img src={urlFor(image.image.url)} alt={image.image.alt} />
            <Image
              className="rounded-xl border border-zinc-800"
              width={900}
              height={460}
              src={image.url || fallBackImage}
              alt={image.alt || project.name}
            />
          </div>
        ))} */}

        {/* {project.gallery.vimeoVideoLinks && project.gallery.vimeoVideoLinks.map((vimeoLink, index) => (
          <div key={index}>
            <iframe
              src={vimeoLink.vimeo}
              title={vimeoLink.title}
              width="640"
              height="360"
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </div>
        ))} */}


            {/* {project.gallery &&
              project.gallery.map(() => (

                <h1>Something</h1>
                
                  // <Image
                  //     className="rounded-xl border border-zinc-800"
                  //     width={900}
                  //     height={460}
                  //     src={image || fallBackImage}
                  //     alt={alt || project.name}
                  //   />
                    
                  ))} */}
            {/* <img src="/img/project/SL-Runway_01.jpg" className="horizontal" alt="image"> */}
            {/* <Image
              className="rounded-xl border border-zinc-800"
              width={900}
              height={460}
              src={project.coverImage?.image || fallBackImage}
              alt={project.coverImage?.alt || project.name}
            /> */}
        </div>

        <div id="logo">
            <div className="a">
                <div></div>
                <div className="bottom"></div>
            </div>
            <div className="l">
                <div className="top right"></div>
            </div>
            <div className="m">
                <div className="bottom"></div>
                <div className="bottom"></div>
            </div>
            <div className="o">
                <div className="center"></div>
            </div>
            <div className="s">
                <div className="right"></div>
                <div className="left"></div>
            </div>
            <div className="t">
                <div className="bottom left"></div>
                <div className="bottom right"></div>
            </div>
            <div className="gap"></div>
            
            <div className="s">
                <div className="right"></div>
                <div className="left"></div>
            </div>
            <div className="t">
                <div className="bottom left"></div>
                <div className="bottom right"></div>
            </div>
            <div className="u">
                <div className="top"></div>
            </div>
            <div className="d">
                <div className="right top"></div>
                <div className="right bottom"></div>
                <div></div>
            </div>
            <div className="i">
                <div className="left"></div>
                <div className="right"></div>
            </div>
            <div className="o">
                <div className="center"></div>
            </div>
        </div>
      {/* <div className="max-w-3xl mx-auto">
        <div className="flex items-start justify-between mb-4">
          <h1 className="font-bold lg:text-5xl text-3xl lg:leading-tight mb-4">
            {project.name}
          </h1>

          <a
            href={project.projectUrl}
            rel="noreferrer noopener"
            className="bg-[#1d1d20] text-white hover:border-zinc-700 border border-transparent rounded-md px-4 py-2"
          >
            Explore
          </a>
        </div>

        <Image
          className="rounded-xl border border-zinc-800"
          width={900}
          height={460}
          src={project.coverImage?.image || fallBackImage}
          alt={project.coverImage?.alt || project.name}
        />

        <div className="flex flex-col gap-y-6 mt-8 leading-7 text-zinc-400">
          <PortableText value={project.description} />
        </div>
      </div> */}
      {/* <Script
        src="/js/project.js"
        strategy="lazyOnload"
        onLoad={() =>
          console.log(`script loaded correctly, window.FB has been populated`)
        }
        /> */}

        {/* export default function Page() {
          return (
            <>
              <Script src="/js/project.js" strategy="afterInteractive" />
            </>
          )
        } */}
        {/* <> */}
              {/* <Script src="/js/project.js" strategy="afterInteractive" /> */}
        {/* </> */}
        <AboutScript />
    </main>
  );
}
