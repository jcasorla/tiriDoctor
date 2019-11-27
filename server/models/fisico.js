const mongoose = require('mongoose');

const fisicoSchema = new mongoose.Schema({
  
    taDerecho: {
        type: String,
        required: true 
    },
    taIzquierdo: {
        type: String,
        required: true 
    },
    freqC: {
        type: String,
        required: true
    },
    freqR: {
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
mongoose.model('Fisico', fisicoSchema);