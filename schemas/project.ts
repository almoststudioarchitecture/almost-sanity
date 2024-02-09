import { BiPackage } from "react-icons/bi";
import { defineField } from "sanity";

import {orderRankField, orderRankOrdering} from '@sanity/orderable-document-list'


const project = {
  name: "project",
  title: "Project",
  description: "Project Schema",
  type: "document",
  orderings: [orderRankOrdering],
  icon: BiPackage,
  fields: [
    orderRankField({ type: "project" }),
    // {
    //   name: "order",
    //   title: "Project Order",
    //   type: "number",
    //   description: "Write a number here that defines the order",
    // },
    {
      name: "name",
      title: "Project Name",
      type: "string",
      description: "Enter the name of the project",
    },
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      description:
        "Add a custom slug for the URL or generate one from the name",
      options: { source: "name" },
      validation: (rule) => rule.required(),
    }),
    {
      name: "location",
      title: "Location (or other secondary line)",
      type: "string",
      description: "This will show up alongside the project thumbnail, after the project title",
    },
    {
      name: "coverImage",
      title: "Main Image",
      type: "image",
      description: "Upload a cover image for this project",
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          title: "Alt",
          type: "string",
        },
        {
          name: "white",
          title: "Does this image have a white background?",
          type: 'boolean',
        },
        {
          name: "focalpoint",
          title: "Focal Point",
          type: 'object',
          description: 'Defaults to center/center',
          fields: [
            {
              name: 'x', 
              type: 'string', 
              title: 'X', 
              options: {
                list: [
                  {title: 'Left', value: 'xMin'}, 
                  {title: 'Middle', value: 'xMid'}, 
                  {title: 'Right', value: 'xMax'}
                ],
                layout: 'dropdown'
              },
            },
            {
              name: 'y', 
              type: 'string', 
              title: 'Y', 
              options: {
                list: [
                  {title: 'Top', value: 'YMin'}, 
                  {title: 'Center', value: 'YMid'}, 
                  {title: 'Bottom', value: 'YMax'}
                ],
                layout: 'dropdown',
              },
            },
          ]
        }
      ],
    },
    {
      name: "metadata",
      title: "Metadata",
      type: "array",
      description: "Add a list of small metadata for the project such as date completed, location, and any relevant credits.",
      of: [{ type: "string" }],
    },
    {
      name: "description",
      title: "Description",
      type: "array",
      description: "Write a paragraph about this project. Recommended to keep it around 150 words.",
      of: [
        {
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'}
          ],
          lists: []
        }
      ]
    },
    {
      name: 'gallery',
      type: 'object',
      title: 'Gallery',
      fields: [
        {
          name: 'images',
          type: 'array',
          title: 'Images',
          of: [
            {
              name: 'image',
              type: 'image',
              title: 'Image',
              options: {
                hotspot: true,
              },
              fields: [
                {
                  name: 'alt',
                  type: 'string',
                  title: 'Alternative text',
                },
                {
                  name: 'caption',
                  type: 'string',
                  title: 'Caption (optional)',
                },
                {
                  name: 'fit', 
                  type: 'string', 
                  title: 'Size', 
                  description: 'Defaults to vertical images fitting the space and horizontal images filling the space.',
                  options: {
                    list: [
                      {title: 'Fill', value: 'cover', description: 'Image fills the given dimension'}, 
                      {title: 'Fit', value: 'contain', description: 'Image fits within the given dimension'}, 
                    ],
                    layout: 'dropdown',
                  },
                },
              ],
            },
            { type: 'object', 
              title: 'Vimeo Video: 9-digit url ID',
              name: 'vimeoVideoLink',
              fields: [
                {
                  type: 'string', 
                  name: 'vimeo', 
                  title: 'Vimeo Video Link',
                  description: 'Paste only the nine digits found at the end of the vimeo url video. e.g. "219512790"'
                },
                {
                  type: 'string', 
                  name: 'videoType', 
                  title: 'Type of Video',
                  options: {
                    list: [
                      {title: 'Mood Video', value: 'mood', description: "No sound, no play button, just a moving image"},
                      {title: 'Video with Controls', value: 'functional', description: "Includes sound and video controls."}
                    ],
                    layout: "radio",
                  },
                },
                {
                  type: 'string',
                  name: 'title',
                  title: 'Title for Reference',
                  description: "This will not show up anywhere, but use it if it's helpful to make notes"
                },
                {
                  name: 'caption',
                  type: 'string',
                  title: 'Caption (optional)',
                },
              ]
            }
          ],
          options: {
            layout: 'grid',
          },
        },
      ]
    },
  ],
  // orderings: [
  //   {
  //     title: 'Order',
  //     name: 'orderDesk',
  //     by: [
  //       {field: 'order', direction: 'asc'}
  //     ]
  //   }
  // ]
};

export default project;
