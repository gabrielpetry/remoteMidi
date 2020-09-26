import { app, BrowserWindow, Menu, Tray, ipcMain } from 'electron'
import path from 'path'
import createTrayIcon from './trayIcon'
import { getDatabase } from '../rxDb/startDatabase'
import { startExpressServer } from './apiMonitor'
import { startObservers } from '../MidiHandler/startObservers'
import { startSerialMonitor } from './serialMonitor'

let __static = path.join(__dirname, '/assets')
let rxDb = null

// if (process.env.NODE_ENV !== 'development') {
//   __static = path.join(__dirname, '/src/backend/assets')
// }

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    height: 800,
    width: 1100,
    x: 0,
    y: 200,
    show: false,
    // alwaysOnTop: true,
    closable: false,
    webPreferences: {
      nodeIntegration: true,
      worldSafeExecuteJavaScript: true,
      enableRemoteModule: true,
    },
  })
  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, './screens/index.html'))
  console.log(path.join(__dirname, './screens/index.html'))
  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  return mainWindow
}

// export default function main() {
app.on('ready', async () => {
  rxDb = await getDatabase()
  const mainWindow = createWindow()
  startExpressServer()
  startSerialMonitor(rxDb)
  startObservers(rxDb)
  mainWindow.show()
  const iconpath = path.join(__static, 'electron.ico') // path of y
  const trayIcon = createTrayIcon(mainWindow, app, iconpath)

  mainWindow.on('minimize', function (event) {
    event.preventDefault()
    mainWindow.hide()
  })

  mainWindow.on('close', function (event) {
    event.preventDefault()
    mainWindow.hide()
  })

  // ensure a hook to erase the tray
  app.on('before-quit', function (evt) {
    trayIcon.destroy()
  })
})
// }
