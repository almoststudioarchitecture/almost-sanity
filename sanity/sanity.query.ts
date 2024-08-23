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
    groq`*[_type == "project"]|order(orderRank){

      _id, 
      name,
      location,
      url,
      "slug": slug.current,
      coverImage { 
        alt, 
        "image": asset->url,
        "dimensions": asset->metadata.dimensions,
        hotspot,
        white
      }
    }`
  );
}

export async function getSingleProject(slug: string) {
  return client.fetch(
    groq`*[_type == "project" && slug.current == $slug][0]{
      _id,
      name,
      shareDescription,
      location,
      coverImage { alt, "image": asset->url, hotspot, "dimensions": asset->metadata.dimensions, white },
      metadata,
      description,
      "gallery": gallery.images[] {
        _type,
        alt,
        "image": asset->url,
        hotspot,
        "dimensions": asset->metadata.dimensions,
        caption,
        vimeo,
        fit,
        videoType
      },
    }`,
    { slug }
  );
}

export async function getSiteMeta() {
  return client.fetch(
    groq`*[_type == "siteMeta"]{
      "siteName": site_name,
      "ogDescription": ogDescription,
      "url": url,
      "ogTitle": ogTitle,
      "ogImage": ogImage.asset->url,
      "description": description,
      "isGoogleAnalyticsEnabled": isGoogleAnalyticsEnabled,
      "googleAnalyticsID": googleanalyticsId,
      "googleSiteVerificationId": googleSiteVerificationId,
      "isPwa": isPwa
    }[0]`
  );
}



// export default async function getSiteMeta(
//   query: string = querySiteMeta,
//   client: SanityClientLike,
//   mutation = "fetch"
// ):Promise<Site> {
//   const site: Site = await client[mutation](query)
//   return site
// }