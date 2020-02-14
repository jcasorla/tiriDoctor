const mongoose = require('mongoose');

const patologicoSchema = new mongoose.Schema({
    
    cardiovascular: { 
        type: Boolean,
        required: false

    },
    pulmonar: { 
        type: Boolean,
        required: false

    },
    renal: { 
        type: Boolean,
        required: false

    },
    digestivo: { 
        type: Boolean,
        required: false

    },
    diabetes: { 
        type: Boolean,
        required: false

    },
    quirurgico: { 
        type: Boolean,
        required: false

    },
    alergico: { 
        type: Boolean,
        required: false

    },
    transfusion: { 
        type: Boolean,
        required: false

    },    
    medications: { 
        type: String,
        required: false

    },
    comment: { 
        type: String,
        required: false

    },    
}, {timestamps: true });
mongoose.model('Patologico', patologicoSchema);