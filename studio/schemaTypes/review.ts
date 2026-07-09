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
    defineField({name: 'author', title: 'Client name', type: 'string'}),
    defineField({
      name: 'photo',
      title: 'Client photo (optional)',
      type: 'image',
      options: {hotspot: true},
      description: 'Shown as a small round photo above the review.',
    }),
    defineField({
      name: 'rating',
      title: 'Stars',
      type: 'number',
      description: '1–5. Defaults to 5.',
      initialValue: 5,
      validation: (Rule) => Rule.min(1).max(5),
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
