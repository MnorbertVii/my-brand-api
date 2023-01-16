module.exports = function IsAdmin(req, res, next){
    let user = req.user;
    if(user.role !== "admin"){
        res.status(403);
        return res.json({
            statusCode: "403",
            error: "Unauthorized access",
            message: "The route is only accessible by admin"
        });
    }
    next();

}