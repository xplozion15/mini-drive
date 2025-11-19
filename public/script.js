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

let fileInput = document.getElementById("file-input");
let fileUploadError = document.querySelector(".file-upload-error");
const fileUploadSendButton = document.querySelector(".file-upload-send-button");

// frontend validation for file size
function validateSize() {
  const file = document.querySelector("#file-input").files[0];

  if (!file) {
    fileUploadError.textContent = "Error: You need to select a file";
    fileUploadSendButton.style.pointerEvents = "none";
    fileUploadSendButton.style.opacity = "0.5";
    
  }

  const limit = 6144; // 6MB in KB
  const size = Math.round(file.size / 1024); // Convert bytes to KB

  if (size > limit) {
    fileUploadError.textContent = `Error: File larger than 6MB (${(size / 1024).toFixed(2)} MB)`;
    fileUploadSendButton.style.pointerEvents = "none";
    fileUploadSendButton.style.opacity = "0.5";
  } 
}


//timeout for error alert
setTimeout(() => {
    const alert = document.querySelector(".error-alert");
    if (alert)  alert.style.display = "none";
  }, 3000);


fileInput.addEventListener("change", () => {
  fileUploadError.textContent = "";
  validateSize();
});


fileUploadSendButton.addEventListener("click", (event) => {
  const file = document.querySelector("#file-input").files[0];

  if (!file) {
    event.preventDefault(); // stop upload
    fileUploadError.textContent = "Error: You need to select a file";
    return;
  }

  }
);





uploadFileButton.addEventListener("click", () => {
  fileInput.value = ""; // Clear input
  fileUploadError.textContent = ""; //clear error
  fileUploadSendButton.style.pointerEvents = "all"; //enable pointer event and opacity 
  fileUploadSendButton.style.opacity = "1";
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
  let fileRenameForm = document.querySelector(".file-rename-form");
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
