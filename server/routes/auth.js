import express from 'express';
const router = express.Router();
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';
const SECRET = 'secret';

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username: username });
        if (!user) return res.status(400).json({ message: "invalid credentials, try again" });

        const correct = (user.password == password);
        if (!correct) return res.status(400).json({ message: "invalid credentials, try again" });


        const token = jwt.sign({ id: user._id, username: user.username }, SECRET, { expiresIn: '1h' });

        res.cookie('token', token, {
            httpOnly: true,
            secure: false,
            sameSite: 'Lax',
            maxAge: 24 * 60 * 60 * 1000
        });

        res.json({ message: 'successful authentication' });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "server error" });
    }

});

router.post('/createUser', async (req, res) => {
    const { username, password } = req.body;
    try {
        await User.create({ username: username, password: password });
        console.log("user created");
        return res.json({ message: "user successfully created" });
    } catch (err) {
        if (err.code == 11000) {
            console.log("duplicate");
            return res.status(400).json({ message: 'username already taken' });
        }
        console.log("say server error");
        return res.status(500).json({ message: "internal server error" });
    }

});

router.post('/logout', (req, res) => {
    res.clearCookie('token');
    res.json({ message: 'logged out' });
});


export default router;