// Uploads today's Facebook photos from ~/Downloads into Sanity as gallery
// images. Idempotent: deterministic _id per source file, skips ones already
// uploaded. Run:  npx sanity exec upload-gallery.mjs --with-user-token
import {getCliClient} from 'sanity/cli'
import {createReadStream, readdirSync, statSync} from 'node:fs'
import {join} from 'node:path'

const client = getCliClient({apiVersion: '2024-01-01'})
const dir = join(process.env.HOME, 'Downloads')

const now = new Date()
const isToday = (d) =>
  d.getFullYear() === now.getFullYear() &&
  d.getMonth() === now.getMonth() &&
  d.getDate() === now.getDate()

const files = readdirSync(dir)
  .filter((f) => /_n\.jpg$/i.test(f))
  .filter((f) => isToday(statSync(join(dir, f)).mtime))
  .sort()

console.log(`Found ${files.length} Facebook photo(s) from today to upload.`)

let order = 1
for (const f of files) {
  const id = 'gallery-fb-' + f.replace(/_n\.jpg$/i, '')
  const existing = await client.getDocument(id).catch(() => null)
  if (existing) {
    console.log(`• skip (already uploaded): ${f}`)
    continue
  }
  const asset = await client.assets.upload('image', createReadStream(join(dir, f)), {filename: f})
  await client.createIfNotExists({
    _id: id,
    _type: 'galleryImage',
    order: order++,
    image: {_type: 'image', asset: {_type: 'reference', _ref: asset._id}},
  })
  console.log(`✓ uploaded ${f}`)
}
console.log('Done.')
