const jwt = require('jsonwebtoken')



const auth = (req,res,next) =>{
    // console.log(req.headers,"This is headers*****")
    
tokenBearer = req.headers.authorization
    // console.log(tokenBearer,"Token with Bearer")
if(!tokenBearer?.startsWith('Bearer')){
    res.send({message:"invalid authorization header"})
}
let token = tokenBearer.split(' ')
token = token[1]
console.log(token)
let decoded = jwt.verify(token,process.env.SECRET_KEY)
console.log(decoded)
req.user = decoded

next()
}


module.exports = {auth}