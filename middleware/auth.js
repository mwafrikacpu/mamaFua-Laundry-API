const jwt = require('jsonwebtoken');
const { accounts } = require('../app/models');
const dotenv = require('dotenv');
dotenv.config();
const auth = (req, res, next) => {
  try {
    const bearerToken = req.headers.authorization;
    const token = bearerToken ? bearerToken.split('Bearer ')[1] : null;
    if (!token) {
      return res.status(401).json({
        status: 'failed',
        message: 'Required authorization',
      });
    }
    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
      if (err)
        return res.sendStatus(403).json({
          status: 'failed',
          message: 'Failed authorization',
        });

      if (user.id) {
        console.log('USER', user);
        accounts.findByPk(user.id).then((instance) => {
          req.user = instance;
          return next();
        });
      }
    });
  } catch (err) {
    res.status(401).json({
      status: 'failed',
      message: 'Invalid token',
    });
  }
};
module.exports = auth;
