const mongoose = require('mongoose');

const NoPatologicoSchema = new mongoose.Schema({
    
    alcohol: { 
        type: Boolean,
        required: false

    },
    alcoholContent: { 
        type: String,
        required: false

    },    
    tabacco: { 
        type: Boolean,
        required: false

    },
    
    tabaccoContent: { 
        type: String,
        required: false

    },  
    droga: { 
        type: Boolean,
        required: false

    },

    drugContent: { 
        type: String,
        required: false

    },  
    immuno: { 
        type: Boolean,
        required: false

    },
    immunoContent: { 
        type: String,
        required: false

    },  
    otro: { 
        type: String,
        required: false

    },
    comment: { 
        type: String,
        required: false

    },    
}, {timestamps: true });
mongoose.model('NoPatologico', NoPatologicoSchema);