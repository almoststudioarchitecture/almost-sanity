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
  team: Array<TeamMember>
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
  order: number;
  name: string;
  location: string;
  slug: string;
  tagline: string;
  projectUrl: string;
  metadata: string[];
  logo: string;
  coverImage: CoverImage;
  // gallery: string[];
  gallery: Array<GalleryImage | VimeoVideoLink>; // Define an array of either GalleryImage or VimeoVideoLink
  description: PortableTextBlock[];
};

// Define interfaces for gallery items
interface GalleryImage {
  alt: string;
  _type: 'image'; // This indicates it's an image item
  image: string;
  caption?: string; // Since caption is optional
  fit?: 'cover' | 'contain'; // Since fit is optional
}

// export type ImageFit = 'cover' | 'contain';

interface VimeoVideoLink {
  _type: 'vimeoVideoLink'; // This indicates it's a Vimeo video link item
  vimeo: string;
  title: string;
  caption: string;
}

interface TeamMember {
  _type: 'teamMember'; // This indicates it's a Vimeo video link item
  title: string;
  bio: string;
}

export type FocalPoint = {
  x: 'xMin' | 'xMid' | 'xMax';
  y: 'YMin' | 'YMid' | 'YMax';
};

export type CoverImage = {
  alt: string | null;
  image: string;
  focalpoint?: FocalPoint;
};

type CopyEmailBtnProps = {
  email: string;
};