const mongoose = require('mongoose');

const gridSchema = new mongoose.Schema({
    
    cella1: { type: String, required: false},
    cella2: { type: String, required: false},
    cella3: { type: String, required: false},
    cella4: { type: String, required: false},
    cella5: { type: String, required: false},
    cella6: { type: String, required: false},
    cella7: { type: String, required: false},
    cellb1: { type: String, required: false},
    cellb2: { type: String, required: false},
    cellb3: { type: String, required: false},
    cellb4: { type: String, required: false},
    cellb5: { type: String, required: false},
    cellb6: { type: String, required: false},
    cellb7: { type: String, required: false},
    cellc1: { type: String, required: false},
    cellc2: { type: String, required: false},
    cellc3: { type: String, required: false},
    cellc4: { type: String, required: false},
    cellc5: { type: String, required: false},
    cellc6: { type: String, required: false},
    cellc7: { type: String, required: false},
    celld1: { type: String, required: false},
    celld2: { type: String, required: false},
    celld3: { type: String, required: false},
    celld4: { type: String, required: false},
    celld5: { type: String, required: false},
    celld6: { type: String, required: false},
    celld7: { type: String, required: false},
    celle1: { type: String, required: false},
    celle2: { type: String, required: false},
    celle3: { type: String, required: false},
    celle4: { type: String, required: false},
    celle5: { type: String, required: false},
    celle6: { type: String, required: false},
    celle7: { type: String, required: false},
    cellf1: { type: String, required: false},
    cellf2: { type: String, required: false},
    cellf3: { type: String, required: false},
    cellf4: { type: String, required: false},
    cellf5: { type: String, required: false},
    cellf6: { type: String, required: false},
    cellf7: { type: String, required: false},
    cellg1: { type: String, required: false},
    cellg2: { type: String, required: false},
    cellg3: { type: String, required: false},
    cellg4: { type: String, required: false},
    cellg5: { type: String, required: false},
    cellg6: { type: String, required: false},
    cellg7: { type: String, required: false},
    cellh1: { type: String, required: false},
    cellh2: { type: String, required: false},
    cellh3: { type: String, required: false},
    cellh4: { type: String, required: false},
    cellh5: { type: String, required: false},
    cellh6: { type: String, required: false},
    cellh7: { type: String, required: false},
    celli1: { type: String, required: false},
    celli2: { type: String, required: false},
    celli3: { type: String, required: false},
    celli4: { type: String, required: false},
    celli5: { type: String, required: false},
    celli6: { type: String, required: false},
    celli7: { type: String, required: false},
    cellj1: { type: String, required: false},
    cellj2: { type: String, required: false},
    cellj3: { type: String, required: false},
    cellj4: { type: String, required: false},
    cellj5: { type: String, required: false},
    cellj6: { type: String, required: false},
    cellj7: { type: String, required: false},
   
}, {timestamps: true });
mongoose.model('Grid', gridSchema);