const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow
const fs = require('fs')
const ipcMain = require('electron').ipcMain
let mainWindow

let folder1 = '.', folder2 = '.'

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

ipcMain.on('requestFolder1', (event, arg) => {
  folder1 = arg
  fs.readdir(arg, (err, files) => {
    if (!err)
      event.sender.send('requestFolderReply1', files)
  })
})

ipcMain.on('requestFolder2', (event, arg) => {
  folder2 = arg
  fs.readdir(arg, (err, files) => {
    if (!err)
      event.sender.send('requestFolderReply2', files)
  })
})

ipcMain.on('deleteFile1', (event, arg) => {
  fs.unlink(folder1 + '/' + arg, (err) => {
    if (err)
      event.sender.send('deleteFileReply1', err)
    else
      event.sender.send('deleteFileReply1', 'File deleted')
  })
})

ipcMain.on('deleteFile2', (event, arg) => {
  fs.unlink(folder2 + '/' + arg, (err) => {
    if (err)
      event.sender.send('deleteFileReply2', err)
    else
      event.sender.send('deleteFileReply2', 'File deleted')
  })
})

ipcMain.on('copyFiles1', (event, arg) => {
  arg.forEach(file => {
    fs.createReadStream((folder1 + '/' + file)).pipe(fs.createWriteStream((folder2 + '/' + file)))
  })
})

ipcMain.on('copyFiles2', (event, arg) => {
  arg.forEach(file => {
    fs.createReadStream((folder2 + '/' + file)).pipe(fs.createWriteStream((folder1 + '/' + file)))
  })
})

ipcMain.on('renameFile1', (event, arg) => {
  fs.rename(folder1 + '/' + arg.old, folder1 + '/' + arg.new, (err) => {
    if (err)
      event.sender.send('renameFileReply1', err)
    else
      event.sender.send('renameFileReply1', 'File renamed')
  })
})

ipcMain.on('renameFile2', (event, arg) => {
  fs.rename(folder2 + '/' + arg.old, folder2 + '/' + arg.new, (err) => {
    if (err)
      event.sender.send('renameFileReply2', err)
    else
      event.sender.send('renameFileReply2', 'File renamed')
  })
})

