import { createClient } from "@supabase/supabase-js";

import { supabase } from "../../lib/db";


export async function uploadFileToStorageAndGetUrl(folderName, file) {
  const timestamp = new Date().getTime().toString();
  const { data, error } = await supabase.storage
    .from("hadramawt")
    .upload(`${folderName}/${timestamp}${file.name}`, file);
  if (error) throw new Error("Error Posting Image To Database!");
  // Get Public Url
  const { data: url } = supabase.storage
    .from("hadramawt")
    .getPublicUrl(data.path);
  if (!url) throw new Error("Cant get public url");
  return url;
}
