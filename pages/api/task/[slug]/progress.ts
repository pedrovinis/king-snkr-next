import fs from 'fs'
import type { NextApiRequest, NextApiResponse } from 'next'
import { Task } from '@lib/types'

export default async (req : NextApiRequest, res: NextApiResponse) => {
    const slug = req.query.slug

    try {
    const tasksFileName = fs.readdirSync('bin/tasks')
    const tasks: Task[] = tasksFileName.map( (taskFileName) => {
      return JSON.parse(fs.readFileSync(`bin/tasks/${taskFileName}`, 'utf8'))
    })
    const task = tasks.find((s:any) => s.slug === slug) || null

    if(!task) {
      res.status(200).json({
        success: false,
        message: 'No task found'
      })
    }

    res.status(200).json({
        success: true,
        progress: task?.progress
    })
    }
    catch {
      res.status(200).json({
        success: false,
        message: 'Error on get progress'
      })
    }

}