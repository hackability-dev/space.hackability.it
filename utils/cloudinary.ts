export interface CloudinaryUploadRes {
  asset_id: string;
  public_id: string;
  version: number;
  version_id: string;
  signature: string;
  width: number;
  height: number;
  format: string;
  resource_type: string;
  created_at: Date;
  tags: any[];
  bytes: number;
  type: string;
  etag: string;
  placeholder: boolean;
  url: string;
  secure_url: string;
  original_filename: string;
  api_key: string;
}

type GetCloundinaryDataFunc = () => Promise<{
  timestamp: number;
  signature: string;
  folder: string;
  apiKey: string;
  cloudName: string;
}>;

export const cloudinaryUploadImage = async (
  file: Blob,
  getData: GetCloundinaryDataFunc
): Promise<string> => {
  const uploadInfo = await getData();
  const formData = new FormData();
  formData.append("file", file);
  formData.append("api_key", uploadInfo.apiKey);
  formData.append("timestamp", String(uploadInfo.timestamp));
  formData.append("signature", uploadInfo.signature);
  formData.append("folder", uploadInfo.folder);
  const url =
    "https://api.cloudinary.com/v1_1/" + uploadInfo.cloudName + "/auto/upload";

  const res = await fetch(url, {
    method: "POST",
    body: formData,
    headers: {
      accept: "application/json",
    },
  });
  if (res.ok) {
    const data = (await res.json()) as CloudinaryUploadRes;
    return data.url;
  }
  return "";
};
