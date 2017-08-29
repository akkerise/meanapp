const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../models/users');
const config = require('../config/database');


// Register
router.post('/register', (req, res, next) => {
    // res.send('REGISTER');
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    });

    User.getUserByUsername(newUser.username, (err, res) => {
        if (err) throw err;
        res.json({success: true, user: res})
    })

    // User.addUser(newUser, (err, user) => {
    //     if (err) {
    //         res.status(201).json({success: false, message: 'Failed to register user'});
    //     } else {
    //         res.status(200).json({success: true, message: 'User register success'});
    //     }
    // });
});

// Authenticate
router.post('/authenticate', (req, res, next) => {
    let username = req.body.username;
    let password = req.body.password;


    User.getUserByUsername(username, (err, user) => {
        if (err) throw err;

        if (!user) {
            return res.status(404).json({success: false, message: 'User not found'})
        }

        User.comparePassword(password, user.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {

                const token = jwt.sign(user, config.secret, {
                    expiresIn: 604800 // 1 week
                });

                return res.status(200).json({
                    success: true,
                    token: 'JWT ' + token,
                    user: {
                        id: user._id,
                        name: user.name,
                        username: user.username,
                        email: user.email
                    }
                });

            } else {
                return res.status(201).json({success: false, message: 'Wrong password'})
            }


        })
    })
});

// Login
router.get('/login', (req, res, next) => {
    res.send('LOGIN');
});

router.get('/:id', (req, res, next) => {
    // res.send(req.params)
    User.getUserById(req.params.id, (err, data) => {
        return res.json({data: data})
    })
});


// Profile
router.post('/profile', passport.authenticate('jwt'),
    function (req, res) {
        res.redirect('/profile/' + req.user.username);
    }
);

router.get('/abc/:dd', (req, res, next) => {
    res.send(req.params.dd);
});

router.get('/def', (req, res) => {
    res.send('Hello Def')
});

router.get('/profile/:username', (req, res, next) => {
    User.getUserByEmail(req.params.username, (err, data) => {
        return res.json({data: data});
    })
});

module.exports = router;