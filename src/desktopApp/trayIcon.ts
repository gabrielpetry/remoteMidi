import { Menu, Tray } from 'electron'

// prevent garbage collector from erasing the icons
let trayIcon = null

export default function createTrayIcon(mainWindow, app, iconpath) {
  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Show App',
      click: function () {
        mainWindow.show()
      },
    },
    {
      label: 'Quit',
      click: function () {
        app.quit()
      },
    },
  ])

  trayIcon = new Tray(iconpath)
  trayIcon.setToolTip('Remote Midi')
  trayIcon.setContextMenu(contextMenu)

  trayIcon.on('double-click', () => {
    mainWindow.show()
  })

  return trayIcon
}
