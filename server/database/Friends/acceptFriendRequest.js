const getUser = require("../Users/getUser");

async function acceptFriendRequest(db, accepted, sender, receiver) {

    const receivedUser = await getUser(db, receiver);
    let senderUser = await getUser(db, sender);

    //try to get the users, if they're bad return null
    if(!receivedUser || !senderUser){
        return null;
    }
    const users = await db.get("users");


    //get the friend requests of the user
    let friendRequests = receivedUser.friendRequests;

    //if they never received a friend request, just return
    if(!friendRequests.filter(x => x.email === sender).length > 0){
        return;
    }

    //get the receivers friends list
    const friends = receivedUser.friends;

    //if we already have them friended, return
    if(friends.filter(x => x.email === receiver).length > 0){
        return;
    }

    //remove the friend request
    friendRequests = friendRequests.filter(x => x.email !== sender);


    //if the request was accepted
        if(accepted === "true") {
            //add the sender user to their friends list
            friends.push(senderUser);
        }
    //send a friend request to the user
    await users.findOneAndUpdate({email: receiver},
        { $set: { friendRequests: friendRequests, friends: friends}});


    senderUser = await getUser(db, sender);
    const senderFriends = senderUser.friends;
    senderFriends.push(receivedUser);

    // add the user as a friend
    users.findOneAndUpdate({email: sender},
        {$set: {friends: senderFriends}})
        .then( () => null);
}

module.exports = acceptFriendRequest;