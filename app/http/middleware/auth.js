function auth(req, res, next) {
    if(req.isAuthenticated() && req.user.role ==='customer'){
        return next()
    }
    return res.redirect('/login')
}


module.exports = auth