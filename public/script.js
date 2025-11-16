let newFolderButton = document.querySelector(".new-folder-button");

let createFolderDialog = document.querySelector(".create-folder-dialog");
let createNewFolderButton = document.querySelector(".create-new-folder-button");
let cancelNewFolderButton = document.querySelector(".cancel-new-folder-button");

let folderDivs = document.querySelectorAll(".folder-div");
let fileDivs = document.querySelectorAll(".file-div");

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




folderDivs.forEach((folder) => {
  let folderRenameDialog = document.querySelector(".folder-rename-dialog");
  let folderRenameIcon = folder.querySelector(".folder-rename-icon");
  let folderRenameForm = document.querySelector(".folder-rename-form");
  let folderId = folder.dataset.folderId;

  folderRenameIcon.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation(); //event delegation

    folderRenameForm.action = `/drive/rename/${folderId}`;
    document.getElementById("folder-id-hidden").value = folderId;

    folderRenameDialog.showModal();
  });
});

cancelFolderRenameButton.addEventListener("click", () => {
  let folderRenameDialog = document.querySelector(".folder-rename-dialog");

  folderRenameDialog.close();
});



fileDivs.forEach((file) => {
  let fileRenameDialog = document.querySelector(".file-rename-dialog");
  let fileRenameIcon = file.querySelector(".file-rename-icon");
  let fileInfoIcon = file.querySelector(".file-info-icon");
  let fileRenameForm = document.querySelector(".file-rename-form")
  let fileId = file.dataset.fileId;

  
  fileRenameIcon.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation(); //event delegation 

    fileRenameForm.action = `/drive/rename/file/${fileId}`;
    document.getElementById("file-id-hidden").value = fileId;


    fileRenameDialog.showModal();
  });

  fileInfoIcon.addEventListener("click", (event) => {
    event.preventDefault();
    // event.stopPropagation();
    console.log("iwasclicked!!!!!!!");

    let fileId = file.dataset.fileId;

    window.location.href = `/drive/file/details/${fileId}`;
  });
});

cancelFileRenameButton.addEventListener("click", () => {
  let fileRenameDialog = document.querySelector(".file-rename-dialog");

  fileRenameDialog.close();
});
