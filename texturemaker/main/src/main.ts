import { app, BrowserWindow } from 'electron';
import path from 'path';
import fs from 'fs';

const args = process.argv.slice(1);
const serve = args.some(val => val === '--serve');

const createWindow = (): BrowserWindow => {
  const win = new BrowserWindow({
    width: 1280,
    height: 720,
    //type: 'utility', // This works only for Linux, its to make the window floating in a tiling wm
    webPreferences: {
      preload: path.join(app.getAppPath(), 'preload.js'),
      sandbox: false,
    },
  });

  if (serve) {
    win.loadURL('http://localhost:4200');
  } else {
    // Path when running electron executable
    let pathIndex = './index.html';

    if (fs.existsSync(path.join(app.getAppPath(), '../dist/index.html'))) {
      // Path when running electron in local folder
      pathIndex = '../dist/index.html';
    }

    win.loadFile(pathIndex);
  }

  setTimeout(() => { win.webContents.send("test-message", true); }, 3000);

  return win;
};

app.on('ready', () => setTimeout(createWindow, 400));

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
