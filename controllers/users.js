// src/controllers/authController.js
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import {User} from '../models/modelSchema.js';





export const login = async (req, res) => {
    const secret = process.env.Secret
  const { username, password } = req.body;

  try {
    
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

   
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ user: { id: user._id, username: user.username } }, secret, {
      expiresIn: '24h',
    });

    res.json({ username: user.username, token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



export const signup = async (req, res) => {
    const secret = process.env.Secret
  const { username, email, password } = req.body;

  try {
    //hasing the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

  
    const newUser = new User({ username, email, password: hashedPassword });

  
    const savedUser = await newUser.save();

    // Generating a JWT token
    const token = jwt.sign({ user: { id: savedUser._id, username: savedUser.username } }, secret, {
      expiresIn: '24h',
    });

    res.status(201).json({
      username: savedUser.username,
      token,
      message: 'User created successfully',
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
