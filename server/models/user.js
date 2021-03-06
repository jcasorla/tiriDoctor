const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
    
    firstName: { 
        type: String,
        required: [true, "Debes ingresar el primer nombre"],
        minlength: [3, 'el primer nombre debe tener por lo menos 3 letras']

    },
    lastName: { 
        type: String,
        required: [true, "Debes ingresar el apellido"],
        minlength: [3, 'el apellido debe tener por lo menos 3 letras']

    },
    slastName: { 
        type: String,
        required: [true, "Debes ingresar el Segundo apellido"],
        minlength: [3, 'el Segundo apellido debe tener por lo menos 3 letras']

    },
    username: { 
        type: String,
        required: [true, "username cannot be blank"],
        minlength: [5, 'username - por lo menos 5 letras']

    },     
    email: {
        type: String,
        required: [true, "debes ingresar el correo electronico"]
    },
    password: {
        type: String,
        required: [true, "debes ingresar la contraseña"],
    },
    
        
}, {timestamps: true });

mongoose.model('User', UserSchema);