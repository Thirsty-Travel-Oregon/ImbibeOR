const jwt = require('jsonwebtoken');
const secret = process.env.APP_SECRET || 'app-secret';

module.exports = {
  assignToken(user) {
    return new Promise((resolve, reject) => {
      
      const payload = {
        id: user._id,
        roles: user.roles
      };

      jwt.sign(payload, secret, null, (err, token) => {
        if(err) return reject(err);
        resolve(token);
      });
    });
  },

  verifyToken(token) {
    return new Promise((resolve, reject) => {
      jwt.verify(token, secret, (err, payload) => {
        if(err) return reject(err);
        resolve(payload);
      });
    });
  }
};