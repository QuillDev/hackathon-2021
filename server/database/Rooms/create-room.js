const Str = require("@supercharge/strings");

async function createRoom(db, name) {

    //get the rooms category
    const rooms = db.get("rooms");

    try {
        const code = Str.random(8);

        //create a room object
        const room = {
            name,
            code
        }

        //get any matches for the room
        const matches = await rooms.find({code: code}, '-bigdata');

        //if matches is null return
        if(matches == null){
            return;
        }

        //if there are no matches it's a new room
        if(matches.length === 0){
            await rooms.insert(room);
            console.log(`Created new room: Code: ${code}, Name: ${name}`);
            return code;
        }
        else{
            //try to create the room again
            return await createRoom(db, name);
        }
    }catch (e){
        return null;
    }

}

module.exports = createRoom;