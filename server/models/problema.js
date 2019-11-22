const mongoose = require('mongoose');

const problemaSchema = new mongoose.Schema({
    nombre: { 
        type: String,
        required: true,
        minlength: [4, 'At least 4 characters long']

    },
    activo: { 
        type: Boolean,
        required: true
    },
    
  
}, { timestamps: true });
mongoose.model('problema', problemaSchema);