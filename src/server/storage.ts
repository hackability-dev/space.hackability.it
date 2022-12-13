import { Storage } from "@google-cloud/storage";
import path from "path";
import { env } from "../env/server.mjs";

const gs = new Storage();
const bucket = gs.bucket(env.GS_BUCKET_NAME);

const gsProjectFolder = (projectId: string) => {
  return path.join(env.GS_BASE_FOLDER, "projects", projectId);
};

export const storage = {
  bucket,
  gsProjectFolder,
};
