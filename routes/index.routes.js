const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

router.use("/", require('./eaters.routes'))
router.use("/", require('./restaurants.routes'))
router.use("/", require('./groups.routes'))

module.exports = router;
