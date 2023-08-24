import { PortableTextBlock } from "sanity";

export type ProfileType = {
  _id: string;
  // studioDescription: {
  //   header: string;
  //   description: PortableTextBlock[];
  // }
  // partner1: {
  //   name: string;
  //   description: PortableTextBlock[];
  // }
  // partner2: {
  //   name: string;
  //   description: PortableTextBlock[];
  // }
  studioDescription: PortableTextBlock[];
  partner1: PortableTextBlock[];
  partner2: PortableTextBlock[];
  team: string[];
  teamOld: string[];
  contact: string[];
  socialMedia: string;
};

// export type JobType = {
//   _id: string;
//   name: string;
//   jobTitle: string;
//   logo: string;
//   url: string;
//   description: string;
//   startDate: Date;
//   endDate: Date;
// };

export type ProjectType = {
  // gallery: any;
  _id: string;
  name: string;
  slug: string;
  tagline: string;
  projectUrl: string;
  metadata: string[];
  logo: string;
  coverImage: {
    alt: string | null;
    image: string;
  };
  // gallery: string[];
  gallery: Array<GalleryImage | VimeoVideoLink>; // Define an array of either GalleryImage or VimeoVideoLink
  description: PortableTextBlock[];
};

// Define interfaces for gallery items
interface GalleryImage {
  _type: 'image'; // This indicates it's an image item
  image: {
    alt: string | null;
    url: string;
  };
}

interface VimeoVideoLink {
  _type: 'vimeoVideoLink'; // This indicates it's a Vimeo video link item
  vimeo: string;
  title: string;
}