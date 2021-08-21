import type { NextApiRequest, NextApiResponse } from 'next'

export default async (req : NextApiRequest, res: NextApiResponse) => {
    await fetch('https://jsonplaceholder.typicode.com/todos/1')
    const products = [
    {
        name: 'King SNKR ',
        description: 'SNKR Drop Bot Buyer.',
        tier: 'diamond',
        slug: 'king-snkr',
        callToAction: 'Subscribe to buy',
        callToActionLink: '/',
        discord: '/',
        youtubeSlug: '',
        logo: {
            url: '/icon-white-512x512.png'
        },
        links: [
            {
                text: 'Subscribe',
                url: '/'
            },
            {
                text: 'Snkrs Shop',
                url: 'https://pxv-shop.vercel.app/'
            }
        ],
        cardImage: {
            width: 100,
            height: 100,
            url: '/icon-white-512x512.png'
        }
    }
    ]

  res.setHeader('Cache-Control', 's-maxage=5, stale-while-revalidate')
  
  res.status(200).json(products)
}