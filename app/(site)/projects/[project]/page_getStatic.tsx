// // 'use client';

// import { Metadata } from "next";
// import { getSingleProject } from "@/sanity/sanity.query";
// import type { ProjectType } from "@/types";
// import imageUrlBuilder from '@sanity/image-url';
// import ProjectScrollSnap from "../../components/ProjectScrollSnap";
// import { GetStaticProps, GetStaticPaths } from 'next';

// // import { Dimensions } from 'react-native';
// import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal, PromiseLikeOfReactNode, Key } from "react";
// import './project.css'
// import { useRef, useEffect } from 'react';

// // const projectInnerRef = useRef(null);


// // type Props = {
// //   params: {
// //     project: string;
// //   };
// // };

// // Define the props type expected by the Project component
// type ProjectProps = {
//   project: ProjectType;
// };

// // type Props = {
// //   project: ProjectType;
// // };

// // const win = Dimensions.get('window');

// // Dynamic metadata for SEO
// // export async function generateMetadata({ params }: Props): Promise<Metadata> {
// //   const slug = params.project;
// //   const project: ProjectType = await getSingleProject(slug);
  

// //   // console.log(project);

// //   return {
// //     title: `Almost Studio – ${project.name}`,
// //     description: project.name,
// //     openGraph: {
// //       images:
// //         project.coverImage?.image ||
// //         "https://res.cloudinary.com/victoreke/image/upload/v1689892912/docs/project.png",
// //       title: project.name,
// //       description: project.name,
// //     },
// //   };
// // }



// // export default function Project({ params }: Props) {
// // // export default async function Project({ params }: Props) {
// //   const slug = params.project;
// //   const project: ProjectType = await getSingleProject(slug);

// //   const builder = imageUrlBuilder({
// //     projectId: "oogp23sh",
// //     dataset: "production",
// //   });
  
  
// //   function urlFor(source: string) {
// //     return builder.image(source);
// //   }

// //   return (
// //     <>
// //     <main>
// //       <ProjectScrollSnap project={project} />
// //     </main>
    
// //     </>
// //   );
// // }

// // Project component without NextPage
// const Project = ({ project }: ProjectProps) => {
//   const builder = imageUrlBuilder({
//     projectId: "oogp23sh",
//     dataset: "production",
//   });

//   function urlFor(source: string) {
//     return builder.image(source);
//   }

//   return (
//     <>
//       <main>
//         <ProjectScrollSnap project={project} />
//       </main>
//     </>
//   );
// };


// // getStaticProps fetches data for the page at build time or at request time in ISR
// export const getStaticProps: GetStaticProps = async (context) => {
//   const { params } = context;
//   const slug = params?.project as string;
//   const project = await getSingleProject(slug);

//   return {
//     props: {
//       project,
//     },
//     revalidate: 10, // Specifies the time in seconds after which a page re-generation can occur
//   };
// };

// export default Project;