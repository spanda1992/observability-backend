const express = require('express')
const EntityList = require('../Schema/entityListSchema')
const multer = require('multer')
const path = require('path')
const auth = require('../middleware/auth')

const router = express.Router()

router.post('/api/addEntity', auth ,async (req,res) => {
    
    try{
        const entity = new EntityList(req.body)
        await entity.save()
        res.status(201).send({success:'Entity Created Successfully'})
    }catch(e){
        res.status(400).send({error:e.message})
    }
})

router.get('/entityList', auth ,async(req,res) => {
    try{
        const entityList = await EntityList.find()
        res.status(200).send(entityList)
    }catch(e){
        res.status(500).send({error:e.message})
    }
})


// const upload = multer({
//     dest:'uploads/'
// })


const storage= multer.diskStorage({
    destination: (req,res,callback) => {
        callback(null,'uploads/')
    },

    filename: (req,file,callback) => {
        callback(null, Date.now()+'-'+file.originalname)
    }
})

const upload = multer({
    storage,
    limits : {
        fileSize: 10000000,
    },
    fileFilter: (req,file,callback) => {
        const fileTypes = /csv/;

        const extName = fileTypes.test(path.extname(file.originalname).toLowerCase())

        const mimeType = fileTypes.test(file.mimetype);

        if(mimeType && extName){
            callback(null,true)
        }else{
            callback('Error: CSV Only allowed')
        }
    }
}).single('image')

router.post('/api/entities/fileUpload', auth ,async(req,res) => {

    upload(req,res,(err) => {
        if(err){
            res.status(400).send({error:err})
        }

        try{
            res.status(200).send(req.file)
        }catch(e){
            res.status(500).send({error:e.message})
        }
    })

})


module.exports = router