import { app, BrowserWindow } from 'electron';
import path from 'node:path';
import started from 'electron-squirrel-startup';
import {createServer} from "vite";

if (started) app.quit();

async function start() {
  const win = new BrowserWindow({
    // frame: false,
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      spellcheck: false
    },
    resizable: false,
    fullscreenable: false,
    roundedCorners: false
  });
  win.setTitle("JHead - Starting")
  
  const vite = await (await createServer({
    root: path.resolve('./src'),
    server: {
      port: 3000
    }
  })).listen(3000);
  await win.loadURL(`http://localhost:3000`);
}

app.whenReady().then(async () => {
  start();
  
  // mac stuff
  app.on('activate', async () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      start();
    }
  });
});

// mac stuff
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});