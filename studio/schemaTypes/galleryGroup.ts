import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'galleryGroup',
  title: 'Gallery folder',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Folder name',
      type: 'localeString',
      description: 'e.g. Group hikes · Retreats · Therapy in nature',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'order',
      title: 'Sort order',
      type: 'number',
      description: 'Lower numbers appear first on the gallery page.',
      initialValue: 10,
    }),
    defineField({
      name: 'hue',
      title: 'Placeholder colour (optional)',
      type: 'number',
    }),
  ],
  preview: {
    select: {title: 'title.en'},
  },
})
