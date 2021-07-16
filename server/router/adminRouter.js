const express = require("express");
const adminRouter = express.Router();
const routeController = require("../routerControl/adminController");
const store = require("../middleware/multer");

adminRouter.get("/admin", (req, res) => {
  res.render("admin/dashboard", { layout: "admin/dashboard" });
});

// router.get("/graphics", routeController.graphicsDisplay);

// router.post("/graphics", store.single("images"), routeController.uploads);

// router.get("/", routeController.home);

module.exports = adminRouter;
