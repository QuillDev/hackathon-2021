const getUser = require("../Users/getUser");

async function sendFriendRequest(db, sender, receiver) {

    //you can't send a friend request to yourself
    if (receiver === sender) {
        return "null"
    }

    //get the sender and receiver
    let userOne = await getUser(db, sender);
    let userTwo = await getUser(db, receiver);

    //if the sender or receiver are bad return null
    if (!userOne || !userTwo) {
        return null;
    }

    if (alreadyFriends(userOne, userTwo)) {
        return;
    }

    //if they already sent a fq, return
    if (alreadySent(userOne, userTwo)) {
        return;
    }


    const users = await db.get("users");


    //If the other person already sent one, become friends
    if (alreadySent(userTwo, userOne)) {

        const users = await db.get("users");

        //get the friend requests of the user
        let friendRequests = userOne.friendRequests;

        //get the receivers friends list
        const friends = userOne.friends;

        //remove the friend request
        friendRequests = friendRequests.filter(x => x.email !== userTwo.email);
        //add the sender user to their friends list
        friends.push(userTwo);

        //send a friend request to the user
        await users.findOneAndUpdate({email: userOne.email},
            { $set: { friendRequests: friendRequests, friends: friends}});

        userTwo = await getUser(db, userTwo.email);
        const senderFriends = userTwo.friends;
        senderFriends.push(userOne);

        // add the user as a friend
        users.findOneAndUpdate({email: userTwo.email},
            {$set: {friends: senderFriends}})
            .then( () => null);
    } else {
        console.log("yo2")
        let rqs = userTwo.friendRequests;

        //push the sender to their friends requests
        rqs.push(userOne);

        //send a friend request to the user
        await users.findOneAndUpdate({email: userTwo.email},
            {$set: {friendRequests: rqs}});
    }


}
function alreadyFriends(p1, p2){
    return (p1.friends.filter(x => x.email === p2.email).length > 0);
}
function alreadySent(user, sender){
    return (sender.friendRequests.filter(u => u.email === user.email).length > 0);
}
module.exports = sendFriendRequest;