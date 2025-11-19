const { validateNewFolder,validateFileRename,validateFolderRename } = require("../utils/validator");

const express = require("express");
const driveRouter = express.Router();
const driveControllers = require("../controllers/driveController");

driveRouter.get("/", driveControllers.showdrivePage);
driveRouter.post("/newfolder", validateNewFolder,driveControllers.postNewFolderToDb);
driveRouter.post("/del/:folderId", driveControllers.deleteFolderFromDb);
driveRouter.post("/del/file/:fileId", driveControllers.deleteFileFromDb);
driveRouter.post("/rename/:folderId",validateFolderRename, driveControllers.renameFolderInDb);
driveRouter.post("/rename/file/:fileId",validateFileRename, driveControllers.renameFileInDb);
driveRouter.post("/download/file/:fileId", driveControllers.downloadFile);
driveRouter.get("/file/details/:fileId", driveControllers.showFileDetails);
driveRouter.get("/:folderId", driveControllers.showFolderPage);

module.exports = { driveRouter };