var express = require("express");
var router = express.Router();
const {getRecentPosts, getPostById, getCommentsByPostId} = require('../middleware/postsmiddleware');
var isLoggedIn = require('../middleware/routeprotectors').userIsLoggedIn;

/* GET home page. */
router.get("/", getRecentPosts, function (req, res, next) {
  res.render("index", { title: "CSC 317 App", name: "Nathan Rennacker" });
});

router.get("/index", getRecentPosts, (req, res, next) => {
  res.render("index", { title: "CSC 317 App", name: "Nathan Rennacker" });
});

router.get("/login", (req, res, next) => {
  res.render("login", { title: "Login", name: "Nathan Rennacker" });
});

router.get("/viewpost", (req, res, next) => {
  res.render("viewpost", { title: "View a post", name: "Nathan Rennacker" });
});

router.get("/registration", (req, res, next) => {
  res.render("registration", { title: "Register an Account", name: "Nathan Rennacker" });
});

router.use('/postImage', isLoggedIn);
router.get("/postimage", (req, res, next) => {
  res.render("postimage", { title: "Post an Image", name: "Nathan Rennacker" });
});

router.get('/post/:id(\\d+)',  getPostById, getCommentsByPostId, (req, res, next) => {
  res.render('viewpost', {title: `Post ${req.params.id}`});
});



module.exports = router;
