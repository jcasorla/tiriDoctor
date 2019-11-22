const mongoose = require('mongoose');

const actualSchema = new mongoose.Schema({
    consulta: {
        type: String,
        required: true,
        minlength: [10, "At least 10 characters long"]
    },
    enfermedad: { 
        type: String,
        required: true,
        minlength: [4, 'At least 4 characters long']

    },    
    
  
}, { timestamps: true });
mongoose.model('Actual', actualSchema);