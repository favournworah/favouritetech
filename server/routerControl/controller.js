const UploadModel = require("../model/schema");
const fs = require("fs");

exports.portfolio = async (req, res) => {
  res.render("portfolio", {
    pageTitle: "MickyDesigns - Welcome to my portfolio showroom",
  });
};

exports.graphicsDisplay = async (req, res) => {
  const image = await UploadModel.find();
  res.render("graphicsDisplay", { images: image });
};

exports.uploads = (req, res, next) => {
  const files = req.files;
  if (!files) {
    const error = new Error("Please choose files");
    error.httpStatusCode = 400;
    return next(error);
  }

  //convert images into base64 encoding
  let imgArray = files.map((file) => {
    let img = fs.readFileSync(file.path);
    let encoded_image = img.toString("base64");
    return encoded_image;
  });

  const result = imgArray.map((src, index) => {
    //create object to store data in the collection
    let finalImage = {
      filename: files[index].originalname,
      contentType: files[index].mimetype,
      imageBase64: src,
    };
    let newUpload = new UploadModel(finalImage);
    return newUpload
      .save()
      .then(() => {
        return { msg: `${files[index].originalname}Uploaded Successfully!` };
      })
      .catch((error) => {
        if (error) {
          if (error.name === "MongoError" && error.code === 11000) {
            return Promise.reject({
              error: `Duplicate ${files[index].originalname}. File already exists`,
            });
          }
          return Promise.reject({
            error:
              error.message ||
              `Cannot Upload ${files[index].originalname} Something missing `,
          });
        }
      });
  });

  Promise.all(result)
    .then((msg) => {
      res.json(msg);
      //res.redirect('/')
    })
    .catch((err) => {
      res.json(err);
    });
};

exports.home = async (req, res) => {
  res.render("main", {
    pageTitle:
      "MickyDesigns - Brand Management and Software development Projects",
  });
};
