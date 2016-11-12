const tokenFuncs = require('./token');

module.exports = function runEnsureAuth() {
  return function ensureAuth(req, res, next) {
    const authHeader = req.headers.authorization;
    const [bearer, token] = authHeader.split(' ');

    if(!authHeader) {
      return next({
        code: 400,
        error: 'Unauthorized - No Token Provided'
      });
    } else if(bearer !== 'Bearer' || !jwt) {
      return next({
        code: 400,
        error: 'Unauthorized - Invalid Token'
      });
    }

    tokenFuncs.verifyToken(jwt)
      .then(payload => {
        req.user = payload;
        next();
      })
      .catch(err => {
        return next({
          code: 403,
          error: 'Unauthorized - Invalid Token'
        });
      });
  };
};