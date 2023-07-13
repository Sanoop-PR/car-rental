const jwt = require('jsonwebtoken')


const logMiddleWare = (req,res,next)=>{
    console.log('Router Specific Middleware')

    const token = req.headers['access-token']
    // console.log(token)
    try {   
        const jwtResponse = jwt.verify(token,"supersecretKey")
        // console.log(jwtResponse)
        req.loginMobile=jwtResponse.loginUsername
        next()
    } catch{
        res.status(401).json("Please Log In")
    }
}

module.exports = {
    logMiddleWare
}