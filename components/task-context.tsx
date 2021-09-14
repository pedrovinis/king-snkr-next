import { Task } from "@lib/types"
import { createContext, useCallback, useEffect, useState } from "react"
import React from "react"

type Props = {
    tasks: any
    startTask: Function
    stopTask: Function
}

export const TaskContext = createContext<Props>({
    tasks: {},
    startTask: () => {},
    stopTask: () => {},
})

export const TaskProvider = ({ children }:any) => {
    const [tasks, setTasks]:any = useState({})
    console.log(tasks)

    useEffect(() => {
        (async () => {
            
        })()
    }, [])

    const isActive = (task:Task) => {
        return tasks[task.name]?.active
    }   
    
    const startTask = async(task:Task) => {
        const obj:any = {}
        obj[task.name] = tasks[task.name] || task
        obj[task.name].active = true
        setTasks((prev:any) => ({...prev, ...obj}))
        await new Promise(r => setTimeout(r, 5000))
        obj[task.name].progress = 3
        setTasks((prev:any) => ({...prev, ...obj}))
    }

    const stopTask = async(task:Task) => {
        const obj = tasks[task.name]
        obj.active = false
        setTasks((prev:any) => ({...prev, ...obj}))
    }

    const value = {
        tasks,
        startTask,
        stopTask
    }

    return (
        <TaskContext.Provider value={value}>
            {children}
        </TaskContext.Provider>
    )
}