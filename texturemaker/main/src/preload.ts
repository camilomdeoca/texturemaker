import { contextBridge, ipcRenderer } from "electron";

ipcRenderer.on('test-message', () => { console.log("test message arrived"); });

contextBridge.exposeInMainWorld('electron', {
  testFunction: () => {
    console.log("TEST");
  },
});

console.log("PRELOAD");
