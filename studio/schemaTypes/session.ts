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
    defineField({name: 'price', title: 'Price', type: 'string', description: 'e.g. DKK 1,000.00, or Free'}),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'localeBlock',
      description: 'Rich text — paragraphs, bold, links, lists.',
    }),
    defineField({
      name: 'groupBooking',
      title: 'Group slot booking',
      type: 'boolean',
      initialValue: false,
      description:
        'ON = semi-private group session; the Book button opens the Cal.com booking calendar (set the link below). ' +
        'OFF = personal session; the Book button opens an enquiry form (name, email, phone, message) sent to you.',
    }),
    defineField({
      name: 'schedulerUrl',
      title: 'Cal.com booking link',
      type: 'url',
      description:
        'Group sessions only: the Cal.com event link, e.g. https://cal.com/tanya-basse-f6x4ga/rest-and-digest-evening. ' +
        'The Book button opens this calendar.',
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
