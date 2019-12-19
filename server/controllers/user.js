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

    updateConfirm: (req, res) => {
        console.log("in controller updateconfirm");
        console.log(req.body);
        console.log(req.params);

        User.findById({ _id : req.params.id })
            .then((user) => {
                console.log("are you entering?");
                if (bcrypt.compareSync(req.body.password, user.password)) {
                    // Passwords match
                    console.log("Passwords match");
                    req.body.password=user.password;
                    User.findByIdAndUpdate(req.params.id , req.body, {runValidators: true, new: true} )
                    .then((data) => {
                        res.json({updatedUser: data});
                    })
                    .catch(err => {
                        const errors = Object.keys(err.errors).map(key => err.errors[key].message) 
                        res.status(422).json(errors )});
                    

                    // res.redirect("/");
                } else {
                    // Passwords don't match
                    console.log("Passwords don't match");
                    res.json({status: 'failure'});
                }
            })
            .catch(err => res.json(err));

       
    },

}