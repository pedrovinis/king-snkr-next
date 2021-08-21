import type { NextApiRequest, NextApiResponse } from 'next'

export default async (req : NextApiRequest, res: NextApiResponse) => {
    const data = await fetch('https://jsonplaceholder.typicode.com/todos/1')
    const services = [
        {
            id: 0,
            companyName: 'pXv Inc.',
            title: 'pXv Shop',
            description: 'pXv e-commerce',
            discord: '',
            link: 'https://pxv-shop.vercel.app/',
        }
    ]

  res.setHeader('Cache-Control', 's-maxage=5, stale-while-revalidate')
  
  res.status(200).json(services)
}