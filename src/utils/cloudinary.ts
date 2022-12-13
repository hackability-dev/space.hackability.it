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
  const resized = await resizeImage(file);
  formData.append("file", resized);
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

const resizeImage = (img: Blob, maxWidth = 1200) => {
  const reader = new FileReader();
  const image = new Image();
  const canvas = document.createElement("canvas");
  const dataURItoBlob = (dataURI: string) => {
    const bytes =
      dataURI.split(",")[0]!.indexOf("base64") >= 0
        ? atob(dataURI.split(",")[1]!)
        : unescape(dataURI.split(",")[1]!);
    const mime = dataURI.split(",")[0]!.split(":")[1]!.split(";")[0];
    const max = bytes.length;
    const ia = new Uint8Array(max);
    for (let i = 0; i < max; i++) {
      ia[i] = bytes.charCodeAt(i);
    }
    return new Blob([ia], { type: mime });
  };
  const resize = () => {
    let width = image.width;
    let height = image.height;
    if (width > maxWidth) {
      height *= maxWidth / width;
      width = maxWidth;
    }

    canvas.width = width;
    canvas.height = height;
    canvas.getContext("2d")!.drawImage(image, 0, 0, width, height);
    const dataUrl = canvas.toDataURL("image/jpeg");
    console.log("done");
    return dataURItoBlob(dataUrl);
  };
  return new Promise<Blob>((resolve, reject) => {
    if (!img.type.match(/image.*/)) {
      reject(new Error("Not an image"));
      return;
    }
    reader.onload = (readerEvent) => {
      image.onload = () => {
        console.log("resied");
        return resolve(resize());
      };
      if (!readerEvent || !readerEvent.target) {
        return reject(new Error("No render event"));
      }
      (image as any).src = readerEvent.target.result;
    };
    reader.readAsDataURL(img);
  });
};
