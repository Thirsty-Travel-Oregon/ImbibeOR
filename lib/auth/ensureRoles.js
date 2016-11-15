module.exports = function runEnsureRoles(rolesArr, userId = 'noId') {
  return function ensureRoles(req, res, next) {
    const userRoles = req.user.roles;
    if(rolesArr.indexOf('admin') !== -1 || rolesArr.indexOf('moderator') !== -1) {
      next();
    } else if(userId === req.user._id) {
      next();
    } else {
      next({
        code: 400,
        error: 'Not Authorized'
      });
    };
  };
};