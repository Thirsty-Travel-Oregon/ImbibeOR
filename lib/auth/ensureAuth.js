const tokenFuncs = require('./token');

module.exports = function runEnsureAuth() {
  return function ensureAuth(req, res, next) {
    console.log("in ensureAuth");
    const authHeader = req.headers.authorization;
    const [bearer, token] = authHeader.split(' ');
    console.log("token is ", token);

    if(!authHeader) {
      return next({
        code: 400,
        error: 'Unauthorized - No Token Provided'
      });
    } else if(bearer !== 'Bearer' || !token) {
      return next({
        code: 400,
        error: 'Unauthorized - Invalid Token'
      });
    }

    tokenFuncs.verifyToken(token)
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