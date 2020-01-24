const mongoose = require('mongoose');

const fisicoSchema = new mongoose.Schema({
  
    taDerecho: {
        type: String,
        required: [true, "TA derecho es obligatorio"]
    },
    taIzquierdo: {
        type: String,
        required: [true, "TA izquierdo es obligatorio"]
    },
    freqC: {
        type: String,
        required: [true, "F.C. es obligatorio"]
    },
    freqR: {
        type: String,
        required: [true, "Freq, Resp. es obligatorio"]
    },
    temp: {
        type: String,
        required: [true, "Temp. es obligatorio"]
    },
    peso: {
        type: String,
        required: [true, "Peso es obligatorio"]
    },
    talla: {
        type: String,
        required: [true, "Talla es obligatorio"]
    },
    imc: {
        type: Number,
        required: [true, "IMC es obligatorio"]
    },
    cabeza: {
        type: String,
        required: [true, "Cabeza Y Cuello es obligatorio"]
    },
       
  
}, { timestamps: true });
mongoose.model('Fisico', fisicoSchema);