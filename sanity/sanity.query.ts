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

export async function getProjects() {
  return client.fetch(
    // groq`*[_type == "project"]{
    groq`*[_type == "project"]|order(orderRank){

      _id, 
      name,
      location,
      url,
      "slug": slug.current,
      coverImage { 
        alt, 
        "image": asset->url,
        white,
        focalpoint
      }
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
      location,
      coverImage { alt, "image": asset->url },
      metadata,
      description,
      "gallery": gallery.images[] {
        _type,
        alt,
        "image": asset->url,
        caption,
        fit
      },
      "vimeoGallery": gallery.vimeoVideoLinks[] {
        _type,
        vimeo,
        title,
        caption
      }
    }`,
    { slug }
  );
}


const querySiteMeta = `
*[_type=="siteMeta"][0] {
  title,
  description,
  "canonical": url,
  isGoogleAnalyticsEnabled,
  isPwa,
  manifest {
    ...,
    "background_color": background_color.hex,
    "theme_color": theme_color.hex
  },
  "openGraph": {
    "basic": { 
    title,
    url,
    "image": image.asset->url
    },
    "optional": {
      locale,
      site_name,
      description
    }
  }
}
`


// export default async function getSiteMeta(
//   query: string = querySiteMeta,
//   client: SanityClientLike,
//   mutation = "fetch"
// ):Promise<Site> {
//   const site: Site = await client[mutation](query)
//   return site
// }