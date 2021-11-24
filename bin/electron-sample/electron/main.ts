// From: https://www.sitepen.com/blog/getting-started-with-electron-typescript-react-and-webpack
import { app, BrowserWindow } from 'electron';
import * as url from 'url';
import * as path from 'path';

import * as isDev from 'electron-is-dev';
import installExtension, { REACT_DEVELOPER_TOOLS } from "electron-devtools-installer";
function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });
  if (isDev) win.loadURL('http://localhost:3000/index.html');
  else {
    win.loadURL(url.format({
      pathname: path.join(__dirname, '../index.html'),
      protocol: 'file:',
      slashes: true,
    }));
  };
  // Install react dev tools
  installExtension(REACT_DEVELOPER_TOOLS)
    .then((name) => console.log(`Added Extension:  ${name}`))
    .catch((err) => console.log('An error occurred: ', err));

  if (isDev) win.webContents.openDevTools();

}

app.on('ready', createWindow);
