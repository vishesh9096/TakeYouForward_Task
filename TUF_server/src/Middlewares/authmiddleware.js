const JWT_SECRET = process.env.JWT_SECRET;
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({"message":"unauthorised"});
    }
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("decodednn ", decoded)
        req.userId = decoded.userId;
        next();
    } catch (err) {
        console.log("err ", err)
        return res.status(403).json({});
    }
};

module.exports = {
    authMiddleware
}