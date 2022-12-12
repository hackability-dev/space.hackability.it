import { Storage } from "@google-cloud/storage";
import { getConfigs } from "env-ts-conf";
import path from "path";

const storageConfig = getConfigs({
  bucketName: {
    type: "string",
    variableName: "GS_BUCKET_NAME",
  },
  baseFolder: {
    type: "string",
    variableName: "GS_BASE_FOLDER",
  },
});

const gs = new Storage();
const bucket = gs.bucket(storageConfig.bucketName);

const gsProjectFolder = (projectId: string) => {
  return path.join(storageConfig.baseFolder, "projects", projectId);
};

export const storage = {
  bucket,
  gsProjectFolder,
};
