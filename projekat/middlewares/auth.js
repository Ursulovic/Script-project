const jwt = require("jsonwebtoken");




function authToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    console.log('AAAA ' + Object.keys(req.headers))
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        console.log("No token!")
        req.user = {type: 'USER'};
        next();
        return;
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(403).json('Token not valid');

        req.user = user;
        next();
    })

}

module.exports = authToken;