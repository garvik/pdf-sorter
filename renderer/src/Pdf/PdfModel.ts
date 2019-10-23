import { PDFDocumentProxy } from "pdfjs-dist";
import { PDFDocument } from "pdf-lib";

export interface PdfModel {
    getNumberOfPages(): number;
}

export class PdfjsPdfModel implements PdfModel {
    constructor(private readonly document: PDFDocumentProxy) {}

    public getNumberOfPages = () => {
        return this.document.numPages;
    };
}

export class PdflibPdfModel implements PdfModel {
    constructor(private readonly document: PDFDocument) {}

    public getNumberOfPages = () => {
        return this.document.getPageCount();
    };
}
