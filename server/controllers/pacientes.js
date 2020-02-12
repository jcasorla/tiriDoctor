const mongoose = require('mongoose');
const Paciente = mongoose.model('Paciente');
const Actual = mongoose.model('Actual');
const Patologico = mongoose.model('Patologico');
const NoPatologico = mongoose.model('NoPatologico');
const Familiar = mongoose.model('Familiar');
const Gineco = mongoose.model('Gineco');
const Fisico = mongoose.model('Fisico');
const Problema = mongoose.model('Problema');
const Grid = mongoose.model('Grid');
const Lab = mongoose.model('Lab');
const File = mongoose.model('File');
const path = require('path');
const fs = require('fs');
var bcrypt = require('bcryptjs');
require('dotenv').config();



function validateEmail(mail) 
{
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
    {
        return (true)
    }
        return (false)
}

function onlyNumbers(num) 
{
    if (/^[0-9 \-()+]+$/.test(num))
    {
        return (true)
    }
        return (false)
}

module.exports = {

   
    all: async (req, res) => {
        try {
            const pacientes = await Paciente.find();
            res.json({pacientes: pacientes});
        }
        catch (err) {
            res.json(err);            
        }
    },
    getOneById: (req, res) => {
        Paciente.findById({ _id : req.params.id })
            .then((data) => {
                res.json({paciente: data})
            })
            .catch(err => res.json(err));
    },
    create: (req, res) => {
        var password=process.env.MOMENTO;
        if(req.body.email){
            var result=validateEmail(req.body.email);
            if(!result){
                res.status(422).json(['Correo es invalido']);  
            }
        }
        
        var result2=onlyNumbers(req.body.phone);

        
        if(!result2){
            res.status(422).json(['Telefono debe tener solo digitos']);  
        }
        else{
            const paciente = new Paciente(req.body); 
            async function run() {
                const saltValue = await bcrypt.genSalt(10);
                bcrypt
                .hash(password, saltValue)
                .then(hash =>{
                    paciente.password=hash;
                    paciente.save()
                    .then((data) => {
                        res.json({newPaciente: data});
                    })
                    .catch(err => {
                        const errors = Object.keys(err.errors).map(key => err.errors[key].message) 
                        res.status(422).json(errors )});
                    
                    
                   

                })
                .catch(err =>{
                    console.log(err);                  

                });
            }
            run();
           

        }
       
    },
    update: (req, res) => {
        if(req.body.email){
            var result=validateEmail(req.body.email);
            if(!result){
                res.status(422).json(['Correo es invalido']);  
            }
        }
        
        var result2=onlyNumbers(req.body.phone);

        
        if(!result2){
            res.status(422).json(['Telefono debe tener solo digitos']);  
        }
        else{
            Paciente.findByIdAndUpdate(req.params.id , req.body, {runValidators: true, new: true} )
            .then((data) => {
                res.json({updatedPaciente: data});
            })
            .catch(err => {
                const errors = Object.keys(err.errors).map(key => err.errors[key].message) 
                res.status(422).json(errors )});

        }
        
    },
	
    delete: (req, res) => {
        Paciente.findOneAndDelete({ _id : req.params.id })
            .then((data) => {
                if(data.patologico.length>0){
                    for(var i=0; i< data.patologico.length; i++){
                        Patologico.findOneAndDelete({ _id : data.patologico[i]._id })
                        .then((data) => {
                        })
                        .catch(err => {
                            res.json(err);
                        });

                    }                  
                }
                if(data.actual.length>0){
                    for(var i=0; i< data.actual.length; i++){
                        Actual.findOneAndDelete({ _id : data.actual[i]._id })
                        .then((data) => {
                        })
                        .catch(err => {
                            res.json(err);
                        });

                    }   
                }
                if(data.nopatologico.length>0){
                    for(var i=0; i< data.nopatologico.length; i++){
                        NoPatologico.findOneAndDelete({ _id : data.nopatologico[i]._id })
                        .then((data) => {
                        })
                        .catch(err => {
                            res.json(err);
                        });

                    }               
                }
                if(data.familiar.length>0){
                    for(var i=0; i< data.familiar.length; i++){
                        Familiar.findOneAndDelete({ _id : data.familiar[i]._id })
                        .then((data) => {
                        })
                        .catch(err => {
                            res.json(err);
                        });

                    }               
                }
                if(data.gineco.length>0){
                    for(var i=0; i< data.gineco.length; i++){
                        Gineco.findOneAndDelete({ _id : data.gineco[i]._id })
                        .then((data) => {
                        })
                        .catch(err => {
                            res.json(err);
                        });

                    }               
                }
                if(data.fisico.length>0){
                    for(var i=0; i< data.fisico.length; i++){
                        Fisico.findOneAndDelete({ _id : data.fisico[i]._id })
                        .then((data) => {
                        })
                        .catch(err => {
                            res.json(err);
                        });

                    }               
                }
                if(data.problema.length>0){
                    for(var i=0; i< data.problema.length; i++){
                        Problema.findOneAndDelete({ _id : data.problema[i]._id })
                        .then((data) => {
                        })
                        .catch(err => {
                            res.json(err);
                        });

                    }               
                }
                if(data.grid.length>0){
                    for(var i=0; i< data.grid.length; i++){
                        Grid.findOneAndDelete({ _id : data.grid[i]._id })
                        .then((data) => {
                        })
                        .catch(err => {
                            res.json(err);
                        });

                    }               
                }
                if(data.lab.length>0){
                    for(var i=0; i< data.lab.length; i++){
                        Lab.findOneAndDelete({ _id : data.lab[i]._id })
                        .then((data) => {
                        })
                        .catch(err => {
                            res.json(err);
                        });

                    }               
                }
                if(data.file.length>0){
                    for(var i=0; i< data.file.length; i++){
                        filepath = path.join(__dirname,'../../uploads') +'/'+ data.file[i].filename;
                        File.findOneAndDelete({ _id : data.file[i]._id })
                        .then((data) => {
                            try{
                                fs.unlinkSync(filepath);
                                
                            }catch(err){
                                console.log(err);
                                const errors = Object.keys(err.errors).map(key => err.errors[key].message) 
                                res.status(422).json(errors );        
                            }
                        })
                        .catch(err => {
                            res.json(err);
                        });

                    }               
                }
                res.json(data);
            })
            .catch(err => {
                res.json(err);
            });
    },
	
    createActual: function(req,res){
        Actual.create(req.body, function(err, data){
            if (err){
                const errors = Object.keys(err.errors).map(key => err.errors[key].message) 
                res.status(422).json(errors );
            }
            else{
                Paciente.findOneAndUpdate({_id:req.params.id}, {$push : {actual: data}}, {runValidators: true, new: true}, function(err, data){
                    if (err){
                        const errors = Object.keys(err.errors).map(key => err.errors[key].message) 
                        res.status(422).json(errors );
                    }
                    else{
                       res.json(data)
                    }
                })
               
                
            }
        })
    },

    updateActual: (req, res) => {
        Actual.findByIdAndUpdate(req.params.id , req.body, {runValidators: true, new: true} )
            .then((data) => {
                res.json({updatedActual: data});
                
                Paciente.findOneAndUpdate(
                    { "_id": req.body._id2, "actual._id": req.params.id },
                    { 
                        "$set": {
                            "actual.$.consulta": req.body.consulta,"actual.$.enfermedad": req.body.enfermedad
                        },
                                        
                    },
                    function(err,doc) {

                    }
                );

               
            })
            .catch(err => {
                const errors = Object.keys(err.errors).map(key => err.errors[key].message) 
                res.status(422).json(errors )});
    },

    deleteActual: (req, res) => {
        
        Actual.findOneAndDelete({ _id : req.params.id })
        .then((data) => {
            res.json(data);

            Paciente.findById({ _id : req.body._id })
            .then((paciente) => {
                paciente.actual.id(req.params.id).remove();            
                paciente.save(function (err) {
                if (err){
                    const errors = Object.keys(err.errors).map(key => err.errors[key].message) 
                    res.status(422).json(errors);
                }
                console.log('the subdocs were removed');
            })

            
        });
        })
        .catch(err => {
            const errors = Object.keys(err.errors).map(key => err.errors[key].message) 
            res.status(422).json(errors);
        });        

    },

    createPatologico: function(req,res){
        Patologico.create(req.body, function(err, data){
            if (err){
                const errors = Object.keys(err.errors).map(key => err.errors[key].message) 
                res.status(422).json(errors );
            }
            else{
                Paciente.findOneAndUpdate({_id:req.params.id}, {$push : {patologico: data}}, {runValidators: true, new: true}, function(err, data){
                    if (err){
                        const errors = Object.keys(err.errors).map(key => err.errors[key].message) 
                        res.status(422).json(errors );
                    }
                    else{
                       res.json(data)
                    }
                })
               
                
            }
        })
    },

    updatePatologico: (req, res) => {
        Patologico.findByIdAndUpdate(req.params.id , req.body, {runValidators: true, new: true} )
            .then((data) => {
                res.json({updatedPatologico: data});
               
                Paciente.findOneAndUpdate(
                    { "_id": req.body._id2, "patologico._id": req.params.id },
                    { 
                        "$set": {
                            "patologico": req.body
                        },
                       
                    },
                    function(err,doc) {
                                   
                    }
                );
                
            })
            .catch(err => {
                const errors = Object.keys(err.errors).map(key => err.errors[key].message) 
                res.status(422).json(errors )});
    },

    createNoPatologico: function(req,res){
        NoPatologico.create(req.body, function(err, data){
            if (err){
                const errors = Object.keys(err.errors).map(key => err.errors[key].message) 
                res.status(422).json(errors );
            }
            else{
                Paciente.findOneAndUpdate({_id:req.params.id}, {$push : {nopatologico: data}}, {runValidators: true, new: true}, function(err, data){
                    if (err){
                        const errors = Object.keys(err.errors).map(key => err.errors[key].message) 
                        res.status(422).json(errors );
                    }
                    else{
                       res.json(data)
                    }
                })
               
                
            }
        })
    },

    updateNoPatologico: (req, res) => {
        NoPatologico.findByIdAndUpdate(req.params.id , req.body, {runValidators: true, new: true} )
            .then((data) => {
                res.json({updatedNoPatologico: data});
               
                Paciente.findOneAndUpdate(
                    { "_id": req.body._id2, "nopatologico._id": req.params.id },
                    { 
                        "$set": {
                            "nopatologico": req.body
                        },
                       
                    },
                    function(err,doc) {
                           
                    }
                );
                
            })
            .catch(err => {
                const errors = Object.keys(err.errors).map(key => err.errors[key].message) 
                res.status(422).json(errors )});
    },

    createFamiliar: function(req,res){
        Familiar.create(req.body, function(err, data){
            if (err){
                const errors = Object.keys(err.errors).map(key => err.errors[key].message) 
                res.status(422).json(errors );
            }
            else{
                Paciente.findOneAndUpdate({_id:req.params.id}, {$push : {familiar: data}}, {runValidators: true, new: true}, function(err, data){
                    if (err){
                        const errors = Object.keys(err.errors).map(key => err.errors[key].message) 
                        res.status(422).json(errors );
                    }
                    else{
                       res.json(data)
                    }
                })
               
                
            }
        })
    },

    updateFamiliar: (req, res) => {
        Familiar.findByIdAndUpdate(req.params.id , req.body, {runValidators: true, new: true} )
            .then((data) => {
                res.json({updatedFamiliar: data});
               
                Paciente.findOneAndUpdate(
                    { "_id": req.body._id2, "familiar._id": req.params.id },
                    { 
                        "$set": {
                            "familiar": req.body
                        },
                       
                    },
                    function(err,doc) {
                               
                    }
                );
                
            })
            .catch(err => {
                const errors = Object.keys(err.errors).map(key => err.errors[key].message) 
                res.status(422).json(errors )});
    },

    createGineco: function(req,res){
        Gineco.create(req.body, function(err, data){
            if (err){
                const errors = Object.keys(err.errors).map(key => err.errors[key].message) 
                res.status(422).json(errors );
            }
            else{
                Paciente.findOneAndUpdate({_id:req.params.id}, {$push : {gineco: data}}, {runValidators: true, new: true}, function(err, data){
                    if (err){
                        const errors = Object.keys(err.errors).map(key => err.errors[key].message) 
                        res.status(422).json(errors );
                    }
                    else{
                       res.json(data)
                    }
                })
               
                
            }
        })
    },

    updateGineco: (req, res) => {
        Gineco.findByIdAndUpdate(req.params.id , req.body, {runValidators: true, new: true} )
            .then((data) => {
                res.json({updatedGineco: data});
               
                Paciente.findOneAndUpdate(
                    { "_id": req.body._id2, "gineco._id": req.params.id },
                    { 
                        "$set": {
                            "gineco": req.body
                        },
                       
                    },
                    function(err,doc) {
                             
                    }
                );
                
            })
            .catch(err => {
                const errors = Object.keys(err.errors).map(key => err.errors[key].message) 
                res.status(422).json(errors )});
    },

    createFisico: function(req,res){
        Fisico.create(req.body, function(err, data){
            if (err){
                const errors = Object.keys(err.errors).map(key => err.errors[key].message) 
                res.status(422).json(errors );
            }
            else{
                Paciente.findOneAndUpdate({_id:req.params.id}, {$push : {fisico: data}}, {runValidators: true, new: true}, function(err, data){
                    if (err){
                        const errors = Object.keys(err.errors).map(key => err.errors[key].message) 
                        res.status(422).json(errors);
                    }
                    else{
                       res.json(data)
                    }
                })
               
                
            }
        })
    },

    updateFisico: (req, res) => {
        Fisico.findByIdAndUpdate(req.params.id , req.body, {runValidators: true, new: true} )
            .then((data) => {
                res.json({updatedFisico: data});
               
                Paciente.findOneAndUpdate(
                    { "_id": req.body._id2, "fisico._id": req.params.id },
                    { 
                        "$set": {
                            "fisico": req.body
                        },
                                        
                    },
                    function(err,doc) {
                       
                
                    }
                );
                
            })
            .catch(err => {
                const errors = Object.keys(err.errors).map(key => err.errors[key].message) 
                res.status(422).json(errors )});
    },

    createProblema: function(req,res){
        
        Problema.create(req.body, function(err, data){
            if (err){
                const errors = Object.keys(err.errors).map(key => err.errors[key].message) 
                res.status(422).json(errors );
            }
            else{
                Paciente.findOneAndUpdate({_id:req.params.id}, {$push : {problema: data}}, {runValidators: true, new: true}, function(err, data){
                    if (err){
                        const errors = Object.keys(err.errors).map(key => err.errors[key].message) 
                        res.status(422).json(errors );
                    }
                    else{
                       res.json(data)
                    }
                })
               
                
            }
        })
    },

    //best way to update child documents
    updateProblema: (req, res) => {
    Problema.findByIdAndUpdate(req.params.id , req.body, {runValidators: true, new: true} )
        .then((data) => {
            res.json({updatedProblema: data});
           
            Paciente.findOneAndUpdate(
                { "_id": req.body._id2, "problema._id": req.params.id },
                { 
                    "$set": {
                        "problema.$.nombre": req.body.nombre,"problema.$.activo": req.body.activo
                    },
                                    
                },
                function(err,doc) {
                }
            );
            
        })
        .catch(err => {
            const errors = Object.keys(err.errors).map(key => err.errors[key].message) 
            res.status(422).json(errors )});
    },

    deleteProblema: (req, res) => {
        
        Problema.findOneAndDelete({ _id : req.params.id })
        .then((data) => {
            res.json(data);

            Paciente.findById({ _id : req.body._id })
            .then((paciente) => {
                paciente.problema.id(req.params.id).remove();            
                paciente.save(function (err) {
                if (err){
                    const errors = Object.keys(err.errors).map(key => err.errors[key].message) 
                    res.status(422).json(errors);
                }
                console.log('the subdocs were removed');
            })

            
        });
        })
        .catch(err => {
            const errors = Object.keys(err.errors).map(key => err.errors[key].message) 
            res.status(422).json(errors);
        });        

    },

    createGrid: function(req,res){
        Grid.create(req.body, function(err, data){
            if (err){
                const errors = Object.keys(err.errors).map(key => err.errors[key].message) 
                res.status(422).json(errors );
            }
            else{
                Paciente.findOneAndUpdate({_id:req.params.id}, {$push : {grid: data}}, {runValidators: true, new: true}, function(err, data){
                    if (err){
                        const errors = Object.keys(err.errors).map(key => err.errors[key].message) 
                        res.status(422).json(errors);
                    }
                    else{
                       res.json(data)
                    }
                })
               
                
            }
        })
    },

    updateGrid: (req, res) => {
        Grid.findByIdAndUpdate(req.params.id , req.body, {runValidators: true, new: true} )
            .then((data) => {
                res.json({updatedGrid: data});
               
                Paciente.findOneAndUpdate(
                    { "_id": req.body._id2, "grid._id": req.params.id },
                    { 
                        "$set": {
                            "grid": req.body
                        },
                                        
                    },                    
                    function(err,doc) {                       
                
                    }
                   
                )
                
            })
            .catch(err => {
                const errors = Object.keys(err.errors).map(key => err.errors[key].message) 
                res.status(422).json(errors )});
    },

    createLab: function(req,res){
        Lab.create(req.body, function(err, data){
            if (err){
                const errors = Object.keys(err.errors).map(key => err.errors[key].message) 
                res.status(422).json(errors );
            }
            else{
                Paciente.findOneAndUpdate({_id:req.params.id}, {$push : {lab: data}}, {runValidators: true, new: true}, function(err, data){
                    if (err){
                        const errors = Object.keys(err.errors).map(key => err.errors[key].message) 
                        res.status(422).json(errors);
                    }
                    else{
                       res.json(data)
                    }
                })
               
                
            }
        })
    },

    updateLab: (req, res) => {
        Lab.findByIdAndUpdate(req.params.id , req.body, {runValidators: true, new: true} )
            .then((data) => {
                res.json({updatedLab: data});
               
                Paciente.findOneAndUpdate(
                    { "_id": req.body._id2, "lab._id": req.params.id },
                    { 
                        "$set": {
                            "lab": req.body
                        },
                                        
                    },
                    function(err,doc) {                       
                
                    }
                )              
                
            })
            .catch(err => {
                const errors = Object.keys(err.errors).map(key => err.errors[key].message) 
                res.status(422).json(errors )});
    },

    
    

//another way of updating child documents
//     updateProblema: (req, res) => {
//         console.log(req.body._id);
//         console.log("match this id")
//         console.log(req.params.id);
        
//         Problema.findByIdAndUpdate(req.params.id , req.body, {runValidators: true, new: true} )
//             .then((data) => {
//                 res.json({updatedProblema: data});

//                 Paciente.findById({ _id : req.body._id2 })
//                 .then((data) => {
//                     for(let i=0; i<data.problema.length; i++){
                      
//                         if(data.problema[i]._id==req.params.id){
                            
//                             data.problema[i].activo=req.body.activo;
//                             data.problema[i].nombre=req.body.nombre;
//                             console.log("match");
//                             console.log(data.problema[i]);
//                         }
//                     }
//                     data.save();
                   
//                     })
//                 .catch(err => res.json(err));
                                
//             })
//             .catch(err => {
//                 const errors = Object.keys(err.errors).map(key => err.errors[key].message) 
//                 res.status(422).json(errors )});
//     }
	
}


