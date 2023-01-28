/* PACKAGES */
const { ipcRenderer } = require("electron");
const fs = require("fs-extra");
const path = require("path");

/* PAGES PRELOADS SCRIPTS */
const home = require("./preload/home.js");
const list = require("./preload/list.js");
const info = require("./preload/info.js");


/* MODULES */
const version = require("./modules/version.js");

/* DOM LOAD EVENT */
window.addEventListener("DOMContentLoaded", async (event) => {
  event.preventDefault();

  document.documentElement.style.setProperty('--animate-duration', '2.0s');
  const appPath = await ipcRenderer.invoke("appPath");

  /* Window Controls */
  document.getElementById("closed").addEventListener("click", (e) => ipcRenderer.send("closed"));
  document.getElementById("minimizable").addEventListener("click", (e) => ipcRenderer.send("minimizable"));
  document.getElementById("minimize").addEventListener("click", (e) => ipcRenderer.send("minimize"));
  
  /* MODULES LOAD */
  await version(appPath, fs, path);

  /* PAGES LOAD (SWITCH) */
  const pageFile = window.location.href.substr(window.location.href.lastIndexOf("/") + 1);

  switch (pageFile) {
    case "home.html":
      await home(appPath, fs, path);
      break;

    case "list.html":
      await list(appPath, fs, path);
      break;

    case "info.html":
      await info(appPath, fs, path);
      break;

    default:
      window.location.href = "./home.html";
      break;
  }

});