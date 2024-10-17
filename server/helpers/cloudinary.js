const cloudinary = require("cloudinary").v2;
const multer = require("multer");

cloudinary.config({ 
    cloud_name: 'dekpv37hf', 
    api_key: '859651745564917', 
    api_secret: '9bwSeP3ev3juADi_bUun1A_1ecs'
});

const storage = new multer.memoryStorage();

async function imageUploadUtil(file) {
  const result = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
  });

  return result;
}

const upload = multer({ storage });

module.exports = { upload, imageUploadUtil };