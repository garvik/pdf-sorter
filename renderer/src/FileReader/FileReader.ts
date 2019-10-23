import { Remote } from "electron";

const electron = window.require("electron");
const remote = electron.remote as Remote;
const electronFs = remote.require("fs");

export const FileReader = {
    readFileAsync(filePath: string): Promise<Buffer> {
        return new Promise((resolve, reject) => {
            electronFs.readFile(filePath, null, (err: NodeJS.ErrnoException | null, data: Buffer) => {
                if (err !== null) {
                    reject(err);
                }

                resolve(data);
            });
        });
    }
};
