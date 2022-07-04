const mongoose = require('mongoose')
const EntityList = require('./entityListSchema')

const alertSchema = new mongoose.Schema({
    id:{
        type:Number,
        required:true,
        unique:true
    },
    entityName:{
        type:String,
        required:true,
        validate:{
            validator: function(entityName){
                return new Promise( async (resolve,reject) => {
                    try{
                        const record = await EntityList.findOne({name:entityName})
                        resolve(record)
                    }catch(e){
                        reject(e.message)
                    }
                   
                })
            }
        }
    },
    faultName:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    severity:{
        type:String,
        required:true,
        enum:['CRITICAL','WARNING']
    },
    status:{
        type:String,
        required:true,
        enum:['DETECTED','PROCESSING','MANUAL','SUPPRESSED-DUPLICATE',
                'SUPPRESSED-MAINTENANCE','SUPPRESSED-IRRELEVANT'
                ]
    },
    createdAt:{
        type:Date,
        default:Date.now,
    }
})

const Alerts = mongoose.model('Alert',alertSchema)

module.exports = Alerts