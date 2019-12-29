const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
    
    filename: { type: String, required: false},
    originalname: { type: String, required: false}    
}, {timestamps: true });
mongoose.model('File', fileSchema);