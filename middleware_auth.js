const jwt = require('jsonwebtoken');

const authenticateToken = async (req, res, next) => {

    const token = req.headers['authorization']
    
    try{
       const user = jwt.verify(token, "hhh");
       req.params.userId = user._id;
    
       next();
    }

    catch(err){
       console.log("Error == ",err.message);
       return res.status(401).json({err: "Not Autheticated!"});
    }
}
module.exports = { authenticateToken }
