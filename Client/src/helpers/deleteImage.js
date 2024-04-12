import { createClient } from "@supabase/supabase-js";
import { supabase } from "../../lib/db";

export async function deleteFileFromBucket(folderName, image) {
  const imageName = image.split(`${folderName}/`)[1];
  const { data, error } = await supabase.storage
    .from("hadramawt")
    .remove([`${folderName}/${imageName}`]);
  if (error) throw new Error("Error Deleting Image From Bucket");
  return { status: 200 };
}
