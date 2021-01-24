const express = require("express");
const router = express.Router();

const loginRegister = require("../database/Users/loginRegister");

//Rooms
const createRoom = require("../database/Rooms/create-room");
const getRoomData = require("../database/Rooms/getRoomData");
const editFavorite = require("../database/Actions/editFavorite");
const getFavorites = require("../database/Actions/getFavorites");

//Messages
const getMessageHistory = require("../database/Rooms/getMessageHistory");

//FriendsS
const sendFriendRequest = require("../database/Friends/sendFriendRequest");
const acceptFriendRequest = require("../database/Friends/acceptFriendRequest")
const getFriendRequest =require("../database/Friends/getFriendRequest");

//get the database
const db = require("monk")("localhost:27017/hackathon-2021");
db.addMiddleware(require('monk-middleware-wrap-non-dollar-update'))

router.get("/", function(req, res, next){
    res.send("API is up!");
});

router.get("/login", async function(req, res, next){
    console.log(req.query);
    const response = await loginRegister(db, req.query.email, req.query.name, req.query.image);
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

router.get("/editFavorite", async function (req, res, next){
    await editFavorite(db, req.query.favorite, req.query.roomCode, req.query.email, req.query.roomName)
    res.send("success");
})

router.get("/getFavorites", async function (req, res, next){
    let response = await getFavorites(db, req.query.email);
    res.json(response);
})

router.get("/getMessageHistory", async function (req, res, next){
    let response = await getMessageHistory(db, req.query.roomCode);
    res.json(response);
})

router.get("/sendFriendRequest", async function (req, res, next){
    let response = await sendFriendRequest(db, req.query.sender, req.query.receiver);
    res.json(response);
});

router.get("/getFriendRequests", async function (req, res, next){
    let response = await getFriendRequest(db, req.query.email);
    res.json(response);
})

module.exports = router;