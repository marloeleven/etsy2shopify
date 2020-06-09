const setupEvents = require('./installer/setupEvents.js');

const { app, BrowserWindow, ipcMain, shell } = require('electron');
const path = require('path');
const url = require('url');

let createWindow = () => {
  let win = new BrowserWindow(
    {
      title: "CSV Converter:: Etsy To Shopify",
      center: true,
      width: 1200,
      height: 870,
      'min-width': 630,
      'min-height': 630,
      frame: true,
      webPreferences: {
        nativeWindowOpen: false,
      },
    })

  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }));
  win.on('closed', () => {
    win = null
  })
}

app.on('ready', createWindow)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
});

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
});