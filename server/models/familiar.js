const mongoose = require('mongoose');

const familiarSchema = new mongoose.Schema({
    
    padreVivo: { 
        type: String,
        required: [true, "Padre Vivo es obligatorio"]

    },
 
    commentPadre: { 
        type: String,
        required: [true, "Enfermedad que Padece Padre es obligatorio"]

    },
    madreViva: { 
        type: String,
        required: [true, "Madre Viva es obligatorio"]

    },

    commentMadre: { 
        type: String,
        required: [true, "Enfermedad que Padece Madre es obligatorio"]

    },
    hermanos: { 
        type: Number,
        required: [true, "Cuantos Hermanos es obligatorio"]

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