const mongoose = require('mongoose');

const antecedenteNoPatologicoSchema = new mongoose.Schema({
    
    alcohol: { 
        type: Boolean,
        required: true

    },
    tabacco: { 
        type: Boolean,
        required: true

    },
    droga: { 
        type: Boolean,
        required: true

    },
    immunizacion: { 
        type: String,
        required: true

    },
    otro: { 
        type: String,
        required: true

    },
    comment: { 
        type: String,
        required: true

    },    
}, {timestamps: true });
mongoose.model('antecedenteNoPatologico', antecedenteNoPatologicoSchema);