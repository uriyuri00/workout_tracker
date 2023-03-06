const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./home-routes.js');
const dashboardRoutes = require('./dashboard-routes.js');
const { Post } = require("../models");

router.use('/api', apiRoutes);
router.use('/', homeRoutes);
router.use('/dashboard', dashboardRoutes);

router.get("/", async (req, res) => {
  try {
    const postsData = await Post.findAll();
    const posts = postsData.map((post) => post.get({ plain: true }));
    res.status(200).render("home", { posts });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
});



module.exports = router;
