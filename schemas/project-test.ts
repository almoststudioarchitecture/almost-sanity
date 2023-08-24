import { BiPackage } from "react-icons/bi";
import { defineField } from "sanity";

const projectTest = {
  name: "projectTest",
  title: "Project Test",
  description: "Project Schema",
  type: "document",
  icon: BiPackage,
  fields: [
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
              ],
            },
            { type: 'object', 
              title: 'Vimeo Video Link',
              fields: [
                {
                  type: 'string', 
                  name: 'vimeo', 
                  title: 'Vimeo Video Link'
                },
                {
                  type: 'string',
                  name: 'title',
                  title: 'Title for Reference',
                  description: "This will not show up anywhere, but use it if it's helpful to make notes"
                }
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
};

export default projectTest;
