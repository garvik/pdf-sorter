import { BrowserWindow, app, ipcMain, IpcMainEvent } from "electron";
import * as isDev from "electron-is-dev";
import * as path from "path";
import installExtension, { REACT_DEVELOPER_TOOLS } from "electron-devtools-installer";

let mainWindow: BrowserWindow;

async function createWindow() {
    mainWindow = new BrowserWindow({
        width: 900,
        height: 680,
        webPreferences: {
            nodeIntegration: true,
            webSecurity: false // required to allow access to local filesystem. May be changed in the future
        }
    });

    if (isDev === true) {
        try {
            const extensionInstallResult = await installExtension(REACT_DEVELOPER_TOOLS);
            console.log(`Added extension: ${extensionInstallResult}`);
        } catch (ex) {
            console.log(`An error occurred when adding extension: ${ex}`);
        }

        mainWindow.webContents.openDevTools();
    }

    mainWindow.loadURL(isDev ? "http://localhost:3000" : `file://${path.join(__dirname, "../build/index.html")}`);

    mainWindow.on("closed", () => mainWindow.destroy());

    ipcMain.on("channel", (_event: IpcMainEvent, msg: any[]) => {
        console.log(msg);
        mainWindow.webContents.send("response", { title: "mymessage", data: 1 });
    });
}

app.on("ready", createWindow);
app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});
app.on("activate", async () => {
    if (mainWindow === null) {
        await createWindow();
    }
});
