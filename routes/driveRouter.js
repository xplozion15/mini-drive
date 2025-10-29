const express = require("express");
const driveRouter = express.Router();
const driveControllers = require("../controllers/driveController");

driveRouter.get("/",driveControllers.showdrivePage);

// driveRouter.get("/newfolder",driveControllers.showNewFolderForm)
driveRouter.get("/:folderId",driveControllers.showFolderPage);
driveRouter.get('/file/details/:fileId',driveControllers.showFileDetails)


driveRouter.post("/newfolder",driveControllers.postNewFolderToDb);
driveRouter.post("/del/:folderId",driveControllers.deleteFolderFromDb);
driveRouter.post("/del/file/:fileId",driveControllers.deleteFileFromDb);
driveRouter.post("/rename/file/:fileId",driveControllers.renameFileInDb)
driveRouter.post("/rename/:folderId",driveControllers.renameFolderInDb);

module.exports = {driveRouter}