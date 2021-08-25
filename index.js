const { BrowserWindow, app } = require("electron")
const { exec }= require('child_process')
exec('npm start')

const createWindow = () => {
    const mainWindow = new BrowserWindow()
    mainWindow.setMenu(null)

    void mainWindow.loadURL('http://localhost:3000/')
}

app.on('ready', createWindow)
