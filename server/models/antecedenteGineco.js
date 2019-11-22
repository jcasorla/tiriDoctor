const mongoose = require('mongoose');

const antecedenteGinecoSchema = new mongoose.Schema({
    
    menarquia: { 
        type: String,
        required: true

    },
    ritmo: { 
        type: String,
        required: true

    },
    fum: { 
        type: String,
        required: true

    },
    g: { 
        type: String,
        required: true

    },
    p: { 
        type: String,
        required: true

    },
    a: { 
        type: String,
        required: true

    },
    c: { 
        type: String,
        required: true

    },
    anticonceptivo: { 
        type: Boolean,
        required: true

    },
    cuales: { 
        type: String,
        required: true

    },    
}, {timestamps: true });
mongoose.model('antecedenteGineco', antecedenteGinecoSchema);