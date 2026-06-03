import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader.split(' ')[1];
        if (!token) {
            return res.status(500).json({
                message: "token is missing"
            })
        }


        const decoded = jwt.verify(token, "JWT_SECRET")
        
        req.user = decoded;
        next()

    } catch (err) {
        res.status(401).json({
            message: "Invalid token"
        });
    }
}
export default authMiddleware