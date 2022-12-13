import path from "path";
import { v2 as cloudinary } from "cloudinary";
import { env } from "../env/server.mjs";
export { cloudinary };

const apiKey = env.CLOUDINARY_KEY;
const cloudName = env.CLOUDINARY_NAME;
const baseFolder = env.CLOUDINARY_BASE_FORLDER;
const secret = env.CLOUDINARY_SECRET;

const getProjectFolder = (projectId: string) => {
  return path.join(baseFolder, "projects", projectId);
};

const getSignUrl = (projectId: string) => {
  const timestamp = Math.round(new Date().getTime() / 1000);
  const folder = getProjectFolder(projectId);
  const toSign = {
    timestamp,
    folder,
  };
  const signature = cloudinary.utils.api_sign_request(toSign, secret);
  return { timestamp, signature, folder, apiKey, cloudName };
};

export const imageStorage = {
  getSignUrl,
  getProjectFolder,
};
