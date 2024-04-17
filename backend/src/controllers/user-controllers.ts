import User from '../models/users.js'
import { compare, hash } from 'bcrypt'
import { createToken } from '../utils/token-manager.js'
import { COOKIE_NAME } from '../utils/constants.js'

export const getAllUser = async(req,res) => {
    try {
        const user = await User.find();
        return res.status(201).send({ message: "Ok", user });
    } catch (error) {
        console.log(error);
        return res.status(200).send({ message: "Error", cause: error.message });
    }
}

export const signupUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email })
        if (existingUser) return res.status(401).send("User already registered");
        const hashedPassword = await hash(password, 10);
        const user = new User({name, email, password: hashedPassword})
        await user.save();

        res.clearCookie(COOKIE_NAME, {
            path: '/',
            domain: 'localhost',
            signed: true,
            httpOnly: true,
            secure: true
        }) 

        const token = createToken(user._id.toString(), user.email, "7d");        
        const expires = new Date();
        expires.setDate(expires.getDate() * 7);
        res.cookie(COOKIE_NAME, token, {
            path: '/',
            domain: 'localhost',
            signed: true,
            httpOnly: true,
            secure: true
        })

        return res.status(201).json({ message: "ok", name: user.name, email: user.email });

    } catch (error) {
        console.log(error);
        return res.status(200).send({ message: "Error", cause: error.message });
    }
}

export const loginUser = async(req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).send("User not Registered");
        }
        const isPasswordCorrect = compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).send("Passord is Incorrect");
        }

        res.clearCookie(COOKIE_NAME, {
            path: '/',
            domain: 'localhost',
            signed: true,
            httpOnly: true,
            secure: true
        }) 

        const token = createToken(user._id.toString(), user.email, "7d");
        const expires = new Date();
        expires.setDate(expires.getDate() + 7);
        res.cookie(COOKIE_NAME, token, {
            path: '/',
            domain: 'localhost',
            signed: true,
            httpOnly: true,
            secure: true
        })
        return res.status(200).json({message: 'ok', name: user.name, email: user.email})
    } catch (error) {
        console.log(error);
        return res.status(200).send({ message: "Error", cause: error.message });
    }
}

export const verifyUser = async (req, res) => {
    try {
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(401).send("Permissions didn't match");
        }
        if (user._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).send("Permissions didn't match");
        }
        res.status(200).json({ message: "OK", name: user.name, email: user.email });
    } catch (error) {
        console.log(error.message)
        res.status(200).json({message: "ERROR", cause: error.message})
    }
}

export const userLogout = async (req, res) => {
    try {
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(401).send("User not Registered");
        }
        if (user._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).send("Permissions didn't match");
        }

        res.clearCookie(COOKIE_NAME, {
            path: '/',
            domain: 'localhost',
            signed: true,
            httpOnly: true,
            secure: true
        })
        return res
        .status(200)
        .json({ message: "OK", name: user.name, email: user.email });
    } catch (error) {
        console.log(error);
    }
}