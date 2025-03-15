const express = require('express');
const multer = require('multer');
const { quizController } = require('../controllers/quizController.js');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/create', upload.single('file'), quizController);

module.exports = router;
