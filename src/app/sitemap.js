 
export default function sitemap() {
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://astrovachan.com'
  return [
  // {
  //   url: `${BASE_URL}/astrologer`,
  //   lastModified: new Date(),
  //   changeFrequency: 'weekly',
  //   priority: 1,
  // },
  // {
  //   url: `${BASE_URL}/about`,
  //   lastModified: new Date(),
  //   changeFrequency: 'yearly',
  //   priority: 1,
  // },
    // {
    //   url: `${BASE_URL}/balance`,
    //   lastModified: new Date(),
    //   changeFrequency: 'weekly',
    //   priority: 0.5,
    // },
  //  {
  //    url: `${BASE_URL}/birthchart`,
  //    lastModified: new Date(),
  //    changeFrequency: 'weekly',
  //    priority: 0.5,
  //  },
  // {
  //   url: `${BASE_URL}/horoscope`,
  //   lastModified: new Date(),
  //   changeFrequency: 'weekly',
  //   priority: 0.5,
  // },
    {
      url: `${BASE_URL}/kalsarp-dosh`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/kundli-generation`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/kundli-report`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.5,
    },
  //  {
  //    url: `${BASE_URL}/matchmaking`,
  //    lastModified: new Date(),
  //    changeFrequency: 'weekly',
  //    priority: 0.5,
  //  },
    {
      url: `${BASE_URL}/numerology`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.5,
    },
    // {
    //   url: `${BASE_URL}/order-details`,
    //   lastModified: new Date(),
    //   changeFrequency: 'weekly',
    //   priority: 0.5,
    // },
  // {
  //   url: `${BASE_URL}/talk-to-astrologer`,
  //   lastModified: new Date(),
  //   changeFrequency: 'weekly',
  //   priority: 0.5,
  // },
    {
      url: `${BASE_URL}/terms-and-conditions`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.5,
    },
  //  {
  //    url: `${BASE_URL}/userprofile`,
  //    lastModified: new Date(),
  //    changeFrequency: 'weekly',
  //    priority: 0.5,
  //  },
  // {
  //   url: `${BASE_URL}/zodiacsign`,
  //   lastModified: new Date(),
  //   changeFrequency: 'weekly',
  //   priority: 0.5,
  // },
  ]
}