const mongoose = require('mongoose');
const Paciente = mongoose.model('Paciente');
const Actual = mongoose.model('Actual');
const Patologico = mongoose.model('Patologico');
const NoPatologico = mongoose.model('NoPatologico');
const Familiar = mongoose.model('Familiar');

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
        const paciente = new Paciente(req.body); 
      
        paciente.save()
            .then((data) => {
                res.json({newPaciente: data});
            })
            .catch(err => {
                const errors = Object.keys(err.errors).map(key => err.errors[key].message) 
                res.status(422).json(errors )});
    },
    update: (req, res) => {
        Paciente.findByIdAndUpdate(req.params.id , req.body, {runValidators: true, new: true} )
            .then((data) => {
                res.json({updatedPaciente: data});
            })
            .catch(err => {
                const errors = Object.keys(err.errors).map(key => err.errors[key].message) 
                res.status(422).json(errors )});
    },
	
    delete: (req, res) => {
        Paciente.findOneAndDelete({ _id : req.params.id })
            .then((data) => {
                res.json(data);
            })
            .catch(err => {
                res.json(err);
            });
    },
	
    createActual: function(req,res){//very important if you are going to copy and past this code make sure to rename Product to appropiate
        Actual.create(req.body, function(err, data){
            if (err){
                const errors = Object.keys(err.errors).map(key => err.errors[key].message) 
                res.status(422).json(errors );
            }
            else{//note it may remove the $push. be sure to add it before : {comment: data}}
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
        console.log("hitting updateActual route");
        // console.log(req.body);
        console.log(req.body._id2);
        Actual.findByIdAndUpdate(req.params.id , req.body, {runValidators: true, new: true} )
            .then((data) => {
                res.json({updatedActual: data});
               
                Paciente.findOneAndUpdate(
                    { "_id": req.body._id2, "patologico._id": req.params.id },
                    { 
                        "$set": {
                            "actual": req.body
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
        // console.log("in controller")
        // console.log(req.body._id2);
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
        // console.log("in controller")
        // console.log(req.body._id2);
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
        // console.log("in controller")
        // console.log(req.body._id2);
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
    }
	
}
