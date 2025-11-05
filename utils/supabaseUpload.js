const { createClient } = require("@supabase/supabase-js");
require("dotenv").config();

const supabase = createClient(
  process.env.SUPABASE_PROJECT_URL,
  process.env.SUPABASE_API_KEY,
);

// Upload file using standard upload
async function uploadFile(file,userId,parentFolderId) {
  const { data, error } = await supabase.storage
    .from("mini-drive")
    .upload(`file/${userId}/${parentFolderId}/${file.originalname}`, file.buffer,{
      contentType : file.mimetype,
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

module.exports = { uploadFile,supabase };
