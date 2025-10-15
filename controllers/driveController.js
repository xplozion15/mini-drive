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
    return res.redirect("/login");
  }

  const folders = await prisma.folder.findMany({
    where: { userId: req.user.id, parentId: parentFolderId },
  });

  return res.render("folderPage", {
    folders: folders,
    parentFolderId: parentFolderId,
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
      userId : userId
    },
    select: {
      parentId: true,
    },
  });

  await prisma.folder.delete({   //del the folder tied to the user
    where: {
      id: folderId,
      userId: userId,
    },
  });


  res.redirect(`/drive/${folder.parentId}`);
}

module.exports = {
  showdrivePage,
  showFolderPage,
  postNewFolderToDb,
  deleteFolderFromDb,
};
