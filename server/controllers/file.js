const mongoose = require('mongoose');
const Paciente = mongoose.model('Paciente');
const File = mongoose.model('File');
const multer = require('multer');
const path = require('path');


const store = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null, './uploads');
    },
    filename:function(req,file,cb){
        cb(null, Date.now()+'.'+file.originalname);
    }
});
const upload = multer({storage:store}).single('file');

module.exports = {
    
    upload: (req,res)=>{
        upload(req,res,function(err){
            if(err){
                return res.status(501).json({error:err});
            }
            let body ={filename: '', originalname: ''};
            body.filename=req.file.filename;
            body.originalname=req.file.originalname;
            let id=req.body.uid;

            //do all database record saving activity
            File.create(body, function(err, data){
                if (err){
                    console.log(err);
                    const errors = Object.keys(err.errors).map(key => err.errors[key].message)                     
                    res.status(422).json(errors );
                }
                else{
                    Paciente.findOneAndUpdate({_id:id}, {$push : {file: data}}, {runValidators: true, new: true}, function(err, data){                        
                        if (err){
                            console.log(err);
                            const errors = Object.keys(err.errors).map(key => err.errors[key].message) 
                            res.status(422).json(errors );                            
                        }
                        // else{
                        //    res.json(data)
                        // }
                    })
                   
                    
                }
            })

            return res.json({originalname:req.file.originalname, uploadname:req.file.filename});
        });

    },

    download: (req,res)=>{
        filepath = path.join(__dirname,'../../uploads') +'/'+ req.body.filename;
        res.sendFile(filepath);
    }

}