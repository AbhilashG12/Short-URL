const express = require("express");
const { generateUrl, getAnalytics } = require("../controller/url");
const router = express.Router();

router.post("/",generateUrl);
router.get("/analytics/:shortId",getAnalytics)

module.exports = router;