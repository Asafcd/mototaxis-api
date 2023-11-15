const CLOUD_NAME = "dfw7pygp8"
const API_KEY = "972836719435218"
const API_SECRET = "_BfSCuVGkTB2JnG0HwDBRenwZ7w"
const MAX_IMAGE_SIZE = 2
const ALLOWED_IMAGE_EXTENSIONS = [".jpg", ".jpeg", ".png"]

const cloudinary = require("cloudinary").v2

cloudinary.config({
    cloud_name: CLOUD_NAME,
    api_key: API_KEY,
    api_secret: API_SECRET,
});

const uploadImageUser = async (filePath) => {
    return await cloudinary.uploader.upload(filePath, {
        folder: "uploads_user",
    });
};

const uploadImageDriver = async (filePath) => {
    return await cloudinary.uploader.upload(filePath, {
        folder: "uploads_driver",
    });
};

const deleteImage = async (id) => {
    return await cloudinary.uploader.destroy(id);
};

const getExtension = (filename) => {
    const dotIndex = filename.lastIndexOf(".");
    if (dotIndex !== -1) {
        return filename.substr(dotIndex).toLowerCase();
    }
    return "";
};

const isValidImageExtension = (extension) => {
    return ALLOWED_IMAGE_EXTENSIONS.includes(extension);
};

const getFileSizeInMB = (bytes) => {
    return bytes / (1024 * 1024);
};

module.exports = {
    uploadImageUser,
    uploadImageDriver,
    deleteImage,
    getExtension,
    isValidImageExtension,
    getFileSizeInMB,
};