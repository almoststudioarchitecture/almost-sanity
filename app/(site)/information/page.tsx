// 'use client'
import Image from "next/image";
import Link from "next/link";
import { getProfile } from "@/sanity/sanity.query";
import type { ProfileType } from "@/types";
import InfoIcon from "../icons/info-icon.png";
import InteractiveLogo from "../components/global/InteractiveLogo";
import { PortableText } from "@portabletext/react";
import { BiEnvelope, BiFile } from "react-icons/bi";
import Script from 'next/script';
import './about.css'

export default async function About() {
  const profile: ProfileType[] = await getProfile();

  // const components = {
  //   marks: {
  //     // Ex. 1: customizing common block types
  //     p: ({children}) => <p>{children}</p>,
  //     strong: ({children}) => <strong>{children}</strong>,
  //   },
  // }

  return (
    <main>
      {profile &&
        profile.map((data) => (

          <div className="main information" key={data._id}>
            <div className="cols cols-2">
                <div className="box half">
                  {/* <PortableText value={data.studioDescription} components={components}/> */}
                  <PortableText value={data.studioDescription} />
                  {/* {console.log(data.studioDescription)} */}
                </div>
            </div>
            <div className="cols">
                <div className="box one-third">
                  <PortableText value={data.partner1} />
                </div>
                <div className="box one-third">
                  <PortableText value={data.partner2} />
                </div>
            </div>
            <div className="cols inline" id="teamSection">
                <div className="box">
                  <strong>Team</strong>
                </div>
                {data.team.map((teamMember, index) => (
                  <button className="box"  key={index}>
                    {teamMember.title}
                    {/* <Image className="icon icon-info" src={InfoIcon} width={16} height={16} alt="info" /> */}
                  </button>
                ))}
            </div>
            <div className="cols" id="teamBios">
                {data.team.map((teamMember, index) => (
                    <div className="box one-third bio" key={index} data-member={teamMember.title}>
                      <p><strong>{teamMember.title} </strong>{teamMember.bio}</p>
                    </div>
                ))}
            </div>
            <div className="cols inline">
                <div className="box">
                    <strong>Previously</strong>
                    {data.teamOld.map((oldTeamMember, index, arr) => (
                        <span key={index}>
                            {` ${oldTeamMember}${index !== arr.length - 1 ? ',' : ''}`}
                        </span>
                    ))}
                </div>
            </div>
            <div className="cols inline"> 
                {data.contact.map((email, index) => (
                  <div className="box" key={index}>
                        <Link
                          href={`mailto:${email}@almost.studio`}
                        >
                          <strong>{email}</strong>@almost.studio
                        </Link>
                  </div>
                ))}
            </div>
            <div className="cols inline">
                <div className="box">
                  <Link href={`https://www.instagram.com/${data.socialMedia}`} target="_blank">
                    <strong>@</strong>{data.socialMedia}
                  </Link>
                </div>
            </div>
        </div>
        ))}

        <InteractiveLogo />
        <Script
        src="/js/about.js"
        strategy="lazyOnload"
        />

    </main>
    
  );
}
