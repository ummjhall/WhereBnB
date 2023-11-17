const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const { restoreUser } = require('../../utils/auth.js');

// If current user session is valid, set req.user to the user in the database
// Otherwise set req.user to null
router.use(restoreUser);
router.use('/session', sessionRouter);
router.use('/users', usersRouter);

router.post('/test', (req, res) => {
  res.json({requestBody: req.body});
});

module.exports = router;