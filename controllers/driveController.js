const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function showdrivePage(req, res) {
  if (!req.user) {
    // User is not logged in
    return res.redirect("/login");
  }

  const folders = await prisma.folder.findMany({
    where: { userId: req.user.id, parentId: null },
  });

  res.render("drive", { folders: folders });
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
      userId: req.user.id,
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

  await prisma.folder.delete({
    //del the folder tied to the user
    where: {
      id: folderId,
      userId: userId,
    },
  });

  res.redirect(`/drive/${folder.parentId}`);
}

async function renameFolderInDb(req, res) {
  if (!req.user) {
    return res.redirect("/login");
  }

  const userId = Number(req.user.id); // get the current user and folder id
  const folderId = Number(req.body["folder-id"]);
  const newFolderName = req.body["folder-rename"];

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

  res.redirect(`/drive/${folder.parentId}`);
}

// deleteFileFromDb

async function deleteFileFromDb(req, res) {
  const fileId = Number(req.params.fileId);

  const file = await prisma.file.findUnique({
    //doing this to get the parent folder id of the file to use in the redirect url after deleing file
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

  res.redirect(`/drive/${file.folderId}`);
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

  res.render("fileDetails", { file: file });
}

async function renameFileInDb(req, res) {
  if (!req.user) {
    //check if user is logged in or not
    return res.redirect("/login");
  }

  const fileId = Number(req.body["file-id"]);
  const newFileName = req.body["file-rename"];

  const file = await prisma.file.findUnique({
    // returning file details to get parent folder id for the res.redirect url
    where: {
      id: fileId,
    },
    select: {
      folderId: true,
    },
  });

  await prisma.file.update({
    where: {
      id: fileId,
    },
    data: {
      name: newFileName,
    },
  });

  res.redirect(`/drive/${file.folderId}`);
}

module.exports = {
  showdrivePage,
  showFolderPage,
  postNewFolderToDb,
  deleteFolderFromDb,
  renameFolderInDb,
  deleteFileFromDb,
  showFileDetails,
  renameFileInDb
};
