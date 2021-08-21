import type { NextApiRequest, NextApiResponse } from 'next'

export default async (req : NextApiRequest, res: NextApiResponse) => {
    const data = await fetch('https://jsonplaceholder.typicode.com/todos/1')
    const schedule = [
    {
        name: 'SNKR BOT',
        slug: '/snkrs',
        stream: 'stream',
        discord: 'discord',
        schedule: [
            {
                title: 'Release',
                description: 'description',
                start: `Semptember 21`,
                end: `10 A.M`,
                speaker: [
                    {
                        slug:'/',
                        image : {
                            url: '/icon-white-512x512.png'
                        }
                    }],
            },
            {
                title: 'Graphic Interface',
                description: 'description',
                start: `October 30`,
                end: `Goal`,
                speaker: [
                    {
                        slug:'/',
                        image : {
                            url: '/icon-white-512x512.png'
                        }
                    }],
            },
            {
                title: 'Final Version',
                description: 'description',
                start: `December 30`,
                end: `Goal`,
                speaker: [
                    {
                        slug:'/',
                        image : {
                            url: '/icon-white-512x512.png'
                        }
                    }],
            }
        ],
        
    },
    {
        name: 'PXV SHOP',
        slug: '/snkrs',
        stream: 'stream',
        discord: 'discord',
        schedule: [
            {
                title: 'Release',
                description: 'description',
                start: `Semptember 30`,
                end: `10 A.M`,
                speaker: [
                    {
                        slug:'/',
                        image : {
                            url: '/icon-white-512x512.png'
                        }
                    }],

            },
            {
                title: 'Promotional',
                description: 'description',
                start: `Semptember 30`,
                end: `10 A.M`,
                speaker: [
                    {
                        slug:'/',
                        image : {
                            url: '/icon-white-512x512.png'
                        }
                    }],
                    
            },
            {
                title: 'Giveway',
                description: 'description',
                start: `October 19`,
                end: `Goal`,
                speaker: [
                    {
                        slug:'/',
                        image : {
                            url: '/icon-white-512x512.png'
                        }
                    }],
            },
            {
                title: 'New Year Giveway',
                description: 'description',
                start: `December 30`,
                end: `Goal`,
                speaker: [
                    {
                        slug:'/',
                        image : {
                            url: '/icon-white-512x512.png'
                        }
                    }],
            }
        ],
        
    }
    ]

  res.setHeader('Cache-Control', 's-maxage=5, stale-while-revalidate')
  
  res.status(200).json(schedule)
}