const authenticate = (req, res, next) => {
    if (!req.session.userId) {
        res.status(401).send('Not Logged In');
        return;
    }

    next();
};

module.exports = {
    authenticate
};