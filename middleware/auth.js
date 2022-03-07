const jwt = require('jsonwebtoken');

const authenticateToken = async (req, res, next) => {

    const token = req.headers['authorization']
//     console.log(req.headers)
    
    try{
       const user = jwt.verify(token, "hhh");
        
//         console.log(user)
       req.params.userId = user._id;
    
       next();
    }

    catch(err){
       console.log("Error == ",err.message);
       return res.status(401).json({err: "Not Autheticated!"});
    }
}
// module.exports = { authenticateToken }
const validator = require('../validator/validator');

const signup = (req, res, next) => {
    const validationRule = {
        "email": "required|email",
        "Name": "required|string",
        // "phone": "required|string",
        "password": "required|string|min:6|confirmed",
        // "gender": "string"
    }
    console.log(validationRule)
    // res.send(validationRule )
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412)
                .send({
                    success: false,
                    message: 'Validation failed',
                    data: err
                });
        } else {
            next();
        }
    });
}

module.exports = { authenticateToken ,signup}


