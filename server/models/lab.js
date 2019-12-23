const mongoose = require('mongoose');

const labSchema = new mongoose.Schema({
    
    imagen: { type: String, required: false},
    otro: { type: String, required: false},
    torax: { type: String, required: false},
    abdomen: { type: String, required: false},
    extre: { type: String, required: false},
    neuro: { type: String, required: false},  
}, {timestamps: true });
mongoose.model('Lab', labSchema);