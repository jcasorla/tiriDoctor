const mongoose = require('mongoose');

const problemaSchema = new mongoose.Schema({
    nombre: { 
        type: String,
        required: [true, "Problema es obligatorio"],
        minlength: [3, 'Problema - Por lo menos 3 letras']

    },
    activo: { 
        type: String,
        required: [true, "Activo es obligatorio"],
    },
    
  
}, { timestamps: true });
mongoose.model('Problema', problemaSchema);