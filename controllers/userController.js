const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const registerUser = async (req, res) => {
    const { name, email, password, isAdmin } = req.body;

    try {
        const existingUser = await User.findOne({ where: { email } });

        if (existingUser) {
            return res.status(400).send({
                success: false,
                message: "User already exists with this email"
            });
        }

        const newUser = await User.create({ name, email, password, isAdmin });
        res.status(201).send({
            success: true,
            message: "User registered successfully"
        });

    } catch (error) {
        res.status(500).send({ success: false, error: error.message });
    }
};


const LoginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const loggedInUser = await User.findOne({
            where: { email, password },
            attributes: ['id', 'isAdmin']
        });

        if (!loggedInUser) {
            return res.status(401).send({
                success: false,
                message: "Invalid email or password"
            });
        }

        const user = loggedInUser.dataValues;
        const token = jwt.sign(user, process.env.SECRET_KEY, { expiresIn: '2h' });
        res.status(200).send({
            message: "User logged in successfully",
            success: true,
            token: token
        });

    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).send({ success: false, error: error.message });
    }
};


const getUserInfo = async(req, res) => {
    console.log("req.user",req.user)
    try {

        loggedUser = await User.findOne({where:{id:req.user.id},attributes: ['id','name','email','isAdmin']})
        res.status(200).send({message:"got user info",loggedUser:loggedUser})
    } catch (error) {
        res.status(500).send({error:error})
    }

};


module.exports = {
    registerUser,
    LoginUser,
    getUserInfo
}