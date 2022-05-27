import { v2 as cloudinary } from "cloudinary";
import { getConfigs } from "env-ts-conf";
export { cloudinary };

export const cloudinaryConfig = getConfigs({
  secret: {
    type: "string",
    variableName: "CLOUDINARY_SECRET",
  },
  baseFolder: {
    type: "string",
    variableName: "CLOUDINARY_BASE_FORLDER",
  },
  apiKey: {
    type: "string",
    variableName: "CLOUDINARY_KEY",
  },
  cloudName: {
    type: "string",
    variableName: "CLOUDINARY_NAME",
  },
});
