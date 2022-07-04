const express = require ('express')
const { exists } = require('../Schema/duplicateSupressionSchema')
const DuplicateTimeWindow = require('../Schema/duplicateSupressionSchema')
const auth = require('../middleware/auth')

const router = express.Router()

router.put('/api/duplicateTime', auth ,async (req,res) => {

   try{
    
    const duplicateTime = await DuplicateTimeWindow.findOneAndUpdate(
        {
            timeWindow : {
                $exists : true
            }
        },
        {
            timeWindow : req.body.timeWindow
        }
    )

    res.status(200).send({success: 'Duplicate Suppression Time Window Has been modified to ' + req.body.timeWindow})

   }catch(e){
    res.status(400).send({error: e.message})
   }
})

module.exports = router