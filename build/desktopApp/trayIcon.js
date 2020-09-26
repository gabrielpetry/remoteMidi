"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
// prevent garbage collector from erasing the icons
var trayIcon = null;
function createTrayIcon(mainWindow, app, iconpath) {
    var contextMenu = electron_1.Menu.buildFromTemplate([
        {
            label: 'Show App',
            click: function () {
                mainWindow.show();
            },
        },
        {
            label: 'Quit',
            click: function () {
                app.quit();
            },
        },
    ]);
    trayIcon = new electron_1.Tray(iconpath);
    trayIcon.setToolTip('Remote Midi');
    trayIcon.setContextMenu(contextMenu);
    trayIcon.on('double-click', function () {
        mainWindow.show();
    });
    return trayIcon;
}
exports.default = createTrayIcon;
//# sourceMappingURL=trayIcon.js.map