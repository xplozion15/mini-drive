let newFolderButton = document.querySelector(".new-folder-button");
let deleteFolderForms = document.querySelectorAll(".delete-folder-form");
let deleteFileForms = document.querySelectorAll(".delete-file-form");
let createFolderDialog = document.querySelector(".create-folder-dialog");
let createNewFolderButton = document.querySelector(".create-new-folder-button");
let cancelNewFolderButton = document.querySelector(".cancel-new-folder-button");

let folderDivs = document.querySelectorAll(".folder-div");
let fileDivs = document.querySelectorAll(".file-div");
let renameFolderButtons = document.querySelectorAll(".menu-rename");
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

renameFolderButtons.forEach((renameButton) => {
  renameButton.addEventListener("click", (event) => {
    event.stopPropagation();
    event.preventDefault();

    const folderId = renameButton.dataset.folderId;
    const folderName = renameButton.dataset.folderName;

    folderRenameDialog.showModal();
    document.querySelector("#folder-id").value = folderId;
    document.querySelector("#folder-rename").value = folderName;
  });
});

renameFileButtons.forEach((renameButton) => {
  renameButton.addEventListener("click", (event) => {
    event.stopPropagation();
    event.preventDefault();

    const fileId = renameButton.dataset.fileId;
    const fileName = renameButton.dataset.fileName;

    fileRenameDialog.showModal();
    document.querySelector("#file-id").value = fileId;
    document.querySelector("#file-rename").value = fileName;
  });
});

cancelFolderRenameButton.addEventListener("click", (event) => {
  event.stopPropagation();
  document.querySelector(".folder-rename-dialog").close();
});

cancelFileRenameButton.addEventListener("click", (event) => {
  event.stopPropagation();
  document.querySelector(".file-rename-dialog").close();
});

deleteFolderForms.forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.stopPropagation();

    // event.preventDefault();
  });
});

deleteFileForms.forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.stopPropagation();
  });
});

createNewFolderButton.addEventListener("click", () => {
  createFolderDialog.close();
});

cancelNewFolderButton.addEventListener("click", () => {
  createFolderDialog.close();
});

if (folderDivs.length > 0) {
  folderDivs.forEach((folder) => {
    const threeDots = folder.querySelector(".three-dots-icon");
    const dialog = folder.querySelector(".folder-options-dialog");

    threeDots.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      //event delegation

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
}

if (fileDivs.length > 0) {
  fileDivs.forEach((file) => {
    const threeDots = file.querySelector(".three-dots-icon");
    const dialog = file.querySelector(".file-options-dialog");

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
}

detailsFileButtons.forEach((detailButton) => {
  detailButton.addEventListener("click", (event) => {
    const fileId = Number(detailButton.dataset.fileId);
    event.stopPropagation();
    event.preventDefault();
    window.location.href = `/drive/file/details/${fileId}`;
  });
});
