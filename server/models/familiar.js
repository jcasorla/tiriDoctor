const mongoose = require('mongoose');

const familiarSchema = new mongoose.Schema({
    
    padreVivoSi: { 
        type: Boolean,
        required: false

    },
    padreVivoNo: { 
        type: Boolean,
        required: false

    },
    commentPadre: { 
        type: String,
        required: true

    },
    madreVivaSi: { 
        type: Boolean,
        required: false

    },
    madreVivaNo: { 
        type: Boolean,
        required: false

    },
    commentMadre: { 
        type: String,
        required: true

    },
    hermanos: { 
        type: Number,
        required: true

    },
    hermanosVivosSi: { 
        type: Boolean,
        required: false

    },
    hermanosVivosNo: { 
        type: Boolean,
        required: false

    },
    commentHermanos: { 
        type: String,
        required: false

    },
        
}, {timestamps: true });
mongoose.model('Familiar', familiarSchema);