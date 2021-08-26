import fs from 'fs'
import type { NextApiRequest, NextApiResponse } from 'next'
import { Snkr, Stage } from '@lib/types'

export default async (req : NextApiRequest, res: NextApiResponse) => {
    const snkrsFileName = fs.readdirSync('bin/snkrs')
    const snkrs: Snkr[] = snkrsFileName.map( (snkrFileName) => {
      return JSON.parse(fs.readFileSync(`bin/snkrs/${snkrFileName}`, 'utf8'))
    })

    const formatedSchedule:Stage[] = formatSchedule(snkrs)

    res.setHeader('Cache-Control', 's-maxage=5, stale-while-revalidate')
  
    res.status(200).json(formatedSchedule)
}

const formatSchedule = (snkrs:Snkr[]) => {
    const sortedSnkrs = snkrs.sort((a,b) => a.release + b.release)
    
    const snkrByDate:any = {}

    sortedSnkrs.map( snkr => {
        const date = new Date(snkr.release*1000)
        const year:string = date.getFullYear().toString()
        const month:string = date.getMonth().toString()
        const day:string = date.getDate().toString()

        if(!snkrByDate[`${day}/${month}/${year}`]) snkrByDate[`${day}/${month}/${year}`] = []
        snkrByDate[`${day}/${month}/${year}`].push(snkr)
    })
    const formatedSchedule = Object.keys(snkrByDate).map( date => {
      return {
        name: date,
        slug: '/snkrs',
        schedule: snkrByDate[date]
      }
    })
    return formatedSchedule
}