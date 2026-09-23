const mongoose = require('mongoose');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

//Generate JWT token
const generateToken = userID => {
    return jwt.sign({ id: userID }, process.env.JWT_SECRET, { expiresIn: '1h' });
}

//Register a new user
async function registerUser(req, res) {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) { //Missing username, email, or password
            return res.status(400).json({success:false, message: 'Please provide username, email, and password' });
        }
        if (await User.findOne({ email })) { //Email already exists
            return res.status(400).json({success:false, message: 'Email already exists' });
        }
        const newUser = await User.create({ username, email, password });

        const token = generateToken(newUser._id);
        //Successfully registered user
        //Return token and user info
        res.status(201).json({ success:true,
            message: 'User registered successfully',
            token,
            user: {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email, 
            }
        });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({success:false, message: 'Server error' });
    }
}

//Login an existing user
async function loginUser(req, res) {
    try {
        const { email, password } = req.body;
        
        if (!email || !password) {
            return res.status(400).json({success:false, message: 'Please provide email and password' });
        }

        const user = await User.findOne({ email }).select('+password');
        
        if (!user) {
            return res.status(401).json({success:false, message: 'Invalid email or password' });
        }
        
        const doesPasswordMatch = await user.comparePassword(password);
        if (!doesPasswordMatch) {
            return res.status(401).json({success:false, message: 'Invalid email or password' });
        }

        const token = generateToken(user._id);

        res.status(200).json({ success:true, message: 'Login successful', 
            token, 
            user: { 
                id: user._id, 
                username: user.username, 
                email: user.email } 
            });
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({success:false, message: 'Server error' });
    }
}

module.exports = { registerUser, loginUser };