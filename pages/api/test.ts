import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
export default async (req : NextApiRequest, res: NextApiResponse) => {
    const data = await fetch('https://www.nike.com.br/', {
        method: 'POST',
        headers: {
            'cookie': 'myfakecookie123'
        },
        body: JSON.stringify({
            user: 'hackedUSER',
            password: 'hacked123'
        })
    })
    const info = await data.text()

    res.status(200).json({
        info
    })
}

const isActive = () => {
    try {
        const file = JSON.parse(fs.readFileSync("bin/test.json", "utf8"))
        file.active = !file.active  
        fs.writeFileSync('bin/test.json', JSON.stringify(file))
        return file.active
    }
    catch {
        return false
    }
}