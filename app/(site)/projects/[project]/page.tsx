import { getSingleProject, getProjects } from "@/sanity/sanity.query";
import type { ProjectType } from "@/types";
import ProjectScrollSnap from "../../components/ProjectScrollSnap";
import Script from 'next/script';
import { Metadata, ResolvingMetadata } from 'next';
import './project.css'

export async function generateStaticParams() {
  const projects = await getProjects();

  return projects.map((p: any) => ({
    project: p.slug,
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

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const slug = params.project;

  // fetch data
  const project: ProjectType = await getSingleProject(slug);

  // return the metadata object
  return {
    title: project ? `${project.name} | Almost Studio` : 'Project Not Found',
  };
}