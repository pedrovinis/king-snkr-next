import fs from 'fs'

export const saveConfigsJSON = (path:string, data:object) => {
    fs.writeFileSync(`${path}.json`, JSON.stringify(data), 'utf8') 
}