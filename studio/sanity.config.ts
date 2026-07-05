import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

// Paste the same project id you used in sanity.cli.ts.
export default defineConfig({
  name: 'default',
  title: 'Rebalance',

  projectId: 's3xmc1k6',
  dataset: 'production',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
