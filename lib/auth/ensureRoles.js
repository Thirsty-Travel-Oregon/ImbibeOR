module.exports = function runEnsureRoles(rolesArr) {
  return function ensureRoles(req, res, next) {
    let userRoles = req.user.roles;
    if(userRoles.indexOf(rolesArr[0]) > -1) {
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




