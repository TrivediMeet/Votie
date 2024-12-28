import jwt from "jsonwebtoken";
const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader === null || authHeader === undefined) {
        res.status(401).json({
            status: 401,
            message: "Unauthorized"
        });
        return;
    }
    const token = authHeader.split(" ")[1];
    // * verify token
    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        if (err) {
            res.status(401).json({
                status: 401,
                message: "Unauthorized"
            });
            return;
        }
        /* if everything is good, save to request for use in other routes */
        req.user = user;
        next();
    });
};
export default authMiddleware;
