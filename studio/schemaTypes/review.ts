import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'review',
  title: 'Client review',
  type: 'document',
  fields: [
    defineField({
      name: 'text',
      title: 'Review',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({name: 'author', title: 'Client name', type: 'string', description: 'e.g. "Andrei, 39"'}),
    defineField({name: 'role', title: 'Context / background', type: 'string', description: 'Shown under the name, e.g. "Combat soldier • Leg amputation".'}),
    defineField({
      name: 'photo',
      title: 'Client photo (optional)',
      type: 'image',
      options: {hotspot: true},
      description: 'Shown as a small round photo above the review.',
    }),
    defineField({
      name: 'order',
      title: 'Sort order',
      type: 'number',
      description: 'Lower numbers appear first.',
      initialValue: 10,
    }),
  ],
  preview: {
    select: {title: 'author', subtitle: 'text', media: 'photo'},
    prepare({title, subtitle, media}) {
      return {title: title || 'Client review', subtitle, media}
    },
  },
})
