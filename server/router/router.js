const express = require("express");
const router = express.Router();
const routeController = require("../routerControl/controller");
const store = require("../middleware/multer");

router.get("/portfolio", routeController.portfolio);

router.get("/graphics", routeController.graphicsDisplay);

router.post("/graphics", store.array("images", 5), routeController.uploads);

router.get("/", routeController.home);

module.exports = router;
