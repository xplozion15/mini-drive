const express = require("express");
const indexRouter = express.Router();
const indexControllers = require("../controllers/indexController");

indexRouter.get("/",indexControllers.showIndexPage);
indexRouter.get("/login",indexControllers.showLoginPage);


module.exports = {indexRouter}