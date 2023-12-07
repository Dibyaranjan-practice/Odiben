const router = require("express").Router();
const userController = require("./../controllers/UserController");

router.post("/login", userController.postLogin);

module.exports = router;
