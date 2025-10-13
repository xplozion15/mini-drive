const express = require("express");
const indexRouter = express.Router();
const indexControllers = require("../controllers/indexController");

indexRouter.get("/",indexControllers.showIndexPage);
indexRouter.get("/login",indexControllers.showLoginPage);

indexRouter.post('/logout', function(req, res, next){
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

module.exports = {indexRouter}