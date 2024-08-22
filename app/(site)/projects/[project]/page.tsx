// 'use client';


import { getSingleProject } from "@/sanity/sanity.query";
import type { ProjectType } from "@/types";
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

  return (
    <>
    <main>
      <Script src="/js/scrollToTop.js" strategy="afterInteractive" />
      <ProjectScrollSnap project={project} />
    </main>
    
    </>
  );
}
