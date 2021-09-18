import fs from 'fs'
import TaskClass from '@lib/class/task'
import type { NextApiRequest, NextApiResponse } from 'next'

import { Snkr, User } from '@lib/types'

const formatTaskData = (taskData:any) => {
    const usersFileName = fs.readdirSync('bin/users')
    const users: User[] = usersFileName.map( (userFileName) => {
      return JSON.parse(fs.readFileSync(`bin/users/${userFileName}`, 'utf8'))
    })
    const snkrsFileName = fs.readdirSync('bin/snkrs')
    const snkrs: Snkr[] = snkrsFileName.map( (snkrFileName) => {
      return JSON.parse(fs.readFileSync(`bin/snkrs/${snkrFileName}`, 'utf8'))
    })

    const fTaskData:any = JSON.parse(Buffer.from(taskData, 'base64').toString())

    const user = users.find( user => user.name == fTaskData.user_name)
    const snkr = snkrs.find( snkr => snkr.id == fTaskData.snkr_id)

    return {
        name: fTaskData.name.trim(),
        slug: fTaskData.name.trim(),
        user: user,
        snkr: snkr,
        cfg: {
            size: snkr?.sizes.find( size => {
                if(size.value == fTaskData.size) return size
            })
        }
    }
}

export default async (req : NextApiRequest, res: NextApiResponse) => {
    let sucess = false

    try {


        const taskData = req.body
        const formatedTaskData:any = formatTaskData(taskData)
        
        const task = new TaskClass()
        task.setName(formatedTaskData.name)
        task.setSlug(formatedTaskData.slug)
        task.setUser(formatedTaskData.user)
        task.setSnkr(formatedTaskData.snkr)
        task.setSize(formatedTaskData.cfg.size)

        task.saveConfigs()
        sucess = true
    }
    catch {
        sucess = false
    }
    
    res.status(200).json({success:sucess})
}