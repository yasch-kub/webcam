const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        resizible: false
    });

    mainWindow.loadURL(`http://localhost:3333`);
    mainWindow.on('closed', () => {
        mainWindow = null
    })
}

app.on('ready', createWindow);