import { PDFDocumentProxy } from "pdfjs-dist";

export class PdfModel {
    constructor(private readonly proxy: PDFDocumentProxy) {}

    public getNumberOfPages = () => {
        return this.proxy.numPages;
    };
}
