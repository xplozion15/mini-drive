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

module.exports = { showdrivePage, showFolderPage, postNewFolderToDb };
