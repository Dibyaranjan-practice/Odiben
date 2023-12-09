const router = require("express").Router();
const userController = require("./../controllers/UserController");

router.post("/login", userController.postLogin);
router.post("/signup", userController.postSignUp);

module.exports = router;
