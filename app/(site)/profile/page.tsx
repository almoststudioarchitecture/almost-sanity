// 'use client'
import Link from "next/link";
import { getProfile } from "@/sanity/sanity.query";
import type { ProfileType } from "@/types";
import InfoIcon from "../icons/info-icon.png";
import InteractiveLogo from "../components/global/InteractiveLogo";
import { PortableText } from "@portabletext/react";
import { BiEnvelope, BiFile } from "react-icons/bi";
import Script from 'next/script';
import './profile.css'
import  CopyEmailBtn from "../components/Email"; 
// import Layout, { siteTitle } from '../layout';
import Head from 'next/head';

export default async function About() {
  const profile: ProfileType[] = await getProfile();


  return (
    <>
        <Head>
          <title>ALMOST STUDIO</title>
          {/* <script src="../scripts/draw.js"></script> */}
        </Head>
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
                <div className="cols inline" id="emails"> 
                    {data.contact.map((email, index) => (
                      <div className="flex" key={index}>
                        <div className="box">
                              {/* <button onClick={handleClick} data-href={`mailto:${email}@almost.studio`}>
                                <strong>{email}</strong>@almost.studio
                              </button> */}
                              <CopyEmailBtn email={email} />
                        </div>
                        <div className="box copiedNotification">
                              Copied
                        </div>
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
                <div className="cols">
                    <div className="box one-third">
                      <PortableText value={data.partner1} />
                    </div>
                    <div className="box one-third">
                      <PortableText value={data.partner2} />
                    </div>
                </div>
                {/* <div className="cols inline" id="teamSection">
                    <div className="box">
                      <strong>Team</strong>
                    </div>
                    {data.team.map((teamMember, index) => (
                      <button className="box"  key={index}>
                        {teamMember.title}
                      </button>
                    ))}
                </div> */}
                {data.team && data.team.length > 0 && (
                  <>
                    <div className="cols inline" id="teamSection">
                      <div className="box">
                        <strong>Team</strong>
                      </div>
                      {data.team.map((teamMember, index) => (
                        <button className="box" key={index}>
                          {teamMember.title}
                        </button>
                      ))}
                    </div>
                    <div className="cols" id="teamBios">
                      {data.team.map((teamMember, index) => (
                        <div className="box one-third bio" key={index} data-member={teamMember.title}>
                          <p><strong>{teamMember.title}</strong> {teamMember.bio}</p>
                        </div>
                      ))}
                    </div>
                  </>
                )}
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
            </div>
            ))}

            <InteractiveLogo />
            <Script
            src="/js/about.js"
            strategy="lazyOnload"
            />
        </main>
    </>
  );
}
