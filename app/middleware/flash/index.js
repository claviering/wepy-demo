const flash = require('connect-flash');
module.exports = (app) => {
  // Connect flash
  app.use(flash());
  // Global variables
  app.use(function(req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
  });
};
