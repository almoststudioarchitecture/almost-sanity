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
import Head from 'next/head';
import Script from 'next/script';



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

// useEffect(() => {
//   window.scrollTo(0, 0);
// }, []);

// const win = Dimensions.get('window');

// Dynamic metadata for SEO
// export async function generateMetadata({ params }: Props): Promise<Metadata> {
//   const slug = params.project;
//   const project: ProjectType = await getSingleProject(slug);

//   console.log(project);
  

//   return {
//     title: `Almost Studio – ${project.name}`,
//     description: project.name,
//     openGraph: {
//       images:
//         project.coverImage?.image ||
//         "https://res.cloudinary.com/victoreke/image/upload/v1689892912/docs/project.png",
//       title: project.name,
//       description: project.name,
//     },
//   };
// }

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
      <Script src="/js/scrollToTop.js" strategy="afterInteractive" />
      <ProjectScrollSnap project={project} />
      {/* <InteractiveLogo /> */}
    </main>
    
    </>
  );
}
