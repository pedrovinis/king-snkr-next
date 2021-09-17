import { Task } from "@lib/types"
import { createContext, useContext, useEffect, useState } from "react"
import React from "react"
import { toast } from "react-toastify"
import { payLoadsFecth } from "@lib/kingsnkr-api"
import { nike_add_cart } from "@lib/utils/nike_buy"
import { PayLoadsContext } from "./payloads-context"

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
    const { payloads } = useContext(PayLoadsContext)
    console.log(payloads)

    useEffect(() => {
        (async () => {

        })()
    }, [])

    const isActive = (task:Task) => {
        return tasks[task.name]?.active || false
    }   
    
    const startTask = async(task:Task) => {
        const payload = payloads['nike_buy']
        const obj:any = {}
        obj[task.name] = tasks[task.name] || task
        obj[task.name].progress = 1
        obj[task.name].active = true
        setTasks((prev:any) => ({...prev, ...obj}))
        const a = await nike_add_cart(payload['add_cart'], task)
        
        await new Promise(r => setTimeout(r, 2000))
        if(!isActive(task)) return
        obj[task.name].progress = 2
        setTasks((prev:any) => ({...prev, ...obj}))
        await new Promise(r => setTimeout(r, 2000))
        if(!isActive(task)) return
        obj[task.name].progress = 3
        setTasks((prev:any) => ({...prev, ...obj}))
        await new Promise(r => setTimeout(r, 2000))
        if(!isActive(task)) return
        obj[task.name].progress = 4
        setTasks((prev:any) => ({...prev, ...obj}))
        await new Promise(r => setTimeout(r, 2000))
        obj[task.name].progress = 5
        setTasks((prev:any) => ({...prev, ...obj}))
        await new Promise(r => setTimeout(r, 2000))
        obj[task.name].progress = 6
        setTasks((prev:any) => ({...prev, ...obj}))
        await new Promise(r => setTimeout(r, 2000))
        if(!isActive(task)) return
        obj[task.name].progress = 7
        setTasks((prev:any) => ({...prev, ...obj}))
        if(!isActive(task)) return
        obj[task.name].progress = 8
        setTasks((prev:any) => ({...prev, ...obj}))
        toast.success(`"${task.name}" completed.`)
        await new Promise(r => setTimeout(r, 2000))
        obj[task.name].active = false
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