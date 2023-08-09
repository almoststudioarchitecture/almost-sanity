import { defineField } from "sanity";
import { BiUser } from "react-icons/bi";

const profile = {
  name: "profile",
  title: "Information",
  type: "document",
  icon: BiUser,
  fields: [
    {
      title: 'Page Name',
      name: 'title',
      type: 'string',
      description: '(Read only)',
      readOnly: true
    },
    // {
    //   name: "studioDescription",
    //   title: "Studio Description",
    //   type: "object", 
    //   fields: [
    //     {
    //       name: "header",
    //       title: "Header",
    //       type: "string",
    //       description: "These are the first words that appear in red.",
    //       initialValue: "Almost Studio",
    //     },
    //     {
    //       name: "description",
    //       title: "Description",
    //       type: "array",
    //       description: "Write a description about the studio. Recommended to keep it around 150 words.",
    //       of: [{ type: "block" }],
    //     },
    //   ]
    // },
    {
      name: "studioDescription",
      title: "Studio Description",
      description: "Bolded words will appear in red. Recommended to use bold/red only for the first two words (e.g. the header/name).",
      type: "array", 
      of: [
        {
          type: 'block',
          marks: {
            decorators: [
              { title: "Make Red", value: "strong" }
            ],
          },
          styles: [
            {title: 'Normal', value: 'normal'}
          ],
          lists: []
        }
      ]
    },
    {
      name: "partner1",
      title: "Partner #1",
      description: "Bolded words will appear in red. Recommended to use bold/red only for the first two words (e.g. the header/name).",
      type: "array", 
      of: [
        {
          type: 'block',
          marks: {
            decorators: [
              { title: "Make Red", value: "strong" }
            ],
          },
          styles: [
            {title: 'Normal', value: 'normal'}
          ],
          lists: []
        }
      ]
    },
    {
      name: "partner2",
      title: "Partner #2",
      description: "Bolded words will appear in red. Recommended to use bold/red only for the first two words (e.g. the header/name).",
      type: "array", 
      of: [
        {
          type: 'block',
          marks: {
            decorators: [
              { title: "Make Red", value: "strong" }
            ],
          },
          styles: [
            {title: 'Normal', value: 'normal'}
          ],
          lists: []
        }
      ]
    },
    // {
    //   name: "partner1",
    //   title: "Partner #1",
    //   type: "object",
    //   fields: [
    //     {
    //       name: "name",
    //       title: "Full Name",
    //       type: "string",
    //       description: "These are the first words that appear in red.",
    //     },
    //     {
    //       name: "description",
    //       title: "Full Bio",
    //       type: "array",
    //       description: "Person's bio. Recommended to keep it around 150 words.",
    //       of: [{ type: "block" }],
    //     },
    //   ]
    // },
    // {
    //   name: "partner2",
    //   title: "Partner #2",
    //   type: "object",
    //   fields: [
    //     {
    //       name: "name",
    //       title: "Full Name",
    //       type: "string",
    //       description: "These are the first words that appear in red.",
    //     },
    //     {
    //       name: "description",
    //       title: "Full Bio",
    //       type: "array",
    //       description: "Person's bio. Recommended to keep it around 150 words.",
    //       of: [{ type: "block" }],
    //     },
    //   ]
    // },
    {
      title: 'Current Team',
      name: 'team',
      type: 'array',
      description: "Choose from the database of team members to include in the Current Team section.",
      of: [
        {
          title: 'Team Member',
          name: 'title',
          type: 'reference',
          to: [
            {type: 'teamMember'},
          ]
        }
      ]
    },
    {
      name: "teamOld",
      title: "Prior Team",
      type: "array",
      description: "Add a list of peoples' names who used to work with you.",
      of: [{ type: "string" }],
    },
    {
      name: "contact",
      title: "Contact",
      type: "array",
      description: "Add a list of contact emails",
      of: [{ type: "string" }],
    },
    {
      name: "socialMedia",
      title: "Social Media Handle",
      type: "string",
      description: "Enter the instagram handle. DO NOT include the '@' symbol, as that will be repeated.",
    },
  ],
};

export default profile;
