import { defineField } from "sanity";
import { BiUser } from "react-icons/bi";

const profile = {
  name: "profile",
  title: "Information",
  type: "document",
  icon: BiUser,
  fields: [
    {
      name: "studioDescription",
      title: "Studio Description",
      type: "object",
      fields: [
        {
          name: "header",
          title: "Header",
          type: "string",
          description: "These are the first words that appear in red.",
          initialValue: "Almost Studio",
        },
        {
          name: "description",
          title: "Description",
          type: "array",
          description: "Write a description about the studio. Recommended to keep it around 150 words.",
          of: [{ type: "block" }],
        },
      ]
    },
    // {
    //   name: "bios",
    //   title: "Bios",
    //   type: "array",
    //   description: "Add a list of team bios.",
    //   of: [{ type: "block"}]
    // },
    {
      name: "firstBio",
      title: "Parter Bio #1",
      type: "object",
      fields: [
        {
          name: "fullName",
          title: "Full Name",
          type: "string",
          description: "These are the first words that appear in red.",
        },
        {
          name: "description",
          title: "Full Bio",
          type: "array",
          description: "Person's bio. Recommended to keep it around 150 words.",
          of: [{ type: "block" }],
        },
      ]
    },
    {
      name: "secondBio",
      title: "Parter Bio #2",
      type: "object",
      fields: [
        {
          name: "fullName",
          title: "Full Name",
          type: "string",
          description: "These are the first words that appear in red.",
        },
        {
          name: "description",
          title: "Full Bio",
          type: "array",
          description: "Person's bio. Recommended to keep it around 150 words.",
          of: [{ type: "block" }],
        },
      ]
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
