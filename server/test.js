require("dotenv").config();
const cloudinary = require("./src/config/cloudinary");

(async () => {
  try {
    const result = await cloudinary.uploader.upload(
      "https://res.cloudinary.com/demo/image/upload/sample.jpg",
    );

    console.log("SUCCESS");
    console.log(result.secure_url);
  } catch (err) {
    console.log("FAILED");
    console.log(err);
  }
})();
