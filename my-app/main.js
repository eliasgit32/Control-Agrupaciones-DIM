// const { quitServer } = require('./src/API/connectUser');
const fetch = require('node-fetch');

// Modules to control application life and create native browser window
const { app, BrowserWindow } = require('electron')
const path = require('path')

function createWindow () {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width:1080,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // and load the index.html of the app.
  mainWindow.loadURL('http://localhost:3000/HomePage')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  mainWindow.maximize()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
  
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', async function () {
   await fetch('http://localhost:5000/shutdown', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({}),
  })
  .catch(error => {
    console.error('Error:', error);
  });
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('before-quit', async () => {
   await fetch('http://localhost:5000/shutdown', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({}),
  })
  .catch(error => {
    console.error('Error:', error);
  });
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.