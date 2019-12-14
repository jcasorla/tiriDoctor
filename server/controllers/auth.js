const mongoose = require('mongoose');
const User = mongoose.model('User');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../../config.json');
// var Q = require('q');
// var request = require('request');


var saveToken;
module.exports = {

    // sendHome(req, res){
    //     res.redirect('/login');
    // },
    

    login(req, res) {
        console.log(" req.body: ", req.body);
     
        if(req.body.username.includes("@")){
            console.log("email");
        }else{
            console.log("username");
        }
  

        console.log(req.body.username);
        User.findOne({email:req.body.username})
            .then((user) => {
                console.log("email found");
                console.log(user);
                console.log("nada");
                if (bcrypt.compareSync(req.body.password, user.password)) {
                    // Passwords match
                    console.log("Passwords match");
                    // let token=jwt.sign({ sub: user._id }, config.secret);
                    //     const token = jwt.sign({ eid : employee._id, cid : company._id, isOwner : (company.owner.email == employee.email), isManager : employee.isManager, isValid: true }, req.app.get('secretKey'), { expiresIn: '2h' })
                    const token = jwt.sign({uid: user._id, isValid: true}, config.secret, { expiresIn: '100m' });
                    req.session.token = token;
                    saveToken=token;
                    console.log(saveToken);
                    console.log("end token");
                    // req.session.firstName=user.firstName;
                    // req.session.lastName=user.lastName;
                    // req.session.id=user._id;
                    // req.session.email=user.email;
                    // res.json(completeLogin(req, res, employee, company));

                    res.redirect("/");
                } else {
                    // Passwords don't match
                    console.log("Passwords don't match");
                    req.flash("qform", "No se puede aceder");
                }
                
            })
            .catch(err =>{
                req.flash("qform", "No se puede aceder");
                res.redirect("/login")
            });
      
    },

    send(req, res){
        // console.log(saveToken);
        // if(!saveToken){
        //     res.json({uid: 3, isValid: true}, config.secret, { expiresIn: '1m' })
        // }else{
        //     res.json(saveToken);
        // }

        res.json(req.session.token);
        
    },
    
    register(req, res) {
        console.log("in register");
        console.log(" req.body: ", req.body);
        // req.session.email=req.body.email;

        
        var result=validateEmail(req.body.email);

        if(!result){
            req.flash("qform", "Correo Electronico no es valido");
            console.log("in email check");
            res.redirect("/register")     
        }
    
        else if(req.body.cpwd ==""){
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
        
        

        console.log("this is username: " + username);  

        async function run() {
            const saltValue = await bcrypt.genSalt(10);
            bcrypt
              .hash(req.body.password, saltValue)
              .then(hash =>{
                console.log(hash)
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
    /**
   * Performs JWT logout
   * @param {Request} req Request instance
   * @param {Response} res Response instance
   */
  logout: async (req, res) => {
    const invalidatedToken = await invalidateToken(req, res, req.body.token);
    res.json(invalidatedToken);
  },
  /**
   * Verifies the validity of a given token.
   */
  verify: (req, res) => {
    verifyToken(req, res, req.body.token);
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
  
  function verifyToken(req, res, token) {
    try {
      const verifiedToken = jwt.verify(token, config.secret);
      res.json(verifiedToken);
    } catch (err) {
      res.json(err);
    }
  }
  
  function invalidateToken(req, res, token) {
    const decoded = jwt.decode(token);    
    return jwt.sign({ uid : decoded.uid, isValid: false }, config.secret, { expiresIn: '1s' });
  }