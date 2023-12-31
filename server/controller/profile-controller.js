import User from "../models/user.js";

export const addUser = async (req, res) => {
    try {
        const data = req;
        const user = new User({
            email: data.email,
            password: data.password
        });
        user.refreshTokens.push(data.refreshToken);
        user.save();
        console.log("User added successfully");
    }
    catch (err) {
        console.log("Error in adding user in database");
        res.status(500).json({ error: err.message });
    }
};