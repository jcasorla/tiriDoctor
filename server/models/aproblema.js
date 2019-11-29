const mongoose = require('mongoose');

const problemaSchema = new mongoose.Schema({
    nombre: { 
        type: String,
        required: true,
        minlength: [4, 'At least 4 characters long']

    },
    activo: { 
        type: String,
        required: true
    },
    
  
}, { timestamps: true });
mongoose.model('Problema', problemaSchema);