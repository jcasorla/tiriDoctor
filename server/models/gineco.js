const mongoose = require('mongoose');

const ginecoSchema = new mongoose.Schema({
    
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
    c: { 
        type: String,
        required: true

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