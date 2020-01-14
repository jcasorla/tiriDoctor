const mongoose = require('mongoose');

const ginecoSchema = new mongoose.Schema({
    
    menarquia: { 
        type: String,
        required: [true, "Menarquia es obligatorio"]

    },
    ritmo: { 
        type: String,
        required: [true, "Ritmo es obligatorio"]

    },
    fum: { 
        type: Date,
        required: [true, "F.U.M es obligatorio"]

    },
    g: { 
        type: String,
        required: [true, "G es obligatorio"]

    },
    p: { 
        type: String,
        required: [true, "P es obligatorio"]

    },
    c: { 
        type: String,
        required: [true, "C es obligatorio"]

    },
    ivsa: { 
        type: String,
        required: true

    },
    comment: { 
        type: String,
        required: false

    },
    anticonceptivo: { 
        type: String,
        required: false

    },
    cuales: { 
        type: String,
        required: false

    },    
}, {timestamps: true });
mongoose.model('Gineco', ginecoSchema);