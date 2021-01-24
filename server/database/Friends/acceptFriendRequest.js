const getUser = require("../Users/getUser");

async function acceptFriendRequest(db, accepted, sender, receiver) {

    const receivedUser = await getUser(db, receiver);
    let senderUser = await getUser(db, sender);

    //try to get the users, if they're bad return null
    if(!receivedUser || !senderUser){
        return null;
    }
    const users = await db.get("users");



}

module.exports = acceptFriendRequest;