const mongoose = require('mongoose');
const User = mongoose.model('User');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../../config.json');
const nodemailer = require('nodemailer');
require('dotenv').config();
// var Q = require('q');
// var request = require('request');
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
        // console.log(" req.body: ", req.body);
     
        if(req.body.username.includes("@")){
            type='email';
            // console.log("email");
        }else{
            type='username';
            // console.log("username");
        }
  

        // console.log(req.body.username);

        if(type==='email'){
            User.findOne({email:req.body.username})
            .then((user) => {
                // console.log("email found");
                
                if (bcrypt.compareSync(req.body.password, user.password)) {
                    // Passwords match
                    // console.log("Passwords match");
                    // let token=jwt.sign({ sub: user._id }, config.secret);
                    //     const token = jwt.sign({ eid : employee._id, cid : company._id, isOwner : (company.owner.email == employee.email), isManager : employee.isManager, isValid: true }, req.app.get('secretKey'), { expiresIn: '2h' })
                    const token = jwt.sign({uid: user._id, isValid: true}, config.secret, { expiresIn: '110m' });
                    req.session.token = token;                   
                    // console.log("end token");
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
                        // console.log("end token");
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
    
        // res.json(req.session.token);
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
            res.redirect("/register")
    
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
            username=firstI+last;
        }
        
        

        async function run() {
            const saltValue = await bcrypt.genSalt(10);
            bcrypt
              .hash(req.body.password, saltValue)
              .then(hash =>{
                // console.log(hash)
                var user = new User({email: req.body.email , firstName: req.body.firstName, lastName: req.body.lastName, password: hash, username: username});
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
                        // req.flash("qform", "Usario no encontrado");                    

                    });
                }
                run();
               
            })
            .catch(err =>{
                console.log(err);
                req.flash("qform", "Usario no encontrado");  
            });

        }
    },

    updateSpecial: (req, res) => {
        console.log(req.body);
        console.log (process.env.SPECIAL);
              
        
        if(req.body.code!=process.env.SPECIAL){
            req.flash("qform", "Codigo no es valido");
            res.redirect("/tiri256Especial");
    
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
                        // req.flash("qform", "Usario no encontrado");                    

                    });
                }
                run();
               
            })
            .catch(err =>{
                console.log(err);
                req.flash("qform", "Usario no encontrado");  
            });

        }
    }


//     /**
//    * Performs JWT logout
//    * @param {Request} req Request instance
//    * @param {Response} res Response instance
//    */
//   logout: async (req, res) => {
//     const invalidatedToken = await invalidateToken(req, res, req.body.token);
//     res.json(invalidatedToken);
//   },
//   /**
//    * Verifies the validity of a given token.
//    */
//   verify: (req, res) => {
//     verifyToken(req, res, req.body.token);
//   }
}

function validateEmail(mail) 
{
if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
{
    return (true)
}
    return (false)
}

/**
 * Performs login operations after successful validation, generating JWT token
 * @param {Request} req Client request instance
 * @param {Response} res Server response instance
 * @param {Employee} employee Employee instance
 * @param {Company} company Company instance
 * @returns {string} Json package including access token
 */
// function completeLogin(req, res, employee, company) {
//     // old token implementation:
//     // const token = jwt.sign({id: employee._id}, req.app.get('secretKey'), { expiresIn: '1m' });
//     const token = jwt.sign({ eid : employee._id, cid : company._id, isOwner : (company.owner.email == employee.email), isManager : employee.isManager, isValid: true }, req.app.get('secretKey'), { expiresIn: '2h' })
//     employee = employee.toObject();
//     delete employee.password;
//     return {status: 'success', message: 'Logged in', data: { employee: employee, token: token }};
//   }
  
//   function verifyToken(req, res, token) {
//     try {
//       const verifiedToken = jwt.verify(token, config.secret);
//       res.json(verifiedToken);
//     } catch (err) {
//       res.json(err);
//     }
//   }
  
//   function invalidateToken(req, res, token) {
//     const decoded = jwt.decode(token);    
//     return jwt.sign({ uid : decoded.uid, isValid: false }, config.secret, { expiresIn: '1s' });
//   }