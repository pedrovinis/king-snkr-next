import { Task } from '@lib/types'
import fs from 'fs'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async (req : NextApiRequest, res: NextApiResponse) => {
    try {
        const userData = req.body
        const fUserData = JSON.parse(Buffer.from(userData, 'base64').toString())

        const tasksFileName = fs.readdirSync('bin/tasks')
        const tasks: Task[] = tasksFileName.map( (taskFileName) => {
          return JSON.parse(fs.readFileSync(`bin/tasks/${taskFileName}`, 'utf8'))
        })

        const taskWithUser = tasks.find((task) => {
            if(task.user.name == fUserData.name) return task.name
        })

        if(taskWithUser) {
            return res.status(200).json({
                success: false,
                message: `Cannot delete because exists a Task with this user in use. "${taskWithUser.name}".`
            })
        }

        fs.unlinkSync(`bin/users/${fUserData.name}.json`)

        return res.status(200).json({success: true})
    }
    catch {
        return res.status(200).json({
            success: false,
            message: 'Error on users file.'
        })
    }
    
}