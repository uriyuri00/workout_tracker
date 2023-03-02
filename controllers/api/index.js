const router = require('express').Router();
const userRoute = require("./user-routes.js");
const postRoute = require("./post-routes");
const commentRoute = require("./comments-routes");
const trainerRoute = require("./trainer-routes");


router.use("/users", userRoute);
router.use("/posts", postRoute);
router.use("/comments", commentRoute);
router.use("/trainer", trainerRoute);


module.exports = router;