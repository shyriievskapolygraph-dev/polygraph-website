import { defineCliConfig } from "sanity/cli";

export default defineCliConfig({
  api: {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "yehuev5o",
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  },
});
