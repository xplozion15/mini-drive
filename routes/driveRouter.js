const express = require("express");
const driveRouter = express.Router();
const driveControllers = require("../controllers/driveController");

driveRouter.get("/",driveControllers.showdrivePage);

// driveRouter.get("/newfolder",driveControllers.showNewFolderForm)
driveRouter.get("/:folderId",driveControllers.showFolderPage);

//post req

driveRouter.post("/newfolder",driveControllers.postNewFolderToDb);
driveRouter.post("/del/:folderId",driveControllers.deleteFolderFromDb);
driveRouter.post("/rename/:folderId",driveControllers.renameFolderInDb);

module.exports = {driveRouter}