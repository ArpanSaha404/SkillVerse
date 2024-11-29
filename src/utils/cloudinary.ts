import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

export const uploadMediaToCloudinary = async (filePath: string) => {
  try {
    const uploadResponse = await cloudinary.uploader.upload(filePath, {
      resource_type: "auto",
    });
    console.log(uploadResponse);

    return uploadResponse;
  } catch (error: any) {
    console.error(error);
  }
};

export const deleteImageFromCloudinary = async (publicId: string) => {
  try {
    await cloudinary.uploader.destroy(publicId, { resource_type: "image" });
  } catch (error) {
    console.error(error);
  }
};

export const deleteVideoFromCloudinary = async (publicId: any) => {
  try {
    await cloudinary.uploader.destroy(publicId, { resource_type: "video" });
  } catch (error) {
    console.error(error);
  }
};
