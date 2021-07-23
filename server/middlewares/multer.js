const multer = require("multer");
const uploads = multer({
  destination: function (req, file, cb) {
    cb(null, "/uploads");
  },
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
  fileFilter: (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error("Please upload a valid image"));
    }
    cb(undefined, true);
  },
});
