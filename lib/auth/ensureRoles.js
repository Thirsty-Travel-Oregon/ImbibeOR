module.exports = function runEnsureRoles() {
  return function ensureRoles(req, res, next) {

    function checkRoleArray(role) {
      return role === 'admin' || role === 'moderator';
    }

    let userRoles = req.user.roles;

    if(userRoles.some(checkRoleArray)) {
      next();
    // } else if (userId === req.user.id) {
    //   next();
    } else {
      next({
        code: 400,
        error: 'Not Authorized'
      });
    };
  };


  // return function ensureRoles(req, res, next) {
  //   // let userRoles = [];
  //   // userRoles = rolesArr;
  //   if(rolesArr.indexOf('admin') !== -1 || rolesArr.indexOf('moderator') !== -1) {
  //     next();
  //   } else if(userId === req.user.id) {
  //     next();
  //   } else {
  //     next({
  //       code: 400,
  //       error: 'Not Authorized'
  //     });
  //   };
  // };
};




