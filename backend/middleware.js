module.exports.isLoggedIn = (req,res,next)=>{

    if(!req.isAuthenticated()){

        return res.status(401).json({
            success:false,
            message:"Please login first"
        });

    }

    next();

}