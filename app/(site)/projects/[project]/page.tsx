// 'use client';


import { getSingleProject, getProjects } from "@/sanity/sanity.query";
import type { ProjectType } from "@/types";
import ProjectScrollSnap from "../../components/ProjectScrollSnap";
import Script from 'next/script';

import './project.css'

export async function generateStaticParams() {
  const projects = await getProjects();

  return projects.map((p: any) => ({
    project: p.slug, // This MUST match the folder name [project]
  }));
}

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
