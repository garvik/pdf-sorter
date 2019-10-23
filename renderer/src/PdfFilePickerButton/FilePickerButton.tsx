import { Remote, OpenDialogReturnValue } from "electron";
import React from "react";
import { PdfModel } from "../Pdf/PdfModel";
import { PdfLoader } from "../Pdf/PdfLoader";
import { FileReader } from "../FileReader/FileReader";
import * as os from "os";
const electron = window.require("electron");
const remote = electron.remote as Remote;

interface PdfFilePickerButtonProps {
    name: string;
    onFileSelected: (document: PdfModel) => Promise<void>;
}

interface PdfFilePickerButtonState {}

export default class PdfFilePickerButton extends React.Component<PdfFilePickerButtonProps, PdfFilePickerButtonState> {
    public render() {
        return <button onClick={this.onButtonClick}>{this.props.name}</button>;
    }

    private onButtonClick = async () => {
        const pickerResult = await remote.dialog.showOpenDialog(remote.getCurrentWindow(), {
            defaultPath: os.homedir(),
            properties: ["openFile"],
            filters: [{ extensions: ["pdf"], name: "PDF Files" }]
        });

        if (!this.anyFilePicked(pickerResult)) {
            return;
        }

        const fileBuffer = await FileReader.readFileAsync(pickerResult.filePaths[0]);
        const pdf = await PdfLoader.tryOpenFromBufferAsync(fileBuffer);
        if (pdf !== null) {
            this.props.onFileSelected(pdf);
        }
    };

    private anyFilePicked = (dialogReturnValue: OpenDialogReturnValue) => {
        return dialogReturnValue.canceled === false && dialogReturnValue.filePaths.length >= 0;
    };
}
