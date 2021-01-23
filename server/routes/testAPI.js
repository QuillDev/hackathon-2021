const express = require("express");
const router = express.Router();

const loginRegister = require("../database/Users/loginRegister");
const createRoom = require("../database/Rooms/create-room");
const getRoomData = require("../database/Rooms/getRoomData");

//get the database
const db = require("monk")("localhost:27017/hackathon-2021");

router.get("/", function(req, res, next){
    res.send("API is up!");
});

router.get("/login", async function(req, res, next){
    const response = await loginRegister(db, req.query.email, req.query.name);
    res.send(response);
});

router.get("/create-room", async function(req, res, next){
    const response = await createRoom(db, req.query.name);
    res.send(response);
});

router.get("/join-room", async function(req, res, next){
    const response = await getRoomData(db, req.query.id);
    res.json(response);
});

module.exports = router;