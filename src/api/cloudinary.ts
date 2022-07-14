import { cloudinary, cloudinaryConfig } from "../services/cloudinary";
import path from "path";

const apiKey = cloudinaryConfig.apiKey;
const cloudName = cloudinaryConfig.cloudName;

const getProjectFolder = (projectId: string) => {
  return path.join(cloudinaryConfig.baseFolder, "projects", projectId);
};

const getSignUrl = (projectId: string) => {
  const timestamp = Math.round(new Date().getTime() / 1000);
  const folder = getProjectFolder(projectId);
  const toSign = {
    timestamp,
    folder,
  };
  const signature = cloudinary.utils.api_sign_request(
    toSign,
    cloudinaryConfig.secret
  );
  return { timestamp, signature, folder, apiKey, cloudName };
};

export const imageStorage = {
  getSignUrl,
  getProjectFolder,
};
