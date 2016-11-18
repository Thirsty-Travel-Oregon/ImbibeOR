const tokenFuncs = require('./token');

module.exports = function runEnsureAuth() {
  return function ensureAuth(req, res, next) {
    const authHeader = req.headers.authorization;
    let bearer = '', token = '';
    
    if(!authHeader) {
      return next({
        code: 400,
        error: 'Unauthorized - No Token Provided'
      });
    } else {
      [bearer, token] = authHeader.split(' ');
      if(bearer !== 'Bearer' || !token) {
        return next({
          code: 400,
          error: 'Unauthorized - Invalid Token'
        });
      }
    };

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
