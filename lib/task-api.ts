import { LOCAL_LINK } from "./constants"
import { Task } from "./types"

export const addTaskFetch = async(
    name: string,
    user_name: string,
    snkr_id: string,
    size: string
    ) => {
    const res = await fetch('api/task/add', {
        method:'POST',
        body: btoa(JSON.stringify({
            name: name,
            user_name: user_name,
            snkr_id: snkr_id,
            size: size
        }))
    })
    return res
}

export const deleteTaskFetch = async(task:Task) => {
    const res = await fetch(`${LOCAL_LINK}/api/task/delete`, {
        method:'POST',
        body: btoa(JSON.stringify({
            name: task.name
        }))
    })
    return res
}