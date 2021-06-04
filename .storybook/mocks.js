import { random, name, lorem, commerce, company, internet } from 'faker'
import { sample } from 'lodash'

const generateImage = (width, height, mode = 'any') =>
  `https://placeimg.com/${width}/${height}/${mode}`

const connectable = () => ({
  href: `/blocks/${random.number({ min: 1, max: 1000 })}`,
  created_at: `${random.number({ min: 1, max: 10 })} hours ago`,
  updated_at: `${random.number({ min: 1, max: 10 })} hours ago`,
})

const user = () => ({
  id: random.number({ min: 1, max: 999999 }),
  first_name: name.firstName(),
  last_name: name.lastName(),
  name: `${name.firstName()} ${name.lastName()}`,
  initials: 'IOU',
  avatar: 'https://dummyimage.com/100x100/000/fff&text=**',
  bio: Array(random.number(20))
    .fill(undefined)
    .map(() => `${lorem.paragraph()}\n\n`)
    .join(''),
  email: internet.email(),
  unconfirmed_email: sample([internet.email(), null]),
  home_path: sample(['/', '/explore', '/channel/name']),
  settings: {
    receive_email: sample(['none', 'notifications', 'digest']),
  },
})

const Mocks = {
  Sharify: () => ({
    IS_SPIDER: false,
  }),
  Channel: () => ({
    id: random.number({ min: 1, max: 999999 }),
    slug: `slug-${random.number({ min: 1, max: 999999 })}`,
    title: random.words(),
    visibility: sample(['closed', 'private', 'public']),
  }),

  Authentication: () => ({
    contacts: () => [],
  }),

  User: () => ({
    ...user(),
  }),

  Me: () => ({
    ...user(),
  }),

  Group: () => ({
    name: `${commerce.productAdjective()} ${company.catchPhraseNoun()}`,
    initials: 'IOU',
    visibility: sample(['private', 'public']),
  }),

  Connection: () => ({
    created_at: `${random.number({ min: 1, max: 10 })} hours ago`,
  }),

  Image: () => ({
    ...connectable(),
    image_url: generateImage(
      random.number({ min: 200, max: 800 }),
      random.number({ min: 200, max: 800 })
    ),
  }),

  Link: () => ({
    ...connectable(),
    image_url: generateImage(1000, 1000, 'tech/grayscale'),
  }),

  Embed: () => ({
    ...connectable(),
    image_url: generateImage(800, 600),
  }),

  Attachment: () => ({
    ...connectable(),
    image_url: Math.random() > 0.5 ? generateImage(800, 600) : null,
    file_extension: 'pdf',
  }),

  Text: () => ({
    ...connectable(),
    content: Array(random.number(20))
      .fill(undefined)
      .map(() => `<p>${lorem.paragraph()}</p>`)
      .join(''),
    source: null,
  }),

  Deed: () => ({
    key: random.uuid(),
    created_at: `${random.number({ min: 1, max: 10 })} hours ago`,
    action: random.arrayElement([
      'connected',
      'followed',
      'created',
      'commented on',
      'connected',
    ]),
    connector: random.arrayElement(['on', 'to']),
  }),

  Coupon: () => ({
    code: 'freeyear',
    description: '45 (USD) off once',
  }),

  CreditCard: () => ({
    id: random.uuid(),
    brand: 'Visa',
    last4: '4444',
    exp_year: '2019',
    exp_month: '11',
  }),
}

export default Mocks
