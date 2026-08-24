"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { sanityDataset, sanityProjectId } from "./src/sanity/env";
import { schemaTypes } from "./src/sanity/schemaTypes";
import { structure } from "./src/sanity/structure";

export default defineConfig({
  name: "shyriievska-admin",
  title: "Ірина Ширієвська — керування сайтом",
  basePath: "/admin",
  projectId: sanityProjectId,
  dataset: sanityDataset,
  plugins: [structureTool({ structure })],
  schema: {
    types: schemaTypes,
    templates: (templates) =>
      templates.filter(
        ({ schemaType }) =>
          !["homePage", "aboutPage", "siteSettings"].includes(schemaType)
      ),
  },
});
