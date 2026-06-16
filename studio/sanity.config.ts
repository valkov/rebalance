import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

// Paste the same project id you used in sanity.cli.ts.
export default defineConfig({
  name: 'default',
  title: 'Trail to Thriving',

  projectId: 'a0vcqlnf',
  dataset: 'production',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
