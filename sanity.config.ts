import {defineConfig} from 'sanity'
import {structureTool, StructureBuilder} from 'sanity/structure'
import {orderableDocumentListDeskItem} from '@sanity/orderable-document-list'
// import { defineConfig } from "sanity";
// import { deskTool } from "sanity/desk";
import { schemaTypes } from "./schemas";
import { vercelDeployTool } from 'sanity-plugin-vercel-deploy'

export default defineConfig({
  name: "almost-studio",
  title: "Almost Studio",
  projectId: "oogp23sh",
  dataset: "production",
  basePath: "/edit",
  // plugins: [deskTool()],
  plugins: [
    // vercelDeployTool(),
    structureTool({
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