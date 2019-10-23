import pdfjs from "pdfjs-dist";
import { PdfModel } from "./PdfModel";

const pdfjsworker = require("pdfjs-dist/build/pdf.worker.entry");
pdfjs.GlobalWorkerOptions.workerSrc = pdfjsworker;

export const PdfLoader = {
    tryOpenFromPathToPdfAsync: async (filePath: string): Promise<PdfModel | null> => {
        try {
            const loadingTask = pdfjs.getDocument(filePath);
            const proxy = await loadingTask.promise;
            return new PdfModel(proxy);
        } catch (ex) {
            return null;
        }
    }
};
