const express = require('express');
const quizRoutes = require('./src/routes/quizRoutes');
require('dotenv').config();

const app = express();
const PORT = 4000;

app.use(express.json());

app.use('/api/quiz', quizRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
process.removeAllListeners('warning');
