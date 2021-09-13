import { Task } from "@lib/types"
import { createContext, useCallback, useEffect, useState } from "react"
import React from "react"
import { isActive } from "@lib/isActive"

type Props = {
    startTask: Function
    stopTask: Function
    isActive: any
}

export const TaskContext = createContext<Props>({
    startTask: () => {},
    stopTask: () => {},
    isActive: false
})

const activeTasks:any = {}

export const TaskProvider = ({ children }:any) => {
    useEffect(() => {
        (async () => {
            
        })()
    }, [])

    const isActive = (task:Task) => {
        return activeTasks[task.name]?.active
    }   

    const startTask = async(task:Task) => {
        activeTasks[task.name] = task
        activeTasks[task.name].active = true

    }

    const stopTask = async(task:Task) => {
        activeTasks[task.name] = null
    }

    const value = {
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