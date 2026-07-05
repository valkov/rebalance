import {defineCliConfig} from 'sanity/cli'

// Paste your project id here (from sanity.io/manage), or run `npx sanity init`.
export default defineCliConfig({
  api: {
    projectId: 's3xmc1k6',
    dataset: 'production',
  },
  studioHost: 'rebalance',
})
