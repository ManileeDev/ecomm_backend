const jwt = require("jsonwebtoken")
const requireAuth = (req, res, next) => {
    // verify user is authenticated
    const { authorization } = req.headers
  
    if (!authorization) {
      return res.status(401).json({error: 'Authorization token required'})  //Bearer token [Bearer,token]
    }
  
    const token = authorization.split(' ')[1]
  
    try {
      const { id } = jwt.verify(token, process.env.rzp_secret)
      next();
    } catch (error) {
      console.log(error)
      res.status(401).json({error: 'Request is not authorized'})
    }
  }
  
  module.exports = requireAuth;