
const Auth = require("../controllers/auth.controller.js")
const authController = new Auth();


const signup = async (req, res, next) => {
    try {
        const { firstname, middlename, lastname, password, email, phone } = req.body;
        const user = {
            firstname,
            middlename,
            lastname,
            email,
            password,
            phone,
        }

        const doesExist = await authController.checkExistance(email)
        if (doesExist) {
            return res.status(400).json({ success: false, message: "User already registered!" });
        }
        const { token, createdUser } = await authController.create(user);
        res.status(201).json({ success: true, message: "You've successfully registered!", data: createdUser, token });
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
}

const login = async (req, res, next) => {

    const { email, password } = req.body;
    try {
        const doesExist = authController.checkExistance(email);
        if (!doesExist) {
            return res.status(404).json({ success: false, message: "User does not exist!" });
        }

        const isValidPassword = authController.checkValidation(password);
        if (!isValidPassword) {
            return res.status(400).json({ success: false, message: "Invalid Email/Password" })
        }
        const token = authController.authenticate(email, password);
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }

}


const authRoutes = (app) => {
    app.post("/auth/signup", signup);
    app.post("/auth/login", login);
}

module.exports = authRoutes