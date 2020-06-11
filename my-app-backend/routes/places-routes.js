const express = require("express");
const { check } = require("express-validator");
const placecontroller = require("../controllers/places-controller");
const checkauth = require("../models/checkauth");
const router = express.Router();

router.get("/:pid", placecontroller.getplacebyId);

router.get("/user/:uid", placecontroller.getplacebyuserId);

router.use(checkauth);

router.post(
  "/",
  [
    check("title").not().isEmpty(),
    check("description").isLength({ min: 6 }),
    check("address").not().isEmpty(),
  ],
  placecontroller.createaPlace
);

router.patch(
  "/:pid",
  [
    check("title").not().isEmpty(),
    check("description").isLength({ min: 6 }),
    check("address").not().isEmpty(),
  ],
  placecontroller.updatePlace
);

router.delete("/:pid", placecontroller.deletePlace);
module.exports = router;
