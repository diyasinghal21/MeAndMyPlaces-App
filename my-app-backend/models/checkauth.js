const jwt = require('jsonwebtoken');
const Httperror = require('./http-error');
module.exports = (req, res, next) => {
    if (req.method === 'OPTIONS') {
        return next();
    }
    try {
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            throw new Error('authentication failed');
        }

        const decoded = jwt.verify(token, 'dishi');
        req.userdata = { userid: decoded.userid };
        next();
    }
    catch (err) {
        const error = new Httperror('authentication failed', 401);
        return next(error);
    }


}