const mongoose = require('mongoose');

const actualSchema = new mongoose.Schema({
    consulta: {
        type: String,
        required: [true, "Motivo de Consulta es obligatorio"],
        minlength: [10, "Motivo de Consulta - Por lo menos 10 letras"]
    },
    enfermedad: { 
        type: String,
        required: [true,"Enfermedad Actual es obligatorio"],
        minlength: [4, 'Enfermedad Actual - Por lo menos 4 letras']

    },    
    
  
}, { timestamps: true });
mongoose.model('Actual', actualSchema);