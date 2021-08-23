import type { NextApiRequest, NextApiResponse } from 'next'

export default async (req : NextApiRequest, res: NextApiResponse) => {
    const data = await fetch('https://pxv.vercel.app/api/services')
    const services = await data.json()


  res.setHeader('Cache-Control', 's-maxage=5, stale-while-revalidate')
  
  res.status(200).json(services)
}