let newFolderButton = document.querySelector(".new-folder-button");
let createFolderDialog = document.querySelector(".create-folder-dialog");
let createNewFolderButton = document.querySelector(".create-new-folder-button");
let cancelNewFolderButton = document.querySelector(".cancel-new-folder-button");
let uploadFileButton = document.querySelector(".upload-file-button");
let fileUploadDialog = document.querySelector(".file-upload-dialog");
// let fileUploadSendButton = document.querySelector(".file-upload-send-button");
let fileUploadCancelButton = document.querySelector(
  ".file-upload-cancel-button",
);

let cancelFolderRenameButton  = document.querySelector(".cancel-folder-rename-button");
let cancelFileRenameButton  = document.querySelector(".cancel-file-rename-button");


let folderDivs = document.querySelectorAll(".folder-div");
let fileDivs = document.querySelectorAll(".file-div");





newFolderButton.addEventListener("click", () => {
  // window.location.href = "/drive/newfolder";
  //instead of href make a modal
  createFolderDialog.showModal();
});

createNewFolderButton.addEventListener("click", () => {
  createFolderDialog.close();
});

cancelNewFolderButton.addEventListener("click", () => {
  createFolderDialog.close();
});

uploadFileButton.addEventListener("click", () => {
  fileUploadDialog.showModal();
});

fileUploadCancelButton.addEventListener("click", () => {
  fileUploadDialog.close();
});


folderDivs.forEach((folder) => {
    let folderRenameDialog = document.querySelector(".folder-rename-dialog");
    let folderRenameIcon = folder.querySelector(".folder-rename-icon");

  folderRenameIcon.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation(); //event delegation

    folderRenameDialog.showModal();
  });
});


cancelFolderRenameButton.addEventListener("click",()=>{
  let folderRenameDialog = document.querySelector(".folder-rename-dialog");
  
  folderRenameDialog.close();
})




fileDivs.forEach((file) => {
    let fileRenameDialog = document.querySelector(".file-rename-dialog");
    let fileRenameIcon = file.querySelector(".file-rename-icon");
    let fileInfoIcon = file.querySelector(".file-info-icon");

  fileRenameIcon.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation(); //event delegation

    fileRenameDialog.showModal();
  });

  fileInfoIcon.addEventListener("click",(event)=>{
    event.preventDefault();
    event.stopPropagation();

    let fileId = fileInfoIcon.dataset.fileId;

    window.location.href = `/drive/file/details/${fileId}`
  })
});


cancelFileRenameButton.addEventListener("click",()=>{
  let fileRenameDialog = document.querySelector(".file-rename-dialog");
  
  fileRenameDialog.close();
})


