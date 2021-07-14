const express = require("express");
const router = express.Router();
const routeController = require("../routerControl/controller");
const store = require("../middleware/multer");

router.get("/portfolio", routeController.portfolio);

router.get("/graphics", routeController.graphicsDisplay);

router.get("/pricing", function () {
  return "Hello pricing";
});

router.post(
  "/uploadmultiple",
  store.array("images", 5),
  routeController.uploads
);

router.get("/", routeController.home);

module.exports = router;
