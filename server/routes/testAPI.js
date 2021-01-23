const express = require("express");
const router = express.Router();

router.get("/", function(req, res, next){
    res.send("API is up!");
});

router.get("/login", function(req, res, next){
    res.send(req.query.q);
});

module.exports = router;