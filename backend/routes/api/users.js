const express = require('express');
const bcrypt = require('bcryptjs');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const router = express.Router();

// Sign up
router.post('/', async (req, res) => {
  const { firstName, lastName, email, password, username } = req.body;
  const hashedPassword = bcrypt.hashSync(password);
  const newUser = await User.create({firstName, lastName, email, username, hashedPassword});

  const safeUser = {
    id: newUser.id,
    email: newUser.email,
    username: newUser.username,
  };

  await setTokenCookie(res, safeUser);

  return res.json({user: safeUser});
});

module.exports = router;
