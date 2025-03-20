const pdfParse = require('pdf-parse');

const extractTextFromPDF = async (pdfBuffer) => {
  try {
    const data = await pdfParse(pdfBuffer);

    if (data.numpages > 0) {
      const text = data.text;

      const cleanedText = text
        .split('\n')
        .filter((line) => line.trim() !== '')
        .join('\n');

      return cleanedText;
    } else {
      throw new Error('The PDF appears to be empty or corrupted');
    }
  } catch (error) {
    console.error('Error processing PDF:', error);
    throw new Error('Error processing PDF');
  }
};

module.exports = {
  extractTextFromPDF,
};
