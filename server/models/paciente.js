const mongoose = require('mongoose');
const autoIncrementModelID = require('./counterModel');
const actualSchema = mongoose.model('Actual').schema;
const patologicoSchema = mongoose.model('Patologico').schema;
const noPatologicoSchema = mongoose.model('NoPatologico').schema;
const familiarSchema = mongoose.model('Familiar').schema;
const ginecoSchema = mongoose.model('Gineco').schema;
const fisicoSchema = mongoose.model('Fisico').schema;
const problemaSchema = mongoose.model('Problema').schema;
const gridSchema = mongoose.model('Grid').schema;
const labSchema = mongoose.model('Lab').schema;
const fileSchema = mongoose.model('File').schema;


const PacienteSchema = new mongoose.Schema({
    id: { type: Number, unique: true, min: 1 },
    firstName: { 
        type: String,
        required: [true, "Primer Nombre es obligatorio"],
        minlength: [3, 'Primer Nombre -Por lo menos 3 letras']

    },
    lastName: { 
        type: String,
        required: [true, "Apellido es obligatorio"],
        minlength: [3, 'Apellido - Por lo menos 3 letras']

    },
    sLastName: { 
        type: String,
        required: [true, "Segundo Apellido es obligatorio"],
        minlength: [3, 'Segundo Apellido - Por lo menos 3 letras']

    },    
    sex: {
        type: String,
        required: [true, "Sexo es obligatorio"]
    }, 
    age: {
        type: Number,
        required: [true, "Edad es obligatorio"],
        min: [1, " Edad - Por lo Menos 1"]
    },
    phone: {
        type: String,
        required: [true, "Telefono es obligatorio"],
        minlength: [7, 'Telefono - Por lo menos 7 digitos']
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
        required: [true, "Ciudad es obligatorio"],
        minlength: [4, 'Ciudad - Por lo menos 4 letras']
    }, 
    state: {
        type: String,
        required: [true, "Estado es obligatorio"],
    }, 
    zip: {
        type: String,
        required: false
    }, 
    occupation: {
        type: String,
        required: false
    },
    password: {
        type: String,
        required: false
    },
    creator: {
        type: String,
        required: false
    },
    actual: [actualSchema],
    patologico: [patologicoSchema],
    nopatologico: [noPatologicoSchema],
    familiar: [familiarSchema],
    gineco: [ginecoSchema],
    fisico: [fisicoSchema],
    problema: [problemaSchema],
    grid: [gridSchema],
    lab: [labSchema],
    file: [fileSchema]
        
}, {timestamps: true });

PacienteSchema.pre('save', function (next) {
    if (!this.isNew) {
      next();
      return;
    }
  
    autoIncrementModelID('pacient', this, next);
  });

mongoose.model('Paciente', PacienteSchema);
