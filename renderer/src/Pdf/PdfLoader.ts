import pdfjs from "pdfjs-dist";
import { PDFDocument } from "pdf-lib";
import { PdfModel, PdflibPdfModel, PdfjsPdfModel } from "./PdfModel";

const pdfjsworker = require("pdfjs-dist/build/pdf.worker.entry");
pdfjs.GlobalWorkerOptions.workerSrc = pdfjsworker;

export const PdfLoader = {
    tryOpenFromPathAsync: async (filePath: string): Promise<PdfModel | null> => {
        try {
            const loadingTask = pdfjs.getDocument(filePath);
            const proxy = await loadingTask.promise;
            return new PdfjsPdfModel(proxy);
        } catch (ex) {
            return null;
        }
    },

    tryOpenFromBufferAsync: async (data: Buffer): Promise<PdfModel | null> => {
        try {
            const document = await PDFDocument.load(data);
            return new PdflibPdfModel(document);
        } catch (ex) {
            console.log(ex);
            return null;
        }
    }
};
