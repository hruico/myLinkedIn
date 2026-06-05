import jwt from 'jsonwebtoken'

export default function authMiddleware(req, res, next) {
    const token = req.headers.token;
    if (!token) {
        res.status(403).json({
            message: "You are not loggged in"
        })
        return;
    }

    const decoded = jwt.verify(token, "someGiberrish!@#1")
    const username = decoded.username;

    if (!username) {
        res.status(403).json({
            message: "Invalid Token"
        })
        return;
    }

    req.username = username;

    next();

}