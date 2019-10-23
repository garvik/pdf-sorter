import React, { Component } from "react";
import { IpcRenderer, IpcRendererEvent, Remote } from "electron";
import { PDFDocument } from "pdf-lib";
const electron = window.require("electron"); // require electron like this in all the files. Don't Use import from 'electron' syntax for importing IpcRender from electron.

const remote = electron.remote as Remote;
const ipcRenderer = electron.ipcRenderer as IpcRenderer;

ipcRenderer.on("response", (_event: IpcRendererEvent, args: any[]) => {
  console.log(args);
});

export default class App extends Component {
  public render() {
    return (
      <div className="App">
        <button onClick={this.onButtonClick}>Click me</button>
      </div>
    );
  }

  private onButtonClick = async () => {
    const pickedFile = await remote.dialog.showOpenDialog(
      remote.getCurrentWindow(),
      {
        defaultPath: "C:\\"
      }
    );

    if (!pickedFile || !pickedFile.filePaths) {
      return;
    }

    const pdf = await PDFDocument.load(pickedFile.filePaths[0]);
    console.log(pdf.isEncrypted);
  };
}
