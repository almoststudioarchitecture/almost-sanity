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

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = params.project;
  try {
    const project = await getSingleProject(slug);
    if (!project) return { title: "Project Not Found" };

    return {
      title: `${project.name} | Almost Studio`,
      description: project.excerpt || "Project Page",
    };
  } catch (e) {
    return { title: "Almost Studio" };
  }
}