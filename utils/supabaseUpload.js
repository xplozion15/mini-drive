const { createClient } = require("@supabase/supabase-js");
require("dotenv").config();

const supabase = createClient(
  process.env.SUPABASE_PROJECT_URL,
  process.env.SUPABASE_API_KEY,
);

// Upload file using standard upload
async function uploadFile(file, userId, parentFolderId) {
  const path =
    parentFolderId === null
      ? `file/${userId}/${file.originalname}`
      : `file/${userId}/${parentFolderId}/${file.originalname}`;

  const { data, error } = await supabase.storage
    .from("mini-drive")
    .upload(path, file.buffer, {
      contentType: file.mimetype,
      upsert: true,
    });
  if (error) {
    // Handle error
    throw new Error(error);
  } else {
    // Handle success
    console.log("sucessfully uploaded the file to supabase");

    return data;
  }
}

module.exports = { uploadFile, supabase };
