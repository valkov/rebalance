import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'galleryImage',
  title: 'Gallery photo',
  type: 'document',
  fields: [
    defineField({
      name: 'image',
      title: 'Photo',
      type: 'image',
      options: {hotspot: true},
      validation: (r) => r.required(),
    }),
    defineField({name: 'caption', title: 'Caption', type: 'localeString', description: 'e.g. Lofoten, Norway · 2024'}),
    defineField({
      name: 'order',
      title: 'Sort order',
      type: 'number',
      description: 'Lower numbers appear first. The first 6 also show on the home page.',
      initialValue: 10,
    }),
    defineField({
      name: 'hue',
      title: 'Placeholder colour (optional)',
      type: 'number',
    }),
  ],
  preview: {
    select: {title: 'caption.en', media: 'image'},
  },
})
