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

        // var result=validateEmail(req.body.email);

        // if(!result){
        //     req.flash("qform", "Correo Electronico no es valido");
        //     console.log("in email check");
        //     res.redirect("/register")     
        // }

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

    updatePwd: (req, res) => {
        console.log("in controller updatePwd");
        console.log(req.body);
        console.log(req.params);

        // else if(req.body.cpwd ==""){
        //     req.flash("qform", "confirm Password canot be blank!");
        //     console.log("in if");
        //     res.redirect("/register")     
    
        // }
        
        // else if(req.body.password!=req.body.cpwd){
        //     req.flash("qform", "Passwords do not match!");
        //     console.log("do not match");
        //     res.redirect("/register")
    
        // }

    

        User.findById({ _id : req.params.id })
            .then((user) => {
                console.log("are you entering?");
                if (bcrypt.compareSync(req.body.current, user.password)) {
                    // Passwords match
                    console.log("Passwords match");

                    async function run() {
                        const saltValue = await bcrypt.genSalt(10);
                        bcrypt
                        .hash(req.body.password, saltValue)
                        .then(hash =>{
                            // console.log("in saltvalue");
                            // console.log(hash);
                            
                            User.findByIdAndUpdate(req.params.id , {email: req.body.email , firstName: req.body.firstName, lastName: req.body.lastName, password: hash, username: req.body.username, updatedAt: req.body.updatedAt}, {runValidators: true, new: true} )
                            .then((data) => {
                                res.json({updatedUser: data});
                            })
                            .catch(err => {
                                const errors = Object.keys(err.errors).map(key => err.errors[key].message) 
                                res.status(422).json(errors )});                         

                        })
                        .catch(err =>{
                            console.log(err);
                            const errors = Object.keys(err.errors).map(key => err.errors[key].message) 
                            res.status(422).json(errors );

                        });
                    }
                    run();
                    
                      

                } else {
                    // Passwords don't match
                    console.log("Passwords don't match");
                    res.json({status: 'failure'});
                }
            })
            // .catch(err => res.json(err));
            .catch(err =>{
                console.log(err);
                const errors = Object.keys(err.errors).map(key => err.errors[key].message) 
                res.status(422).json(errors );

            });

       
    },

}

function validateEmail(mail) 
{
if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
{
    return (true)
}
    return (false)
}