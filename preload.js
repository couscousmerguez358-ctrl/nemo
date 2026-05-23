const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('nemoAPI', {
  runCommand: (cmd) => ipcRenderer.invoke('run-command', cmd)
});
