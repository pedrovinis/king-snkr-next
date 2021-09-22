import fs from 'fs'
import type { NextApiRequest, NextApiResponse } from 'next'

import { Snkr, User } from '@lib/types'
import { saveConfigsJSON } from '@lib/utils/file-save'

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

    const taskData = {
        name: '',
        slug: '',
        user: '',
        snkr: '',
        active: false,
        progress: 0,
        cfg: {
            size: ''
        }
    }

    try {
        const bodyData= req.body
        const formatedTaskData:any = formatTaskData(bodyData)
        
        taskData['name'] = formatedTaskData.name
        taskData['slug'] = formatedTaskData.slug
        taskData['user'] = formatedTaskData.user
        taskData['snkr'] = formatedTaskData.snkr
        taskData['cfg']['size'] = formatedTaskData.cfg.size

        saveConfigsJSON(`bin/tasks/${taskData.name}`, taskData)
        sucess = true
    }
    catch {
        sucess = false
    }
    
    return res.status(200).json({success:sucess})
}