const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { supabase } = require("../utils/supabaseUpload");
const { formatFileSize } = require("../utils/formatFileSize");

async function showdrivePage(req, res) {
  if (!req.user) {
    // User is not logged in
    return res.redirect("/login");
  }

  const folders = await prisma.folder.findMany({
    where: { userId: Number(req.user.id), parentId: null },
    orderBy: {
      createdAt: "desc",
    },
  });

  const files = await prisma.file.findMany({
    where: {
      folderId: null,
      userId: Number(req.user.id),
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  res.render("drive", { folders: folders, files: files });
}

async function showFolderPage(req, res) {
  const parentFolderId = Number(req.params.folderId);

  if (!req.user) {
    // if user is not logged in then redirect to login page//
    return res.redirect("/login");
  }

  const folders = await prisma.folder.findMany({
    // get the folders
    where: {
      userId: Number(req.user.id),
      parentId: parentFolderId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const files = await prisma.file.findMany({
    where: {
      folderId: parentFolderId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return res.render("folderPage", {
    folders: folders,
    parentFolderId: parentFolderId,
    files: files,
  });
}

async function postNewFolderToDb(req, res) {
  if (!req.user) {
    return res.redirect("/login");
  }

  const userId = req.user.id;
  const folderName = req.body["folder-name"];
  const parentFolderId = req.body["parent-folder-id"]
    ? Number(req.body["parent-folder-id"])
    : null;

  await prisma.folder.create({
    data: {
      name: folderName,
      userId: userId,
      parentId: parentFolderId,
    },
  });

  return res.redirect(parentFolderId ? `/drive/${parentFolderId}` : "/drive");
}

async function deleteFolderFromDb(req, res) {
  const userId = Number(req.user.id); // get the current user and folder id
  const folderId = Number(req.params.folderId);

  const folder = await prisma.folder.findUnique({
    //doing this to get the folder and then get the parent id to use in the redirect url
    where: {
      id: folderId,
      userId: userId,
    },
    select: {
      parentId: true,
    },
  });

  //del the folder tied to the user
  await prisma.folder.delete({
    where: {
      id: folderId,
      userId: userId,
    },
  });

  


  folder.parentId === null
    ? res.redirect(`/drive`)
    : res.redirect(`/drive/${folder.parentId}`);
}

async function renameFolderInDb(req, res) {
  if (!req.user) {
    return res.redirect("/login");
  }

  const userId = Number(req.user.id); // get the current user and folder id
  const folderId = Number(req.params.folderId);
  const newFolderName = req.body["folder-rename"];

  console.log(
    `this is the folder id ${folderId} & userId ${userId} before updating in prisma`,
  );

  const folder = await prisma.folder.findUnique({
    //doing this to get the folder and then get the parent id to use in the redirect url
    where: {
      id: folderId,
      userId: userId,
    },
    select: {
      parentId: true,
    },
  });

  await prisma.folder.update({
    where: {
      id: folderId,
      userId: userId,
    },
    data: {
      name: newFolderName,
    },
  });

  // res.redirect(`/drive/${folder.parentId}`);
  folder.parentId === null
    ? res.redirect(`/drive`)
    : res.redirect(`/drive/${folder.parentId}`);
}

// deleteFileFromDb
async function deleteFileFromDb(req, res) {
  const fileId = Number(req.params.fileId);

  //doing this to get the parent folder id of the file to use in the redirect url after deleing file
  //get detals of file
  const file = await prisma.file.findUnique({
    where: {
      id: fileId,
    },
    select: {
      folderId: true,
    },
  });

  await prisma.file.delete({
    //del the file
    where: {
      id: fileId,
    },
  });

  //redirecting based on root or nested folder file structure
  file.folderId === null
    ? res.redirect("/drive")
    : res.redirect(`/drive/${file.folderId}`);
}

async function showFileDetails(req, res) {
  const fileId = Number(req.params.fileId);

  const file = await prisma.file.findUnique({
    where: {
      id: fileId,
    },
    select: {
      name: true,
      path: true,
      size: true,
      createdAt: true,
      fileType: true,
    },
  });

  const convertedSize = formatFileSize(file.size);

  file.size = convertedSize;

  res.render("fileDetails", { file: file });
}

async function renameFileInDb(req, res) {
  //check if user is logged in or not
  if (!req.user) {
    return res.redirect("/login");
  }

  // fileid,new file name and user id
  // const fileId = Number(req.body["file-id"]);
  const fileId = Number(req.params.fileId);
  const newFileName = req.body["file-rename"];
  const userId = req.user.id;

  console.log(
    `file id - ${fileId}  , newfilename is ${newFileName} and userid is ${userId}`,
  );

  //getting file details
  const file = await prisma.file.findUnique({
    where: {
      id: fileId,
    },
    select: {
      folderId: true,
      name: true,
    },
  });

  //old file name and folder id details
  const oldFileName = file.name;
  const folderId = file.folderId;

  // update file name in db
  await prisma.file.update({
    where: {
      id: fileId,
    },
    data: {
      name: newFileName,
    },
  });

  // update file name in supabase storage
  // Move and rename files
  const { data, error } = await supabase.storage
    .from("mini-drive")
    .move(
      `file/${userId}/${folderId}/${oldFileName}`,
      `file/${userId}/${folderId}/${newFileName}`,
    );

  //redirecting to the current folder if its root directory and redirecting to parent folder if its not root directory

  file.folderId === null
    ? res.redirect("/drive")
    : res.redirect(`/drive/${file.folderId}`);
}

async function downloadFile(req, res) {
  if (!req.user) {
    return res.redirect("/login");
  }

  const userId = req.user.id;
  const fileId = Number(req.params.fileId);
  const file = await prisma.file.findUnique({
    where: {
      id: fileId,
    },
    select: {
      path: true,
      folderId: true,
      name: true,
    },
  });

  let path;

  file.folderId === null
    ? (path = `file/${userId}/${file.name}`)
    : (path = `file/${userId}/${file.folderId}/${file.name}`);

  const { data, error } = await supabase.storage
    .from("mini-drive")
    .download(path);

  const arrayBuffer = await data.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  res.setHeader("Content-Type", data.type || "application/octet-stream");
  res.setHeader("Content-Length", buffer.length);
  res.setHeader("Content-Disposition", `attachment; filename="${file.name}"`);
  res.end(buffer);
}

module.exports = {
  showdrivePage,
  showFolderPage,
  postNewFolderToDb,
  deleteFolderFromDb,
  renameFolderInDb,
  deleteFileFromDb,
  showFileDetails,
  renameFileInDb,
  downloadFile,
};
