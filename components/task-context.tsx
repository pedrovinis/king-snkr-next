import { Task } from "@lib/types"
import { createContext, useCallback, useEffect, useState } from "react"
import React from "react"
import { isActive } from "@lib/isActive"

type Props = {
    startTask: Function
    stopTask: Function
    activeTasks: any
    isActive: any
}

export const TaskContext = createContext<Props>({
    startTask: () => {},
    stopTask: () => {},
    activeTasks: {},
    isActive: false
})

export const TaskProvider = ({ children }:any) => {
    const [activeTasks, setActiveTasks]:any = useState({})

    useEffect(() => {
        (async () => {
            
        })()
    }, [])

    const isActive = (task:Task) => {
        return activeTasks[task.name]?.active
    }   

    const startTask = async(task:Task) => {
        const obj:any = {}
        obj[task.name] = task
        obj[task.name].active = true
        setActiveTasks({...activeTasks, ...obj})
        await new Promise(r => setTimeout(r, 5000))
        obj[task.name].progress = 3
        setActiveTasks({...activeTasks, ...obj})
    }

    const stopTask = async(task:Task) => {
        const obj:any = {}
        obj[task.name] = task
        obj[task.name].active = false
        setActiveTasks({...activeTasks, ...obj})
    }

    const value = {
        activeTasks,
        isActive,
        startTask,
        stopTask
    }

    return (
        <TaskContext.Provider value={value}>
            {children}
        </TaskContext.Provider>
    )
}