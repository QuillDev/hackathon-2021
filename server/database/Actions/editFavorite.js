let getUser = require("../Users/getUser");
let getRoomData = require("../Rooms/getRoomData")

async function editFavorite(db, favorite, code, email, name){

    const users = db.get("users");

    console.log(favorite, code, email, name);


    const user = await getUser(db, email); // user who wanted to edit a favorite
    const room = await getRoomData(db, code); // room to edit

    //if either come back bad, just return null
    if(user == null || room == null){
        return null;
    }

    //get the users favorites
    let favorites = user.servers;

    //create the room object
    let roomObj = {
        code,
        name
    }

    //if favorite is true then add it
    if(favorite === "true"){

        //make sure we don't contain it
        if(favorites.indexOf(roomObj) === -1){
            favorites.push(roomObj);
        }
    }
    else {
        for(const server of favorites){
            if(server.code === code){
                favorites.splice(favorites.indexOf(server), 1);
            }
        }
    }


    await users.findOneAndUpdate({email: email},
        { $set: { servers: favorites}})
        .then((updatedDoc) => {})

}

module.exports = editFavorite;