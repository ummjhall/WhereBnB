const express = require('express');
const bcrypt = require('bcryptjs');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();

const validateSignup = [
  check('email')
    .custom(async value => {
      const existingUser = await User.findOne({where: {email: value}});
      if (existingUser) {
        throw new Error('User with that email already exists');
      }
    })
    .exists({checkFalsy: true}).isEmail().withMessage('Invalid email'),
  check('username')
    .custom(async value => {
      const existingUser = await User.findOne({where: {username: value}});
      if (existingUser) {
        throw new Error('User with that username already exists');
      }
    })
    .isLength({min: 4}).withMessage('Please provide a username with at least 4 characters.'),
  check('username').exists({checkFalsy: true}).withMessage('Username is required'),
  check('username').not().isEmail().withMessage('Username cannot be an email.'),
  check('firstName').exists({checkFalsy: true}).withMessage('First Name is required'),
  check('lastName').exists({checkFalsy: true}).withMessage('Last Name is required'),
  handleValidationErrors
];

// Sign Up a User
router.post('/', validateSignup, async (req, res) => {
  const { firstName, lastName, email, username, password} = req.body;
  const hashedPassword = bcrypt.hashSync(password);
  const newUser = await User.create({firstName, lastName, email, username, hashedPassword});

  const safeUser = {
    id: newUser.id,
    firstName: newUser.firstName,
    lastName: newUser.lastName,
    email: newUser.email,
    username: newUser.username,
  };

  setTokenCookie(res, safeUser);

  return res.json({user: safeUser});
});

module.exports = router;
