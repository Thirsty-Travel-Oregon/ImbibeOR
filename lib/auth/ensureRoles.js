module.exports = function runEnsureRoles(rolesArr) {
  return function ensureRoles(req, res, next) {
    if(userRoles.indexOf(rolesArr[0]) > -1) {
      next();
    } else {
      next({
        code: 400,
        error: 'Not Authorized'
      });
    };
  };
};