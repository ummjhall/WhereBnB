const jwt = require('jsonwebtoken');
const { jwtConfig } = require('../config');
const { User, Spot } = require('../db/models');
const { secret, expiresIn } = jwtConfig;

// Send a JWT Cookie
const setTokenCookie = (res, user) => {
  // Create the token
  const safeUser = {
    id: user.id,
    email: user.email,
    username: user.username,
  };
  const token = jwt.sign(
    { data: safeUser },
    secret,
    { expiresIn: parseInt(expiresIn) }
  );

  const isProduction = process.env.NODE_ENV === "production";

  // Set the token cookie
  res.cookie('token', token, {
    maxAge: expiresIn * 1000,
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction && "Lax"
  });

  return token;
};

const restoreUser = (req, res, next) => {
  const { token } = req.cookies;
  req.user = null;

  return jwt.verify(token, secret, null, async (err, jwtPayload) => {
    if (err) {
      return next();
    }

    try {
      const { id } = jwtPayload.data;
      req.user = await User.findByPk(id, {
        attributes: {
          include: ['email', 'createdAt', 'updatedAt']
        }
      });
    } catch (e) {
      res.clearCookie('token');
      return next();
    }

    if (!req.user) res.clearCookie('token');

    return next();
  });
};

// If there is no current user, return an error
const requireAuth = function (req, _res, next) {
  if (req.user) return next();

  const err = new Error('Authentication required');
  err.title = 'Authentication required';
  err.errors = {message: 'Authentication required'};
  err.status = 401;
  return next(err);
}

const authorize = function (req, _res, next) {
  if (req.params.spotId) authorizeSpot(req, next);
}

const authorizeSpot = async function (req, next) {
  const { id } = req.user;
  const { spotId } = req.params;
  const spot = await Spot.findOne(
    {where: {id: spotId}, include: [{model: User, as: 'Owner', attributes: ['id']}]
  });
  if (!spot) return next();

  if (id == spot.Owner.id) return next();

  const err = new Error('Forbidden');
  err.errors = {message: 'Forbidden'}
  err.status = 403;
  return next(err);
}

module.exports = { setTokenCookie, restoreUser, requireAuth, authorize };
