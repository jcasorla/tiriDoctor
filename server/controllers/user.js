const mongoose = require('mongoose');
const User = mongoose.model('User');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../../config.json');



module.exports = {

    getOneById: (req, res) => {
        User.findById({ _id : req.params.id })
            .then((data) => {
                res.json({user: data})
            })
            .catch(err => res.json(err));
    },
    update: (req, res) => {
        User.findByIdAndUpdate(req.params.id , req.body, {runValidators: true, new: true} )
            .then((data) => {
                res.json({updatedUser: data});
            })
            .catch(err => {
                const errors = Object.keys(err.errors).map(key => err.errors[key].message) 
                res.status(422).json(errors )});
    },

}