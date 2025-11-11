let newFolderButton = document.querySelector(".new-folder-button");
let createFolderDialog = document.querySelector(".create-folder-dialog");
let createNewFolderButton = document.querySelector(".create-new-folder-button");
let cancelNewFolderButton = document.querySelector(".cancel-new-folder-button");
let uploadFileButton = document.querySelector(".upload-file-button");
let fileUploadDialog = document.querySelector(".file-upload-dialog");
// let fileUploadSendButton = document.querySelector(".file-upload-send-button");
let fileUploadCancelButton = document.querySelector(".file-upload-cancel-button");
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

uploadFileButton.addEventListener("click",()=>{
    fileUploadDialog.showModal();
})


fileUploadCancelButton.addEventListener("click",()=>{
    fileUploadDialog.close();
})




folderDivs.forEach((folder) => {
  const threeDots = folder.querySelector(".three-dots-icon");
  const dialog = folder.querySelector(".folder-options-dialog");

  threeDots.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation(); //event delegation

    if (dialog.style.visibility === "visible") {
      dialog.style.visibility = "hidden";
    } else {
      document
        .querySelectorAll(".folder-options-dialog")
        .forEach((dialog) => (dialog.style.visibility = "hidden"));
      dialog.style.visibility = "visible";
    }
  });
});



fileDivs.forEach((folder) => {
  const threeDots = folder.querySelector(".three-dots-icon");
  const dialog = folder.querySelector(".file-options-dialog");

  threeDots.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation(); //event delegation

    if (dialog.style.visibility === "visible") {
      dialog.style.visibility = "hidden";
    } else {
      document
        .querySelectorAll(".file-options-dialog")
        .forEach((dialog) => (dialog.style.visibility = "hidden"));
      dialog.style.visibility = "visible";
    }
  });
});