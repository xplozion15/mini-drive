let newFolderButton = document.querySelector(".new-folder-button");
let deleteFolderForms = document.querySelectorAll(".delete-folder-form");
let deleteFileForms = document.querySelectorAll(".delete-file-form");
let createFolderDialog = document.querySelector(".create-folder-dialog");
let createNewFolderButton = document.querySelector(".create-new-folder-button");
let cancelNewFolderButton = document.querySelector(".cancel-new-folder-button");

let folderDivs = document.querySelectorAll(".folder-div");
let fileDivs = document.querySelectorAll(".file-div");
let renameFileButtons = document.querySelectorAll(".menu-rename-file");
let detailsFileButtons = document.querySelectorAll(".details-file-button");
let folderRenameDialog = document.querySelector(".folder-rename-dialog");
let fileRenameDialog = document.querySelector(".file-rename-dialog");
let cancelFolderRenameButton = document.querySelector(
  "#cancel-folder-rename-button",
);
let cancelFileRenameButton = document.querySelector(
  "#cancel-file-rename-button",
);
let uploadFileButton = document.querySelector(".upload-file-button");
let fileUploadDialog = document.querySelector(".file-upload-dialog");
let fileUploadCancelButton = document.querySelector(
  ".file-upload-cancel-button",
);

uploadFileButton.addEventListener("click", () => {
  fileUploadDialog.showModal();
});

fileUploadCancelButton.addEventListener("click", () => {
  fileUploadDialog.close();
});

newFolderButton.addEventListener("click", () => {
  createFolderDialog.showModal();
});

cancelFolderRenameButton.addEventListener("click", (event) => {
  event.stopPropagation();
  document.querySelector(".folder-rename-dialog").close();
});

cancelFileRenameButton.addEventListener("click", (event) => {
  event.stopPropagation();
  document.querySelector(".file-rename-dialog").close();
});

createNewFolderButton.addEventListener("click", () => {
  createFolderDialog.close();
});

cancelNewFolderButton.addEventListener("click", () => {
  createFolderDialog.close();
});

//  event.preventDefault();
//     event.stopPropagation();
//     //event delegation

folderDivs.forEach((folder) => {
  let folderRenameDialog = document.querySelector(".folder-rename-dialog");
  let folderRenameIcon = folder.querySelector(".folder-rename-icon");

  folderRenameIcon.addEventListener("click", (event) => {

    event.preventDefault();
    event.stopPropagation();
    //event delegation

    folderRenameDialog.showModal();  
  });
});
