const pdfParse = require('pdf-parse');

const extractTextFromPDF = async (pdfBuffer) => {
  try {
    const data = await pdfParse(pdfBuffer);
    const text = data.text;

    const cleanedText = text
      .split('\n')
      .filter((line) => line.trim() !== '')
      .join('\n');

    return cleanedText;
  } catch (error) {
    console.error('Error al procesar el PDF:', error);
    throw new Error('Error al procesar el PDF');
  }
};

module.exports = {
  extractTextFromPDF,
};
