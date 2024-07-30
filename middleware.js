isLoggedIn=(req,res,next)=>{
    if(!req.isAuthenticated()){
        req.session.redirectUrl= req.originalUrl;
        //console.log(req.session.redirectUrl);
       return res.redirect("/login");
    }
    else{
    next();
}
}
module.exports= isLoggedIn;

module.exports.saveRedirectUrl= (req ,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl= req.session.redirectUrl ;
        //console.log(res.locals.redirectUrl);
    }
    else {
   return next();
}
}