'use client'
import React, { useEffect } from 'react';
import { PortableText } from "@portabletext/react";

interface ProjectInfoModuleProps {
  name: string;
  metadata: string[];
  description: any;
}

function ProjectInfoModule({ name, metadata, description }: ProjectInfoModuleProps) {
  useEffect(() => {
    
    const projectInnerDiv = document.querySelector('.projectInner');
    if (!projectInnerDiv) return;

    const handleScroll = () => {
      const infoSection = document.querySelector('.section.info');
      if (infoSection) {
        const top = infoSection.getBoundingClientRect().top - projectInnerDiv.getBoundingClientRect().top;
        if (top <= -1) {
          document.body.classList.add('scrolled');
        } else {
          document.body.classList.remove('scrolled');
        }
      }
    };

    projectInnerDiv.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      projectInnerDiv.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="section info">
      <div className="info--header">
        <h1>{name}</h1>
        <div className="meta-data">
          {metadata && metadata.map((d, index) => (
            <h2 key={index}>{d}</h2>
          ))}
        </div>
      </div>
      <div className="info--description">
        <PortableText value={description} />
      </div>
    </div>
  );
}

export default ProjectInfoModule;
