import {defineArrayMember, defineField, defineType} from 'sanity'

export default defineType({
  name: 'session',
  title: 'Therapy session',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Title', type: 'localeString', validation: (Rule) => Rule.required()}),
    defineField({
      name: 'image',
      title: 'Photo',
      type: 'image',
      options: {hotspot: true},
      description: 'Shown on the left of the session card.',
    }),
    defineField({
      name: 'order',
      title: 'Sort order',
      type: 'number',
      description: 'Lower numbers appear first.',
      initialValue: 10,
    }),
    defineField({name: 'time', title: 'Time / duration', type: 'localeString', description: 'e.g. 1 hour, or 60 min'}),
    defineField({name: 'price', title: 'Price', type: 'string', description: 'e.g. DKK 1,000.00, or Free'}),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'localeBlock',
      description: 'Rich text — paragraphs, bold, links, lists.',
    }),
    defineField({
      name: 'schedulerUrl',
      title: 'Booking calendar (Book a time)',
      type: 'url',
      description: 'Cal.com booking link — for sessions people book on a calendar (group/class). Leave empty for clip-card sessions.',
    }),
    defineField({
      name: 'packages',
      title: 'Session packages (klippekort)',
      type: 'array',
      description:
        'For personal sessions sold as prepaid packages instead of a calendar. Add one item per Stripe Payment Link (e.g. 1, 5 and 10 sessions). If any packages are set, the card shows a “Buy” button per package instead of the calendar. Enable name + phone collection on each Stripe link so you capture the client’s details.',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'sessionPackage',
          fields: [
            defineField({
              name: 'count',
              title: 'Number of sessions',
              type: 'number',
              validation: (Rule) => Rule.required().min(1).integer(),
            }),
            defineField({
              name: 'price',
              title: 'Price (optional)',
              type: 'string',
              description: 'e.g. DKK 900. Shown on the button.',
            }),
            defineField({
              name: 'stripeUrl',
              title: 'Stripe payment link',
              type: 'url',
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {count: 'count', price: 'price'},
            prepare({count, price}) {
              const n = count === 1 ? '1 session' : `${count} sessions`
              return {title: price ? `${n} — ${price}` : n}
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'hue',
      title: 'Accent colour (optional)',
      type: 'number',
      description: 'A number 0–360, used only as a placeholder colour if there is no photo.',
    }),
  ],
  preview: {
    select: {title: 'title.en', subtitle: 'price', media: 'image'},
  },
})
