import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'event',
  title: 'Event / Trip',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'order',
      title: 'Sort order',
      type: 'number',
      description: 'Lower numbers appear first.',
      initialValue: 10,
    }),
    defineField({name: 'location', title: 'Location', type: 'string', description: 'e.g. Geiranger, Norway'}),
    defineField({name: 'dates', title: 'Dates', type: 'string', description: 'e.g. 11–18 July 2026'}),
    defineField({name: 'duration', title: 'Duration', type: 'string', description: 'e.g. 8 days'}),
    defineField({name: 'price', title: 'Price', type: 'string', description: 'e.g. From kr 8,900'}),
    defineField({
      name: 'blurb',
      title: 'Short description',
      type: 'text',
      rows: 3,
      description: 'Shown on the card. Keep it to a couple of sentences.',
    }),
    defineField({
      name: 'longDescription',
      title: 'Long description',
      type: 'array',
      of: [{type: 'block'}],
      description: 'Rich text shown on the event detail page (replaces the short description there).',
    }),
    defineField({
      name: 'itinerary',
      title: 'Day-by-day itinerary',
      type: 'array',
      description: 'Optional. Each entry is one day (or block of days) on the detail page.',
      of: [
        {
          type: 'object',
          name: 'day',
          fields: [
            {name: 'label', title: 'Day / label', type: 'string', description: 'e.g. Day 1, or Days 3–4'},
            {name: 'title', title: 'Title', type: 'string'},
            {name: 'text', title: 'Description', type: 'text', rows: 3},
          ],
          preview: {select: {title: 'title', subtitle: 'label'}},
        },
      ],
    }),
    defineField({
      name: 'thumbnail',
      title: 'Thumbnail (card image)',
      type: 'image',
      options: {hotspot: true},
      description: 'Shown on the event card in the list. Landscape works best.',
    }),
    defineField({
      name: 'detailImage',
      title: 'Detail image',
      type: 'image',
      options: {hotspot: true},
      description: 'Larger hero image shown on the event detail page.',
    }),
    defineField({
      name: 'paymentUrl',
      title: 'Payment link (Book & pay)',
      type: 'url',
      description: 'A Stripe Payment Link, or any checkout/booking URL. Leave empty to show an "Enquire" button.',
    }),
    defineField({
      name: 'bookingUrl',
      title: 'Booking calendar (optional)',
      type: 'url',
      description: 'A Cal.com / Calendly link for the "Reserve a spot" button.',
    }),
    defineField({
      name: 'hue',
      title: 'Placeholder colour (optional)',
      type: 'number',
      description: 'A number 0–360. Only used as a coloured placeholder if there is no photo yet.',
    }),
  ],
  preview: {
    select: {title: 'title', subtitle: 'dates', media: 'thumbnail'},
  },
})
