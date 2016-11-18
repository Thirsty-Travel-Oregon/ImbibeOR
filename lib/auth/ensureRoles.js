module.exports = function runEnsureRoles() {
  return function ensureRoles(req, res, next) {

    function checkRoleArray(role) {
      return role === 'admin' || role === 'moderator';
    }

    let userRoles = req.user.roles;

    if(userRoles.some(checkRoleArray)) {
      next();
    } else {
      next({
        code: 400,
        error: 'Not Authorized'
      });
    };
  };
};