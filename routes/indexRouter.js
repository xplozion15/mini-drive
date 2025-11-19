const express = require("express");
const indexRouter = express.Router();
const indexControllers = require("../controllers/indexController");

indexRouter.get("/", indexControllers.showIndexPage);
indexRouter.get("/terms", indexControllers.showTermsPage);
indexRouter.get("/privacy", indexControllers.showPrivacyPage);

indexRouter.get("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

module.exports = { indexRouter };
