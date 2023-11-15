const router = require('express').Router();
const { restoreUser } = require('../../utils/auth.js');

// If current user session is valid, set req.user to the user in the database
// Otherwise set req.user to null
router.use(restoreUser);

module.exports = router;
