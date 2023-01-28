module.exports = function IpcMain(ipcMain, mainWindow, appPath) {
  ipcMain.on("closed", () => mainWindow?.close());
  ipcMain.on("minimizable", () => {
    if (mainWindow?.isMaximized()) mainWindow?.unmaximize();
    else mainWindow?.maximize();
  });
  ipcMain.on("minimize", () => mainWindow?.minimize());
  ipcMain.handle("appPath", async () => {
    return appPath;
  });
};
