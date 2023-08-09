import { defineField } from "sanity";
import { BiUser } from "react-icons/bi";

const profile = {
  name: "teamMember",
  title: "Current Team Member",
  type: "document",
  icon: BiUser,
  fields: [
    {
      title: 'Full Name',
      name: 'title',
      type: 'string'
    },
    {
      name: "bio",
      title: "Bio",
      type: "text"
    },
  ],
};

export default profile;
