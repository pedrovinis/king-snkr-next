import { Task } from "@lib/types"
import { createContext, useContext, useState } from "react"
import React from "react"
import { toast } from "react-toastify"
import { nike_add_cart, nike_two_factor_generate, nike_two_factor_validate } from "@lib/utils/nike_buy"
import { PayLoadsContext } from "./payloads-context"
import { isActive } from "@lib/isActive"

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
        const isActive = tasks[task.name]?.active
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
        setActive(task, true)
        setRunning(task, true)

        if(getProgress(task) <= 3) {
            setProgress(task, 3)
            let dropTime = (task.snkr.release * 1000) - Date.now()
            while(isActive(task) && dropTime > 0) {
                dropTime --
                console.log(dropTime)
                await new Promise(r => setTimeout(r, 1000))
            }

            if(!isActive(task)) { setRunning(task, false); return }
            setProgress(task, 4)
        }


        if(getProgress(task) <= 4) {
            const add_cart = await nike_add_cart(payload['add_cart'], task)
            if(add_cart.success) setProgress(task, 8)
            else if(add_cart.twoFactorAuth) setProgress(task, 5)
            else setActive(task, false)
        }

        if(!isActive(task)) { setRunning(task, false); return }

        if(getProgress(task) <= 5) {
            const two_factor_generate = await nike_two_factor_generate(payload['two_factor_generate'], task)
            if(two_factor_generate.valid) setProgress(task, 6); return
        }

        if(!isActive(task)) { setRunning(task, false); return }

        if(getProgress(task) <= 6) {
            const code = tasks[task.name].sms_code
            if(!code) { setRunning(task, false); return }
            const two_factor_validate = await nike_two_factor_validate(payload['two_factor_validate'], task, code)
            if(two_factor_validate.valid) setProgress(task, 7)
        }

        if(!isActive(task)) { setRunning(task, false); return }

        if(getProgress(task) <= 7) {
            const add_cart = await nike_add_cart(payload['add_cart'], task)
            if(add_cart.success) setProgress(task, 8)
        }

        if(!isActive(task)) { setRunning(task, false); return }

        if(getProgress(task) <= 8) {
            setProgress(task, 9)
        }

        if(getProgress(task) <= 9) {
            toast.success(`${task.name} completed.`)
            await new Promise(r => setTimeout(r, 2000))
        }

        setActive(task, false)
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