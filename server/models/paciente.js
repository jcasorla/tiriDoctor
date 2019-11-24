const mongoose = require('mongoose');
const autoIncrementModelID = require('./counterModel');
const actualSchema = mongoose.model('Actual').schema;
const patologicoSchema = mongoose.model('Patologico').schema;
const noPatologicoSchema = mongoose.model('NoPatologico').schema;
const familiarSchema = mongoose.model('Familiar').schema;


const PacienteSchema = new mongoose.Schema({
    id: { type: Number, unique: true, min: 1 },
    firstName: { 
        type: String,
        required: true,
        minlength: [3, 'At least 3 characters long']

    },
    lastName: { 
        type: String,
        required: true,
        minlength: [3, 'At least 3 characters long']

    },
    sLastName: { 
        type: String,
        required: true,
        minlength: [3, 'At least 3 characters long']

    },    
    sex: {
        type: String,
        // required: false
        required: [true, 'Sex field is required']
    }, 
    age: {
        type: Number,
        required: true,
        min: [1, "atleast 1"]
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: false
    },
    address: {
        type: String,
        required: false
    },
    colonia: {
        type: String,
        required: false
    },
    city: {
        type: String,
        required: true,
        minlength: [4, 'At least 4 characters long']
    }, 
    state: {
        type: String,
        required: true
    }, 
    zip: {
        type: String,
        required: false
    }, 
    occupation: {
        type: String,
        required: false
    },
    actual: [actualSchema],
    patologico: [patologicoSchema],
    nopatologico: [noPatologicoSchema],
    familiar: [familiarSchema],
        
}, {timestamps: true });

PacienteSchema.pre('save', function (next) {
    if (!this.isNew) {
      next();
      return;
    }
  
    autoIncrementModelID('pacient', this, next);
  });

mongoose.model('Paciente', PacienteSchema);
