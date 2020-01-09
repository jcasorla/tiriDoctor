const mongoose = require('mongoose');
const User = mongoose.model('User');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../../config.json');
const nodemailer = require('nodemailer');
require('dotenv').config();
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth:{
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    },
    tls: {
        rejectUnauthorized: false
    }
})


module.exports = {

 

    login(req, res) {
        var type;
        if(req.body.username.includes("@")){
            type='email';
        }else{
            type='username';
        }

        if(type==='email'){
            User.findOne({email:req.body.username})
            .then((user) => {
                
                if (bcrypt.compareSync(req.body.password, user.password)) {
                   
                    const token = jwt.sign({uid: user._id, isValid: true}, config.secret, { expiresIn: '110m' });
                    req.session.token = token; 
                    var user2 ={uid: user._id, firstName: user.firstName, lastName: user.lastName, email: user.email, username: user.username};
                    req.session.user=user2;
                 

                    res.redirect("/");
                } else {
                    // Passwords don't match
                    console.log("Passwords don't match");
                    req.flash("qform", "No se puede aceder");
                    res.redirect("/login");
                }
                
            })
            .catch(err =>{
                req.flash("qform", "No se puede aceder");
                res.redirect("/login");
            });

        }
        

            if(type==='username'){
                User.findOne({username:req.body.username})
                .then((user) => {
                    
                    if (bcrypt.compareSync(req.body.password, user.password)) {
                        
                        const token = jwt.sign({uid: user._id, isValid: true}, config.secret, { expiresIn: '110m' });
                        req.session.token = token;  
                        var user2 ={uid: user._id, firstName: user.firstName, lastName: user.lastName, email: user.email, username: user.username};
                        req.session.user=user2;

                        res.redirect("/");
                    } else {
                        // Passwords don't match
                        console.log("Passwords don't match");
                        req.flash("qform", "No se puede aceder");
                        res.redirect("/login");
                    }
                    
                })
                .catch(err =>{
                    req.flash("qform", "No se puede aceder");
                    res.redirect("/login");
                });
            }
      
    },

    send(req, res){
    
        res.json({user: req.session.user, status: 'success', message: 'Logged in', data: {token: req.session.token }})
        
    },
    
    register(req, res) {

        if(req.body.code!=process.env.INVITE){
            req.flash("qform", "Codigo no es valido");
            res.redirect("/register")     
        } 
        var result=validateEmail(req.body.email);

        if(!result){
            req.flash("qform", "Correo Electronico no es valido");
            console.log("in email check");
            res.redirect("/register")     
        }
    
        else if(req.body.cpwd ==""){
            req.flash("qform", "Debez ingresar Confirma Contraseña");
            console.log("in if");
            res.redirect("/register")     
    
        }
        
        else if(req.body.password!=req.body.cpwd){
            req.flash("qform", "Contraseñas no coinciden!");
            console.log("do not match");
            res.redirect("/register");
    
        }
    
       else{

       
        if(!req.body.firstName || !req.body.lastName){
            username='';
        }
        else{
            var first= req.body.firstName;
            var first=first.toLowerCase();
            firstS=first.split('');
            var firstI=firstS[0];
            var last=req.body.lastName;        
            last=last.toLowerCase();
            var slast=req.body.slastName;
            slast=slast.toLowerCase();
            slastarr=slast.split('');
            slastindex1=slastarr[0];
            slastlastindex=slastarr[slastarr.length-1];
            username=firstI+last+slastindex1+slastlastindex;
        }
        
        User.findOne({ email : req.body.email })
            .then((user) => { 
                console.log(user.email);
                req.flash("qform", "Correo existe, escoje otro");
                res.redirect("/register");
            })
            .catch(err =>{
                async function run() {
                    const saltValue = await bcrypt.genSalt(10);
                    bcrypt
                      .hash(req.body.password, saltValue)
                      .then(hash =>{
                        var user = new User({email: req.body.email , firstName: req.body.firstName, lastName: req.body.lastName, slastName: req.body.slastName, password: hash, username: username});
                        user.save()
                        .then(result =>{
                            res.redirect("/login");
                        })
                        
                        .catch(err =>{
                            console.log("in error");
                            for(var key in err.errors){
                                req.flash("qform", err.errors[key].message);
                            } 
                            res.redirect("/register");
        
                        });
                      })
                      .catch(err =>{
                        console.log(err);
                        for(var key in err.errors){
                            req.flash("qform", err.errors[key].message);
                        } 
                        res.redirect("/register")
        
                      });
                  }
                  run();
                
            })
        

        
        
       }
     
            
    },

    logout(req,res){
        req.session.destroy();
        res.json({status: 'success', message: 'Logged out'})
    },

    updatePwd: (req, res) => {
              
        
        if(req.body.code!=process.env.RESET){
            req.flash("qform", "Codigo no es valido");
            res.redirect("/reset");
    
        }
        else if(req.body.email==""){
            req.flash("qform", "Necesitas ingresar el correo");
            res.redirect("/reset");
        }

        else{
            var generator = require('generate-password');
            var password = generator.generate({
                length: 5,
                numbers: true
            });
                

            User.findOne({ email : req.body.email })
            .then((user) => {

                async function run() {
                    const saltValue = await bcrypt.genSalt(10);
                    bcrypt
                    .hash(password, saltValue)
                    .then(hash =>{
                        
                        
                        User.findByIdAndUpdate(user.id , {password: hash}, {runValidators: true, new: true} )
                        .then((data) => {
                            var mailOptions={
                                from: 'tiridoctor@gmail.com',
                                to: user.email,
                                subject: 'Cambio de Contraseña para: ' + user.email,
                                text: 'Contraseña Temporal: ' + password
                            };
                            transporter.sendMail(mailOptions, function(err,data){
                                if(err){
                                    console.log("error sending email", err);
                                }
                                else{
                                    console.log("email is sent");
                                }
                            });
                            res.redirect("/");
                        })
                        .catch(err => {
                            console.log(err);
                            
                        });                         

                    })
                    .catch(err =>{
                        console.log(err);                

                    });
                }
                run();
               
            })
            .catch(err =>{
                console.log(err);
                req.flash("qform", "Usario no encontrado"); 
                res.redirect("/reset"); 
            });

        }
    },

    updateSpecial: (req, res) => {              
        
        if(req.body.code!=process.env.SPECIAL){
            req.flash("qform", "Codigo no es valido");
            res.redirect("/tiri256Especial");
    
        }
        else if(req.body.email==""){
            req.flash("qform", "Necesitas ingresar el correo");
            res.redirect("/reset");
        }

        else{
            var generator = require('generate-password');
            var password = generator.generate({
                length: 5,
                numbers: true
            });
                

            User.findOne({ email : req.body.email })
            .then((user) => {

                async function run() {
                    const saltValue = await bcrypt.genSalt(10);
                    bcrypt
                    .hash(password, saltValue)
                    .then(hash =>{
                        
                        
                        User.findByIdAndUpdate(user.id , {password: hash}, {runValidators: true, new: true} )
                        .then((data) => {
                            var mailOptions={
                                from: 'tiridoctor@gmail.com',
                                to: 'precado999@gmail.com',
                                subject: 'Cambio de Contraseña para: ' + user.email,
                                text: 'Contraseña Temporal: ' + password
                            };
                            transporter.sendMail(mailOptions, function(err,data){
                                if(err){
                                    console.log("error sending email", err);
                                }
                                else{
                                    console.log("email is sent");
                                }
                            });
                            res.redirect("/");
                        })
                        .catch(err => {
                            console.log(err);
                            
                        });                         

                    })
                    .catch(err =>{
                        console.log(err);                  

                    });
                }
                run();
               
            })
            .catch(err =>{
                console.log(err);
                req.flash("qform", "Usario no encontrado");  
                res.redirect("/reset"); 
            });

        }
    }

}

function validateEmail(mail) 
{
if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
{
    return (true)
}
    return (false)
}

