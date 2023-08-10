import { defineField } from "sanity";
import { BiHide } from "react-icons/bi";

const siteMeta = {
  name: "siteMeta",
  title: "Site Configuration",
  icon: BiHide,
  type: 'document',
  fieldsets: [
    { name: "google", title: "Google Analytics" },
  ],
  groups: [
    {
      name: "meta",
      title: "Site Info",
      default: true
    },
    {
      name: "og",
      title: "Social Share Info",
    },
    {
      name: "manifest",
      title: "Web App Settings",
      hidden: ({ document }: {  document: {
        [key: string]: never;
      }}): boolean => !(document.isPwa)
    },
    {
      name: "google",
      title: "Google Config",
      hidden: ({ document }: {  document: {
        [key: string]: never;
      }}): boolean => !(document.isGoogleAnalyticsEnabled)
    },
  ],
  fields: [
    {
    type: 'string',
    name: 'site_name',
    title: 'Site Name',
    group: ['og', 'meta'],
    // fieldset: "optional"
  },
  {
    type: "text",
    name: "ogDescription",
    title: "Social Share Description",
    group: ['og', 'meta']
  },
  {
    type: 'url',
    title: 'URL',
    name: 'url',
    description: 'Most likely either the url of the page or its canonical url',
    // validation: (Rule: Rule) => Rule.required(),
    group: ['og', 'meta'],
    // fieldset: "basic"
  },
  {
    type: 'string',
    title: 'Page Title',
    name: 'ogTitle',
    description:
      'Set the title Open Graph should use. In most situations, this should be different from the value of the title prop',
    // validation: (Rule: Rule) => Rule.required(),
    // fieldset: "basic"
  },
  {
    type: 'image',
    title: 'Image',
    name: 'ogImage',
    description:
      'The image that should be used in social media and sharing previews. 1,200 x 630 pixels.',
    // validation: (Rule: Rule) => Rule.required(),
    group: ['og'],
    // fieldset: "basic"
  },
    {
      type: "text",
      name: "description",
      title: "Website Description",
      group: ["meta", "og"]
    },
    {
      type: "boolean",
      name: "isGoogleAnalyticsEnabled",
      title: "Enable Google Analytics?",
      group: ["meta", "google"],
      initialValue: false,
      options: {
        layout: "checkbox"
      }
    },
    {
      type: "string",
      name: "googleanalyticsId",
      title: "Google Analytics ID",
      fieldset: "google",
      group: ["meta", "google"],
    },
    {
      type: "string",
      name: "googleSiteVerificationId",
      title: "Google site Verification ID",
      fieldset: "google",
      group: ["meta", "google"],
    },
    // {
    //   type: "manifest",
    //   title: "Web App Features",
    //   name: "manifest",
    //   group: "manifest"
    // }
  ],
  initialValue: {
    isPwa: false,
    isGoogleAnalyticsEnabled: false,
  }
};


export default siteMeta;