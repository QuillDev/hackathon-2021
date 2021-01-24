const getUser = require("../Users/getUser");

async function sendFriendRequest(db, sender, receiver) {

    //you can't send a friend request to yourself
    if (receiver === sender) {
        return "null"
    }

    //get the sender and receiver
    const senderUser = await getUser(db, sender);
    const receiverUser = await getUser(db, receiver);

    //if the sender or receiver are bad return null
    if (!senderUser || !receiverUser) {
        return null;
    }

    //get the users db
    let alreadySent = (receiverUser.friendRequests.filter(u => u.email === senderUser.email).length> 0)
        ||  (receiverUser.friends.filter(x => x.email === senderUser.email).length > 0);

    //If they already sent one, return null
    if(alreadySent){
        return;
    }

    //get their friend requests
    let rqs = receiverUser.friendRequests;

    //push the sender to their friends requests
    rqs.push(senderUser);

    //get the users db
    const users = db.get("users");

    //send a friend request to the user
    await users.findOneAndUpdate({email: receiverUser.email},
        { $set: { friendRequests: rqs}})
        .then((updatedDoc) => {})
}

module.exports = sendFriendRequest;