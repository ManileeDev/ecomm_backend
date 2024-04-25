// const jwt = require('jsonwebtoken');

// const authMiddleware = (req,res,next)=>{
//     const {authorization} = req.headers;
    
//     const token  = authorization.split(' ')[1]

//     try{
//         const {name} = jwt.verify(token,process.env.SECRET);
//         console.log(name)
//     }catch{

//     }
    
//     next();
// }

// module.exports = {authMiddleware}