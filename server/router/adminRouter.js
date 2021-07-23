const Uploads = require("../model/model");
const GraphicsUpload = require("../model/graphicsModel");
const routeController = require("../routerControl/controller");
const fs = require("fs");
const express = require("express");
const router = express.Router();
const sharp = require("sharp");
const multerMiddleware = require("../middlewares/multer");
const { response } = require("express");

router.get("/addbrands", async (req, res) => {
  res.render("admin/uploader", {
    pageTitle: "add brands to site",
  });
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

router.post("/addgraphics", routeController.graphicUploads);

router.get("/admin/edit/:id", async (req, res) => {
  let editGraphics = await GraphicsUpload.findById(req.params.id);
  res.render("admin/edit", {
    graphics: editGraphics,
    pageTitle: "Edit graphic posts",
  });
});

module.exports = router;
