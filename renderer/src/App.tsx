import React, { Component } from "react";
import { IpcRenderer, IpcRendererEvent } from "electron";
import PdfFilePickerButton from "./PdfFilePickerButton/FilePickerButton";
import { PdfModel } from "./Pdf/PdfModel";
const electron = window.require("electron"); // require electron like this in all the files. Don't Use import from 'electron' syntax for importing IpcRender from electron.
const ipcRenderer = electron.ipcRenderer as IpcRenderer;

ipcRenderer.on("response", (_event: IpcRendererEvent, args: any[]) => {
    console.log(args);
});

export default class App extends Component {
    public render() {
        return (
            <div className="App">
                <PdfFilePickerButton name="Pick a file" onFileSelected={this.onFileSelected}></PdfFilePickerButton>
            </div>
        );
    }

    private onFileSelected = async (file: PdfModel) => {
        console.log(file.getNumberOfPages());
    };
}
