const jwt = require('jsonwebtoken')

 const jwtMiddleware = (req,res,next)=>{
    console.log('inside jwt middleware');

   
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
        return res.status(401).json({ message: "Authorization header missing" });
    } 
    
    const token = req.headers["authorization"].split(' ')[1]
    console.log(token);
    
    try {
        const jwtResponse = jwt.verify(token,"supersecretekey")
        console.log(jwtResponse);
        req.payload = jwtResponse.userId
        next()
        
        
    } catch (error) {
      res.status(401).json(`Authorization failed ${error}`)  
      res.status(401).json({ message: `Authorization failed: ${error.message}` });
    }
    
    
}
 
 module.exports = jwtMiddleware 






