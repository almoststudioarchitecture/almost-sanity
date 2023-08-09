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
  _id: string;
  name: string;
  slug: string;
  tagline: string;
  projectUrl: string;
  logo: string;
  coverImage: {
    alt: string | null;
    image: string;
  };
  description: PortableTextBlock[];
};
