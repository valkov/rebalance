import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'galleryImage',
  title: 'Gallery photo / video',
  type: 'document',
  fields: [
    defineField({
      name: 'image',
      title: 'Photo / poster',
      type: 'image',
      options: {hotspot: true},
      description: 'The photo. For a video item, this is the still shown before it plays (poster).',
    }),
    defineField({
      name: 'video',
      title: 'Video (optional)',
      type: 'file',
      options: {accept: 'video/*'},
      description: 'Upload an MP4 (or WebM) to make this a video item. The photo above is used as its poster/thumbnail.',
    }),
    defineField({name: 'caption', title: 'Caption', type: 'localeString', description: 'e.g. Lofoten, Norway · 2024'}),
    defineField({
      name: 'group',
      title: 'Folder',
      type: 'reference',
      to: [{type: 'galleryGroup'}],
      description: 'Which folder this belongs to. Leave empty to show it under “More”.',
    }),
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
    select: {title: 'caption.en', media: 'image', video: 'video'},
    prepare({title, media, video}) {
      return {title: (video ? '🎬 ' : '') + (title || 'Untitled'), media}
    },
  },
})
