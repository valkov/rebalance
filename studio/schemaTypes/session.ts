import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'session',
  title: 'Therapy session',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Title', type: 'localeString'}),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      description: 'Which part of the page this session appears under.',
      options: {
        list: [
          {title: 'Group therapy', value: 'group'},
          {title: 'Personal therapy', value: 'personal'},
          {title: 'Other', value: 'other'},
        ],
        layout: 'radio',
      },
      initialValue: 'personal',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Sort order',
      type: 'number',
      description: 'Lower numbers appear first (within a category).',
      initialValue: 10,
    }),
    defineField({name: 'format', title: 'Format', type: 'localeString', description: 'e.g. Online · 20 min, or In person · 60 min'}),
    defineField({name: 'price', title: 'Price', type: 'localeString', description: 'e.g. kr 750 / session, or Free'}),
    defineField({
      name: 'blurb',
      title: 'Description',
      type: 'localeText',
    }),
    defineField({
      name: 'image',
      title: 'Photo (optional)',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'schedulerUrl',
      title: 'Booking calendar (Book a time)',
      type: 'url',
      description: 'A Cal.com / Calendly link for this session. Leave empty to fall back to an email enquiry.',
    }),
    defineField({
      name: 'paymentUrl',
      title: 'Payment link (optional)',
      type: 'url',
      description: 'A Stripe Payment Link — e.g. to prepay or to sell a package. Shows a "Pay online" button.',
    }),
    defineField({
      name: 'hue',
      title: 'Accent colour (optional)',
      type: 'number',
      description: 'A number 0–360, used only as a placeholder colour if there is no photo.',
    }),
  ],
  preview: {
    select: {title: 'title.en', subtitle: 'category', media: 'image'},
  },
})
