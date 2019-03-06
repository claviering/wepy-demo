const debug = require('debug')('app:authToken');
const token = require('../../utils/token');

module.exports = async (req, res, next) => {
  debug('req.session', req.session);
  const authorization = req.session.wxSession ? req.session.wxSession : false;
  if (authorization) {
    next();
    return;
  }
  let result = await token.getToken(req.cookies.token);
  debug('result', result);
  if (result.isLogin) {
    req.session.isLogin = true;
    next();
    return;
  }
  res.status(401).render('welcome');
}