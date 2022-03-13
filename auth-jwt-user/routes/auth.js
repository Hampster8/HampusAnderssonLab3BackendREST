const router = require('express').Router();
const User = require('../model/User');
const { registerValidation, loginValidation } = require('../validation');
const bcrypt = require("bcryptjs"); // hashes passwords
const jwt = require("jsonwebtoken");
const signale = require('signale');

router.post("/register", async (req, res) => {

    // Validate User
    const { error } = registerValidation(req.body);

    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    };

    // check for existing user
    const emailExist = await User.findOne({ email: req.body.email });

    if (emailExist) {
        return res.status(400).json({ error: 'Email already exists' });
    }

    // Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    //Create a new user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword
    });
    try {
        const savedUser = await user.save();
        const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
        res.json({ user: user._id, redirect: 'batcave', token });
    } catch (error) {
        res.status(400).json(error);
    }

});

router.post('/login', async (req, res) => {
    const { error } = loginValidation(req.body);

    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    // if existing email
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
        return res.status(400).json({ error: 'Email is not found!' });
    }

    // Password Correct?

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
        return res.status(400).json({ error: 'Invalid Password' });
    }

    // create and assign a token to Frontend
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
    res.header('auth-token', token).json({ token, redirect: 'batcave' });

});


module.exports = router;
