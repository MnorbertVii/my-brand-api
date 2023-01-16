module.exports = function isLoggedIn(req, res, next){
    let  header = req.headers["authorization"];
    if(!header){
        res.status(403);
        return res.json({
            statusCode: "403",
            error: "Unauthorised Access",
            message: "Missing authorization token"
        });
    }
    let token = header.split(" ")[1];
    try {
        var decoded = jwt.verify(token, 'RESTfulAPIs');
        req.user = decoded;
        next();
      } catch(err) {
        // err
        res.status(403);
        return res.json({
            statusCode: "403",
            error: "Unauthorized acccess",
            message: "Invalid token"
        })
      }
}