import { Task } from "@lib/types"
import { createContext, useContext, useState } from "react"
import React from "react"
import { toast } from "react-toastify"
import { nike_add_cart, nike_two_factor_generate } from "@lib/utils/nike_buy"
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

    const isActiveHandler = (task:Task) => {
        const isActive = tasks[task.name]?.active
        if(!isActive) setRunning(task, false)
        return isActive
    }

    const setActive = (task:Task, active:Boolean) => {
        const obj:any = {}
        obj[task.name] = tasks[task.name]
        obj[task.name].active = active
        setTasks((prev:any) => ({...prev, ...obj}))
    }

    const setRunning = (task:Task, running:Boolean) => {
        const obj:any = {}
        obj[task.name] = tasks[task.name]
        obj[task.name].running = running
        setTasks((prev:any) => ({...prev, ...obj}))
    }
    
    const setProgress = (task:Task, progress:Number) => {
        const obj:any = {}
        obj[task.name] = tasks[task.name]
        obj[task.name].progress = progress
        setTasks((prev:any) => ({...prev, ...obj}))
    }

    const getProgress = (task:Task) => {
        return tasks[task.name].progress
    }

    const startTask = async(task:Task) => {
        const payload = payloads['nike_buy']
        const progress = getProgress(task)

        setActive(task, true)
        setRunning(task, true)
        setProgress(task, 1)

        await new Promise(r => setTimeout(r, 1000))
        
        if(!isActiveHandler(task)) return

        if(progress <= 4) {
            setProgress(task, 4)
            let dropTime = (task.snkr.release * 1000) - Date.now()
            while(isActiveHandler(task) && dropTime > 0) {
                dropTime --
                console.log(dropTime)
                await new Promise(r => setTimeout(r, 1000))
            }
        }

        if(!isActiveHandler(task)) return

        setProgress(task, 5)
        //const add_cart = await nike_add_cart(payload['add_cart'], task)

        if(!isActiveHandler(task)) return

        if(progress <= 6) {

        }

        //const b = await nike_two_factor_generate(payloads['two_factor_generate'], task)

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
        setActive(task, false)
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