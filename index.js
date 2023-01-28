/* PACKAGES */
require("v8-compile-cache");
const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");

/* MODULES */
const IpcMain = require("./modules/ipcMain.js");
const appInitialization = require("./modules/appInitialization.js");

/* MAIN PROCESS */
appInitialization(
  path.join(app.getPath("appData"), "./Hisnmuslim"),
  app.getVersion()
);

const createWindow = async () => {
  var mainWindow = new BrowserWindow({
    width: 980,
    height: 600,
    minWidth: 980,
    minHeight:600,
    center: true,
    show: false,
    frame: false,
    title: "Hisnmuslim - حصن المسلم",
    icon: path.join(__dirname, 'build/icon.png'),
    webPreferences: {
      nodeIntegration: true,
      sandbox: false,
      preload: path.join(__dirname, "preload.js"),
    },
  });


  mainWindow.loadFile(path.join(__dirname, "pages/home.html"));

  //mainWindow.webContents.openDevTools();

  mainWindow.removeMenu();

  mainWindow.once("ready-to-show", () => {
    mainWindow?.show();
  });

  mainWindow.on("minimize", (event) => {
    event?.preventDefault();
    //mainWindow?.hide();
  });

  mainWindow?.on("closed", (event) => {
    event?.preventDefault();
    mainWindow = null;
    app?.quit();
  });

  /* Communicate asynchronously from the main process to renderer processes. */

  IpcMain(ipcMain, mainWindow, path.join(app.getPath("appData"), "./Hisnmuslim"));
};

app.on("ready", async (e) => {
  e.preventDefault();
  app.setAppUserModelId("org.rn0x.hisnmuslim");
  await createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
