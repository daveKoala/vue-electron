import { contextBridge, ipcRenderer } from 'electron';

const channels = ['nameOfClientChannel', 'readyToRock'];

// Expose ipcRenderer to the client
contextBridge.exposeInMainWorld('ipcRenderer', {
  send: (channel, data) => {
    const validChannels = channels;
    if (validChannels.includes(channel)) {
      ipcRenderer.send(channel, data);
    }
  },
  receive: (channel, func) => {
    const validChannels = channels;
    if (validChannels.includes(channel)) {
      // Deliberately strip event as it includes `sender`
      ipcRenderer.on(channel, (event, ...args) => func(...args));
    }
  },
});

// alert('It Worked!'); // Remove this line once you confirm it worked
