const mongoose = require('mongoose');

const antecedenteFamiliarSchema = new mongoose.Schema({
    
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
        required: false

    },
    hermanosVivos: { 
        type: Boolean,
        required: false

    },
    commentHermanos: { 
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
mongoose.model('antecedenteFamiliar', antecedenteFamiliarSchema);