import { Task } from "@lib/types"
import { createContext, useCallback, useEffect, useState } from "react"
import React from "react"

type Props = {
    startTask: Function
    stopTask: Function
    activeTasks: {}
}

export const TaskContext = createContext<Props>({
    startTask: () => {},
    stopTask: () => {},
    activeTasks: {},
})

export const TaskProvider = ({ children }:any) => {
    const [activeTasks, setActiveTasks]:any = useState({})
    console.log(activeTasks)

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
        setActiveTasks((prev:any) => ({...prev, ...obj}))
        await new Promise(r => setTimeout(r, 5000))
        obj[task.name].progress = 3
        setActiveTasks((prev:any) => ({...prev, ...obj}))
    }

    const stopTask = async(task:Task) => {
        const obj:any = {}
        obj[task.name] = task
        obj[task.name].active = false
        setActiveTasks((prev:any) => ({...prev, ...obj}))
    }

    const value = {
        activeTasks,
        startTask,
        stopTask
    }

    return (
        <TaskContext.Provider value={value}>
            {children}
        </TaskContext.Provider>
    )
}