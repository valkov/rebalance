import {defineCliConfig} from 'sanity/cli'

// Paste your project id here (from sanity.io/manage), or run `npx sanity init`.
export default defineCliConfig({
  api: {
    projectId: 'a0vcqlnf',
    dataset: 'production',
  },
  studioHost: 'trailtothriving',
})
