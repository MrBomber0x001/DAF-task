const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const { JWT_SECRET } = process.env;


const verifyToken = (req, res, next) => {
    try {
        const authToken = req.headers['authorization'];
        console.log(authToken);
        const token = authToken ? authToken.split(" ")[1] : ' ';
        if (!token) {
            return res.status(403).json({ success: false, message: 'Please provide authentication token!' });
        }
        const userId = jwt.verify(token, "secret");
        console.log(userId);
        req.userId = userId
        next();
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
}

const signToken = (userId) => {
    return jwt.sign(userId.toString(), "secret")
}


module.exports = {
    signToken,
    verifyToken
}