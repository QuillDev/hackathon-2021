const getRoomData = require("./getRoomData");
async function getMessageHistory(db, code){

    //get the room data
    const roomData = await getRoomData(db, code);

    //if the data is null, return an empty set
    if(!roomData){
        return {};
    }


    return {result: roomData.messages };
}

module.exports = getMessageHistory;