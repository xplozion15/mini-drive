const { body } = require("express-validator");

const validateNewFolder = [
    body("folder-name").trim().notEmpty().withMessage("Please write the folder name")
    .isLength({ min: 1, max: 10 })
    .withMessage("Folder name must be 1-10 characters"),
]


const validateFolderRename = [
    body("folder-rename").trim().notEmpty().withMessage("Please write the folder name")
    .isLength({ min: 1, max: 10 })
    .withMessage("Folder name must be 1-10 characters"),
]

const validateFileRename = [
    body("file-rename").trim().notEmpty().withMessage("Please write the file name")
    .isLength({ min: 1, max: 10 })
    .withMessage("File name must be 1-10 characters"),
]


module.exports = {validateNewFolder,validateFolderRename,validateFileRename}