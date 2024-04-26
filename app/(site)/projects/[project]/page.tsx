// 'use client';


import { getSingleProject } from "@/sanity/sanity.query";
import type { ProjectType } from "@/types";
import imageUrlBuilder from '@sanity/image-url';
import ProjectScrollSnap from "../../components/ProjectScrollSnap";
import Script from 'next/script';

import './project.css'


type Props = {
  params: {
    project: string;
  };
};

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
    </main>
    
    </>
  );
}
