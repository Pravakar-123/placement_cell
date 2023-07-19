module.exports.authentication=function(req,res,next){
    if(req.cookies.user_id){
        next();
    }
    else{
        res.redirect('/');
    }

}