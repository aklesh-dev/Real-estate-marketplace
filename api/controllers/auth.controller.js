import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from "../models/user.model.js";
import { errorHandler } from '../utils/error.js';

export const signUp = async(req, res, next) => {
    const {username, email, password } = req.body; 
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({username, email, password: hashedPassword});
    try {
        await newUser.save();
        res.status(200).json("User saved successfully.");
        
    } catch (error) {
        next(error);     
    }
};

export const signin = async (req, res, next) => {
    const {email, password} = req.body;
    try {
        const validUser = await User.findOne({email});
        if(!validUser) return next(errorHandler(404, "User not found!"));
        const isValidPassword = bcryptjs.compareSync(password, validUser.password);
        if(!isValidPassword) return next(errorHandler(401, "Invalid credentials!"));
        const {password: hashedPassword, ...userInfo} = validUser._doc;
        const token = jwt.sign({ id: validUser._id}, process.env.JWT_SECRET);
        res.cookie('access_token', token, {
            httpOnly: true,
            expires: new Date(Date.now()+3600000),
        }).status(201).json(userInfo);

    } catch (error) {
        next(error);        
    }
};

export const google = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email});
        // --if user exist sign in else create user.
        if(user){
            const token = jwt.sign({ id: user._id}, process.env.JWT_SECRET);
            const { password: hashedPassword, ...userInfo} = user._doc;
            res.cookie('access_token', token, {
                httpOnly: true,
                expires: new Date(Date.now()+3600000),
            }).status(201).json(userInfo);
        } else{
            const generatePass = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
            const hashedPassword = bcryptjs.hashSync(generatePass, 10);
            const newUser = new User({
                username: req.body.name.split(" ").join("").toLowerCase()+Math.floor(Math.random()*1000).toString(),
                email: req.body.email,
                password: hashedPassword,
                avatar: req.body.photo,
            });
            await newUser.save();
            const token = jwt.sign({id: newUser._id}, process.env.JWT_SECRET);
            const { password: PassRM, ...userInfo } = newUser._doc;
            res.cookie('access_token', token, {
                httpOnly: true,
                expires: new Date(Date.now()+3600000),
            }).status(201).json(userInfo)
        }
        
    } catch (error) {
        next(error);        
    }
};

export const signOut = async (req, res, next) => {
    try {
        res.clearCookie("access_token");
        res.status(200).json( "User signed out successfully" );
    } catch (error) {
        next(error);        
    }
};