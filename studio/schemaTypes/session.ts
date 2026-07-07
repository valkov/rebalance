import {defineField, defineType} from 'sanity'

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
    defineField({name: 'price', title: 'Price', type: 'localeString', description: 'e.g. DKK 1,000.00, or Free'}),
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
    select: {title: 'title.en', subtitle: 'price.en', media: 'image'},
  },
})
