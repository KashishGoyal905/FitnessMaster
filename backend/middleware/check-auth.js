const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    if (req.method === 'OPTIONS') {
        return next();
    }

    try {
        // authorization: 'Bearer Token';
        // to check if token exists or not
        const token = req.headers.authorization.split(' ')[1];
        console.log('Token from the check auth file: ', token);
        if (!token) {
            console.log('Authentication failed from the auth file');
            return res.status(401).json({ message: 'Authentication required' });
        }

        //token might be invalid
        // it will have the first argument which we store as a payload when we generated token
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
        // adding an object to the req of user data
        req.user = decodedToken;
        // letting it pass to the next route
        next();
    } catch (err) {
        console.log('Authentication failed from the check auth file', err);
        return res.status(401).json({ message: 'Invalid token' });
    }
}