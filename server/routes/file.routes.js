const express = require('express');
const router = express.Router();
const fileController = require('./../controllers/file');

module.exports = router.post('/upload', fileController.upload)
    .post('/download', fileController.download)
    .put('/delete/:id/', fileController.delete);