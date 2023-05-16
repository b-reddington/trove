import { Cloudinary as CoreCloudinary, Util } from "cloudinary-core";



export const url = (publicId, options) => {
    console.log("pubId and options "+ publicId + options);
  try {
    const scOptions = Util.withSnakeCaseKeys(options);
    const cl = CoreCloudinary.new();
    return cl.url(publicId, scOptions);
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const openUploadWidget = (options, callback) => {
    console.log(options, callback);
  return window.cloudinary.openUploadWidget(options, callback);
};
