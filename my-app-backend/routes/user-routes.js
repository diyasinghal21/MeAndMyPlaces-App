const express = require("express");
const { check } = require("express-validator");
const usercontroller = require("../controllers/users-controller");
const router = express.Router();

router.get("/", usercontroller.getUsers);

router.post(
  "/signup",
  [
    check("name").not().isEmpty(),
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: 6 }),
  ],
  usercontroller.signUp
);

router.post("/login", usercontroller.logIn);

module.exports = router;
