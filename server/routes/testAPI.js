const express = require("express");
const router = express.Router();

const loginRegister = require("../database/loginRegister");

router.get("/", function(req, res, next){
    res.send("API is up!");
});

router.get("/login", async function(req, res, next){
    const response = await loginRegister(req.query.email, req.query.name);
    res.send(response);
});

module.exports = router;