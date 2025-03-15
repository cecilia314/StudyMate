const fs = require('fs');
const PDFParser = require('pdf2json');

async function extractTextWithPdf2Json(filePath) {
  return new Promise((resolve, reject) => {
    let pdfParser = new PDFParser();

    pdfParser.on('pdfParser_dataReady', (pdfData) => {
      const text = pdfData.formImage.Pages.map((page) =>
        page.Texts.map((t) => decodeURIComponent(t.R[0].T)).join(' ')
      ).join('\n');
      resolve(text);
    });

    pdfParser.on('pdfParser_dataError', (errData) => {
      reject(errData.parserError);
    });

    pdfParser.loadPDF(filePath);
  });
}

module.exports = { extractTextWithPdf2Json };
