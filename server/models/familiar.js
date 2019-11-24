const mongoose = require('mongoose');

const familiarSchema = new mongoose.Schema({
    
    padreVivo: { 
        type: Boolean,
        required: true

    },
    commentPadre: { 
        type: String,
        required: true

    },
    madreViva: { 
        type: Boolean,
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
        type: Boolean,
        required: false

    },
    commentHermanos: { 
        type: String,
        required: false

    },
        
}, {timestamps: true });
mongoose.model('Familiar', familiarSchema);