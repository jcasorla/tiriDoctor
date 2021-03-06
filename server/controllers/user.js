const mongoose = require('mongoose');
const User = mongoose.model('User');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');



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

    updateEmail: (req, res) => { 
        var result=validateEmail(req.body.email);

        if(!result){
            res.status(422).json(['Correo es invalido']);  
        } 
        else{
            User.findOne({ email : req.body.email })
            .then((user) => { 
                console.log(user.email);                    
                res.status(422).json(['Correo existe, escoje otro']);  
                
            })
            .catch(err =>{
                User.findById({ _id : req.params.id })
                .then((user) => {
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
                        
                    } else {
                        // Passwords don't match
                        console.log("Passwords don't match???");
                        res.status(422).json(['Contraseñas incorrectas']);
                    }
                })
                .catch(err => {
                    const errors = Object.keys(err.errors).map(key => err.errors[key].message) 
                    res.status(422).json(errors )});
                
                

            });

        }  
       
    },

    updateUsername:(req,res)=>{
        User.findOne({ username : req.body.username })
        .then((user) => { 
            console.log(user.username);                    
            res.status(422).json(['username existe, escoje otro']);  
           
        })
        .catch(err =>{
            User.findById({ _id : req.params.id })
            .then((user) => {
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
                    
                } else {
                    // Passwords don't match
                    console.log("Passwords don't match???");
                    res.status(422).json(['Contraseñas incorrectas']);
                }
            })
            .catch(err => {
                const errors = Object.keys(err.errors).map(key => err.errors[key].message) 
                res.status(422).json(errors )});
        });

        
    },

    updatePwd: (req, res) => {   
        var valid=validPWD(req.body.password);

        if(!valid){
            res.status(422).json(['contraseña debe ser 8 de largo, por lo menos una mayuscula y miniscula y character especial']);  
        } 
  
        
        if(req.body.password!=req.body.cpwd){
           res.status(422).json(['Contraseñas no coinciden']);
    
        }
        
        else{
            User.findById({ _id : req.params.id })
            .then((user) => {
                if (bcrypt.compareSync(req.body.current, user.password)) {
                    // Passwords match
                    console.log("Passwords match");

                    async function run() {
                        const saltValue = await bcrypt.genSalt(10);
                        bcrypt
                        .hash(req.body.password, saltValue)
                        .then(hash =>{
                            
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
                    console.log("Passwords don't match???");
                    res.status(422).json(['Contraseñas incorrectas']);
                }
            })
            .catch(err =>{
                console.log(err);
                const errors = Object.keys(err.errors).map(key => err.errors[key].message) 
                res.status(422).json(errors );

            });

        }
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
function validPWD(pwd){
    if (/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(pwd))
    {
        return (true)
    }
        return (false)
}
