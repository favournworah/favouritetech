const UploadModel = require("../model/model");
const GraphicsUpload = require("../model/graphicsModel");
const fs = require("fs");

// exports.portfolio = async (req, res) => {
//   const image = await UploadModel.find();
//   //Object.keys(image);
//   res.render("portfolio", {
//     pageTitle: "MickyDesigns - Welcome to my portfolio showroom",
//     layout: "portfolio",
//     images: image,
//   });
// };

exports.graphicsDisplay = async (req, res) => {
  let graphical = await GraphicsUpload.find().sort({ timeCreated: "desc" });

  res.render("graphicsDisplay", {
    pageTitle: "MickyDesigns - High quality graphic designs",
    graphics: graphical,
  });
};

exports.home = async (req, res) => {
  let graphical = await GraphicsUpload.find().sort({ timeCreated: "desc" });
  res.render("main", {
    pageTitle:
      "MickyDesigns - Brand Management and Software development Projects",
    graphics: graphical,
  });
};
