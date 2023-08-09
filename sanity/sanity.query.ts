import { groq } from "next-sanity";
import client from "./sanity.client";

export async function getProfile() {
  return client.fetch(
    groq`*[_type == "profile"]{
      _id,
      studioDescription,
      partner1,
      partner2,
      "team": *[_type == "teamMember"]{title, bio},
      teamOld,
      contact,
      socialMedia
    }`
  );
}

// export async function getJob() {
//   return client.fetch(
//     groq`*[_type == "job"]{
//       _id,
//       name,
//       jobTitle,
//       "logo": logo.asset->url,
//       url,
//       description,
//       startDate,
//       endDate,
//     }`
//   );
// }

export async function getProjects() {
  return client.fetch(
    groq`*[_type == "project"]{
      _id, 
      name,
      "slug": slug.current
    }`
  );
}

export async function getTeamMember() {
  return client.fetch(
    groq`*[_type == "teamMember"]{
      _id,
      title,
      bio
    }`
  );
}

export async function getSingleProject(slug: string) {
  return client.fetch(
    groq`*[_type == "project" && slug.current == $slug][0]{
      _id,
      name,
      coverImage { alt, "image": asset->url },
      metadata,
      description,
      gallery
    }`,
    { slug }
  );
}
