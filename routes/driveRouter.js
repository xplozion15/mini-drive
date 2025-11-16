

const express = require("express");
const driveRouter = express.Router();
const driveControllers = require("../controllers/driveController");

driveRouter.get("/", driveControllers.showdrivePage);
driveRouter.post("/newfolder", driveControllers.postNewFolderToDb);
driveRouter.post("/del/:folderId", driveControllers.deleteFolderFromDb);
driveRouter.post("/del/file/:fileId", driveControllers.deleteFileFromDb);
driveRouter.post("/rename/:folderId", driveControllers.renameFolderInDb);
driveRouter.post("/rename/file/:fileId", driveControllers.renameFileInDb);
driveRouter.post("/download/file/:fileId", driveControllers.downloadFile);
driveRouter.get("/file/details/:fileId", driveControllers.showFileDetails);
driveRouter.get("/:folderId", driveControllers.showFolderPage);

module.exports = { driveRouter };