import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { schemaTypes } from "./schemas";

export default defineConfig({
  name: "almost-studio",
  title: "Almost Studio",
  projectId: "oogp23sh",
  dataset: "production",
  basePath: "/edit",
  plugins: [deskTool()],
  schema: { types: schemaTypes },
});
