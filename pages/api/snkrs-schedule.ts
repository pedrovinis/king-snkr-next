import fs from 'fs'
import type { NextApiRequest, NextApiResponse } from 'next'
import { Snkr, Stage } from '@lib/types'

export default async (req : NextApiRequest, res: NextApiResponse) => {
    const snkrsFileName = fs.readdirSync('bin/snkrs')
    const snkrs: Snkr[] = snkrsFileName.map( (snkrFileName) => {
      return JSON.parse(fs.readFileSync(`bin/snkrs/${snkrFileName}`, 'utf8'))
    })

    const formatedSchedule:Stage[] = formatSchedule(snkrs)

    console.log(formatedSchedule)
    res.setHeader('Cache-Control', 's-maxage=5, stale-while-revalidate')
  
    res.status(200).json({})
}

const formatSchedule = (snkrs:Snkr[]) => {
    const sortedSnkrs = snkrs.sort((a,b) => a.release - b.release)
    
    const snkrByMonth:any = {}

    sortedSnkrs.map( snkr => {
        const date = new Date(snkr.release*1000)
        const month:string = date.getMonth().toString()

        if(!snkrByMonth[month]) snkrByMonth[month] = []
        snkrByMonth[month].push(snkr)
    })
    return 
}