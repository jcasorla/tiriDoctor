const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
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
    username: { 
        type: String,
        required: true,
        minlength: [3, 'At least 3 characters long']

    },     
    email: {
        type: String,
        required: false
    },
    password: {
        type: String,
        required: false
    },
    
        
}, {timestamps: true });

mongoose.model('User', UserSchema);