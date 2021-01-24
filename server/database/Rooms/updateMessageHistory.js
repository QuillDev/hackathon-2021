const getRoomData = require("./getRoomData");
const timeStamp = require("time-stamp");
const db = require("monk")("localhost:27017/hackathon-2021");

async function updateMessageHistory(msg, usr, icon, code){


    //get the room data for the given room
    const roomData = await getRoomData(db, code);

    //if ther oom data is null return out
    if(roomData === null){
        return;
    }

    //get the rooms db
    const rooms = await db.get("rooms");

    //get the messages from the room
    let messages = roomData.messages;

    //push the message to the db
    messages.push({
        usr,
        msg,
        icon,
        timestamp: timeStamp("HH:ss")
    })

    await rooms.findOneAndUpdate({code: code},
        { $set: { messages: messages}});
}

module.exports = updateMessageHistory;