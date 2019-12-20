const mongoose = require('mongoose');

const familiarSchema = new mongoose.Schema({
    
    padreVivo: { 
        type: String,
        required: true

    },
 
    commentPadre: { 
        type: String,
        required: true

    },
    madreViva: { 
        type: String,
        required: true

    },

    commentMadre: { 
        type: String,
        required: true

    },
    hermanos: { 
        type: Number,
        required: true

    },
    hermanosVivos: { 
        type: String,
        required: false

    },

    commentHermanos: { 
        type: String,
        required: false

    },
        
}, {timestamps: true });
mongoose.model('Familiar', familiarSchema);