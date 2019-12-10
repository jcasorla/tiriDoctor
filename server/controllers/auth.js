const mongoose = require('mongoose');
const User = mongoose.model('User');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
// var Q = require('q');
// var request = require('request');


module.exports = {

    login(req, res) {
        console.log(" req.body: ", req.body);

        if(req.body.email <2){
            req.flash()
        }
    
        User.findOne({email:req.body.email}, (err, user) => {
            if (err) {
                for(var key in err.errors){
                    req.flash("qform", err.errors[key].message);
                    console.log("checking validation errors!!!!!!!")
                }
                res.redirect("/")
            }
            else {
    
                bcrypt.compare('req.body.password', 'password')
                .then(result => {
                    req.session.user_id = user._id;
                    req.session.name= user.first_name + " " + user.last_name;
                    req.session.email = user.email;
                    res.redirect("/login")
                    
                })
                .catch(error => {
                    // for(var key in err.errors){
                    //     req.flash("qform", err.errors[key].message);
                    //     // console.log("checking validation errors!!!!!!!")
                    // }
    
                    req.flash("qform", "Unable to login");
                    res.redirect("/")
                    
                })
    
                // Code...
                
            }
        })


        // userService.authenticate(req.body.username, req.body.password)
        //     .then(function (token) {
        //         if (token) {
        //             // authentication successful
        //             res.send({ token: token });
        //         } else {
        //             // authentication failed
        //             res.status(401).send('Username or password is incorrect');
        //         }
        //     })
        //     .catch(function (err) {
        //         res.status(400).send(err);
        //     });
    },
    
    register(req, res) {
        console.log("in register");
        console.log(" req.body: ", req.body);
        // req.session.email=req.body.email;
        // var display=false;
    
        if(req.body.cpwd ==""){
            req.flash("qform", "confirm Password canot be blank!");
            console.log("in if");
            res.redirect("/register")     
    
        }
        
        else if(req.body.password!=req.body.cpwd){
            req.flash("qform", "Passwords do not match!");
            console.log("do not match");
            res.redirect("/register")
    
        }
    
       else{
        // var username= req.body.firstName + req.body.lastName;
        console.log("this is username: " + username);  
        // var salt = bcrypt.genSaltSync(10);  

        let hash = bcrypt.hashSync(req.body.password, 10);
        console.log(hash);
        if (bcrypt.compareSync(req.body.password, hash)) {
            console.log("password hashed ");
                var user = new User({email: req.body.email , firstName: req.body.firstName, lastName: req.body.lastName, password: hash, username: username});
                user.save()
                .then((data) => {
                    res.redirect("/login");
                })
                .catch((err => {
                    console.log("in error");
                    for(var key in err.errors){
                        req.flash("qform", err.errors[key].message);
                    } 
                    res.redirect("/register")
                })
                // .then((data => {
                //     res.redirect("/login");
                   
                // })
                // .catch(err =>{
            
                //     for(var key in err.errors){
                //         req.flash("qform", err.errors[key].message);
                //     } 
                //     res.redirect("/register")
            
                // })
                    
            
            );

          } 
        //   else {
        //     // Passwords don't match
        //     console.log("Passwords don't match");
        //   }
    
        // bcrypt.hashSync(req.body.password, 10, function(err, hash) {
        //     if(err){
        //         for(var key in err.errors){
        //             req.flash("qform", err.errors[key].message);
        //         }
        //         res.redirect("/register")
                
        //     }
        //     else{
        //         console.log("password hashed ");
        //         var user = new User({email: req.body.email , firstName: req.body.firstName, lastName: req.body.lastName, password: hash});
        //         user.save()
        //         .then((data => {
        //             res.redirect("/login");
                   
        //         })
        //         .catch(err =>{
            
        //             for(var key in err.errors){
        //                 req.flash("qform", err.errors[key].message);
        //             } 
        //             res.redirect("/register")
            
        //         })
                    
            
        //         );

        //     }
        //   }); 

       }
     
     

        // userService.create(req.body)
        //     .then(function () {
        //         res.sendStatus(200);
        //     })
        //     .catch(function (err) {
        //         res.status(400).send(err);
        //     });
    },
}


//     /**
//      * Receives and validates login requests
//      * @param {Request} req Request instance
//      * @param {Response} res Response instance
//      */
//     login: (req, res) => {
//       Employee.findOne({ email: req.body.email })
//         .populate('managedProjects')
//         .populate('assignedProjects')
//         .populate({path:'tasks', populate: {path: 'teamMembers'}})
//         .then(employee => {
//           if(employee!= null) {
//             bcrypt.compare(req.body.password, employee.password)
//               .then(isValid => {
//                 if (!isValid) {
//                   throw new Error();
//                 }
//                 Company.findOne({'employees': employee._id})
//                   .then(company => {
//                     res.json(completeLogin(req, res, employee, company));
//                   })
//                   .catch(err => {
//                     res.json(err);
//                   });
//               })
//               .catch(err => {
//                 res.json(err);
//               });
//           }else {res.json({'Wrong email':"wrong"})}
  
//         })
  
//     },
//     /**
//      * Receives and validates registration requests
//      * @param {Request} req Request instance
//      * @param {Response} res Response instance
//      */
//     newCompanyRegister: (req, res) => {
//       const name = req.body.name;
//       Company.create({name: name, departments: ['Unassigned']})
//         .then(async company => {
//           let owner;
//           req.body.owner.isManager = true;
//           req.body.owner.password = await bcrypt.hash(req.body.owner.password, 10);
//           try {
//             owner = await Employee.create(req.body.owner);
//           } catch (err) {
//             Company.deleteOne(company);
//             res.json(err);
//           }
//           // TODO: Swap company owner from subdocument to reference ID.
//           company.owner = owner;
//           company.employees.push(owner);
//           Company.findByIdAndUpdate(company._id, company)
//             .then(async data => {
//               const login = await completeLogin(req, res, owner, company);
//               login.data['createdCompany'] = data;
//               res.json(login);
//             })
//             .catch(err => {
//               res.json(err);
//             })
  
//         })
//         .catch(err => {
//           res.json(err);
//         });
//     },
//     joinCompanyRegister: async (req, res) => {
//       bcrypt.hash(req.body.password, 10)
//         .then(hashed => {
//           req.body.password = hashed;
//           Employee.create(req.body)
//             .then(employee => {
//               Company.findByIdAndUpdate(req.params.id, {$push : { employees : employee}})
//                 .then(async company => {
//                   const login = await completeLogin(req, res, employee, company);
//                   login.data['joinedCompany'] = company;
//                   res.json(login);
//                 })
//                 .catch(err => {
//                   res.json(err);
//                 })
//             })
//             .catch(err => {
//               res.json(err);
//             });
//         })
//         .catch(err => {
//           res.json(err);
//         })
//     },
//     /**
//      * Performs JWT logout
//      * @param {Request} req Request instance
//      * @param {Response} res Response instance
//      */
//     logout: async (req, res) => {
//       const invalidatedToken = await invalidateToken(req, res, req.body.token);
//       res.json(invalidatedToken);
//     },
//     /**
//      * Verifies the validity of a given token.
//      */
//     verify: (req, res) => {
//       verifyToken(req, res, req.body.token);
//     }
//   }
//   /**
//    * Performs login operations after successful validation, generating JWT token
//    * @param {Request} req Client request instance
//    * @param {Response} res Server response instance
//    * @param {Employee} employee Employee instance
//    * @param {Company} company Company instance
//    * @returns {string} Json package including access token
//    */
//   function completeLogin(req, res, employee, company) {
//     // old token implementation:
//     // const token = jwt.sign({id: employee._id}, req.app.get('secretKey'), { expiresIn: '1m' });
//     const token = jwt.sign({ eid : employee._id, cid : company._id, isOwner : (company.owner.email == employee.email), isManager : employee.isManager, isValid: true }, req.app.get('secretKey'), { expiresIn: '2h' })
//     employee = employee.toObject();
//     delete employee.password;
//     return {status: 'success', message: 'Logged in', data: { employee: employee, token: token }};
//   }
  
//   function verifyToken(req, res, token) {
//     try {
//       const verifiedToken = jwt.verify(token, req.app.get('secretKey'));
//       res.json(verifiedToken);
//     } catch (err) {
//       res.json(err);
//     }
//   }
  
//   function invalidateToken(req, res, token) {
//     const decoded = jwt.decode(token);
//     return jwt.sign({ eid : decoded.eid, cid : decoded.cid, isOwner : decoded.isOwner, isManager : decoded.isManager, isValid: false }, req.app.get('secretKey'), { expiresIn: '1s' });
//   }
