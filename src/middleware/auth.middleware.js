 const jwt = require('jsonwebtoken')
 
 async function identifyUser(req,res, next){  // ye function hame user find krke dega ki konsa user request kr rha h
    const token = req.cookies.token // ye hamne find kiya ki konsa user post create kr rha h or request kr rha h post create krne ki
    // jab user post create krega to vo apne token k sath request krega usi token se ham find krenge konsa user h
    
    if(!token){
        return res.status(401).json({
            message: 'TOken not exist, Unauthorized access'
        })
    }
    
    let decoded = null
    
    try{   // agar user sahi token se authorize kr rha h to try method run hoga
        decoded = jwt.verify(token, process.env.JWT_SECRET)
    } catch(err){   // agar token glt h to catch method error send kr dega glt token ka
        return res.status(401).json({
            message: 'user not anthorized'
        })
    }
  
    req.user = decoded    // ye ek property h isme set kr rhe h ki konsa user request kr rha h 
    // us user ka data hamne yha pr set kr diya 
    // jo bhi user request krega use "req.user" me set krenge or use aage forward kr denge

    next()  // jab hame midlleware se request age bhejni hoti h controller pr uske liye next() method ka use krte h
} 
 
module.exports = identifyUser
