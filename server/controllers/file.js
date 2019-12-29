const mongoose = require('mongoose');
const Paciente = mongoose.model('Paciente');
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
            //do all database record saving activity
            return res.json({originalname:req.file.originalname, uploadname:req.file.filename});
        });

    },

    download: (req,res)=>{
        filepath = path.join(__dirname,'../../uploads') +'/'+ req.body.filename;
        res.sendFile(filepath);
    }

}