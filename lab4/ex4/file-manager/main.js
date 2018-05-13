const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow
const path = require('path')
const url = require('url')
const fs = require('fs')
const ipcMain = require('electron').ipcMain
let mainWindow

createWindow = () => {
  mainWindow = new BrowserWindow({width: 800, height: 600})

  mainWindow.loadURL('http://localhost:3000')
  mainWindow.webContents.openDevTools()
  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

ipcMain.on('requestFolder', (event, arg) => {
  fs.readdir(arg, (err, files) => {
    if (err)
      event.sender.send('requestFolderReply', err)

    event.sender.send('requestFolderReply', files)
  })
})

ipcMain.on('deleteFile', (event, arg) => {
  fs.unlink(arg, (err) => {
    if (err)
      event.sender.send('deleteFileReply', err)

    event.sender.send('deleteFileReply', 'File deleted')
  })
})