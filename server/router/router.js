const express = require("express");
const router = express.Router();
const routeController = require("../routerControl/controller");
const GraphicsUpload = require("../model/graphicsModel");

// router.get("/portfolio", routeController.portfolio);

router.get("/graphics", routeController.graphicsDisplay);

router.get("/admin", async (req, res) => {
  let graphical = await GraphicsUpload.find().sort({ timeCreated: "desc" });
  res.render("admin/dashboard", {
    pageTitle: "admin dashboard",
    graphics: graphical,
  });
});

router.get("/", routeController.home);

module.exports = router;
