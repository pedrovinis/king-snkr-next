import { Task } from "@lib/types"
import { createContext, useContext, useEffect, useState } from "react"
import React from "react"
import { toast } from "react-toastify"
import { payLoadsFecth } from "@lib/kingsnkr-api"
import { nike_add_cart } from "@lib/utils/nike_buy"
import { PayLoadsContext } from "./payloads-context"

type Props = {
    tasks: any
    setTasks: Function
    startTask: Function
    stopTask: Function
}

export const TaskContext = createContext<Props>({
    tasks: {},
    setTasks: () => {},
    startTask: () => {},
    stopTask: () => {},
})

export const TaskProvider = ({ children }:any) => {
    const [tasks, setTasks]:any = useState({})
    const { payloads } = useContext(PayLoadsContext)

    const isActive = (task:Task) => {
        return tasks[task.name]?.active
    }   
    
    const startTask = async(task:Task) => {
        const obj:any = {}
        const payload = payloads['nike_buy']
        obj[task.name] = tasks[task.name]
        obj[task.name].progress = 1
        obj[task.name].active = true
        
        const progress = obj[task.name].progress
        setTasks((prev:any) => ({...prev, ...obj}))
        
        if(!isActive(task)) return


        while(isActive(task)) {
            console.log(`${task.name} running.`)
            await new Promise(r => setTimeout(r, 1000))
        }

        //const a = await nike_add_cart(payload['add_cart'], task)

        // if(!isActive(task)) return
        // obj[task.name].progress = 2
        // setTasks((prev:any) => ({...prev, ...obj}))
        // await new Promise(r => setTimeout(r, 2000))
        // if(!isActive(task)) return
        // toast.success(`"${task.name}" completed.`)
        // await new Promise(r => setTimeout(r, 2000))
        // obj[task.name].active = false
        // setTasks((prev:any) => ({...prev, ...obj}))
    }

    const stopTask = async(task:Task) => {
        const obj = tasks[task.name]
        obj.active = false
        setTasks((prev:any) => ({...prev, ...obj}))
    }

    const value = {
        tasks,
        startTask,
        stopTask,
        setTasks
    }

    return (
        <TaskContext.Provider value={value}>
            
            {children}
        </TaskContext.Provider>
    )
}