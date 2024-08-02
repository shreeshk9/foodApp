const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Import your User model
const { body, validationResult } = require('express-validator');
const bycrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtSecret = "sksepttwozerozerothreeXXXXXXXXXXXXXXXX";


router.post(
  '/createuser',
  body('email').isEmail(),
  body('password', 'Password length should be at least 5 characters').isLength({ min: 5 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const salt = await bycrypt.genSalt(10);
    let secPassword = await bycrypt.hash(req.body.password, salt)

    try {
      await User.create({
        name: req.body.name,
        password: secPassword,
        email: req.body.email,
        location: req.body.location
        
      }).then(res.json({ success: true}))
    }
    catch (error){
      console.log(errors)
    }
});

router.post(
  '/loginuser',
  body('email').isEmail(),
  body('password', 'Password length should be at least 5 characters').isLength({ min: 5 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ success: false, error: 'User not found' });
      }
      const pwdCompare = await bycrypt.compare(req.body.password, user.password)

      if (!pwdCompare) {
        return res.status(400).json({ success: false, error: 'Invalid password' });
      }
      const data = {
        user: {
          id: user.id
        }
      }
      const authToken = jwt.sign(data,jwtSecret)
      res.json({ success: true, authToken:authToken ,message: 'Login successful' });
    } catch (error) {
      console.error('Error logging in:', error);
      res.status(500).json({ success: false, error: 'Internal server error' });
    }
  }
);

module.exports = router;
