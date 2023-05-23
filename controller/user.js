import bcrypt from 'bcrypt'

import user from '../models/user.js'

import jwt from 'jsonwebtoken'

export const registerForm = (req, res) => {
    res.render('authentication/register', {});
};

export const register = async (req, res) => {
    const { username, email, password } = req.body

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    await user.create({ username, email, password: hash })
    res.redirect('/login');
};

export const logForm = (req, res) => {
    res.render('authentication/login', {});
};

export const log = async (req, res) => {
    const { email, password } = req.body
    const loggedUser = await user.findOne({ email });
    const isCorrectPassword = bcrypt.compareSync(password, loggedUser.password);
    if (!isCorrectPassword) return res.send("incorrect password")

    const data = {
        _id: loggedUser._id,
        email: loggedUser.email,
    };
    const jwtToken = jwt.sign(data, process.env.JWT_SECRET);
    res.cookie('token', jwtToken);
    res.send('logged in');
};