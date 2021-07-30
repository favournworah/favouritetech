const Uploads = require("../model/model");
const GraphicsUpload = require("../model/graphicsModel");
const routeController = require("../routerControl/controller");
const fs = require("fs");
const express = require("express");
const router = express.Router();
const sharp = require("sharp");
//const multerMiddleware = require("../middlewares/multer");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const uploads = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error("Please upload a valid image"));
    }
    cb(undefined, true);
  },
});

router.get("/addgraphics", async (req, res) => {
  res.render("admin/uploader", {
    pageTitle: "add brands to site",
  });
});

router.get("/admin/:slug", async (req, res) => {
  let graphics = await GraphicsUpload.findOne({ slug: req.params.slug });
  if (graphics) {
    res.render("admin/show", {
      fineGraphicsById: graphics,
      pageTitle: "single graphics display",
    });
  }
});

router.post(
  "/addgraphics",
  uploads.single("graphicImage"),
  async (req, res) => {
    let graphicDetails = new GraphicsUpload({
      title: req.body.graphicTitle,
      snippet: req.body.graphicSnippet,
      img: req.file.filename,
    });
    try {
      graphics = await graphicDetails.save();
      res.redirect(`/admin/${graphics.slug}`);
    } catch (error) {
      console.log(error);
    }
    //console.log(req.body);
  }
);

router.get("/admin/edit/:id", async (req, res) => {
  let editGraphics = await GraphicsUpload.findById(req.params.id);
  res.render("admin/edit", {
    graphics: editGraphics,
    pageTitle: "Edit graphic posts",
  });
});

router.put("/admin/edit/:id", async (req, res) => {
  req.graphics = await GraphicsUpload.findById(req.params.id);
  let graphics = req.graphics;
  graphics.title = req.body.graphicTitle;
  graphics.snippet = req.body.graphicSnippet;
  graphics.img = req.file.filename;

  try {
    editedGraphics = await graphics.save();
    res.redirect(`/admin/${editedGraphics.slug}`);
  } catch (error) {
    res.redirect(`/admin/edit/${graphics.id}`, { graphics: graphics });
  }
});

router.delete("/admin/:id", async (req, res) => {
  const deletedGraphics = await GraphicsUpload.findByIdAndDelete(req.params.id);
  res.redirect(`/admin/${deletedGraphics.slug}`);
});

module.exports = router;
