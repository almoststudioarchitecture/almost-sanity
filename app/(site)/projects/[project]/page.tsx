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
    <Head>
        <title>{`Almost Studio – ${project.name}`}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"></meta>
        {/* <meta name="description" content={project.description} /> */}
        {/* Here you could dynamically set other head tags based on project data */}
    </Head>
    <main>
      <ProjectScrollSnap project={project} />
      {/* <InteractiveLogo /> */}
    </main>
    
    </>
  );
}
