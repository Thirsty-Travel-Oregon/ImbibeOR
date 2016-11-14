const tokenFuncs = require('./token');

module.exports = function runEnsureAuth() {
  return function ensureAuth(req, res, next) {
    const authHeader = req.headers.authorization;
    let tempStr = authHeader.split(' ');
    const bearer = tempStr[0];
    const token = tempStr[1];
    console.log(tempStr);
    // const [bearer, token] = authHeader.split(' ');
    console.log('authHeader', authHeader);
    console.log('bearer', bearer);
    console.log('token', token);

    if(!authHeader) {
      return next({
        code: 400,
        error: 'Unauthorized - No Token Provided'
      });
    } else if(bearer !== 'Bearer' || !token) {
        console.log('the token', token);
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