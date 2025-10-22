  let newFolderButton = document.querySelector(".new-folder-button");
        let deleteFolderForms = document.querySelectorAll(".delete-folder-form");
        let createFolderDialog = document.querySelector(".create-folder-dialog");
        let createNewFolderButton = document.querySelector(".create-new-folder-button");
        let cancelNewFolderButton = document.querySelector(".cancel-new-folder-button");
        let threeDotsIcons = document.querySelectorAll(".three-dots-icon");
        let folderOptionsDialogs = document.querySelectorAll(".folder-options-dialog");
        let folderDivs = document.querySelectorAll(".folder-div");
        let renameFolderButtons = document.querySelectorAll(".menu-rename");
        let folderRenameDialog = document.querySelector(".folder-rename-dialog");
        let cancelFolderRenameButton = document.querySelector("#cancel-folder-rename-button");
        let submitFolderRenameButton = document.querySelector("#submit-folder-rename-button");
        let uploadFileButton = document.querySelector(".upload-file-button");
        let fileUploadDialog = document.querySelector(".file-upload-dialog");
        let fileUploadCancelButton = document.querySelector(".file-upload-cancel-button");

        uploadFileButton.addEventListener("click",()=>{
            fileUploadDialog.showModal();
        })

        fileUploadCancelButton.addEventListener("click",()=>{
            fileUploadDialog.close();
        })
        



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

            })
        })

        cancelFolderRenameButton.addEventListener("click", (event) => {
            event.stopPropagation();
            document.querySelector(".folder-rename-dialog").close();
        })



        deleteFolderForms.forEach((form) => {
            form.addEventListener("submit", (event) => {
                event.stopPropagation();

                // event.preventDefault();

            })
        })


        createNewFolderButton.addEventListener("click", () => {
            createFolderDialog.close();
        });

        cancelNewFolderButton.addEventListener("click", () => {
            createFolderDialog.close();
        });


        folderDivs.forEach((folder) => {
            const threeDots = folder.querySelector(".three-dots-icon");
            const dialog = folder.querySelector(".folder-options-dialog");

            threeDots.addEventListener("click", (event) => {
                event.preventDefault();
                event.stopPropagation(); //event delegation



                if (dialog.style.visibility === "visible") {
                    dialog.style.visibility = "hidden";
                } else {

                    document.querySelectorAll(".folder-options-dialog").forEach(dialog => dialog.style.visibility = "hidden");
                    dialog.style.visibility = "visible";
                }
            });
        });
