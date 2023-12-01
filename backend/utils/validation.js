const { validationResult } = require('express-validator');

// Format errors from express-validator middleware
const handleValidationErrors = (req, _res, next) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    const errors = {};
    validationErrors
      .array()
      .forEach(error => errors[error.path] = error.msg);

    const err = Error("Bad Request");
    err.errors = errors;
    err.status = 400;
    err.title = "Bad Request";

    if ((err.errors.email && err.errors.email.includes('already exists')) ||
        (err.errors.username && err.errors.username.includes('already exists'))) {
      err.message = 'User already exists';
      err.status = 500;
    }

    next(err);
  }

  next();
};

module.exports = { handleValidationErrors };
