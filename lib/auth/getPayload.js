const tokenFuncs = require('./token');

module.exports = function runGetPayload() {
  return function getPayload(req, res, next) {
    const authHeader = req.headers.authorization;
    let bearer = '', token = '';
    const returnPayload = {userId: 'nobody', role: 'none'};

    if (!authHeader) {
      req.returnPayload = returnPayload;
      return next();
    } else {
      [bearer, token] = authHeader.split(' ');
      if ( bearer !== 'Bearer' || !token ) {
        req.returnPayload = returnPayload;
        return next();
      };
    };

    tokenFuncs.verifyToken(token)
      .then(payload => {
        req.user = payload;
        returnPayload.userId = req.user.id;
        returnPayload.role = req.user.roles[0];
        req.returnPayload = returnPayload;
        next();
      })
      .catch(err => {
        req.returnPayload = returnPayload;
        next();
      });
  };
  
};