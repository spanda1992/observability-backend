const jwt = require('jsonwebtoken')
const Token = require('../Schema/tokenSchema')

const auth = async (req,res,next) => {

    try{

        if(req.header('Authorization')){
            const token = req.header('Authorization').replace('Bearer ','')
            const decoded = jwt.verify(token, process.env.JWT_TOKEN_SECRET_KEY)
            req.user_ID = decoded._id
            next()
        } else{
            res.status(400).send({error : 'Please authenticate !'})
        }       
    }catch(e){
        res.status(400).send({error : e.message})
    }
}

module.exports = auth