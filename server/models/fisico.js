const mongoose = require('mongoose');

const fisicoSchema = new mongoose.Schema({
    signosVitales: { 
        type: String,
        required: true      

    },
    ta: {
        type: String,
        required: true 
    },
    fc: {
        type: String,
        required: true
    },
    frecResp: {
        type: String,
        required: true
    },
    temp: {
        type: String,
        required: true
    },
    peso: {
        type: String,
        required: true
    },
    talla: {
        type: String,
        required: true
    },
    imc: {
        type: String,
        required: true
    },
    cabeza: {
        type: String,
        required: true
    },
    
  
}, { timestamps: true });
mongoose.model('fisico', fisicoSchema);