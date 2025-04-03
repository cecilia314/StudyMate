const pdfParse = require('pdf-parse');

const extractText = async (pdfBuffer) => {
  try {
    const data = await pdfParse(pdfBuffer);
    if (data.numpages > 0) {
      const cleanedText = data.text
        .split('\n')
        .filter((line) => line.trim() !== '')
        .join('\n');

      return cleanedText;
    } else {
      throw new Error('PDF file is empty or damaged');
    }
  } catch (error) {
    console.error('Error processing PDF:', error);
    throw new Error('Error processing PDF');
  }
};

module.exports = {
  extractText,
};
