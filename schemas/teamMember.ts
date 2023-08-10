import { defineField } from "sanity";
import { BiUserCircle } from "react-icons/bi";

const teamMember = {
  name: "teamMember",
  title: "Current Team Member",
  type: "document",
  icon: BiUserCircle,
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

export default teamMember;
