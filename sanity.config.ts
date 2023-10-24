import {defineConfig} from 'sanity'
import {deskTool, StructureBuilder} from 'sanity/desk'
import {orderableDocumentListDeskItem} from '@sanity/orderable-document-list'
// import { defineConfig } from "sanity";
// import { deskTool } from "sanity/desk";
import { schemaTypes } from "./schemas";

export default defineConfig({
  name: "almost-studio",
  title: "Almost Studio",
  projectId: "oogp23sh",
  dataset: "production",
  basePath: "/edit",
  // plugins: [deskTool()],
  plugins: [
    deskTool({
      structure: (S, context) => {
        return S.list()
          .title('Content')
          .items([
            // Minimum required configuration
            orderableDocumentListDeskItem({type: 'project', S, context}),
            S.documentTypeListItem('profile').title('Information'),
            S.documentTypeListItem('teamMember').title('Team Members'),
            S.documentTypeListItem('siteMeta').title('Site Configuration'),

          ])
      },
    }),
  ],
  schema: { types: schemaTypes },
});