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

const uploadImageUser = async (file) => {
    return await cloudinary.uploader.upload(buffer, {
        resource_type: 'auto',
        folder: "uploads_user",
    });
};

const uploadImageDriver = async (fileImage) => {
    try {
        validateFile(fileImage);
        const { buffer, originalname } = fileImage
        
        //let response
        return new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                { resource_type: 'auto', folder: 'uploads_driver', public_id: originalname },
                (error, result) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result);
                    }
                }
            );

            stream.end(buffer);
        });
        /* const response = await cloudinary.uploader.upload(undefined, {
            file: {
              value: buffer,
              options: {
                filename: originalname,
              },
            },
            resource_type: 'auto',
            folder: 'uploads_driver',
          }); */
        //return response
    } catch (err) {
        console.error(err)
        throw err
    }
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

const validateFile = (file) => {
    const { originalname, size } = file;
    const extension = getExtension(originalname);
    const isExtensionValid = isValidImageExtension(extension);
    const isSizeValid = getFileSizeInMB(size) <= MAX_IMAGE_SIZE;

    if (!isExtensionValid) {
        throw new Error("Invalid file extension");
    }

    if (!isSizeValid) {
        throw new Error("Invalid file size");
    }
    console.log("Everything is valid");
}

module.exports = {
    uploadImageUser,
    uploadImageDriver,
    deleteImage,
};