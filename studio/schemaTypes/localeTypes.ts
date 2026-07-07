import {defineType} from 'sanity'

// The site languages. `en` is the fallback the website uses when a
// translation is empty.
const LANGS = [
  {id: 'en', title: 'English'},
  {id: 'da', title: 'Dansk'},
]

// Each localized value is a small object grouping the three languages together,
// so a single "Title" / "Blurb" field holds all three translations.
export const localeString = defineType({
  name: 'localeString',
  title: 'Text',
  type: 'object',
  fields: LANGS.map((l) => ({name: l.id, title: l.title, type: 'string'})),
})

export const localeText = defineType({
  name: 'localeText',
  title: 'Text',
  type: 'object',
  fields: LANGS.map((l) => ({name: l.id, title: l.title, type: 'text', rows: 3})),
})

export const localeBlock = defineType({
  name: 'localeBlock',
  title: 'Rich text',
  type: 'object',
  fields: LANGS.map((l) => ({name: l.id, title: l.title, type: 'array', of: [{type: 'block'}]})),
})
